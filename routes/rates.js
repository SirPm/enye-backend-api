import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', (req, res) => {
    req.query.base === '';
    req.query.currency === '';
    // Make sure the base and currency parameter strings are present
    if('base' in req.query && 'currency' in req.query) {
        let { base, currency } = req.query;
        let lastChar = req.query.currency.charAt(req.query.currency.length - 1);
        if(base.length === 3) {
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
                    if(lastChar === ',') {
                        res.send({
                            "results": {
                                "error": "Please remove the trailing comma at the end of the last currency"
                            }
                        })
                    }
                    else if(myResult.results.base === undefined) {
                        res.send({
                            "results": {
                                "error": "Please note that the currency query parameter only accepts comma separated currencies and also check the currency if the initials are correct and exactly three(3) characters long"
                            }
                        })
                    } else {
                        res.send(myResult);
                    }
                }
            
                if(base !== '' && currency !== '') {
                    getExchangeRate(base.toUpperCase(), currency.toUpperCase().replace(/\s*,\s*/g, ","));
                } else if(currency === '') {
                    res.send({
                        "results": {
                            "no_currency_err": "The currency parameter string is empty please fill it and try making the get request again"
                        }
                    })
                }
            }
        } else {
            res.send({
                "results": {
                    "error": "The base currency initials you entered is incorrect. Please check it and try again. Note: it's usually three(3) characters long"
                }
            })
        }
    } else {
        res.send({
            "results": {
                "error": "The 'base' query parameter string and or the 'currency' query parameter is missing. Please check it again"
            }
        })
    }   
});

export default router;