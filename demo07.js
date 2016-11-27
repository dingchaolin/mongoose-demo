const mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = bluebird;
const User = mongoose.model( "ani", new mongoose.Schema({
   name:{
       type:String,
       required:true,//如果没有指定必须输入 否则不会走自定义验证器
       validate:{
           validator(value,cb){//异步验证器
               User.findOne( {name:value}, function( err ,result){
                   cb(!result);//如果验证失败 返回false
               })
           }
       }
       /*
       如果是多个验证器
       validate:[{
       validator(value,cb){},
        validator(value,cb){}
       }]
        */
   },
}));

const u1 = new User({
    name:"ccc"
});

u1.save( function( err,result ){
    console.log( result );
    if( err ){
        console.log( err );
    }else{
        var u2 = new User({name:'ccc'});
        u2.save( function( err ){
            console.log( err+"------u2" );
        });

    }

});

User.find({},function(err,result){
    console.log( result )
})

