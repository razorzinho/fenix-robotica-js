const {Client, Collection, GatewayIntentBits} = require("discord.js")
require("dotenv").config()
const fs = require("node:fs")
const path = require("node:path")

// ------------------------------------------------------------------
// Now, we must initialize the events for our client

// não especificar intents para habilitar todos os permitidos ao bot
const client = new Client({ intents: [3276799] }) // todos os intents por bits
    // GatewayIntentBits.Guilds, 
    // GatewayIntentBits.MessageContent, 
    // GatewayIntentBits.DirectMessageReactions,
    // GatewayIntentBits.DirectMessageTyping,
    // GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.GuildModeration,
    // GatewayIntentBits.GuildEmojisAndStickers,
    // GatewayIntentBits.GuildIntegrations,
    // GatewayIntentBits.GuildInvites,
    // GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessageReactions,
    // GatewayIntentBits.GuildMessageTyping,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.GuildPresences,
    // GatewayIntentBits.GuildScheduledEvents,
    // GatewayIntentBits.GuildVoiceStates,
    // GatewayIntentBits.GuildWebhooks 
    // --- todos os intents por GatewayIntentBits
    // Sim, já sei que usar TUDO não é boa ideia, mas estou desenvolvendo, não importa.

client.commands = new Collection()

const eventsPath = path.join(__dirname, "events")
const eventFiles = fs.readdirSync(eventsPath).filter(x => x.endsWith(".js"))

for (const eFile of eventFiles) {
    const eventPath = path.join(eventsPath, eFile)

    const event = require(eventPath)

    if (!event.once) {
        client.on(event.name, (...args) => event.execute(...args))

        continue
    }

    client.once(event.name, (...args) => event.execute(...args))
}

client.login(process.env.TOKEN)