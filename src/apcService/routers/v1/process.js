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
    var tFactor = await global.mongoDB.find("FACTOR_THICKNESS");
    var mFactor = await global.mongoDB.find("FACTOR_MOISTURE");

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
