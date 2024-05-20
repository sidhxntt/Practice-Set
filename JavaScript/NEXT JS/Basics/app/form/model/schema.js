import mongoose from "mongoose"
import moment from "moment"

const credentials_schema = new mongoose.Schema({
    Username:{
        require: true,
        type: String,
    },
    Password:{
        require: true,
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default:  moment().format('LLL')
    },
})
const Credentials = mongoose.model("Credentials", credentials_schema)
export default Credentials