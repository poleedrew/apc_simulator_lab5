const { sharonStrategy, defaultStrategy , filetStrategy} = require('../strategyUtil');

describe('Module strategyUtil', () => {
  const fakeThickness = 2.0;
  const fakeSmallThickness = 1.9;
  const fakeMoisture = 0.65;
  const fakeTFactor = 0.5;
  const fakeMFactor = 0.5;

  it('Method sharonStrategy', () => {
    const res = sharonStrategy(fakeThickness, fakeMoisture, fakeTFactor);

    expect(res).toStrictEqual({
      period: 20,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method filetStrategy', () => {
    const res = filetStrategy(fakeThickness, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: 200,
    });
  });

  it('Method defaultStrategy', () => {
    const res = defaultStrategy(fakeThickness, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: 100,
    });
  });

  it('Small steak test', () => {
    const res = defaultStrategy(fakeSmallThickness, fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      mes: 'TOOOO SMALL'
    });
  });
});
