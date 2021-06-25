import { Collection, MongoClient } from "mongodb";
const URI = "mongodb://127.0.0.1:27017";
const DATABASE = "lightFinanceOverviewDb";
const COLLECTION = "lightFinanceOverview";

// Create a new MongoClient
const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export async function run(callback?: Function) {
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

export async function updateFinanceEntry(filter: object, updatedEntry: object) {
    let updateDoc = {
        $inc: updatedEntry
    }
    await run(async (lightFinanceOverview: Collection<any>) => {
        await lightFinanceOverview.updateMany(filter, updateDoc);
    })
}

export async function getFinanceEntries(callback : Function) {
    let data = null;
    await run(async (lightFinanceOverview: Collection<any>) => {
        data = await lightFinanceOverview.find().toArray();
    });
    callback(data);
}
