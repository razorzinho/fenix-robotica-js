const { Events, ActivityType, EmbedBuilder } = require("discord.js")
const config = require('../config.json')
const fs = require("node:fs")
const path = require("node:path")

function fetchGuildNames(client, guilds) {

    for (item of guilds.values()) {

        if (!config.client.allowed_guild_ids[item.id]) {

            client.guilds.fetch(item.id).then( (guild) => {

                guild.channels.fetch().then((col) => {
                    let channel = col.find(x => x.isTextBased())

                    channel.send("Eu não deveria estar aqui. Adeus. Sayonara. Adios. Goodbye.")
                })

                console.log(`Estou saindo de um servidor em que não deveria estar: ${guild.name} (${guild.id})\nNão está na lista de servidores permitidos.`)

                guild.leave()

            } )

            continue

        }

    }

}

module.exports = {

    name: Events.ClientReady,
    once: true,
    
    execute(client) {

        console.log("Verificando servidores atuais...")

        client.guilds.fetch().then((guilds) => {

            fetchGuildNames(client, guilds)
            
        })

        const commandsPath = path.join(__dirname, '../commands')
        const commandFiles = fs.readdirSync(commandsPath).filter(x => x.endsWith('.js'))

        let commandsData = []
        for (const cFile of commandFiles) {
            const commandPath = path.join(commandsPath, cFile)

            const command = require(commandPath)

            if (!command.data || !command.execute) {
                console.log(`${cFile.replace('.js', '')} não é um comando válido. Ignorando.`)

                continue
            }

            client.commands.set(command.data.name, command)

            commandsData.push(command.data)
        }

        client.application.commands.set(commandsData, config.client.dev_guild_id).then((commands) => console.log(`Registrei com êxito ${commands.size} comandos (/).`))

        client.user.setPresence({activities: [{name: "Sendo desenvolvido", type: ActivityType.Watching}], status: 'dnd'})

        // faremos disso um sistema automatizado de envio de mensagens predefinidas de acordo com módulos que as usam
        for (guildId in config.client.allowed_guild_ids) {
            let guild = client.guilds.fetch(guildId)

            // console.log(`No servidor ${guild.name}:\n`)
        
            for (main in config.modules.automatic) {
                console.log(main)
            }

            // inicializar sistema de tickets de alguma forma...
        }

            console.log(`Conexão estabelecida! Conectado como ${client.user.tag}.`)
        }

    }