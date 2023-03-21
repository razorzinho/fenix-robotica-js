const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responde Pong e o tempo de resposta médio do bot."),
    permissions: [
        "1041417371417596006"
    ],
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('DarkRed')
            .setDescription(`Pong! 🏓 Tempo de resposta atual do bot: \`${interaction.client.ws.ping}\` ms`)

        await interaction.reply({ embeds: [embed] })
    },
}