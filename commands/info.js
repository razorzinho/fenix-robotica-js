const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Obtém as informações do membro mencionado ou do servidor em si.'),

    async execute(interaction) {

        

    }
}