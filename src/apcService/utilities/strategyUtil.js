

const defaultStrategy = (thickness, moisture, mFactor) => {
  if(thickness < 2){
    return {
      mes: 'TOOOO SMALL'
    };
  }
  const period = (moisture * mFactor).toFixed(2);

  return {
    period,
    temperature: 100,
  };
};

const sharonStrategy = (thickness, moisture, tFactor) => {
  if(thickness < 2){
    return {
      mes: 'TOOOO SMALL'
    };
  }

  const temperature = (thickness * tFactor).toFixed(2);

  return {
    period: 20,
    temperature,
  };
};

const filetStrategy = (thickness, moisture, mFactor) => {
  if(thickness < 2){
    return {
      mes: 'TOOOO SMALL'
    };
  }

  const period = (moisture * mFactor).toFixed(2);

  return {
    period,
    temperature: 200,
  };
};



module.exports = {
  defaultStrategy,
  sharonStrategy,
  filetStrategy,
};
