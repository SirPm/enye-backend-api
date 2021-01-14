import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', (req, res) => {
    req.query.base === '';
    req.query.currency === '';
    // Make sure the base and currency parameter strings are present
    if('base' in req.query && 'currency' in req.query) {
        let { base, currency } = req.query;

        if(req.base !== '') {
            // Function to get the data
            const getExchangeRate = async (base, curr) => {
                let response = await fetch(`https://api.exchangeratesapi.io/latest/?base=${base}&symbols=${curr}`);
                let result = await response.json();
                let myResult = { 
                    "results": {
                        "base": result.base,
                        "date": result.date,
                        "rates": result.rates
                    }
                }
                res.send(myResult);
            }
        
            if(base !== '' && currency !== '') {
                getExchangeRate(base.toUpperCase(), currency.toUpperCase().replace(/\s*,\s*/g, ","));
            } else if(currency === '') {
                res.send({
                    "results": {
                        "status": "error",
                        "no_currency_err": "The currency parameter string is empty please fill it and try making the get request again"
                    }
                })
            }
        }
    } else {
        res.send({
            "results": {
                "error": "The 'base' query parameter string and or the 'currency' query parameter is missing"
            }
        })
    }   
});

export default router;