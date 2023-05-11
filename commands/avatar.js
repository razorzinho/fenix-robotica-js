const { SlashCommandBuilder, SlashCommandMentionableOption, EmbedBuilder, userMention } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Obtém e envia a foto de perfil do usuário mencionado.')
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName('membro')
            .setDescription('O usuário que cuja foto do perfil será obtida.')
            .setRequired(true)
        ),

    async execute(interaction) {
        const mention = interaction.options.getUser('membro')

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setColor('Blue')
            .setDescription(`Foto do perfil de ${userMention(mention.id)}:`)
            .setImage(mention.avatarURL({size: 512}))
            .setFooter({text: `Requisitado por ${interaction.user.tag}`, iconURL: interaction.client.user.avatarURL()})
            .setTimestamp()

        await interaction.reply({embeds: [embed]})
    }
}