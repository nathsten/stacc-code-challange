const express = require('express');
const bodyParser = require('body-parser');
const { readFileSync } = require('fs');
const PEP = JSON.parse(readFileSync('pep.json'));
const { sortByName, sortByEmail, sortByDoB, sortByOcupation } = require('./util/sort');
const PORT = 5050;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/search', express.static('public/search'));
app.use('/', express.static('public/home'));
app.use('/vue', express.static('public/vue'));

app.listen(PORT, e => e ? console.log(`Something went wrong...\n${e}`) : console.log(`Server running on http://127.0.0.1:5050/`));

app.post('/KYC', (req, res) => {

});

app.post('/KYCSearch', async (req, res) => {

    const { category } = req.body;

    switch(category){

        case "name":
            try{
                // Sort and return by name.

                const { name } = req.body;

                const PEPs = await sortByName(PEP, name);
                res.send({status: "OK", PEPs});
                return;
            }
            catch(err){
                res.send({status: "Invalid name"});
                console.log(err);
                return;
            }

        case "email":
            try{
                // Sort out and return by email.
                const { email } = req.body;

                const PEPs = await sortByEmail(PEP, email);
                res.send({status: "OK", PEPs});
                return;
            }
            catch{
                res.send({status: "Invalid email"});
                return;
            }

        case "DoB":
            try{
                // Sort and return by date of brith.
                const { DoB, month } = req.body;
                
                const PEPs = await sortByDoB(PEP, DoB, month);
                res.send({status: "OK", PEPs});
                return;
            }
            catch{
                res.send({status: "Invalid date of birth format."});
                return;
            }

        case "Ocupation":
            {
                // Sort and return by ocupation.
                const { ocupation } = req.body;

                const PEPs = await sortByOcupation(PEP, ocupation);
                res.send({status: "OK", PEPs});
                return;
            }

        default: 
            res.send({status: "Invalid category."});
            return;
        
    }

});