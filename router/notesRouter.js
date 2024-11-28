import { Router } from "express";
import Database from "../Database.js";
import express from 'express';

let router = express.Router();

// GET
router.get('/', async (req, res) => {
    let db = await Database.init();
    res.send(db)
})

UPDATE

