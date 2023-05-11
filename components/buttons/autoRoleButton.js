const {ButtonBuilder} = require("discord.js")

module.exports = {
    data: new ButtonBuilder()
        .setCustomId('AutoRoleButton')
        .setLabel('Escolha seus cargos!'),

    permissions: [],

    async execute(interaction) {

    }
}