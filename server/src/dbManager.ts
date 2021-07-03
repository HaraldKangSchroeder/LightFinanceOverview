/*
general ressources about the usage of mongodb in nodejs -
https://docs.mongodb.com/drivers/node/current/
especially "usage examples"
*/

import { Collection, MongoClient, Double } from "mongodb";
import schema from "./dbSchema";
const URI = "mongodb://127.0.0.1:27017";
const DATABASE = "lightFinanceOverviewDb";
const COLLECTION = "lightFinanceOverview";

init();

async function init() {
    var client = new MongoClient(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const database = client.db(DATABASE);
        // create collection with schema - https://docs.mongodb.com/manual/core/schema-validation/
        await database.createCollection(COLLECTION, schema);
        console.log("Init : Connected successfully to server");
    } catch (e) {
        console.log(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        console.log("Init : disconnect");
        await client.close();
        // create index on attribute name to secure that no duplicate payments exist
        run(async (collection: Collection<any>) => {
            await collection.createIndex({ "username": "text" }, { unique: true });
        })
    }
}

export async function run(callback?: Function) : Promise<boolean>{
    // client variable needs to be reinstantiated again - src : https://stackoverflow.com/questions/59942238/mongoerror-topology-is-closed-please-connect-despite-established-database-conn
    var client = new MongoClient(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    let worked = true;
    try {
        await client.connect();
        const database = client.db(DATABASE);
        const lightFinanceOverview = database.collection(COLLECTION);
        console.log("Connected successfully to server");
        if (callback) {
            await callback(lightFinanceOverview);
        }
    } catch (e) {
        worked = false;
        console.log(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        console.log("disconnect");
        await client.close();
        return worked;
    }
}

export async function createUserEntry(username : string, password : string){
    return await run(async (lightFinanceOverview : Collection<any>) => {
        await lightFinanceOverview.insertOne({username : username, password : password, data : []});
    });
}

export async function getUserEntry(username : string, password : string){
    let data : any = null;
    await run(async (lightFinanceOverview : Collection<any>) => {
        data = await lightFinanceOverview.find({username : username, password : password}).toArray();
    });
    console.log("-----------------------------------------------")
    console.log(data);
    console.log("-----------------------------------------------")
    return data;
}

export async function insertFinanceEntry(username : string, entry: any) {
    entry.amount = new Double(entry.amount);
    await run(async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.updateMany({username : username},{ "$addToSet" : {data : entry}});
    })
}

export async function deleteFinanceEntry(username : string, name: string) {
    await run(async (lightFinanceOverview: Collection<any>) => {
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
    await run(async (lightFinanceOverview: Collection<any>) => {
        data = await lightFinanceOverview.find({username : username}).toArray();
    });
    let entries = data[0].data.sort((a : any,b : any) => {
        a.name > b.name;
    })
    callback(entries);
}
