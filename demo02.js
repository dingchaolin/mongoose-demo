/**
 * Created by Administrator on 2016/11/27 0027.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const ObjSchema = new mongoose.Schema({
    str: String,
    num : Number,
    bool: Boolean,
    arr: Array,//[]
    arr2:[Date],//内部都会转化为时间类型
    arr3:[String],//内部全都是字符串类型
    time:Date,

    buf: Buffer,
    mxo: mongoose.Schema.Types.Mixed,//{}
    iod: mongoose.Schema.Types.ObjectId
});
const Obj = mongoose.model('obj', ObjSchema );
const o = new Obj( {
    time:new Date(),
    arr3:[123,'lei',new Date],
    buf: new Buffer([22,33,44]),
    iod: new  mongoose.Types.ObjectId()
});
o.save( function( err ){
    console.log( err );
});