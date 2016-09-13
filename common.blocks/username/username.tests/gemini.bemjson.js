module.exports = require('../../../.enb/gemini-wrap')([
    { tag: 'h2', content: 'plain' },
    { tag: 'p', content: [
        {
            block: 'username',
            url: 'URL',
            content: 'username',
            cls: 'gemini-test-username'
        }
    ]}
]);
