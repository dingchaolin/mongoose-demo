const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const TopicSchema = new mongoose.Schema({
    name:{type:String,maxlength:10},
    num:Number
});
const T = mongoose.model( 'Topic',TopicSchema );
const arr = [];
for( var i = 0; i < 50; i ++){
    arr.push({name:'leo'+i,num:i});
};

T.remove({},function(){
    T.create(arr).then(function(objs){
        var id = objs[0].id;
        //T.findById(id,function( err,t){
        //    console.log( t );
        //});
        //T.findByIdAndRemove(id,function( err, result){
        //    console.log( result );
        //})
        //{runValidators:true} 设置为true时 update才会进行验证
        //T.findByIdAndUpdate(id,{name:'leo11111111'},{runValidators:true},function( err,result){
        //    console.log(err,result);
        //})
        //T.findOne({name:/^leo1\d$/},function( err, t){
        //    console.log(t);
        //})
        //findOneAndRemove/ findOneAndUpdate
        //第二个参数表示要返回的字段 每个字段之间用空格隔开 -name 表示去掉name 如果 不加字段选项可以设置为 null
        //skip 跳过前5个 limit 每次返回3个
        //T.find({name:/^leo1\d$/},"name",{skip:5,limit:3},function(err,res){
        //    console.log(res);
        //})
        //比较查询
        // $lt 小于
        // $lte 小于等于
        // $gt 大于
        // $gte 大于等于
        //T.find({num:{$lte:20,$gte:10}},function(err,res){
        //    console.log(res);
        //})
        //包含 $in
        //T.find({num:{$in:[11,15]}},function(err,res){
        //    console.log(res);
        //})
        //不包含 $nin
        //T.find({num:{$nin:[11,15]}},function(err,res){
        //    console.log(res);
        //})
        // $ne 不是 ！=
        T.find({num:{$ne:10}},function(err,res){
            console.log(res);
        })
    }).catch(err=>console.log(err));
});
