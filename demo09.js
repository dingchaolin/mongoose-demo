const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const userSchema = new mongoose.Schema({
    firstName:String,
    secondName:String
});
//注意静态方法和普通方法的区别
//普通方法 针对对象
userSchema.methods.getAllName = function(){
    return this.firstName + "." + this.secondName;
};
//静态方法 针对类
userSchema.statics.getAll = function( cb ){
    return this.find({},cb);
}
//虚拟方法 对象的虚拟属性方法 getter setter
userSchema.virtual("allname").get(function(){
    return this.firstName + "." + this.secondName;
});//getter method

userSchema.virtual("allname").set(function(v){
    const name = v.split('.');
    this.firstName = name[0];
    this.secondName = name[1];
});//setter method

const User = mongoose.model("User", userSchema );//users

//const U = new User({
//    firstName:'ding',
//    secondName:'chaolin'
//});
//
//console.log( U.getAllName() );
//insertMany 一次性插入多个文档
// mongoose 的方法返回值都是一个promise
//User.remove( {}).then( function(){
//    User.insertMany([
//        {firstName:'ddd',secondName:"ccc"},
//        {firstName:'yyy',secondName:"sss"},
//        {firstName:'aaaa',secondName:"bbbb"},
//    ]).then( function(){
//        User.getAll().then( result=>console.log( result ) );
//    });
//});

var user = new User({
    allname:"liu.dehua"
});
console.log( user.getAllName() );


