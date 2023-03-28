const {SlashCommandBuilder} = require("discord.js")

const localisedDenialReplies = {
    'en-US': 'This channel has no defined topic! Try another one, or ask the server owner to define one!',
    'en-GB': 'This channel has no defined topic! Try another one, or ask the server owner to define one!',
    'pt-BR': 'Este canal não tem um tópico definido! Tente em outro, ou peça ao dono do servidor para definir um!'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topic')
        .setNameLocalizations({
            'en-US': 'topic',
            'en-GB': 'topic',
            'pt-BR': 'topico'
        })
        .setDescriptionLocalizations({
            'en-US': 'Sends the current channel\'s topic description, if there is one.',
            'en-GB': 'Sends the current channel\'s topic description, if there is one.',
            'pt-BR': 'Envia a descrição de tópico do canal em que foi requisitado, se houver uma.'
        }),

    async execute(interaction) {
        if (!interaction.channel.topic) {
            await interaction.reply(`${localisedDenialReplies[interaction.locale]}`)

            return
        }

        const reply = {
            'en-US': `This channel's topic ${codeBlock({topic})}.`,
            'en-GB': `This channel's topic ${codeBlock({topic})}.`,
            'pt-BR': `O tópico deste canal é ${codeBlock({topic})}.`
        }

        await interaction.reply(reply[interaction.locale])
    }

}