const db = require("../models/queries")

const messageListGet = async (req, res) => {
    const messages = await db.getAllMessages()
    res.render("index", { title: "Mini Messageboard", messages });
}

const messageNewGet = async (req, res) => {
    res.render("form")
}

const messageNewPost = async (req, res) => {
    const { messageText, messageUser } = req.body;
    await db.postNewMessage(messageText, messageUser, new Date())
    res.redirect("/")
}

const messageMessageGet = async (req, res) => {
    const messageId = parseInt(req.params.id)
    const message = db.getSpecificMessage(messageid)
    
    res.render("messagePage", { message })
}

module.exports = {
    messageListGet,
    messageNewGet,
    messageNewPost,
    messageMessageGet,
}