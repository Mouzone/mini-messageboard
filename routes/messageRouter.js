const Router = require("express")
const messageController = require('../controllers/messageController.js')
const messageRouter = Router()

messageRouter.get("/", messageController.messageListGet)
messageRouter.get("/new", messageController.messageNewGet)
messageRouter.post("/new", messageController.messageNewPost)
messageRouter.get("/message/:id", messageController.messageMessageGet)

module.exports = messageRouter