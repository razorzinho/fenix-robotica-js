const {ButtonBuilder} = require("discord.js")

module.exports = {
    data: new ButtonBuilder()
        .setCustomId('DonateButton')
        .setLabel('DOAR!'),

    async execute(interaction) {

    }
}