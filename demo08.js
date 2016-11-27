const mongoose = require('mongoose');
var bluebird = require('bluebird');
mongoose.connect("mongodb://localhost/test");
mongoose.Promise = bluebird;
const User = mongoose.model( "ani", new mongoose.Schema({
   name:{
       type:String,
       enum:{values:["aaa","bbb"],message:"没在枚举中...."},
       required:[true,"name 必须输入"],//如果没有指定必须输入 否则不会走自定义验证器，第二个是错误信息
       validate:{//验证器执行的前提是required指定为true
           validator(value,cb){
               setTimeout(function(){
                   cb(false);// 验证失败
               })
           },
           message:"就是错误的，怎么的！！！！：{PATH}-{VALUE}"//path 和 name 会出现在错误信息中
       }
   },
}));

//const  u = new User(/*{name:"dddddd"}*/);//required 验证失败信息会出现
//const  u = new User({name:"dddddd"});//没在枚举中错误信息会出现
//其他类型的验证器的自定义的错误信息都是类似的做法
const  u = new User({name:"aaa"});//验证函数的错误信息会出现
// 方式1
//同步方式错误信息 同步的验证方式只能得到同步的验证信息 在cb中返回的错误信息是异步返回的所以得不到
//const err = u.validateSync();
//console.log( err );
//方式2
// 异步方式获取错误信息 同步 异步错误信息都可以获取  异步的验证器 可以使用这种方式
u.validate( function(err){//既能得到同步的错误信息 又能得到异步的错误信息
    //const {path,value,message} = err.errors.name;
    console.log("--------------------------");
    console.log(err.errors.name);
    console.log("--------------------------");
    /*
    const errors = err.errors;
    const keys = Object.keys(errors);//可以得到所有出错字段的信息
    if( err && err.errors ){
    //说明是验证器产生的 如果不是这样 就可能不是验证器产生 而是底层的某些错误
    }
     */
    /*
     { [ValidatorError: Validator failed for path `name` with value `dddddd`]
     message: 'Validator failed for path `name` with value `dddddd`',
     name: 'ValidatorError',
     properties:
     { type: 'user defined',
     message: undefined,
     validator: [Function: validator],
     path: 'name',
     value: 'dddddd' },
     kind: 'user defined',
     path: 'name',
     value: 'dddddd' }
     */
});
//方式3
//u.save(function(err){//也可以得到 异步 同步 都可以得到
//    console.log(err);
//})

//方式4
//const promise = u.save();
//promise.catch( err=>console.log(err) );


//方式5
//只有 runValidators 设置为true的时候 才能正确获取验证错误信息
//User.update({},{name:'dddddd'},{runValidators:true},function(err){
//    console.log( err );
//});
// 3 4 5 可能底层的网络 错误信息等等 不一定是验证的错误的信息
