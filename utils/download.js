const https = require('https') // or 'https' for https:// URLs
const fs = require('fs')
const path = require('node:path')

function fetchFromURL(url, dest, saveAs) {

    if (/{https:\/\/}/g.test(url)) {
        console.log(`A URL fornecida é inválida. Utilize um link https.`)
    }

    console.log(path.join(dest, saveAs))

    const file = fs.createWriteStream(path.join(dest, saveAs))
    const request = https.get(url, function(response) {
        response.pipe(file)
        console.log(`Obtendo arquivo ${saveAs} do endereço ${url}...`)

        // after download completed close filestream
        file.on("finish", () => {
            file.close()
            console.log(`Arquivo baixado.`)
        } )

    } )

    return file
}

module.exports = {
    fetchFromURL
}