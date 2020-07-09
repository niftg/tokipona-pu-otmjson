const csvParse = require('csv-parse/lib/sync')
const fs = require('fs')

let f = fs.readFileSync("./dictionary.csv") // pali sin tan lipu "dictionary.ods"
let l = csvParse(f.toString(), {skip_empty_lines:true})

let otmd = {words: l.map(pokiNimi)}

function pokiNimi(v, index) {
    let wordForms = v[0].split(/\s+or\s+/)
    let word = {
        entry: {
            id: index+1,
            form: wordForms[0]
        },
        translations: v[1].split('\n').map(str=>{
            let m = str.match(/(PRE\s?-\s?VERB||[A-Z]+)\s(.+)/)
            return {
                title: m[1].replace(/PRE\s?-\s?VERB/,"PRE-VERB"),
                forms: [m[2]]
            }
        })
    }
    if(wordForms[1]){
        word.variations = [{
            title: 'alternative',
            form: wordForms[1]
        }]
    }
    return word
}

fs.writeFileSync("./dictionary.csv.nj.json",JSON.stringify(otmd))

console.log("pali ale li pini. o lukin e lipu pali. ona li pona la mi wile lape.")
