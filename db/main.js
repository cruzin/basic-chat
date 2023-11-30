const Promise = require("bluebird");
const AppDAO = require("./dao");
const ChatsRepository = require("./chats_repository");
const MessagesRepository = require("./messages_repository");

function main() {
  const dao = new AppDAO("./db/database.sqlite3");
  const chat1 = { name: "NextJS with sqlite based chat" };
  const chat2 = { name: "A mystery chat" };
  const chatsRepo = new ChatsRepository(dao);
  const messagesRepo = new MessagesRepository(dao);
  // let chatstId;

  chatsRepo.createTable()
    .then(() => messagesRepo.createTable())
    .then(() => chatsRepo.create(chat1.name))
    .then(() => chatsRepo.create(chat2.name))
    .then((data) => {
      projectId = data.id;
      const messages = [
        {
          name: "Admin",
          text: "Welcome to this chat",
          isComplete: new Date().getTime(),
          projectId,
        },
        {
          name: "Admin",
          text: "Write a  message",
          isComplete: new Date().getTime(),
          projectId,
        },
      ];
      return Promise.all(messages.map((task) => {
        const { name, text, isComplete, projectId } = task;
        return messagesRepo.create(name, text, isComplete, projectId);
      }));
    })
    .then(() => chatsRepo.getById(projectId))
    .then((project) => {
      console.log(`\nRetreived project from database`);
      console.log(`chat id = ${project.id}`);
      console.log(`chat name = ${project.name}`);
      return messagesRepo.getMessages(project.id);
    })
    .then((messages) => {
      console.log("\nRetrieved chat messages from database");
      return new Promise((resolve, reject) => {
        messages.forEach((message) => {
          console.log(`message id = ${message.id}`);
          console.log(`message name = ${message.name}`);
          console.log(`message text = ${message.text}`);
          console.log(`message isComplete = ${message.isComplete}`);
          console.log(`message chatId = ${message.chatId}`);
        });
      });
      resolve("success");
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
}

main();