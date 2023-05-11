const {Events, EmbedBuilder, codeBlock, userMention} = require("discord.js")
const config = require("../config/moderationModule.json")

module.exports = {
    name: Events.MessageCreate,
    once: false,

    execute(message) {

        if (message.author.id == message.client.user.id) {
            return 
        }

        if (config.messageBlockedChannels[message.channel.id]) {
            message.delete()
        }

    }
}