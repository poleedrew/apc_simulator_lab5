const MongoClient = require('mongodb').MongoClient;

const { mongodb } = require('config');

class MongoDB {
    constructor() {
        this.url = mongodb.url;
        this.dbName = mongodb.db;
        this.collection = mongodb.collection;
    }

    createDB(url = this.url, dbName = this.dbName) {
        MongoClient.connect(url.concat(dbName), function(err, client) {
            if (err) throw err;
            client.close();
        });
    }

    upsert(target, value, url = this.url, dbName = this.dbName, collection = this.collection) {
        MongoClient.connect(url, function(err, client) {
            if (err) throw err;
            var dbo = client.db(dbName);
            var query = { name: target };
            var newValues = { $set: { value: value } };
            var options = { upsert: true };
            dbo.collection(collection).updateOne(query, newValues, options, function(err, res) {
                if (err) throw err;
                client.close();
            });
        });
    }

    async find(target, url = this.url, dbName = this.dbName, collection = this.collection) {
        var result;
        const client = await MongoClient.connect(url).catch(err => { console.log(err); });

        if (!client) {
            return;
        }
    
        try {
            const db = client.db(dbName);
            let coll = db.collection(collection);
            let query = { name: target };
            let res = await coll.findOne(query);
    
            result = res.value;
    
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
        return result;
    }
}

MongoDB._instance = null;
MongoDB.instance = () => {
  if (!MongoDB._instance) {
    MongoDB._instance = new MongoDB();
  }
  return MongoDB._instance;
};

module.exports = MongoDB;