const {ButtonBuilder} = require("discord.js")

module.exports = {
    data: new ButtonBuilder()
        .setCustomId('ReportButton')
        .setLabel('Fazer denúncia'),

    async execute(interaction) {

    }
}