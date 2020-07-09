const csvParse = require('csv-parse/lib/sync')
const fs = require('fs')

let f = fs.readFileSync("./dictionary.csv") // pali sin tan lipu "dictionary.ods"
let l = csvParse(f.toString(), {skip_empty_lines:true})

let otmd = {}
otmd["words"] = []

l.forEach(panaTawaPokiOtmd)

function panaTawaPokiOtmd(v, index) {

    let trans = v[1].split('\n').map(str=>{
        let m = str.match(/(PRE\s?-\s?VERB||[A-Z]+)\s(.+)/)
        return {
            title: m[1].replace(/PRE\s?-\s?VERB/,"PRE-VERB"),
            forms: [m[2]]
        }
    })

    let w = {
        entry: {
            id: index+1,
            form: v[0].replace(/\s+or\s+/," or ")
        },
        translations: trans
    }
    otmd["words"].push(w)
}

fs.writeFileSync("./dictionary.csv.nj.json",JSON.stringify(otmd))

console.log("pali ale li pini. o lukin e lipu pali. ona li pona la mi wile lape.")
