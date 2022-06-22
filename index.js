const discord = require('discord.js')
const config = require('./config.json')
require('dotenv').config()

client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log(`Bot on-line! Nome ${client.user.name}`)
    console.log(`ID do bot: ${config.clientID}`)
    console.log(`ID do servidor: ${config.guildId}`)
    client.user.setPresence({ activities: [{ name: 'Observando fenixempire.net.br' }], status: 'online', type: 'WATCHING'} );
})

client.login(process.env.TOKEN)