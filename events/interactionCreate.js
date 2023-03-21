const {Events} = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return

        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            console.error(`Comando '${interaction.commandName}' não encontrado.`)

            return
        }

        const member = await interaction.guild.members.fetch({ user: interaction.user, force: true })

        if (!member) {

            return
        }

        const allowedRoles = command.permissions

        for (const roleID in allowedRoles) {

            if (member.roles.cache.some(role => role.id === allowedRoles[roleID])) {

                break
            }
        }
    
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Houve um erro durante a execução deste comando! Tente novamente mais tarde. Caso o erro persista, entre em contato com o desenvolvedor.', ephemeral: true })
            } else {
                await interaction.reply({ content: 'Houve um erro ao tentar executar este comando!', ephemeral: true })
            }
        }
    }
}