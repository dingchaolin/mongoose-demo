const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");
const obj = mongoose.model( "obj", new mongoose.Schema({
    str:{
        type: String,
        get(v){
            return "my name is " + v;
        },
        set(v){
            return 123+v;
        }
    },
    str2:{
        type:String,
        select:false
    },
    face:{
        type:Buffer,
        select:false//返回结果集的时候 不返回这个字段
    },
    loginname:{
        type:String,
        required:true
    }
}));

const O = new obj( { str:'dcl',str2:'ys',loginname:"yuyy"} );
console.log( O.str2 );//ys
O.save( function( err ){
    console.log( err );
    obj.findOne({},function( err, result){
        console.log( result );//{ str: '123dcl', _id: 583a8e1a011b55203c035d5d, __v: 0 }
        //结果中没有str2
    })
});

