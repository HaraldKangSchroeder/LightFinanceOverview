import express from "express";

export const router = express.Router();

router.get("/", (req,res) => {
    res.sendFile("../public/app/index.html");
});

router.get("/", (req,res) => {
    res.sendFile("../public/app/index.html");
});

router.post("/create", (req,res) => {
    res.sendFile("../public/app/index.html");
});

router.post("/delete", (req,res) => {
    res.sendFile("../public/app/index.html");
});