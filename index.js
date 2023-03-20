const {Client, Collection, GatewayIntentBits} = require("discord.js")
const config = require('./config.json')
require("dotenv").config()
const fs = require("node:fs")
const path = require("node:path")

// ------------------------------------------------------------------
// Now, we must initialize the events for our client

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

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