import express from "express";
import { createUserEntry, deleteFinanceEntry, getFinanceEntries, getUserEntry, insertFinanceEntry, replaceFinanceEntry } from "../src/dbManager";
import jwt from "jsonwebtoken";

export const router = express.Router();

const TEST_USERNAME = "Harald";

// parse post body content so that it can be accessed - https://stackoverflow.com/questions/5710358/how-to-access-post-form-fields
router.use(express.json());

router.get("/", (req, res) => {
    res.sendFile("/public/app/app.html", { root: __dirname + "/.." });
});

router.post("/login", async (req,res) => {
    // Authenticate User should happen here first
    let data = await getUserEntry(req.body.username, req.body.password);
    if(data.length > 0){
        res.send(true);
        return;
    }
    res.send(false);
    // let username = req.body.username;
    // let user = {
    //     name : username
    // }
    // let accessTokenSecret : string = process.env.ACCESS_TOKEN_SECRET!;
    // let accessToken = jwt.sign(user, accessTokenSecret, {expiresIn : "15s"});
    // let refreshTokenSecret : string = process.env.REFRESH_TOKEN_SECRET!;
    // let refreshToken = jwt.sign(user, refreshTokenSecret);
    // res.json({accessToken : accessToken, refreshToken : refreshToken });
});

// router.use(checkJWT);
router.post("/createUser", async (req,res) => {
    let worked = await createUserEntry(req.body.username, req.body.password);
    res.send(worked);
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

function checkJWT(req : any, res : any, next : any){
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);

    let accessTokenSecret : string = process.env.ACCESS_TOKEN_SECRET!;
    jwt.verify(token, accessTokenSecret, (err : any, user : any) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}


