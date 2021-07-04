// const express = require("express");
import express from "express";
import cookieParser from "cookie-parser";
import {router} from "./routes/routes";
require('dotenv').config();

const app = express();

app.use(express.static(__dirname + "/public/app"));
app.use(cookieParser());
app.use("/", router);

let port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server starts listening on port ${port}`);
});


