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

const main = () => {

const app = new Vue({
    el: "#main",
    data: {
        pg: {
            showFnLn: true,
            showEmail: false,
            showDoB: false,
            showOcupation: false
        },
        name: {
            firstName: "",
            lastName: ""
        }
    },
    methods: {
        changePg: page => {
            Object.keys(app.pg).forEach(e => app.pg[e] = false);
            app.pg[page] = true;
        },
        searchByName: async () => {
            if(!app.name.firstName && !app.name.firstName){
                alert("You need to give at least one of firstname and/or lastname");
                return;
            }
    
            const init = makeInit({name: `${app.name.firstName} ${app.name.lastName}`, category: 'name'});
            const get = await fetch('/KYC', init);
            const res = await get.json();
            
            if(res.status === "OK"){
                console.log(res.PEPs);
            }
            else{
                console.log(res.status);
            }
        }
    },
})

}

main();