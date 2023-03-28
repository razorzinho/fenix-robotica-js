const {ButtonBuilder, ModalBuilder} = require("discord.js")
const config = require("../config.json")

// const buttonLabel = config.modules.tickets[382520701594107905].donation

module.exports = {
    data: new ButtonBuilder()
        .setCustomId(this)
        .setLabel("DOAR!"),

    async execute(interaction) {

    }
}