/**
 * Created by Administrator on 2016/11/27 0027.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const userShema = new mongoose.Schema({
    name: {type:String,maxlength:12}
});
//保存之前要先验证
//加上true 可以让两个串行执行
userShema.pre('validate',function(next){
    console.log('pre validate',this);
    console.log( this.errors );//无值
    next();


})
userShema.post('validate',function(next){
    console.log('post validate',this );//this 就是本身
    //console.log( this.errors.name );//有值
})
//save执行之前执行 同一集合有顺序
userShema.pre("save",/*true,*/function(next){
    console.log('pre save one');
    //next();
    setTimeout( next,2000);
});
userShema.pre("save",/*true,*/function(next){
    console.log('pre save two');
    //next();
    setTimeout( next,2000);
})
//save之后执行 没有next
userShema.post("save",function(next){
    console.log('post save one');

});

userShema.pre('update',function( next ){
    console.log('pre update');
    next();
})

userShema.post('update',function( next ){
    console.log('post update');

})

userShema.pre('remove',function( next ){
    console.log('pre remove');
    next();
})

userShema.post('remove',function( next ){
    console.log('post remove');

})
const User = mongoose.model( 'User', userShema );

User.remove({},function(){
    var user = new User({name:'dcl'});
    user.save(function( err, u){
        u.update({name:'ys'}).then( function( result){
            u.remove();
        });
    });
})