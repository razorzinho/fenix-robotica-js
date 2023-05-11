const {SlashCommandBuilder, EmbedBuilder, channelMention, codeBlock} = require("discord.js")

const localisedDenialReplies = {
    'en-GB': 'This channel has no defined topic! Try another one, or ask the server owner to define one!',
    'en-US': 'This channel has no defined topic! Try another one, or ask the server owner to define one!',
    'pt-BR': 'Este canal não tem um tópico definido! Tente em outro, ou peça ao dono do servidor para definir um!'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topic')
        .setNameLocalizations( {
            'en-GB': 'topic',
            'en-US': 'topic',
            'pt-BR': 'tópico'
        } )
        .setDescription('Sends the current channel\'s topic description, if there is one.')
        .setDescriptionLocalizations( {
            'en-GB': 'Sends the current channel\'s topic description, if there is one.',
            'en-US': 'Sends the current channel\'s topic description, if there is one.',
            'pt-BR': 'Envia a descrição de tópico do canal em que foi requisitado, se houver uma.'
        } ),
    
    async execute(interaction) {

        const topic = interaction.channel.topic != undefined ? interaction.channel.topic : ''

        const reply = {
            'en-GB': `This channel's topic is: \`${topic}\`.`,
            'en-US': `This channel's topic is: \`${topic}\`.`,
            'pt-BR': `O tópico deste canal é: \`${topic}\`.`
        }

        let content = interaction.channel.topic != undefined ? reply[interaction.locale] : localisedDenialReplies[interaction.locale]

        const embed = new EmbedBuilder()
            .setColor( interaction.channel.topic != undefined ? 'DarkGreen' : 'DarkRed' )
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .addFields({ name: channelMention(interaction.channel.id), value: content })
            .setTimestamp()

        await interaction.reply({ embeds: [embed]}).then(
            (message) => {
                setTimeout(async () => await message.delete(), 15000)
            }
        )
    }
}