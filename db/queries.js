const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY created_date DESC"
  );

  return rows;
}

async function insertMessage(data) {
  const { userId, title, content } = data;

  await pool.query(
    "INSERT INTO messages (user_id, title, content) VALUES($1, $2, $3)",
    [userId, title, content]
  );
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

async function getUser(id) {
  const { rows } = await pool.query("SELECT * FROM users WEHRE id = $1", [id]);
  return rows[0];
}

async function updateUserMember(id, data) {
  const { isMember, isAdmin } = data;
  await pool.query(
    "UPDATE users SET is_member = $2, is_admin = $3 WHERE id = $1",
    [id, isMember, isAdmin]
  );
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteMessage,
  getUser,
  updateUser,
};
