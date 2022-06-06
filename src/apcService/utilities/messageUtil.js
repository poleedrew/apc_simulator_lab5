const MongoClient = require('mongodb').MongoClient;

const { mongodb } = require('config');

const logger = require('../../utilities/logger')('APC_SERVICE');

const natsMessageHandler = (message) => {
  const msgObj = JSON.parse(message);
  if (msgObj.type === 'FACTOR_THICKNESS') {
    MongoClient.connect(mongodb.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mongodb.db);
      var query = { name: "THICKNESS" };
      var newValues = { $set: { value: msgObj.factor } };
      dbo.collection(mongodb.collection).updateOne(query, newValues, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });

    logger.info(`receive thickness factor: ${msgObj.factor}`);
  } else if (msgObj.type === 'FACTOR_MOISTURE') {
    MongoClient.connect(mongodb.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mongodb.db);
      var query = { name: "MOISTURE" };
      var newValues = { $set: { value: msgObj.factor } };
      dbo.collection(mongodb.collection).updateOne(query, newValues, function(err, res) {
        if (err) throw err;
        db.close();
      });
    });

    logger.info(`receive moisture factor: ${msgObj.factor}`);
  }
};

module.exports = {
  natsMessageHandler,
};
