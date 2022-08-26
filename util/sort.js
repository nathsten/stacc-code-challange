
/**
 * Sorts out PEPs by their first and last name.
 * @param {Object[]} allPEP 
 * @param {string} name 
 * @returns {Promise<Object[]>} returns in the same format as given, just as a promise. 
 */
const sortByName = ( allPEP, name ) => new Promise((resolve, reject) => {
    try{
        const names = name.split(" ");
        const PEPs = [];

        names.forEach((name1, i) => {
            const P = allPEP.find(person => person.name.includes(name1));
            // maybe skip this....
            if(P.name.includes(names[i-1]) && i>0){
                PEPs.push(P);
            }
            else if(P.name.includes(names[i+1]) && i<2){
                PEPs.push(P);
            }
        })
        resolve(PEPs);
        return;
    }
    catch(error){
        reject(error);
        return;
    }
});

/**
 * Sorts out PEPs by their email adress.
 * @param {Object[]} allPEP 
 * @param {string} email 
 * @returns {Promise<Object[]>} returns in the same format as given, just as a promise. 
 */
 const sortByEmail = ( allPEP, email ) => new Promise((resolve, reject) => {
    try{
        const emailRegEx =  /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        if(!emailRegEx.test(email)) {
            reject("Invalid email format");
            return;
        }
        const PEPs = allPEP.find(person => person.emails.includes(email));
        resolve(PEPs);
        return;
    }
    catch(error){
        reject(error);
    }
});

/**
 * Sorts out PEPs by their date of birth.
 * @param {Object[]} allPEP 
 * @param {string} DoB 
 * @returns {Promise<Object[]>} returns in the same format as given, just as a promise. 
 */
 const sortByDoB = ( allPEP, DoB ) => new Promise((resolve, reject) => {
    try{
        const DoBRegEx = /^[0-9]{4}[-\s\.]\b([1-9]|1[0-2])\b[-\s\.]\b([1-9]|[12][0-9]|3[0-1])\b$/;
        if(DoBRegEx.test(DoB)){
            const PEPs = allPEP.find(person => person.birth_date === DoB);
            resolve(PEPs);
            return;
        }
        else{
            // An attemt to fix the given date string if the formatting is a bit of
            // Ex1: it will recover 21.02.2022 -> 2022-02-21
            // Ex2: it will NOT recover 2022.02.02 because it can't tell the difference of month and date.
            const digts = DoB.match(/(+d+)/gm);
            if(digts.length === 3){
               
                const md = [];
                var y = "";
                digts.forEach(n => n.length === 4 ? y = n : md.push(n));
                if( md[0] >= 12 && md[1] >= 12 ){
                    reject("Invalid date format.");
                    return;
                }
                const d = Math.max(md[0], md[1]);
                const m =  Math.min(md[0], md[1]);
                sortByDoB(allPEP, `${y}-${m}-${d}`);
            }
            else{
                reject("Invalid date format");
                return;
            }
        }

    }
    catch(error){
        reject(error);
    }
});

/**
 * Sorts out PEPs by their Ocupation.
 * @param {Object[]} allPEP 
 * @param {string} ocupation 
 * @returns {Promise<Object[]>} returns in the same format as given, just as a promise. 
 */
 const sortByOcupation = ( allPEP, ocupation ) => new Promise((resolve, reject) => {
    try{
        const PEPs = allPEP.find(person => person.dataset.includes(ocupation));
    }
    catch(error){
        reject(error);
    }
});

module.exports = { sortByName, sortByEmail, sortByDoB, sortByOcupation };