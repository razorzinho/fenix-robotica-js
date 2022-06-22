const { Client, Intents } = require('discord.js');
const config = require('./config.json')
require('dotenv').config()

client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Iniciado!')
    console.log(`Bot on-line! Nome ${client.user.username}`)
    console.log(`ID do bot: ${config.clientId}`)
    console.log(`ID do servidor: ${config.guildId}`)
    client.user.setActivity('fenixempire.net.br', { type: 'WATCHING' });
})

client.login(process.env.TOKEN)