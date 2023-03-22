const {Client, Collection} = require("discord.js")
require("dotenv").config()
const fs = require("node:fs")
const path = require("node:path")

const client = new Client({ intents: [3276799] })

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