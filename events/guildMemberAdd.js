const { Events, EmbedBuilder } = require('discord.js')
const logsConfig = require('../config/logsConfig.json')
const joinRoles = require('../config/joinRoles.json')

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,

    async execute(member) {

        const channel = await member.guild.channels.fetch(logsConfig[member.guild.id].memberChangeLogsChannelId, {force: true})
        const user = await member.user.fetch({force: true})

        const embed = new EmbedBuilder()
            .setAuthor({ name: member.user.tag, iconURL: member.avatarURL() })
            .setTitle('Alguém muito legal acabou de aparecer!!! Dêem a ele as boas-vindas!!!')
            .setColor(user.accentColor == undefined ? 'DarkGreen' : user.accentColor)
            .setImage(member.user.bannerURL() == undefined ? member.user.avatarURL() : member.user.bannerURL())
            .addFields(
                {name: 'Criação da conta:', value: `<t:${Math.round(new Date(user.createdAt).getTime() / 1000).toString()}:f> <t:${Math.round(new Date(user.createdAt).getTime() / 1000).toString()}:R>`},
                {name: 'É um BOT?', value: user.bot == true ? 'Sim' : 'Não'},
            )
            .setFooter({ text: `ID de usuário: ${user.id}` })
            .setTimestamp()

        member.edit({ roles: user.bot == true ? joinRoles[member.guild.id].bot : joinRoles[member.guild.id].user })

        await channel.send({embeds: [embed]})
    }
}