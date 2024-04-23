import mongoose from 'mongoose';

const { Schema } = mongoose;

const expressTestingSchema = new Schema({
    name: String,
    age: Number,
    relationship_status: Boolean,
    sex: String
});

const ExpressTestingSchema = mongoose.model('ExpressTestingSchema', expressTestingSchema);

export default ExpressTestingSchema;
