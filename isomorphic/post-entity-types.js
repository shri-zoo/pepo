module.exports = [
    {
        name: 'mention',
        regexp: /@\w+/g
    },
    {
        name: 'link',
        regexp: /(\bhttps?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
    }
];
