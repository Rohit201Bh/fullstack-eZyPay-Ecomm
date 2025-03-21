import mongoose from'mongoose';
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const PaymentModel = mongoose.model('payment',PaymentSchema)
export default PaymentModel;