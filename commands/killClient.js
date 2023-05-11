const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kill')
        .setDescription("Força o desligamento do bot desfazendo sua conexão com a API do Discord de forma segura."),
    premissions: [
        "1041417371417596006"
    ],

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setColor('Red')
            .setDescription('Finalizando conexão com a API do Discord...')
            .setFooter({ text: `Tempo de duração desta sessão ${(interaction.client.uptime / 60000).toFixed(2)} minutos.`, iconURL: interaction.client.user.avatarURL()})
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })

        interaction.client.user.setPresence({ status: 'offline' })

        console.log(`Finalizando conexão com a API do Discord. Requisitado por ${interaction.user.tag}`)

        interaction.client.destroy()
    }
}