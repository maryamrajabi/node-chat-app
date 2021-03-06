var expect = require('expect');

var {generateMessage} = require('./message');

describe('Generate Message', () => {
    it('Should generate correct message object', () => {
        var from = 'Maryam';
        var text = 'Test Message';
        var message = generateMessage(from, text);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toEqual(expect.objectContaining({from, text}))
    })
})
