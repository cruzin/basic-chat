import path from "path";
import AppDAO from "@/db/dao";
import ChatsRepository from "@/db/chats_repository";
import MessagesRepository from "@/db/messages_repository";


let absolutePath = path.resolve("./db/database.sqlite3");
export const dbPath = absolutePath.split("\\").join("\\\\")
export const dao = new AppDAO(dbPath)
export const chatsRepo = new ChatsRepository(dao);
export const messagesRepo = new MessagesRepository(dao);
