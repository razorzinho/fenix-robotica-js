const { SlashCommandBuilder, SlashCommandIntegerOption, SlashCommandMentionableOption, EmbedBuilder, userMention } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Apaga a quantidade de mensagens especificada no canal utilizado.')
        .addIntegerOption(new SlashCommandIntegerOption()
            .setName('quantidade')
            .setDescription('Quantidade de mensagens a ser apagada.')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(100)
        )
        .addMentionableOption(new SlashCommandMentionableOption()
            .setName('membro')
            .setDescription('Somente apagar as mensagens deste usuário.')
            .setRequired(false)
        ),

    async execute(interaction) {

        const amount = interaction.options.getInteger('quantidade')
        const member = interaction.options.getUser('membro')

        if (!member) {
            await interaction.channel.bulkDelete(amount)
            .then(async (deleted) => await interaction.reply(`Apaguei ${deleted.size} mensage${deleted.size > 1 ? "ns" : "m"}!`)
            .then((msg => { 
                setTimeout(() => msg.delete(), 3000)
            })))

            return
        }

        let msgs = []

        await interaction.channel.messages.fetch()
        .then((fetched) => {

            for (msg of fetched.values()) {

                if (msgs.length == amount) break

                if (msg.author.id != member.id) continue

                msgs.push(msg)

            }
        })

        if (msgs.length == 0) {
            await interaction.reply({content: 'Não foi possível encontrar mensagens com o filtro utilizado. Não apaguei nenhuma mensagem.', ephemeral: true})
            .then(msg => { setTimeout(() => msg.delete(), 3000) })

            return
        }

        // const embed = new EmbedBuilder()
        //     .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})

        await interaction.channel.bulkDelete(msgs)
        .then(async (deleted) => await interaction.reply(`Apaguei ${deleted.size} mensage${deleted.size > 1 ? "ns" : "m"} de ${userMention(member.id)}.` ))
        .then(msg => {setTimeout(() =>  msg.delete(), 3000) })
     
        // todo 
        // enviar as mensagens apagadas em formato de arquivo para o canal de logs
        // fazer download de dos anexos em um diretório de arquivos temporários, 
        // enviá-los como parte da nossa mensagem de log, e apagá-los do cache

    }
}