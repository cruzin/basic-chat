//TODO rename projects to chats
//TODO rename messages to chat messages
//TODO add participants to chats
//TODO remove unneeded fields from chats
//TODO remove unneeded fields from messages
//TODO login w google or join as guest

// TODO 1. Receive new messages from the client
// TODO 2. List all messages in chronological order for the client
// TODO Your solution should be runnable locally using docker-compose.
// TODO Don't forget to include all the dependencies of your service in the composer file, including your database system of choice.

class MessageRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        text TEXT,
        time INTEGER,
        chatId INTEGER,
        CONSTRAINT messages_fk_chatId FOREIGN KEY (chatId)
          REFERENCES chats(id) ON UPDATE CASCADE ON DELETE CASCADE)`
    return this.dao.run(sql)
  }

  create(name, text, time, chatId) {
    return this.dao.run(
      `INSERT INTO messages (name, text, time, chatId)
        VALUES (?, ?, ?, ?)`,
      [name, text, time, chatId])
  }

  update(task) {
    const { id, name, text, time, chatId } = task
    return this.dao.run(
      `UPDATE messages
      SET name = ?,
        text = ?,
        time = ?,
        chatId = ?
      WHERE id = ?`,
      [name, text, time, chatId, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM messages WHERE id = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM messages WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM messages`)
  }

  getMessages(chatId) {
    return this.dao.all(
      `SELECT * FROM messages WHERE chatId = ?`,
      [chatId])
  }
}

module.exports = MessageRepository;