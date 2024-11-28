import express from 'express'
import Database from './Database.js';

const app = express();
const port = 3000;

app.use(express.json())

// app.get('/', async (req, res) => {
//     let db = await Database.init();
//     res.send(db)
// })

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})