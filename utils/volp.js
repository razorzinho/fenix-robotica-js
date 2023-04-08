// https://regexr.com/

// <span class="item-palavra">(\<.+\>.+\<\/.+\>)|(.+)<\/span><span class="descricao">(.+)<\/span>


/* <span class=\"item-palavra\"><strong>matar</strong>andibense</span><span class=\"descricao\"> adj. s.2g.</span>

<span class="item-palavra"><strong>palavra</strong></span><span class="descricao"> s.f.</span>

<span class="item-palavra"><strong>sexo</strong></span><span class="descricao"> s.f.</span>

<span class="item-palavra"><strong>teste</strong></span><span class="descricao"> s.f.</span>

<span class="item-palavra"><strong>mundo</strong></span><span class="descricao"> s.f.</span> */

const termResultFinder = /<span class="item-palavra">(.+)<\/span><span class="descricao">(.+)<\/span>/

async function volp(term) {

    let res = []

    const request = await fetch(`https://www.academia.org.br/ajax/abl/buscar-palavras?form=vocabulario&palavra=${term}`)

    const json = await request.json()

    if (json.rows < 1) {
        res.status = 500
        res.message = 'Nenhum resultado encontrado com o parâmetro de busca utilizado.'
    }
    
    const values = Object.entries(json.rows)

    for (i = 0; i < json.rows; i++) {

        const raw = values[i]

        console.log(raw)

        const match = termResultFinder.exec(raw)

        if (match) {

            res[match[1]] = match[2]

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