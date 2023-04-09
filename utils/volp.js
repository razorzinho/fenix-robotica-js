const termResultFinder = /<span class="item-palavra"><strong>(.+)<\/strong><\/span><span class="descricao">(.+)<\/span>|<span class="item-palavra"><strong>(.+)<\/strong>(.+)<\/span><span class="descricao">(.+)<\/span>|<span class="item-palavra">(.+)<\/span><span class="descricao">(.+)<\/span>/i

async function volp(term) {

    let res = []

    const request = await fetch(`https://www.academia.org.br/ajax/abl/buscar-palavras?form=vocabulario&palavra=${term}`)

    const json = await request.json()

    if (json.rows < 1) {
        res.status = 500
        res.message = 'Nenhum resultado encontrado com o parâmetro de busca utilizado.'
    }
    
    const values = Object.entries(json.rows)

    for (i = 0; i < json.rows.length; i++) {


        const raw = Object.values(values[i][1])

        const match = termResultFinder.exec(raw)

        if (match) {

            if ( !match[ 3 ] && !match[ 4 ] && !match[ 5 ] && !match[ 6 ] && !match[ 7 ] ) {

                res[ match[ 1 ] ] = match[ 2 ]

                continue 
            }

            if ( !match[ 1 ] && !match[ 2 ] && !match[ 6 ] && !match[ 7 ]) {

                res[`${match[ 3 ]}${match[ 4 ]}`] = match[5]

                continue 
            }

            res[ match[ 6 ] ] = match[ 7 ]

        } else {
            console.log('Não houve correspondência.')
            
            continue
        }
        
    }

    return res

}

module.exports = {
    volp
}