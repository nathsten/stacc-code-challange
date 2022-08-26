const { readFileSync, writeFileSync } = require('fs');

const rawPEP = readFileSync('../pep.csv', 'utf-8');

const linesPEP = rawPEP.replaceAll("\"", "").split(/\n/);
const headings = linesPEP.shift().replaceAll("\r", "").split(",");

const allPEP = [];

linesPEP.forEach(person => {
    person = person.replaceAll("\r", "");
    const data = person.split(",");
    const struct = {}
    for(let i=0; i<headings.length; ++i){
        const heading = headings[i];
        const indexDataPerson = data[i];
        struct[heading] = indexDataPerson;
    }
    allPEP.push(struct);
});

// prettier formatting in the .json file
writeFileSync('../pep.json', JSON.stringify(allPEP, null, 2));