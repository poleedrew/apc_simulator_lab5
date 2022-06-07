const { sharonStrategy, defaultStrategy , filetStrategy, sirlionStrategy, getStrategy} = require('../strategyUtil');

describe('Module strategyUtil', () => {
  const fakeThickness = 2.0;
  const fakeSmallThickness = 1.9;
  const fakeMoisture = 0.65;
  const fakeTFactor = 0.5;
  const fakeMFactor = 0.5;

  it('Method sharonStrategy', () => {
    const res = sharonStrategy(fakeThickness, fakeTFactor, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: 20,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method filetStrategy', () => {
    const res = filetStrategy(fakeThickness, fakeTFactor, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: 200,
    });
  });

  it('Method sirlionStrategy', () => {
    const res = sirlionStrategy(fakeThickness, fakeTFactor, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method defaultStrategy', () => {
    const res = defaultStrategy(fakeThickness, fakeTFactor, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: 100,
    });
  });

  it('Small steak test', () => {
    const res = defaultStrategy(fakeSmallThickness, fakeTFactor, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      mes: 'TOOOO SMALL'
    });
  });

  it('Method getStrategy', () => {
    var fakeType = 'SHARON'
    var res = getStrategy(fakeType);
    expect(res).toStrictEqual(sharonStrategy);
    
    fakeType = 'RIB_EYE'
    res = getStrategy(fakeType);
    expect(res).toStrictEqual(defaultStrategy);

    fakeType = 'SIRLION'
    res = getStrategy(fakeType);
    expect(res).toStrictEqual(sirlionStrategy);

    fakeType = 'FILET'
    res = getStrategy(fakeType);
    expect(res).toStrictEqual(filetStrategy);

  });
  
});
