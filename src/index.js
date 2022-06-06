const dotenv = require('dotenv');
dotenv.config();

const { mongodb, nats } = require('config');

const MongoClient = require('mongodb').MongoClient;

const NodeCache = require('node-cache');

const logger = require('./utilities/logger')('INDEX');
const NATSClient = require('./utilities/natsClient');

const measureService = require('./measureService');
const apcService = require('./apcService');
const paramsService = require('./paramsService');

let measureHandle = null;
let paramsHandle = null;

const initGlobalNATSClient = async () => {
  // instantiate the nats client
  global.natsClient = NATSClient.instance();

  const connection = process.env.NATS_SERVICE_CONNECTION || nats.connection;

  logger.info(`nats-server connection: ${connection}`);

  await global.natsClient.connect(nats.name, [connection]);

  // clear stream and consumer by existence
  let stream = await global.natsClient.getStream(nats.stream);
  if (stream) {
    let consumer = await global.natsClient.getConsumer(nats.stream, `${nats.consumer}_params`);
    if (consumer) {
      await global.natsClient.deleteConsumer(nats.stream, `${nats.consumer}_params`);
    }
    await global.natsClient.deleteStream(nats.stream);
  }

  // add the stream
  await global.natsClient.addStream(nats.stream, [`${nats.subject}.>`]);

  // add the consumer
  await global.natsClient.addConsumer(nats.stream, `${nats.subject}.params`, `${nats.consumer}_params`);
};

const initMongoDB = async () => {  
  MongoClient.connect(mongodb.url.concat(mongodb.db), function(err, db) {
    if (err) throw err;
    db.close();
  });

  MongoClient.connect(mongodb.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mongodb.db);
    var query = { name: "THICKNESS" };
    var newValues = { $set: { value: 0.5 } };
    var options = { upsert: true };
    dbo.collection(mongodb.collection).updateOne(query, newValues, options, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });

  MongoClient.connect(mongodb.url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mongodb.db);
    var query = { name: "MOISTURE" };
    var newValues = { $set: { value: 0.5 } };
    var options = { upsert: true };
    dbo.collection(mongodb.collection).updateOne(query, newValues, options, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
};

const run = async () => {
  // initialize the global resource
  await initGlobalNATSClient();
  await initMongoDB();

  // run all services
  await apcService.run();
  paramsHandle = await paramsService.run();
  measureHandle = await measureService.run();
};

run();

process.on('SIGINT', async () => {
  if (global.cache) {
    await global.cache.close();
    global.cache = null;
  }

  if (global.natsClient) {
    await global.natsClient.disconnect();
    global.natsClient = null;
  }

  if (paramsHandle) {
    clearInterval(paramsHandle);
  }

  if (measureHandle) {
    clearInterval(measureHandle);
  }

  process.exit();
});
