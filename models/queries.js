const pool = require('pool')

async function getAllMessages() {
    const messages = await pool.query("SELECT * FROM messages")
    return messages
}

async function getSpecifcMessage(id) {
    const result = await pool.query("SELECT * FROM messages WHERE id = $1", [id])
    return result
}

async function postNewMessage(text, user, added) {
    await pool.query("INSERT INTO messages (text, user, added) VALUES ($1, $2, $3)", [text, user, added])
}

module.exports = {
    getAllMessages,
    getSpecifcMessage,
    postNewMessage
}

