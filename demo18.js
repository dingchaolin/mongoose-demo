const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const TopicSchema = new mongoose.Schema({
    arr:[],
    name:String,
    age:Number
});

const Topic = mongoose.model( 'Topic',TopicSchema );
Topic.remove({},function(){
    Topic.create([{arr:[11,22,33]},{arr:[33,44,55]},{arr:[55,66,77,88]}]).then( function(){
        //$all 都匹配上了 一个数组里包含33,44两个元素就能匹配上 简单元素的匹配
        //Topic.find({arr:{$all:[33,44]}}).then( function( result){
        //    console.log( result );
        //})
        var query = Topic.find();
        query.where("arr").all([33,44]).select("name age").limit(1).skip(0).exec( function(err,result){
            console.log( result );
        })
    })

});

