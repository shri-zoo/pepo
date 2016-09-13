module.exports = function(bemjson) {
    return {
        block: 'page',
        head: [
            { elem: 'css', url: 'gemini.css' },
            { elem: 'js', url: 'gemini.js' }
        ],
        content: bemjson
    };
}
