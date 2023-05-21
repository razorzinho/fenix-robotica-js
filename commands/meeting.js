const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reunião')
        .setDescription('Envia todas as mensagens relacionadas à reunião da Staff no Discord. Exceto as inscrições.'),

    async execute(interaction) {

    }

}