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

// const main = () => {

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
        },
        email: "",
        dates: {
            big: true, 
            small: true,
            febNorm: true,
            febLeap: true
        },
        dateInpt: {
            year: null,
            month: null,
            date: null
        },
        ocupation: "",
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
            const get = await fetch('/KYC', init);
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
        searchByEmail: async () => {
            if(!app.email){
                alert("You need to enter an email adress");
                return;
            }
    
            const init = makeInit({email: app.email.toLoweCase(), category: 'email'});
            const get = await fetch('/KYC', init);
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
        yearSelected: () => {
            if ((0 == +app.dateInpt.year % 4) && (0 != +app.dateInpt.year % 100) || (0 == +app.dateInpt.year % 400)){ 
                app.dates.febLeap = true;
                app.dates.febNorm = true;
            }
            else{
                app.dates.febLeap = false;
                app.dates.febNorm = true;
            }
        },
        monthSelected: () => {
            if("1,3,5,7,8,10,12".split(",").includes(app.dateInpt.month)){
                app.dates.big = true; 
                app.dates.small = true;
            }
            else if (app.dateInpt.month === "2"){
                app.dates.big = true; 
                app.dates.small = true;
            }
            else{
                app.dates.big = false; 
                app.dates.small = true;
            }
        },
        searchByDoB: async () => {
            if(!app.dateInpt.date || !app.dateInpt.month || !app.dateInpt.year){
                alert("You need to enter full date of birth");
                return;
            }
    
            const init = makeInit({DoB: `${app.dateInpt.year}-${app.dateInpt.month}-${app.dateInpt.date}`, category: 'DoB', month: +app.dateInpt.month});
            const get = await fetch('/KYC', init);
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
        searchByOcupation: async () => {
            if(!app.ocupation){
                alert("You need to enter an ocupation");
                return;
            }
    
            const init = makeInit({ocupation: app.ocupation, category: 'Ocupation'});
            const get = await fetch('/KYC', init);
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
        }
    },
    created: () => {
        const YearList = document.getElementById("YearList");
        const MonthList = document.getElementById("MonthList");
        const DateList = document.getElementById("DateList");
        const years = new Array(110);
        const thisYear = new Date().getFullYear();
        for(let i=thisYear-1; i>=thisYear-110; --i){
            years.push(i);
        }
        const months = "1,2,3,4,5,6,7,8,9,10,11,12".split(",");
        const days = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31".split(",");
        YearList.innerHTML += years.map(y => `<option>${y}</option>`).join("");
        MonthList.innerHTML += months.map(m => `<option>${m}</option>`).join("");
        
        // Shows the dates corresponding to the selected month.
        DateList.innerHTML += days.map(d => {
            d = +d;
            if(d <= 28) return  `<option v-if="dates.big || dates.small" >${d}</option>`;
            if(d === 29) return  `<option v-if="dates.big || dates.small && (dates.febLeap && !dates.febNorm)" >${d}</option>`;
            if(d > 29 && d <= 30) return `<option v-if="">${d}</option>`;
            if(d > 30) return `<option v-if="">${d}</option>`;
        }).join("");
    }
})

// }

// main();