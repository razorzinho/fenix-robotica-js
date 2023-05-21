const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
            .setName('properties')
            .setDescription('Manages client configurations: disable/enable specific commands or other resources.')
            .setNameLocalization('pt-BR', 'propriedades')
            .setDescriptionLocalization('pt-BR', 'Gerencia as configurações do bot: desabilite/habilite comandos e recursos específicos.'),

    async execute(interaction) {

    }
}