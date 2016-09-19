exports.postCreate = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var Message = app.get('db').model('Message');

    var message = new Message(Object.assign({}, req.body, { user: req.user._id }));

    message
        .save()
        .then(function (data) {
            if (data.parent) {
                return Message.findOneAndUpdate({ _id: data.parent }, { $push: { replies: data._id }});
            }

            return data;
        })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};

exports.getLoadList = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var bem = helpers.bem;
    var mongoose = app.get('db');
    var Message = mongoose.model('Message');
    var userId = req.query.userId;
    var query = {};

    if (userId) {
        if (mongoose.Types.ObjectId.isValid(userId)) {
            query.user = userId;
        } else {
            return res.status(400).json({ error: '"userId" param must be valid ObjectId' });
        }
    } else {
        query.parentId = null;
        query.user = { $in: req.user.subscribedTo };
    }

    helpers
        .checkPaginationParams(req, res, app.get('conf').db.limits.messages)
        .then(function (pagination) {
            Message
                .paginate(query, {
                    populate: [
                        {
                            path: 'parent',
                            populate: {
                                path: 'user',
                                model: 'User'
                            }
                        },
                        {
                            path: 'user'
                        },
                        {
                            path: 'replies'
                        },
                        {
                            path: 'website'
                        }
                    ],
                    offset: pagination.offset,
                    limit: pagination.limit,
                    sort: '-createdAt'
                })
                .then(function (result) {
                    if (!req.query.hasOwnProperty('html')) {
                        return res.json(result);
                    }

                    res.json({
                        total: result.total,
                        count: result.docs.length,
                        limit: result.limit,
                        offset: result.offset,
                        html: result.docs.map(function (message) {
                            return bem.applyHtml(bem.applyTree({
                                block: 'message',
                                mix: { block: 'infinite-list', elem: 'item' },
                                message: message
                            }));
                        }).join('')
                    });
                })
                .catch(function (err) {
                    handleError(req, res, err);
                });
        });
};

exports.getLoadOne = function (req, res) {
    var app = req.app;
    var helpers = app.get('helpers');
    var handleError = helpers.handleError;
    var Message = app.get('db').model('Message');

    Message
        .findOne({ _id: req.params.id })
        .populate(['replies', 'user', 'website'])
        .then(function (message) {
            if (message === null) {
                return Promise.reject(404);
            }

            return res.json(message);
        })
        .catch(function (err) {
            handleError(req, res, err);
        });
};
