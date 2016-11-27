const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const TopicSchema = new mongoose.Schema({
    title:{ type:String,required:true},
    body:{ type:String,required:true},
    money:{ type:Number,default:0.5},
    accessNum:{type:Number,default:7},
    createTime:Date,
    updateTime:Date

});
const Topic = mongoose.model( 'Topic',TopicSchema );
Topic.remove({},function(){
    var date = new Date();
    const topic = new Topic({
        title:"tt",
        body:"content",
        createTime:date,
        updateTime:date});

    topic.save( function( err, result){
        //一个字段只能存在于一个更改字段当中
        Topic.update({},{
            title:'my love',
            //$currentDate:{updateTime:true},//将updateTime改成当前时间
            //$min:{accessNum:15},//如果小于15 不会变 如果大于15 不被改成15
            //$max:{accessNum:30},//如果大于30 就会被改成不会变 如果小于30会被改成30
            $inc:{accessNum:3}
        },function( err ){
            console.log( err ) ;
        });
    });
})

