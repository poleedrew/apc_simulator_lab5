module.exports = {
  cron: {
    measurePeriod: 10000,
    paramsPeriod: 15000,
  },
  mongodb: {
    db: 'controlParameter',
    collection: 'factor',
    url: 'mongodb://localhost:27017/',
    // url: 'mongodb://mongodb/',
  },
  nats: {
    connection: '127.0.0.1:4222',
    // connection: 'nats-server',
    name: 'testbed',
    stream: 'testbed_stream',
    subject: 'testbed.subject',
    consumer: 'testbed_consumer',
  },
  domainService: {
    apc: {
      endpoint: 'http://127.0.0.1:3031',
      port: 3031,
    },
    params: {
      endpoint: 'http://127.0.0.1:3032',
      port: 3032,
    },
  },
};
