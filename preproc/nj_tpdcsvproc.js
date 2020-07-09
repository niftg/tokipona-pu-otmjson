const csvParse = require('csv-parse/lib/sync')
const fs = require('fs')

let f = fs.readFileSync("./dictionary.csv") // pali sin tan lipu "dictionary.ods"
let l = csvParse(f.toString(), {skip_empty_lines:true})

let otmd = {words: l.map(pokiNimi)}

function pokiNimi(v, index) {
    const wordForms = v[0].split(/\s+or\s+/)
    const transTypes = v[1].split('\n').map(str=>
        str.match(/(PRE\s?-\s?VERB||[A-Z]+)\s(.+)/).slice(1)
    ).map(v=>[
        v[0].replace(/PRE\s?-\s?VERB/,"PRE-VERB"),
        v[1].split(v[1].match(/^\(.*\)$/)?null:/;\s*/)
    ])

    let word = {
        entry: {
            id: index+1,
            form: wordForms[0]
        },
        translations: transTypes.map(v=>v[1].map(str=>{
            return {
                title: v[0],
                forms: str.split(str.match(/\(.*\,.*\)/)?null:/\s*\,\s*/).map(s=>
                    v[0].match("VERB")?s.replace(/^to\s*/,''):s
                )
            }
        })).reduce((a,c)=>a.concat(c),[]),
        tags:[],contents:[],variations:[],relations:[] // tawa ilo ZpDIC
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
