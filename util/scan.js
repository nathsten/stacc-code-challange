/**
 * @param {Object} person 
 * @returns {Promise<{sanctioned: Boolean, sanctions: String}>}
 */
const PEPScan = person => new Promise((resolve, reject) => {

    try{
        if(person.sanctions){
            resolve({
                sanctioned: true,
                sanctions: person.sanctions
            });
            return;
        }
        else{resolve({
            sanctioned: false,
            sanctions: ""
        });
        return;

        }
    }
    catch(err){
        reject(err);
        return;
    }
});


/** Finds the name of the owner and scans him for sanctions
 * @param {Object} OrgRols 
 * @param {Object} org 
 * @param {async Function} fetch
 * @returns {Promise<{sanctioned: Boolean, sanctions: string, isBankrupt: Boolean}>}
 */
const orgScan = async ( OrgRols, org, fetch) => new Promise(async (resolve, reject) => {
    try{
        const [ roller ] = OrgRols.roller;
        const { fornavn, etternavn } = roller.person.navn;
        const fullName = `${fornavn ? fornavn + ' ' : ''}${etternavn ? etternavn + ' ' : ''}`;
        const getPEP = await fetch(`https://code-challenge.stacc.dev/api/pep?name=${fullName}`);
        const PEP = await getPEP.json();
        // Again most likely only one person.
        const person = PEP.hits[0];
        if(person){
            const isSanctionated = await PEPScan();
            resolve({
                sanctioned: isSanctionated.sanctioned,
                sanctions: isSanctionated.sanctions,
                isBankrupt: org.konkurs,
                person: {
                    name: ""
                }
            });
            return;
        }
        else{
            resolve({
                sanctioned: false,
                sanctions: '',
                isBankrupt: org.konkurs,
                person: person ? person : {name: ""},
                fullName,
            });
            return;
        }
    }
    catch(err){
        reject(err);
        return;
    }
    
});

module.exports = { PEPScan, orgScan }