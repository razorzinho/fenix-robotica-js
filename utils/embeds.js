const {EmbedBuilder} = require('discord.js')

function createEmbedFromJSON(json) {
    try {
        const embed = new EmbedBuilder()    
            .setColor(json.color)

        if (json.title) {
            embed.setTitle(json.title)
        }

        if (json.description) {
            embed.setDescription(json.description)
        }

        if (json.author) {
            embed.setAuthor(json.author)
        }

        if (json.fields) {
            embed.addFields(json.fields)
        }

        if (json.footer) {
            embed.setFooter(json.footer)
        }

        embed.setTimestamp()

        return embed
    }
    catch {
        return undefined
    }
}