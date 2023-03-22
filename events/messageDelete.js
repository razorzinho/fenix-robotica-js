const {Events, EmbedBuilder, codeBlock, userMention} = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: Events.MessageDelete,
    once: false,

    async execute(message) {
        const channel = await message.guild.channels.fetch(config.modules.logs.channelId)

        const embed = new EmbedBuilder()
            .setColor('DarkRed')
            .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL()})
            .setDescription(`${userMention(message.author.id)} apagou uma mensagem ${message.attachments.size > 0 ? "com anexos" : "sem anexos."}`)
            .addFields(
                {name: "Conteúdo da mensagem:", value: `${codeBlock(message.content)}`, inline: false}
            )
            .setTimestamp()

        if (message.attachments.size > 0) {

            let f = []

            message.attachments.forEach((att) => {

                f.push(att.url)

            })

            await channel.send({embeds: [embed], files: f})

            return
        }

        await channel.send({embeds: [embed]})
    }

}