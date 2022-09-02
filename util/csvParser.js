const { readFileSync, writeFileSync } = require('fs');

const rawPEP = readFileSync('../pep.csv', 'utf-8');

const linesPEP = rawPEP.split(/\n/);
const headings = linesPEP.shift().split(",").map(e => e.replaceAll('\"', '').replaceAll('\r', ''));

const allPEP = [];

linesPEP.forEach(person => {
    const data = person.split(",").map(e => e.replaceAll('\"', '').replaceAll('\r', ''));
    const struct = {}
    for(let i=0; i<headings.length; ++i){
        struct[headings[i]] = data[i]
    }
    allPEP.push(struct);
});

// prettier formatting in the .json file
writeFileSync('../pep.json', JSON.stringify(allPEP, null, 2));