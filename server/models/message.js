var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var MessageSchema = new Schema({
    parentId: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}, {
    timestamps: true,
    toObject: { getters: true, virtuals: true }
});

MessageSchema.virtual('createdAtAgo').get(function () {
    return moment(this._id.getTimestamp()).fromNow();
});

MessageSchema.plugin(mongoosePaginate);
mongoose.model('Message', MessageSchema);

