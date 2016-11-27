const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const TopicSchema = new mongoose.Schema({
    arr:[]
});
function gereratorArr( size){
    var arr = [];
    for( var i = 0; i < size; i++){
        arr.push({name:'leo'+i,num:1});
    }
    return arr;
}

const Topic = mongoose.model( 'Topic',TopicSchema );
Topic.remove({},function(){
    //Topic.create([{arr:[11,22,33]},{arr:[33,44,55]},{arr:[55,66,77,88]}]).then( function(){
    //    //$all 都匹配上了 一个数组里包含33,44两个元素就能匹配上 简单元素的匹配
    //    Topic.find({arr:{$all:[33,44]}}).then( function( result){
    //        console.log( result );
    //    })
    //})
    Topic.create([{arr:gereratorArr(5)},{arr:gereratorArr(10)},{arr:gereratorArr(15)}]).then( function(){
        //$elemMatch  对象的匹配
        //Topic.find({arr:{$elemMatch:{name:'leo9'}}}).then( function( result){
        //    console.log( result );
        //})
        //Topic.find().where("arr").elemMatch({name:'leo9'}).exec( function( err, result){
        //    console.log(result);
        //})
        //query 没有 not 方法
        //Topic.find().where("arr").elemMatch(function(elem){//返回数组的其中一个element
        //    elem.where('name').eq('leo11').where('num').gte(12);
        //}).exec( function( err, result){
        //    console.log(result);
        //})
        Topic.find().where("arr").elemMatch(function(elem){//返回数组的其中一个element
            elem.where('name').eq('leo11').where('num').gte(12);
        }).stream().on("data",function(data){

        })
        //对象属性的匹配
        //Topic.find({arr:{$size:5}}).then( function( result){
        //    console.log( result );
        //})

    })
});

