const {Client, Collection} = require("discord.js")

require("dotenv").config()
const fs = require("node:fs")
const path = require("node:path")

const client = new Client({ intents: [3276799] })

client.commands = new Collection()
client.buttons = new Collection()
client.selectMenus = new Collection()
client.modals = new Collection()

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

console.log('Inicializando componentes...')

const componentsPath = path.join(__dirname, "components")
const componentFolders = fs.readdirSync(componentsPath)

for (const folder of componentFolders) {
    const componentFiles = fs.readdirSync(path.join(componentsPath, folder)).filter(
        (file) => file.endsWith('.js')
    )

    const { buttons, selectMenus, modals } = client

    switch (folder) {
        case 'buttons':
            for (const file of componentFiles) {
                const button = require(path.join(componentsPath, folder, file))
                buttons.set(button.data.name, button)
            }

            break

        case 'selectMenus':
            for (const file of componentFiles) {
                const selectMenu = require(path.join(componentsPath, folder, file))
                selectMenus.set(selectMenu.data.name, selectMenu)
            }

            break

        case 'modals':
            for (const file of componentFiles) {
                const modal = require(path.join(componentsPath, folder, file))
                modals.set(modal.data.name, modal)
            }

            break 
        
        default:

            break
    }

}

client.login(process.env.TOKEN)