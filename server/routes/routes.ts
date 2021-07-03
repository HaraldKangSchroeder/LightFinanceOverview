import express from "express";
import { deleteFinanceEntry, getFinanceEntries, insertFinanceEntry, replaceFinanceEntry } from "../src/dbManager";

export const router = express.Router();

const TEST_USERNAME = "Harald";

// parse post body content so that it can be accessed - https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields
router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile("/public/app/app.html", { root: __dirname + "/.." });
});

router.get("/payments", (req, res) => {
    getFinanceEntries(TEST_USERNAME, (financeEntries: any) => {
        res.send(financeEntries);
    });
});

router.post("/create" , checkCreateRequest);
router.post("/create", async (req, res) => {
    await insertFinanceEntry(TEST_USERNAME , req.body);
    getFinanceEntries(TEST_USERNAME, (financeEntries: any) => {
        res.send(financeEntries);
    });
});

router.post("/udpate" , checkUpdateRequest);
router.post("/update", async (req, res) => {
    await replaceFinanceEntry(
        TEST_USERNAME,
        req.body.originalName,
        req.body.editedPayment
    );
    getFinanceEntries(TEST_USERNAME, (financeEntries: any) => {
        res.send(financeEntries);
    });
})


router.post("/delete", checkDeleteRequest);
router.post("/delete", async (req, res) => {
    await deleteFinanceEntry(TEST_USERNAME, req.body.name);
    getFinanceEntries(TEST_USERNAME, (financeEntries: any) => {
        res.send(financeEntries);
    });
});



function checkDeleteRequest(req : any,res : any,next : any){
    if (req.body.name != null){
        return next();
    }
    console.log("Request not possible due to invalid data format");
    getFinanceEntries(TEST_USERNAME, (financeEntries : any) => {
        res.send(financeEntries);
    });
}

function checkCreateRequest(req : any, res : any, next : any){
    if(
        req.body.name != null &&
        req.body.organization != null &&
        req.body.amount != null &&
        req.body.selectedMonth != null &&
        req.body.rythm != null &&
        req.body.type != null
    ){
        return next();
    }
    console.log("Request not possible due to invalid data format");
    getFinanceEntries(TEST_USERNAME, (financeEntries : any) => {
        res.send(financeEntries);
    });
}

function checkUpdateRequest(req : any, res : any, next : any){
    checkCreateRequest(req,res,next);
}


