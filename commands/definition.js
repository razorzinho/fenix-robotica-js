const { SlashCommandBuilder, EmbedBuilder, SlashCommandStringOption, Embed } = require("discord.js")
const dicio = require("dicio-br")
const googleDictionaryApi = require("google-dictionary-api")
const config = require('../config/translation.json')
const { volp } = require('../utils/volp')

let res = []

const Dicts = {
    'dicio': async function(term) {
        const req = await dicio(term)

        console.log(req)

        if (req.status !== 200) {

            res = "notFound"

            return res
        }

        res = req

        return res       
    },
    'volp': async function(term) {

        const req = volp(term)

        if (req.status == 500) {

            res = "notFound"

            return res
        }
    },
    'googleDict': async function(term) {
        googleDictionaryApi.search(term, 'en').then((result) => {
            res = result
        }
        ).catch(
            (error) => {
                console.log(`Algo deu errado. Veja o erro: ${error}`)

                res.push({status: 500})
            }
        )

        return res
    },
    'urbanDict': async function(term) {

        res = 'WIP'

        return res
    }
}

function buildEmbedFromResult(interaction, result, locale) {

    const resultObj = Object.entries(result)

    let fields = []


    // this code here is pretty much broken... Trying another way around its issues...
    // for (const [key, value] of resultObj) {

    //     console.log(key)

    //     if (key == 'status') continue

    //     if (Array.isArray(key)) {

    //         let keyString = ''

    //         const iteratable = Object.entries(key)
            
    //         let counter = 1

    //         for (k = 1; k <= iteratable.length; k++) {

    //             if (k == iteratable.length) {

    //                 keyString += iteratable[k] 

    //                 continue
    //             }

    //             keyString += `${iteratable[k]} \n`

    //             counter++
    //         }

    //         fields.push({name: config.definitionCommand.embedFields[key], value: keyString, inline: false})

    //         continue
    //     }

    //     fields.push({name: config.definitionCommand.embedFields[key], value: value, inline: false})
    // }
    // Should prolly write it down from scratch

    const embed = new EmbedBuilder()
        .setColor(result['status'] == 200 ? 'DarkGreen' : 'DarkRed')
        .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
        .addFields(fields)
        .setTimestamp()

    return embed
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('definition')
        .setNameLocalizations({
            'pt-BR': 'definição',
        })
        .setDescription('Gets a term definition from the selected dictionary.')
        .setDescriptionLocalizations({
            'pt-BR': 'Busca pela definição de um termo no dicionário escolhido.',
        })
        .addStringOption(
            new SlashCommandStringOption()
                .setName('term')
                .setNameLocalizations({
                    'pt-BR': 'termo',
                })
                .setDescription('The term to search for its definition.')
                .setDescriptionLocalizations({
                    'pt-BR': 'O termo a ser buscado.',
                })
                .setRequired(true)
        )
        .addStringOption(
            new SlashCommandStringOption()
                .setName('language')
                .setNameLocalizations({
                    'pt-BR': 'idioma',
                })
                .setDescription('Which language to search for the definition.')
                .setDescriptionLocalizations({
                    'pt-BR': 'Qual o idioma do termo a buscar pela definição.',
                })
                .setChoices(
                    {name: 'Portuguese', value: 'pt'},
                    {name: 'English', value: 'en'},
                )
                .setRequired(true)
        )
        .addStringOption(
            new SlashCommandStringOption()
                .setName('dictionary')
                .setNameLocalizations({
                    'pt-BR': 'dicionário',
                })
                .setDescription('Which dictionary to use for the definition search.')
                .setDescriptionLocalizations({
                    'pt-BR': 'Qual dicionário utilizar para realizar a busca.',
                })
                .setChoices(
                    {name: 'Dicio (Pt-BR)', value: 'dicio'},
                    {name: 'Volp (Pt-BR)', value: 'volp'},
                    // {name: 'Priberam (Pt-BR)', value: 'priberam'},
                    {name: 'Google Dictionary (any)', value: 'googleDict'},
                    {name: 'Urban Dictionary', value: 'urbanDict'}
                )
                .setRequired(true)
        ),
        
    async execute(interaction) {

        const term = interaction.options.getString('term')
        const language = interaction.options.getString('language')
        const dict = interaction.options.getString('dictionary')
            
        const res = await Dicts[dict](term)

        console.log(res)

        if (res.status != 200) {

            const embed = new EmbedBuilder()
                .setAuthor()

            return
        }

        const embed = buildEmbedFromResult(interaction, res, language)

        await interaction.reply({embeds: [embed]})
    }
}