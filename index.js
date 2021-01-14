import express from 'express';
import bodyParser from 'body-parser';

import ratesRouter from './routes/rates.js';

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Server Is Running At Port: ${PORT}`));

app.use('/api/rates', ratesRouter);

app.use(function (req, res, next) {
    res.status(404).send({
        status: 404,
        "message":"I'm Sorry but I can't find that check the endpoint again to make sure it follows the required pattern"
    })
})