const { SlashCommandBuilder, EmbedBuilder, SlashCommandStringOption } = require('discord.js')
const conjugar = require('conjugador')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('conjugar')
        .setDescription('Lista as formas de conjugação do verbo fornecido.')
        .addStringOption(
            new SlashCommandStringOption()
                .setName('term')
                .setDescription('O verbo a ser cojugado.')

        ),

    async execute(interaction) {
        const termo = interaction.command.option.getString('term')

        const conjugacoes = conjugar(termo)

        if (!conjugacoes) {

            console.log('Sem conjugações.')

            return 
        }

        

    }
}