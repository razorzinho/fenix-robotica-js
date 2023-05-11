const {Events} = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction) {

        // Lidar com comandos (/)

        if (interaction.isChatInputCommand()) {

            const { commands } = interaction.client

            const command = commands.get(interaction.commandName)

            if (!command) {
                console.error(`Comando '${interaction.commandName}' não encontrado.`)

                return
            }

            const member = await interaction.guild.members.fetch({ user: interaction.user, force: true })

            if (!member) {

                return
            }

            const allowedRoles = command.permissions

            if (command.permissions) {
                for (const roleID in allowedRoles) {

                    if (member.roles.cache.some(role => role.id === allowedRoles[roleID])) {
        
                        break
                    }

                    await interaction.reply({content: `Você não tem permissão para utilizar este comando, ${interaction.user.username}`, ephemeral: true})

                    return
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

        // Lidar com componentes de mensagem


        // Botões

        if (interaction.isButton()) {

            const { buttons } = interaction.client
            const { customId } = interaction
            const button = buttons.get(customId)

            if (!button) return new Error("O botão solicitado não é um componente válido do cliente.")

            try {
                button.execute(interaction)
            } catch(err) {
                console.log(err)
            }

            return 
        }

        // Menus de seleção

        if (interaction.isStringSelectMenu()) {

            const { selectMenus } = interaction.client
            const { customId } = interaction
            const selectMenu = selectMenus.get(customId)

            if (!selectMenu) return new Error("O botão solicitado não é um componente válido do cliente.")

            try {
                selectMenu.execute(interaction)
            } catch(err) {
                console.log(err)
            }

            return
        }

        // Modals

        if (interaction.isModalSubmit()) {

            const { modals } = interaction.client
            const { customId } = interaction
            const modal = modals.get(customId)

            if (!modal) return new Error("O botão solicitado não é um componente válido do cliente.")

            try {
                modal.execute(interaction)
            } catch(err) {
                console.log(err)
            }

            return
        }

    }
}