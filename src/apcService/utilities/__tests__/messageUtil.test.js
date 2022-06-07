const { natsMessageHandler } = require('../messageUtil');

describe('Module messageUtil', () => {
  const fakeType = 'FACTOR_THICKNESS';
  const fakeFactor = 0.5;

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
});
