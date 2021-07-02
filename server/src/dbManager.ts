/*
general ressources about the usage of mongodb in nodejs -
https://docs.mongodb.com/drivers/node/current/
especially "usage examples"
*/

import { Collection, MongoClient } from "mongodb";
const URI = "mongodb://127.0.0.1:27017";
const DATABASE = "lightFinanceOverviewDb";
const COLLECTION = "lightFinanceOverview";


export async function run(callback?: Function) {
    // client variable needs to be reinstantiated again - src : https://stackoverflow.com/questions/59942238/mongoerror-topology-is-closed-please-connect-despite-established-database-conn
    var client = new MongoClient(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        const database = client.db(DATABASE);
        const lightFinanceOverview = database.collection(COLLECTION);
        console.log("Connected successfully to server");
        if (callback) {
            await callback(lightFinanceOverview);
        }
    } catch (e) {
        console.log(e);
    }
    finally {
        // Ensures that the client will close when you finish/error
        console.log("disconnect");
        await client.close();
    }
}

export async function insertFinanceEntry(entry: object) {
    await run(async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.insertOne(entry);
    })
}

export async function deleteFinanceEntry(query: object) {
    await run(async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.deleteMany(query);
    });
}

export async function replaceFinanceEntry(filter: object, updatedEntry: object) {
    await run(async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.replaceOne(filter, updatedEntry);
    })
}

export async function getFinanceEntries(callback : Function) {
    let data = null;
    await run(async (lightFinanceOverview: Collection<any>) => {
        data = await lightFinanceOverview.find().toArray();
    });
    callback(data);
}
