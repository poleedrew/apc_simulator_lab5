const defaultStrategy = (thickness, tFactor, moisture, mFactor) => {
  if(thickness < 2){
    return {
      mes: 'TOOOO SMALL'
    };
  }
  const period = (moisture * mFactor).toFixed(2);

  return {
    period: period,
    temperature: 100,
  };
};

const sharonStrategy = (thickness, tFactor, moisture, mFactor) => {
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

const sirlionStrategy = (thickness, tFactor, moisture, mFactor) => {
  if(thickness < 2){
    return {
      mes: 'TOOOO SMALL'
    };
  }
  const temperature = (thickness * tFactor).toFixed(2);
  const period = (moisture * mFactor).toFixed(2);
  
  return {
    period,
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

const getStrategy = (type) => {
    if(type === 'SHARON')
      return sharonStrategy;
    else if( type === 'RIB_EYE')
      return defaultStrategy;
    else if( type === 'SIRLION')
      return sirlionStrategy;
    else
      return filetStrategy;
}

module.exports = {
  defaultStrategy,
  sharonStrategy,
  sirlionStrategy,
  filetStrategy,
  getStrategy,
};