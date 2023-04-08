const {SlashCommandBuilder, EmbedBuilder, SlashCommandStringOption} = require("discord.js")
const { translate } = require("@vitalets/google-translate-api")
const config = require("../config/translation.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setNameLocalizations({
            'en-US': 'translate',
            'pt-BR': 'traduzir'
        })
        .setDescription('Translates the specified word to the specified language, and gives definition if EN or PT')
        .setDescriptionLocalizations({
            'en-US': 'Translates the specified word to the specified language, and gives definition if EN or PT',
            'pt-BR': 'Traduz a palavra fornecida para o idioma requisitado, e fornece a definição, se inglês ou português.'
        })
        .addStringOption(
            new SlashCommandStringOption()
                .setName('word_or_phrase')
                .setNameLocalizations({
                    'en-US': 'word_or_phrase',
                    'pt-BR': 'palavra_ou_frase'
                })
                .setDescription('The word or phrase to be translated.')
                .setDescriptionLocalizations({
                    'en-US': 'The word or phrase to be translated.',
                    'pt-BR': 'A palavra ou frase a ser traduzida.'
                })
                .setRequired(true)
        )
        .addStringOption(
            new SlashCommandStringOption()
                .setName('target_language')
                .setNameLocalizations({
                    'en-US': 'target_language',
                    'pt-BR': 'idioma_alvo'
                })
                .setDescription('The target language to get the translation for (not all available).')
                .setDescriptionLocalizations({
                    'en-US': 'The target language to get the translation for (not all available).',
                    'pt-BR': 'O idioma-alvo para a tradução (não estão todos os idiomas disponíveis).'
                })
                .setRequired(true)
                .setChoices(
                    {name: "Português", value: "pt"},
                    {name: "English", value: "en"},
                    {name: "Español", value: "es"},
                    {name: "Japanese", value: "ja"},
                    {name: "Chinese (simplified)", value: "zh-CN"},
                    {name: "Chinese (traditional)", value: "zh-TW"},
                    {name: "Esperanto", value: "eo"},
                    {name: "French", value: "fr"},
                    {name: "Galego", value: "gl"},
                    {name: "Deutch", value: "de"},
                    {name: "Greek", value: "el"},
                    {name: "Italian", value: "it"},
                    {name: "Arabic", value: "ar"},
                    {name: "Russian", value: "ru"},
                    {name: "Tagalog (Filipines)", value: "fil"},
                    {name: "Latinae", value: "la"}
                )
        ),

    async execute(interaction) {

        const toTranslate = interaction.options.getString('word_or_phrase')
        const targetLang = interaction.options.getString('target_language')

        const translation = await translate(toTranslate, {to: targetLang})

        const replies = {
            'en': `Translation of \`${toTranslate}\` from \`${translation.raw.src}\` to \`${targetLang}\``,
            'pt-BR': `Tradução de \`${toTranslate}\` do \`${translation.raw.src}\` para \`${targetLang}\``
        }

        const embed = new EmbedBuilder()
            .setColor('Blurple')
            .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .addFields(
                {name: replies[interaction.locale] != false ? replies[interaction.locale] : replies['en'], value: translation.text}
            )
            .setTimestamp()

        await interaction.reply({embeds: [embed]})

    }
}