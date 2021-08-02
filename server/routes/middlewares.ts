import express from "express";
import { createSessionEntry, createUserEntry, deleteFinanceEntry, deleteSessionEntry, getFinanceEntries, getSessionEntry, getUserEntry, insertFinanceEntry, replaceFinanceEntry } from "../src/dbManager";

export const verifyCookie = async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    let sessionId : string = req.cookies?.sessionId;
    if(!sessionId) return res.sendStatus(403);
    let sessionEntry = await getSessionEntry(sessionId);
    if(!sessionEntry) return res.sendStatus(403);
    return next();
}

const getUsernameBySessionId = async (sessionId : string) : Promise<string> => {
    let {username} = await getSessionEntry(sessionId);
    return username;
}

export const handleAuth = async (req : express.Request, res : express.Response) => {
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    res.send({username : username});
}

export const handleGetApp = (req : express.Request, res : express.Response) => {
    res.sendFile("/public/build/index.html", { root: __dirname + "/.." });
}

export const handleLogin = async (req : express.Request, res : express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let userEntry = await getUserEntry(username, password);
    if (userEntry) {
        let sessionId = Math.random().toString();
        await createSessionEntry(username, sessionId);
        res.cookie("sessionId", sessionId);
        return res.sendStatus(200);
    }
    res.sendStatus(401);
}

export const handleCreateUser = async (req : express.Request, res : express.Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let worked = await createUserEntry(username, password);
    if (worked) {
        let sessionId = Math.random().toString();
        await createSessionEntry(username, sessionId);
        res.cookie("sessionId", sessionId);
        return res.sendStatus(200);
    }
    res.sendStatus(400);
}

export const handleGetPayments = async (req : express.Request, res : express.Response) => {
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    sendFinanceEntries(username, res);
}

export const handleCreatePayment = async (req : express.Request, res : express.Response) => {
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    await insertFinanceEntry(username, req.body);
    sendFinanceEntries(username, res);
}

export const handleUpdatePayment = async (req : express.Request, res : express.Response) => {
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    await replaceFinanceEntry(
        username,
        req.body.originalName,
        req.body.editedPayment
    );
    sendFinanceEntries(username, res);
}

export const handleDeletePayment = async (req : express.Request, res : express.Response) => {
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    await deleteFinanceEntry(username, req.body.name);
    sendFinanceEntries(username, res);
}

export const handleLogout = async (req : express.Request, res : express.Response) => {
    await deleteSessionEntry(req.cookies.sessionId);
    res.sendStatus(200);
}

export const checkDeletePaymentRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body.name != null) {
        return next();
    }
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    sendFinanceEntries(username, res);
}

export const checkCreatePaymentRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    let username = await getUsernameBySessionId(req.cookies.sessionId);
    sendFinanceEntries(username, res);
}

export const checkUpdatePaymentRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    checkCreatePaymentRequest(req, res, next);
}

const sendFinanceEntries = async (username : string, res : express.Response) => {
    await getFinanceEntries(username, (financeEntries: any) => {
        res.send(financeEntries);
    });
}