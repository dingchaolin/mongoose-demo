const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:7
    },

});

const User = mongoose.model( 'User',userSchema );

const user = new User({name:"dcl"});
User.remove({}).then( function(){
});
//-------save
//const promise = user.save();
//promise.then( u=>console.log( u ) ).catch( err=>console.log( err ) );

//user.save( function( err, u ){
//    console.log( err );
//});

//-----create static 方法
//创建的时候 如果许多对象需要创建 符合条件的会正常创建 不符合条件的会抛出异常
//User.create([{name:'dcl'},{name:'ys'}]).then( function(u1,u2){
//    console.log( u1,u2);
//}).catch( err=>console.log( err ) );


// ------insertMany  static 方法
//有一条出错 所有的都不会保存  仅仅往数据库插入一次
User.insertMany([{name:'dcl11'},{name:'dcl22'},{name:'dclys'},{name:'ys'}]).then( function(arr){
    //console.log( arr);
    //arr[0].remove(function(err,obj){
    //    console.log( err, obj );
    //});
    //arr[0].remove().then( obj=>console.log( obj ) ).catch( err=>console.log( err ));
    //arr[0].remove().then( obj=> User.create({name:obj.name+"1111"}) ).catch( err=>console.log( err ))
    //User.remove({name:'dcl'}).then(obj=>console.log(obj));
    //User.remove({name:/^dcl\d*$/}).then(obj=>console.log(obj));
    //{ ok: 1, n: 1, nModified: 1 }
    //uptate 如果想进行验证的话 需要 {runValidators:true}
    //arr[0].update({name:'dcl12345'},{runValidators:true}).then( obj=>console.log( obj)).catch(err=>console.log( err));
    User.update({},{name:'shasha'},{runValidators:true,multi:true}).then(obj=>console.log(obj)).catch(err=>console.log(err));
    //{ ok: 1, n: 4, nModified: 4 }
}).catch( err=>console.log( err ) );