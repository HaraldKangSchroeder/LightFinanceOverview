/*
general ressources about the usage of mongodb in nodejs -
https://docs.mongodb.com/drivers/node/current/
especially "usage examples"
*/

import { Collection, MongoClient, Double } from "mongodb";
import {schemaLightFinanceOverview, schemaSession} from "./dbSchema";
import bcrypt from "bcrypt";

// const URL = "mongodb://127.0.0.1:27017";
const URL = "mongodb://mongo:27017";
const DATABASE = "lightFinanceOverviewDb";
const COLLECTION_LIGHT_FINANCE_OVERVIEW = "lightFinanceOverview";
const COLLECTION_SESSION = "session";

init();

async function init() {
    var client = new MongoClient(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const database = client.db(DATABASE);
        // create collection with schema - https://docs.mongodb.com/manual/core/schema-validation/
        await database.createCollection(COLLECTION_LIGHT_FINANCE_OVERVIEW, schemaLightFinanceOverview);
        await database.createCollection(COLLECTION_SESSION, schemaSession);
    } catch (e) {
        console.log(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        // create index on attribute name to secure that no duplicate payments exist
        await run(COLLECTION_LIGHT_FINANCE_OVERVIEW,async (collection: Collection<any>) => {
            await collection.createIndex({ "username": 1 }, { unique: true });
        })
        await run(COLLECTION_SESSION,async (collection: Collection<any>) => {
            await collection.createIndex({ "sessionId": 1 }, { unique: true});
        })
        await run(COLLECTION_SESSION,async (collection: Collection<any>) => {
            await collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds : 10});
        })
    }
}

export async function run(collection : string, callback?: Function) : Promise<boolean>{
    // client variable needs to be reinstantiated again - src : https://stackoverflow.com/questions/59942238/mongoerror-topology-is-closed-please-connect-despite-established-database-conn
    var client = new MongoClient(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    let worked = true;
    try {
        await client.connect();
        const database = client.db(DATABASE);
        const lightFinanceOverview = database.collection(collection);
        if (callback) {
            await callback(lightFinanceOverview);
        }
    } catch (e) {
        worked = false;
        console.log(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return worked;
    }
}


export async function createSessionEntry(username : string, sessionId : string){
    return await run(COLLECTION_SESSION,async (session : Collection<any>) => {
        await session.insertOne({username : username, sessionId : sessionId, createdAt : new Date()});
    });
}

export async function deleteSessionEntry(sessionId : string){
    await run(COLLECTION_SESSION,async (session: Collection<any>) => {
        await session.deleteMany(
            {"sessionId" : sessionId}
        );
    });
}

export async function getSessionEntry(sessionId : string) : Promise<{username : string, sessionId : string}> {
    let data : any = null;
    await run(COLLECTION_SESSION,async (session : Collection<any>) => {
        data = await session.find({sessionId : sessionId}).toArray();
    });
    if(data.length === 0) return null;
    return data[0];
}


export async function createUserEntry(username : string, password : string){
    let hashedPassword = await bcrypt.hash(password, 10);
    return await run(COLLECTION_LIGHT_FINANCE_OVERVIEW,async (lightFinanceOverview : Collection<any>) => {
        await lightFinanceOverview.insertOne({username : username, password : hashedPassword, data : []});
    });
}

export async function getUserEntry(username : string, password : string){
    let data : any = null;
    await run(COLLECTION_LIGHT_FINANCE_OVERVIEW,async (lightFinanceOverview : Collection<any>) => {
        data = await lightFinanceOverview.find({username : username}).toArray();
    });
    if(data.length === 0) return null;
    let userEntry = data[0];
    try{
        if(await bcrypt.compare(password, userEntry.password)){
            return userEntry;
        }
    }
    catch (e) {
        return null;
    }
    return null;
}

export async function insertFinanceEntry(username : string, entry: any) {
    entry.amount = new Double(entry.amount);
    await run(COLLECTION_LIGHT_FINANCE_OVERVIEW,async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.updateMany({username : username},{ "$addToSet" : {data : entry}});
    })
}

export async function deleteFinanceEntry(username : string, name: string) {
    await run(COLLECTION_LIGHT_FINANCE_OVERVIEW,async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.updateMany(
            { username : username },
            { "$pull" : { data : {name : name}}}
        )
    });
}

export async function replaceFinanceEntry(username: string, originalName : string, updatedEntry: any) {
    await deleteFinanceEntry(username, originalName);
    await insertFinanceEntry(username, updatedEntry);
}

export async function getFinanceEntries(username : string, callback: Function) {
    let data : any = null;
    await run(COLLECTION_LIGHT_FINANCE_OVERVIEW,async (lightFinanceOverview: Collection<any>) => {
        data = await lightFinanceOverview.find({username : username}).toArray();
    });
    let entries = data[0].data.sort((a : any,b : any) => {
        a.name > b.name;
    })
    callback(entries);
}
