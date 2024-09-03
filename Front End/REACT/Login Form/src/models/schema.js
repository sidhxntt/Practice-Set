import mongoose from "mongoose"
import moment from "moment"

const credentials_schema = new mongoose.Schema({
    username:{
        require: true,
        type: String,
    },
    password:{
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