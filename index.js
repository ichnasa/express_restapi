import express from 'express'
import Database from './Database.js';
import router from './router/notesRouter.js';

const app = express();
const port = 3000;

app.use(express.json())
// '/notes' is the starting url for the restAPI
// start reading parameter after /notes, e.g: /notes/id, it read "id" instead of "/notes/id"
app.use('/notes', router)

// app.get('/', async (req, res) => {
//     let db = await Database.init();
//     res.send(db)
// })

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})