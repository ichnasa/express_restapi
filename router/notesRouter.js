import { Router } from "express";
import Database from "../Database.js";


// Router is part of express object
let router = Router();

// GET notes data
router.get('/', async (req, res) => {
    let db = await Database.init();
    // db.notes, ".notes" for respond the get request and showing array of notes instead of the database JSON itself
    // instead of
    // {
    //     "notes": []
    // }
    // we send the array of notes
    // {
    //     [
    //      ...
    //     ]
    // }
    res.send(db.notes)
})

// POST (CREATE)
router.post('/', async (req, res) => {
    // get current database
    let db = await Database.init();
    // get new object data from req (which came from user)
    let givenDataFromUser = {
        "id": db.notes.length + 1,
        "content": req.body.note.content
    };
    // push given object to database
    db.notes.push(givenDataFromUser);
    // update database
    await Database.save(db);
    // respond with newly updated database in JSON format
    res.status(200).json(db.notes)
})

// UPDATE or EDIT note (PUT)
router.put('/', async (req, res) => {
    // get current database data
    let db = await Database.init();
    // get object index we want to update in databases who have the same id we give
    let indexToUpdate = db.notes.findIndex(note => note.id == req.body.note.id)
    // update object with index of an object we want to update with newly given data
    console.log(indexToUpdate)
    db.notes[indexToUpdate] = {
        "id": db.notes[indexToUpdate].id,
        "content": req.body.note.content,
    }
    // Set old database with updated database 
    await Database.save(db);
    // respond with newly updated database in JSON format
    res.status(200).json(db.notes)
})

// DELETE 
router.delete('/:id', async (req, res) => {
    let db = await Database.init();
    let idToDelete = req.params.id;
    let indexToDelete = db.notes.findIndex(note => note.id == idToDelete)
    if (indexToDelete != -1) {
        db.notes.splice(indexToDelete, 1);
        await Database.save(db);
        res.status(200).json(db.notes)
    } else {
        res.status(404).json({
            "error message": "Note with given id not found!"
        })
    }
})

export default router;