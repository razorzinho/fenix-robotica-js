const {Events, EmbedBuilder, codeBlock, userMention} = require("discord.js")
const fs = require('node:fs')
const config = require("../config/logsConfig.json")
const { fetchFromURL } = require('../utils/download.js')

module.exports = {
    name: Events.MessageDelete,
    once: false,

    async execute(message) {
        if (message.author.bot) {
            return
        }

        const channel = await message.guild.channels.fetch(config.channelId)

        const embed = new EmbedBuilder()
            .setColor('DarkRed')
            .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL()})
            .setDescription(`${userMention(message.author.id)} apagou uma mensagem ${message.attachments.size > 0 ? "com anexos" : "sem anexos."}`)
            .addFields(
                {name: "Conteúdo da mensagem:", value: `${codeBlock(message.content)}`, inline: false}
            )
            .setTimestamp()

        if (message.attachments.size > 0) {

            const targetDir = `${__dirname}/../tempFiles`

            let f = []

            message.attachments.forEach((att) => {

                let targetFileName = `${att.name}-${att.id}`

                let tempFile = utils.download(att.url, targetDir, targetFileName)
                
                f.push(fs.open(tempFile))

            })

            await channel.send({embeds: [embed], files: f})

            return
        }

        await channel.send({embeds: [embed]})
    }

}