import express from "express";

export const router = express.Router();

router.get("/", (req,res) => {
    res.sendFile("/public/app/app.html",{ root: __dirname + "/.." });
});

router.post("/payments", (req,res) => {

});

router.post("/create", (req,res) => {
    res.sendFile("/public/app/app.html",{ root: __dirname + "/.." });
});

router.post("/delete", (req,res) => {
    res.sendFile("/public/app/app.html",{ root: __dirname + "/.." });
});