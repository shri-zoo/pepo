gemini.suite('username', function (suite) {
    suite
        .setUrl('common.tests/username/gemini/gemini.html')
        .setCaptureElements('.gemini-test-username')
        .capture('plain');
});
