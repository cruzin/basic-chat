class ChatsRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT)`
    return this.dao.run(sql)
  }

  create(name) {
    return this.dao.run(
      'INSERT INTO chats (name) VALUES (?)',
      [name])
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM chats WHERE id = ?`,
      [id])
  }
}

module.exports = ChatsRepository;