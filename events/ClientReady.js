const { Events, ActivityType } = require("discord.js")
const config = require('../config.json')
const fs = require("node:fs")
const path = require("node:path")

module.exports = {

    name: Events.ClientReady,
    once: true,
    
    execute(client) {
        let guilds = ''

        const col = client.guilds.cache

        const colSize = client.guilds.cache.size

        let counter = 1

        col.forEach((guild) => {

            if (!config.client.allowed_guild_ids[guild.id]) {
                const channel = guild.channels.cache.toJSON().find(x => x.isTextBased())
                channel.send("Eu não deveria estar aqui. Adeus. Sayonara. Adios. Goodbye.")

                console.log(`Estou saindo de um servidor em que não deveria estar: ${guild.name} (${guild.id})`)

                guild.leave()
            }

            if (counter == colSize) {
                guilds += guild.name

                return
            }

            guilds += guild.name + ", "

            counter++
        })

        const commandsPath = path.join(__dirname, "../commands")
        const commandFiles = fs.readdirSync(commandsPath).filter(x => x.endsWith(".js"))

        let commandsData = []
        for (const cFile of commandFiles) {
            const commandPath = path.join(commandsPath, cFile)

            const command = require(commandPath)

            if (!command.data || !command.execute) {
                console.log(`${cFile.replace(".js", "")} não é um comando válido. Continuando.`)

                continue
            }

            client.commands.set(command.data.name, command)

            commandsData.push(command.data)
        }

        client.application.commands.set(commandsData, config.client.dev_guild_id)

        client.user.setPresence({activities: [{name: "Sendo desenvolvido", type: ActivityType.Watching}], status: 'dnd'})

        // faremos disso um sistema automatizado de envio de mensagens predefinidas de acordo com módulos que as usam
        // for (guildId in config.client.allowed_guild_ids) {
        //     let guild = client.guilds.fetch(guildId)
        // }
        
        console.log(`Conexão estabelecida! Conectado como ${client.user.tag}. \nServidores detectados: ${guilds}`)
    }
}