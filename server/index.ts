// const express = require("express");
import express from "express";
import {router} from "./routes/routes";
require('dotenv').config();

const app = express();

app.use(express.static(__dirname + "/public/app"));
app.use("/", router);

let port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server starts listening on port ${port}`);
})

