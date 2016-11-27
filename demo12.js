const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const TopicSchema = new mongoose.Schema({
    arr:[]
});
const Topic = mongoose.model( 'Topic',TopicSchema );
Topic.remove({},function(){
    Topic.create({arr:[11,22,11,44,55]}).then( function(){
        // 1 从后面删除一条 删除55  -1 删除11
        //Topic.update({},{$pop:{arr:-1}}).exec();// promise -> then and query
        // 如果原始数据中没有 会加入  如果有 就加入失败
        //把[66,77]当成一个元素添加到数据中
        //Topic.update({},{$addToSet:{arr:[66,77]}}).exec();
        //这样更改不会影响到元素数据 元素数据如果有重复的不会被删除
        //Topic.update({},{$addToSet:{arr:{$each:[66,77]}}}).exec();
        //Topic.update({},{$pull:{arr:11}}).exec();//数据中的所有的11都会被清除掉 只能清除非数组的格式
        //Topic.update({},{$pullAll:{arr:[11,22]}}).exec();//清除过多个
        //Topic.update({},{$push:{arr:[77,88]}}).exec();//把数据当成一个值进行添加
        //position 插入的位置 slice 3 只取前3个  -3 只取后3个
        Topic.update({},{$push:{arr:{$each:[66,77],$position:0,$slice:3}}}).exec();


    })
});

