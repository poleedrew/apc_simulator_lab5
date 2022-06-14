const { Parameter } = require('../parameter');

const { sharonStrategy, defaultStrategy , filetStrategy, sirlionStrategy, getStrategy} = require('../strategyUtil');

describe('Module strategyUtil', () => {
  const fakeThickness = 2.0;
  const fakeSmallThickness = 1.9;
  const fakeMoisture = 0.65;
  const fakeTFactor = 0.5;
  const fakeMFactor = 0.5;
  const fakeType = 'Filet';

  it('Class Parameter', () => {
    const res = new Parameter(fakeThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    expect(res.mFactor).toStrictEqual(fakeMFactor);
    expect(res.tFactor).toStrictEqual(fakeTFactor);
    expect(res.moisture).toStrictEqual(fakeMoisture);
    expect(res.thickness).toStrictEqual(fakeThickness);
    expect(res.type).toStrictEqual(fakeType);
  });

  it('Method sharonStrategy', () => {
    const fakepara = new Parameter(fakeThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    const res = new sharonStrategy().calculate(fakepara);

    expect(res).toStrictEqual({
      period: '20',
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method filetStrategy', () => {
    const fakepara = new Parameter(fakeThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    const res = new filetStrategy().calculate(fakepara);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: '200',
    });
  });

  it('Method sirlionStrategy', () => {
    const fakepara = new Parameter(fakeThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    const res = new sirlionStrategy().calculate(fakepara);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method defaultStrategy', () => {
    const fakepara = new Parameter(fakeThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    const res = new defaultStrategy().calculate(fakepara);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: '100',
    });
  });

  it('Small steak test', () => {
    a = 'TOOOO SMALL'
    const fakepara = new Parameter(fakeSmallThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    const res = new defaultStrategy().calculate(fakepara);
    const res1 = new sirlionStrategy().calculate(fakepara);
    const res2 = new filetStrategy().calculate(fakepara);
    const res3 = new sharonStrategy().calculate(fakepara);

    expect(res).toStrictEqual({
      mes: a
    });
    expect(res1).toStrictEqual({
      mes: a
    });
    expect(res2).toStrictEqual({
      mes: a
    });
    expect(res3).toStrictEqual({
      mes: a
    });
  });

  it('Method getStrategy', () => {
    const fakepara = new Parameter(fakeThickness, fakeMoisture, fakeTFactor, fakeMFactor, fakeType);
    var fakeType = 'SHARON'
    var res = getStrategy(fakeType);
    expect(res).toStrictEqual(new sharonStrategy());
    
    fakeType = 'RIB_EYE'
    res = getStrategy(fakeType);
    expect(res).toStrictEqual(new defaultStrategy());

    fakeType = 'SIRLION'
    res = getStrategy(fakeType);
    expect(res).toStrictEqual(new sirlionStrategy());

    fakeType = 'FILET'
    res = getStrategy(fakeType);
    expect(res).toStrictEqual(new filetStrategy());

  });
  
});
