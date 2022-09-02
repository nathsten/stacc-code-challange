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
        resultPEPs: [],
        indexesPEPs: []
    },
    methods: {
        changePg: page => {
            Object.keys(app.pg).forEach(e => app.pg[e] = false);
            app.pg[page] = true;
            app.resultPEPs = [];
        },
        searchByName: async () => {
            if(!app.name.firstName && !app.name.firstName){
                alert("You need to give at least one of firstname and/or lastname");
                return;
            }
    
            const init = makeInit({name: `${app.name.firstName} ${app.name.lastName}`, category: 'name'});
            const get = await fetch('/KYCSearch', init);
            const res = await get.json();
            
            if(res.status === "OK"){
                console.log(res.PEPs);
                app.resultPEPs = res.PEPs;
                if(!app.indexesPEPs[0])
                    app.indexesPEPs = Object.keys(res.PEPs[0])
            }
            else{
                alert(res.status);
            }
        },
        searchByOrgNr: async () => {
            if(!app.email){
                alert("You need to enter an email adress");
                return;
            }
    
            const init = makeInit({email: app.email.toLoweCase(), category: 'email'});
            const get = await fetch('/KYCSearch', init);
            const res = await get.json();
            
            if(res.status === "OK"){
                console.log(res.PEPs);
                app.resultPEPs = res.PEPs;
                if(!app.indexesPEPs[0])
                    app.indexesPEPs = Object.keys(res.PEPs[0]);
            }
            else{
                alert(res.status);
            }
        },
    },
    created: async () => {
        const init = makeInit({orgNr: "939909494", category: "orgNr"});
        const get = await fetch('/KYC', init);
        const res = await get.json();
        // const init = makeInit({firstName: "Knut Arild", lastName: "Hareide",  category: "name"});
        // const get = await fetch('/KYC', init);
        // const res = await get.json();
        console.log(res);
    } 
})