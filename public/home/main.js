const makeInit = data => {
    return {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
}

const app = new Vue({
    el: "#app",
    data: {
        pg: {
            showFnLn: true,
            showOrg: false,
        },
        name: {
            firstName: "",
            lastName: ""
        },
        orgNr: "",
        person: {},
        org: [],
        sanctions: {},
        personIndexes: [],
        orgIndexes: [],
        bankrupt: false,
        usefullInfo: []
    },
    methods: {
        changePg: page => {
            Object.keys(app.pg).forEach(e => app.pg[e] = false);
            app.pg[page] = true;
            app.person = [];
            app.org = [];
            app.personIndexes = [];
            app.orgIndexes = [];
            app.sanctions = [];
            app.usefullInfo = [];
            app.bankrupt = "";
            
        },
        searchByName: async () => {
            if(!app.name.firstName && !app.name.firstName){
                alert("You need to give at least one of firstname and/or lastname");
                return;
            }
    
            const init = makeInit({firstName: app.name.firstName, lastName: app.name.lastName, category: 'name'});
            const get = await fetch('/KYC', init);
            const res = await get.json();
            
            if(res.status === "OK"){
                app.person = res.person;
                app.sanctions = res.isSanctionated;
                app.personIndexes = Object.keys(app.person);
            }
            else{
                alert(res.status);
            }
        },
        searchByOrgNr: async () => {
            if(!app.orgNr){
                alert("You need to enter an email adress");
                return;
            }
    
            const init = makeInit({orgNr: app.orgNr.replaceAll(" ", ""), category: 'orgNr'});
            const get = await fetch('/KYC', init);
            const res = await get.json();
            
            if(res.status === "OK"){
                app.org = res.OrgInfo;
                app.bankrupt = res.isBankrupt;
                app.sanctions = {
                    sanctions: res.sanctions,
                    sanctioned: res.sanctioned,
                }
                app.person = res.person;
                app.usefullInfo = {
                    name: app.org.navn,
                    organisationsform: app.org.organisasjonsform.beskrivelse,
                    adress: `${app.org.forretningsadresse.adresse[0]} ${app.org.forretningsadresse.poststed} ${app.org.forretningsadresse.postnummer}, ${app.org.forretningsadresse.land}`,
                    emplyees: app.org.antallAnsatte,
                    founded: app.org.stiftelsesdato
                };
                app.orgIndexes = Object.keys(app.usefullInfo);
                app.personIndexes = Object.keys(app.person);
            }
            else{
                alert(res.status);
            }
        },
    },
    created: async () => {
        // const init = makeInit({orgNr: "939909494", category: "orgNr"});
        // const get = await fetch('/KYC', init);
        // const res = await get.json();
        // // const init = makeInit({firstName: "Knut Arild", lastName: "Hareide",  category: "name"});
        // // const get = await fetch('/KYC', init);
        // // const res = await get.json();
        // console.log(res);
    } 
})