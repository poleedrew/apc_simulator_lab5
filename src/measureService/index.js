const { cron, domainService } = require('config');

const axios = require('axios');
const uuidv4 = require('uuid').v4;

const types = ['SHARON', 'RIB_EYE', 'FILET', 'SIRLION']; // 沙朗 肋眼 菲力

const run = async () => {
  const handler = setInterval(async () => {
    const index = Math.floor((Math.random() * 10) % types.length);
    const id = uuidv4();

    const payload = {
      id,
      type: types[index],
      thickness: (Math.random() + 1.8).toFixed(2),
      moisture: (Math.random()+6).toFixed(2),
    };

    const { data } = await axios.post(`${domainService.apc.endpoint}/api/v1/process`, payload);
  }, cron.measurePeriod);

  return handler;
};

module.exports = {
  run,
};
