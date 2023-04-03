const {Client, Collection} = require("discord.js")

require("dotenv").config()
const fs = require("node:fs")
const path = require("node:path")

const client = new Client({ intents: [3276799] })

client.commands = new Collection()
// client.components = new Collection()

const eventsPath = path.join(__dirname, "events")
const eventFiles = fs.readdirSync(eventsPath).filter(x => x.endsWith('.js'))

console.log('Incializando eventos...')

for (const eFile of eventFiles) {
    const eventPath = path.join(eventsPath, eFile)

    const event = require(eventPath)

    if (!event.once) {
        client.on(event.name, (...args) => event.execute(...args))

        continue
    }

    client.once(event.name, (...args) => event.execute(...args))
}

// const componentsPath = path.join(__dirname, "components")
// const componentFiles = fs.readdirSync(componentsPath).filter(x => x.endsWith('.js'))

// console.log('Inicializando componentes...')

// for (const cFile of componentFiles) {
//     const componentPath = path.join(eventsPath, cFile)

//     const component = require(componentPath)

//     if (!component.data || !component.execute) {
//         console.log(`${cFile.replace('.js', '')} não é um componente válido. Ignorando.`)

//         continue
//     }

//     client.components.set(components.data.customId, components)
// }

client.login(process.env.TOKEN)