const resultError = / <title\>Página Não Encontrada - Conjugação de Verbos\<\/title> /gi

async function conjugacao(termo) {

    let res = []

    const firstTry = await fetch(`https://www.conjugacao.com.br/verbo-${termo}`)

    const body = await firstTry.text()

    console.log(body)

    const notFound = resultError.exec(body)

    if (notFound) {
        const secondTry = await fetch(`https://www.conjugacao.com.br/${termo}`)
    }

}

module.exports = {
    conjugacao
}