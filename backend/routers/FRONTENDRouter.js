import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FR = express.Router();

FR.route("/")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/site/index.html'));
    })
export {
    FR as FRONTENDRouter
}