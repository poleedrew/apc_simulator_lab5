const { natsMessageHandler } = require('../messageUtil');

describe('Module messageUtil', () => {
  const fakeType = 'FACTOR_THICKNESS';
  const fakeType1 = 'FACTOR_MOISTURE';
  const fakeFactor = 0.5;
  const fakeFactor1 = 0.5;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Method natsMessageHandler for success', async () => {
    global.mongoDB = {
      upsert: jest.fn().mockReturnValueOnce(null),
    };

    natsMessageHandler(
      JSON.stringify({
        type: fakeType,
        factor: fakeFactor,
      })
    );

    expect(global.mongoDB.upsert).toHaveBeenCalledWith(fakeType, fakeFactor);
  });

  it('Method natsMessageHandler for failed', async () => {
    global.mongoDB = {
      upsert: jest.fn().mockReturnValueOnce(null),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FAKE_TYPE',
        factor: fakeFactor,
      })
    );

    expect(global.mongoDB.upsert).toBeCalledTimes(0);
  });

  it('Method natsMessageHandler for success', async () => {
    global.mongoDB = {
      upsert: jest.fn().mockReturnValueOnce(null),
    };

    natsMessageHandler(
      JSON.stringify({
        type: fakeType1,
        factor: fakeFactor1,
      })
    );

    expect(global.mongoDB.upsert).toHaveBeenCalledWith(fakeType1, fakeFactor);
  });

  it('Method natsMessageHandler for failed', async () => {
    global.mongoDB = {
      upsert: jest.fn().mockReturnValueOnce(null),
    };

    natsMessageHandler(
      JSON.stringify({
        type: 'FAKE_TYPE',
        factor: fakeFactor1,
      })
    );

    expect(global.mongoDB.upsert).toBeCalledTimes(0);
  });
});
