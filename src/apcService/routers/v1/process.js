const MongoClient = require('mongodb').MongoClient;

const { mongodb } = require('config');

const express = require('express');

const { defaultStrategy, sharonStrategy , filetStrategy} = require('../../utilities/strategyUtil');

const logger = require('../../../utilities/logger')('APC_SERVICE');

const router = express.Router();

router.post('/api/v1/process', async (req, res) => {
  const { id, type, thickness, moisture } = req.body;

  const handle = logger.begin({
    id,
    type,
    thickness,
    moisture,
  });

  try {
    var tFactor, mFactor;
    
    MongoClient.connect(mongodb.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mongodb.db);
      dbo.collection(mongodb.collection).findOne({name: "THICKNESS"}, function(err, result) {
        if (err) throw err;
        tFactor = result.value;
        db.close();
      });
    });

    MongoClient.connect(mongodb.url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(mongodb.db);
      dbo.collection(mongodb.collection).findOne({name: "MOISTURE"}, function(err, result) {
        if (err) throw err;
        mFactor = result.value;
        db.close();
      });
    });

    let data = null;


    if (type === 'SHARON') {
      
      data = sharonStrategy(thickness, moisture, tFactor);
    } else if(type === 'FILET'){
      data = filetStrategy(thickness, moisture, mFactor);
    } else {
      data = defaultStrategy(thickness, moisture, mFactor);
    }
    logger.end(handle, { tFactor, mFactor, ...data }, `process (${id}) of APC has completed`);

    // logger.end(handle, { tFactor, mFactor, ...data }, `process (${id}) of APC has completed`);

    return res.status(200).send({ ok: true, data: { ...data, tFactor, mFactor } });
  } catch (err) {
    logger.fail(handle, { tFactor, mFactor }, err.message);

    return res.status(500).send({ ok: false, message: err.message });
  }
});

module.exports = router;
