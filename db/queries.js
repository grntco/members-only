const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT m.id, m.title, m.content, m.created_date AS date, m.user_id AS "userId", u.first_name || ' ' || u.last_name AS author
    FROM messages AS m
    JOIN users AS u ON m.user_id = u.id
    ORDER BY m.created_date DESC`
  );

  return rows;
}

async function getAllMessagesWithDateAndAuthor() {}

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

async function getUserById(id) {
  const { rows } = await pool.query(
    `SELECT id, first_name AS firstName, last_name AS "lastName", username, password, is_member AS "isMember", is_admin AS "isAdmin" 
    FROM users 
    WHERE id = $1`,
    [id]
  );
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    `SELECT id, first_name AS "firstName", last_name AS "lastName", username, password, is_member AS "isMember", is_admin AS "isAdmin" 
    FROM users 
    WHERE username = $1`,
    [username]
  );
  return rows[0];
}

async function insertUser(data) {
  const { firstName, lastName, username, password, isAdmin } = data;
  const values = [firstName, lastName, username, password, false, isAdmin];
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6)",
    values
  );
}

async function updateUserMember(id, data) {
  const { isMember } = data;
  await pool.query("UPDATE users SET is_member = $2 WHERE id = $1", [
    id,
    isMember,
  ]);
}

async function updateUserAdmin(id, data) {
  const { isAdmin } = data;
  await pool.query("UPDATE users SET is_admin = $2 WHERE id = $1", [
    id,
    isAdmin,
  ]);
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteMessage,
  getUserById,
  getUserByUsername,
  insertUser,
  updateUserMember,
  updateUserAdmin,
};
