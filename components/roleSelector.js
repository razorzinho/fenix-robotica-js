const {ButtonBuilder, ModalBuilder} = require("discord.js")
const config = require("../config.json")

// const buttonLabel = config.modules.tickets[382520701594107905].

module.exports = {
    data: new ButtonBuilder()
        .setCustomId(this)
        .setLabel("Escolha seus cargos!"),

    async execute(interaction) {

    }
}