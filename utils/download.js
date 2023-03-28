const https = require('https') // or 'https' for https:// URLs
const fs = require('fs')

function fetchFromURL(url, dest, saveAs) {

    if (/{http:\/\/}/g.test(url)) {
        console.log(`A URL fornecida é inválida. Utilize um link https.`)
    }

    const file = fs.createWriteStream(`${dest}/${saveAs}`)
    const request = https.get(url, function(response) {
        response.pipe(file)
        console.log(`Obtendo arquivo ${saveAs} do endereço ${url}...`)

        // after download completed close filestream
        file.on("finish", () => {
            file.close()
            console.log(``)
        } )
        .catch((error) => 
            console.log(`Algo deu errado ao tentar fazer o download do arquivo. Verifique a URL e os parâmetros passados.\n${error}`)
        )

    } ).then(() => setTimeout(() => console.log(`${saveAs} está baixado, mas será apagado em alguns`), 120*1000))

    return file
}