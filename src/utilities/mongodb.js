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

    find(target, url = this.url, dbName = this.dbName, collection = this.collection) {
        var result;
        MongoClient.connect(url, function(err, client) {
            if (err) throw err;
            var dbo = client.db(dbName);
            dbo.collection(collection).findOne({name: target}, function(err, res) {
                if (err) throw err;
                result = res.value;
                client.close();
            });
        });
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