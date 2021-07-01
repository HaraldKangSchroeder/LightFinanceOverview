import express from "express";
import { deleteFinanceEntry, getFinanceEntries, insertFinanceEntry, replaceFinanceEntry } from "../src/dbManager";

export const router = express.Router();

// parse post body content so that it can be accessed - https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields
router.use(express.json());

router.get("/", (req,res) => {
    res.sendFile("/public/app/app.html",{ root: __dirname + "/.." });
});

router.get("/payments", (req,res) => {
    getFinanceEntries((financeEntries : any) => {
        res.send(financeEntries);
    });
});

router.post("/create", async (req,res) => {
    await insertFinanceEntry(req.body);
    getFinanceEntries((financeEntries : any) => {
        res.send(financeEntries);
    });
});

router.post("/update", async (req,res) => {
    // console.log(req.body);
    await replaceFinanceEntry(
        {name : req.body.originalName},
        req.body.editedPayment
    );
    getFinanceEntries((financeEntries : any) => {
        res.send(financeEntries);
    });
})

router.post("/delete", async (req,res) => {
    await deleteFinanceEntry({
        name : req.body.name
    });
    getFinanceEntries((financeEntries : any) => {
        res.send(financeEntries);
    });
});