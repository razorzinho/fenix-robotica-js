const { Events, EmbedBuilder } = require('discord.js')
const logsConfig = require('../config/logsConfig.json')

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,

    async execute(member) {

        const channel = await member.guild.channels.fetch(logsConfig[member.guild.id].memberChangeLogsChannelId, {force: true})

        const embed = new EmbedBuilder()
            .setAuthor({ name: member.user.tag, iconURL: member.user.avatarURL() })
            .setTitle('Um membro deixou o servidor :( Sentiremos saudades :(')
            .setColor("DarkRed")
            .setImage(member.user.bannerURL() == undefined ? member.user.avatarURL() : member.user.bannerURL())
            .addFields(
                {name: "Criação da conta:", value: `<t:${Math.round(new Date(member.user.createdAt).getTime() / 1000).toString()}:f> <t:${Math.round(new Date(member.user.createdAt).getTime() / 1000).toString()}:R>`},
                {name: "Entrada no servidor:", value: `<t:${Math.round(new Date(member.joinedAt).getTime() / 1000).toString()}:f> <t:${Math.round(new Date(member.joinedAt).getTime() / 1000).toString()}:R>`},
                {name: "É um BOT?", value: member.user.bot == true ? "Sim" : "Não"},
            )
            .setFooter({ text: `ID de usuário: ${member.user.id}` })
            .setTimestamp()

            await channel.send({embeds: [embed]})
    }
}