modules.define('validator', ['validator__username'], function (provide, username) {
    provide({
        validate: validate,
        rules: {
            username: username
        }
    });

    function validate(value, rules) {
        var errors = [];
        var returnValue = {};
        var validationResult;
        var errorsLength;

        if (Array.isArray(rules)) {
            rules.forEach(function (rule) {
                validationResult = _validateRule(value, rule);

                if (!validationResult.isValid) {
                    errors.push(validationResult.message);
                }
            });
        } else {
            validationResult = _validateRule(value, rules);

            if (!validationResult.isValid) {
                errors.push(validationResult.message);
            }
        }

        errorsLength = errors.length;
        returnValue.isValid = !errorsLength;

        if (errorsLength) {
            returnValue.errors = errors;
        }

        return returnValue;
    }

    function _validateRule(value, rule) {
        var result = rule.validator(value);
        var returnValue = { isValid: result };

        if (!result) {
            returnValue.message = rule.message;
        }

        return returnValue;
    }
});
