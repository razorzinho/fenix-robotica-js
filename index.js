const discord = require('discord.js')
const config = require('./config.json')
require('dotenv').config()

client.once('ready', () => {
    console.log('Bot on-line!')
    console.log(`ID do bot: ${config.clientID}`)
    console.log(`ID do servidor: ${config.guildId}`)
})