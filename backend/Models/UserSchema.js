import mongoose from'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
})

const UserModel = mongoose.model('users',userSchema)
export default UserModel;