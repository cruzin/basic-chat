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

  update(project) {
    const { id, name } = project
    return this.dao.run(
      `UPDATE chats SET name = ? WHERE id = ?`,
      [name, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM chats WHERE id = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM chats WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM chats`)
  }

  getMessages(projectId) {
    return this.dao.all(
      `SELECT * FROM messages WHERE projectId = ?`,
      [projectId])
  }
}

module.exports = ChatsRepository;