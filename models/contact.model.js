import mongoose, { mongo } from "mongoose";

const contactSchema = new mongoose.Schema({
    fullname:{type:String, required:true},
    companyName:{type:String, required:false},
    email:{type:String, required:true},
    contactNumber:{type:String, required:true},
    message:{type:String, required:true}
},
{timestamps:true});
export default mongoose.model("Contact", contactSchema);