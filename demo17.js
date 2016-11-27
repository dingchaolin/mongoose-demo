const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/test");
const TopicSchema = new mongoose.Schema({
    obj:{}
});


const Topic = mongoose.model( 'Topic',TopicSchema );
Topic.remove({},function(){
    //$where 做更复杂的匹配
    Topic.create([{obj:{name:'dcl'}},{obj:{name:'ys'}},{obj:{name:'yugyu'}}]).then( function(){
        //Topic.find({$where:"this.obj.name === 'dcl'"}).then( function(res){
        //    console.log(res);
        //})
        Topic.find({$where:function(){
            //return this.obj.name==="dcl";
            return /^dcl/.test(this.obj.name);
        }},null,{skip:0,limit:1}).then( function(res){
            console.log(res);
        })
    })
});

