const config = require('../config.json')

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log('Iniciado!')
        console.log(`Bot on-line! Nome ${client.user.username}`)
        console.log(`ID do bot: ${config.clientId}`)
        console.log(`ID do servidor: ${config.guildId}`)
        client.user.setActivity('fenixempire.net.br', { type: 'WATCHING' });
        client.user.setStatus('dnd');
    },
};