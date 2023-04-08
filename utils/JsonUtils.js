
function jsonToString(json, valueOnly) {

    let string = ''

    if (valueOnly) {
        for (value of Object.entries(json)) {

            string += `${value} \n`

        }
    }
    else {
        for (const [key, value] of Object.entries(json)) {

            string += `${key}: ${value} \n`

        }
    }

    return string
}

module.exports = { jsonToString }