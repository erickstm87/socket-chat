const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'tomas';
    var text = 'some message';
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'tom';
    var lat = 4;
    var long = 5;
    var url = 'https://www.google.com/maps?q=4,5';
    var latlong = generateLocationMessage(from, lat, long);

    expect(latlong.createdAt).toBeA('number');
    expect(latlong).toInclude({from, url});
    expect(latlong.url).toBe(url)
  });
});
