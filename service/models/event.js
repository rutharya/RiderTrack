var eventSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    eventname: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    eventimage:{
        type:Date,
        required:true,
        trim:true
    },
    eventdescription: {
        type: String,
        required: true,
        trim: true
    },
    eventdate: {
        type: Date,
        required: true,
        trim: true
    },
    eventlocation: {
        type: String,
        required: true,
        trim: true
    },
    eventtime: {
        type: Date,
        required: true,
        trim: true
    },
    track: {
        elevation: Number,
        length: Number,
        difficulty: String
    },
    eventRiders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rider'
        }
    ]
});
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;