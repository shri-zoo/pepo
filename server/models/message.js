var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var MessageSchema = new Schema({
        parentId: Schema.Types.ObjectId,
        userId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        replies: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
    },
    {
        timestamps: true
    }
);

MessageSchema.plugin(mongoosePaginate);
mongoose.model('Message', MessageSchema);

