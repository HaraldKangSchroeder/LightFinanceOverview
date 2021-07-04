import express from "express";
import { createUserEntry, deleteFinanceEntry, getFinanceEntries, getUserEntry, insertFinanceEntry, replaceFinanceEntry } from "../src/dbManager";


const TEST_USERNAME = "Harald";

let cookies : any[] = [];

export const verifyCookie = (req : express.Request, res : express.Response, next : express.NextFunction) => {
    let cookie : string = req.cookies.testCookieName;
    if(cookie && containsCookie(cookie)){
        console.log("has cookie " + cookie);
        console.log("----------------------------------------");
        // check database, compare cookie to given cookies and say next when it exists, else 403
        if(true){
            return next();
        }
    }
    console.log("no cookie existent");
    console.log("----------------------------------------");
    return res.sendStatus(403);
}

const containsCookie = (cookie : string) : boolean => {
    for(let cookieObj of cookies){
        if(cookieObj.cookie === cookie){
            return true;
        }
    }
    return false;
}

const getUsernameByCookie = (cookie : string) : string => {
    for(let cookieObj of cookies){
        if(cookieObj.cookie === cookie){
            return cookieObj.username;
        }
    }
    return "";
}

export const handleAuth = (req : express.Request, res : express.Response) => {
    let username = getUsernameByCookie(req.cookies.testCookieName);
    res.send({username : username});
}

export const handleGetApp = (req : express.Request, res : express.Response) => {
    res.sendFile("/public/app/app.html", { root: __dirname + "/.." });
}

export const handleLogin = async (req : express.Request, res : express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let data = await getUserEntry(username, password);
    if (data.length > 0) {
        let cookie = Math.random().toString();
        res.cookie("testCookieName", cookie);
        cookies.push({cookie : cookie, username : username});
        console.log("cookies have changed");
        console.log("cookies");
        console.log(cookies);
        console.log("---------------------------------------");
        return res.sendStatus(200);
    }
    res.sendStatus(401);
}

export const handleCreateUser = async (req : express.Request, res : express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let worked = await createUserEntry(username, password);
    if (worked) {
        return res.sendStatus(200);
    }
    res.sendStatus(400);
}

export const handleGetPayments = (req : express.Request, res : express.Response) => {
    let username = getUsernameByCookie(req.cookies.testCookieName);
    sendFinanceEntries(username, res);
}

export const handleCreatePayment = async (req : express.Request, res : express.Response) => {
    let username = getUsernameByCookie(req.cookies.testCookieName);
    await insertFinanceEntry(username, req.body);
    sendFinanceEntries(username, res);
}

export const handleUpdatePayment = async (req : express.Request, res : express.Response) => {
    await replaceFinanceEntry(
        TEST_USERNAME,
        req.body.originalName,
        req.body.editedPayment
    );
    sendFinanceEntries(TEST_USERNAME, res);
}

export const handleDeletePayment = async (req : express.Request, res : express.Response) => {
    await deleteFinanceEntry(TEST_USERNAME, req.body.name);
    sendFinanceEntries(TEST_USERNAME, res);
}

export const handleLogout = async (req : express.Request, res : express.Response) => {
    removeCookie(req.cookies.testCookieName);
    res.sendStatus(200);
}

const removeCookie = (cookie : string) => {
    for(let i = 0; i < cookies.length; i++){
        if(cookies[i].cookie === cookie){
            cookies.splice(i,1);
            return;
        }
    }
}

export const checkDeletePaymentRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body.name != null) {
        return next();
    }
    console.log("Request not possible due to invalid data format");
    sendFinanceEntries(TEST_USERNAME, res);
}

export const checkCreatePaymentRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (
        req.body.name != null &&
        req.body.organization != null &&
        req.body.amount != null &&
        req.body.selectedMonth != null &&
        req.body.rythm != null &&
        req.body.type != null
    ) {
        return next();
    }
    console.log("Request not possible due to invalid data format");
    sendFinanceEntries(TEST_USERNAME, res);
}

export const checkUpdatePaymentRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    checkCreatePaymentRequest(req, res, next);
}

const sendFinanceEntries = async (username : string, res : express.Response) => {
    await getFinanceEntries(username, (financeEntries: any) => {
        res.send(financeEntries);
    });
}