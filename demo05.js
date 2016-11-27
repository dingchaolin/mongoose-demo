const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");
const baseDateNum = Date.now();
const obj = mongoose.model( "obj", new mongoose.Schema({
   str:{
       type:String,
       enum:["aaa","bbb"]
   },
    qq:{
        type:String,
        match:/^\d*$/, //正则匹配
        maxlength:6,
        minlength:4
    },
    lowerstr:{
        type:String,
        lowercase:true
    },
    superstr:{
        type:String,
        uppercase:true,
        trim:true
    },
    num:{
        type:Number,
        min:5,
        max:20
    },
    date:{
        type:Date,
        min: new Date( baseDateNum -1000 ),
        max: new Date( baseDateNum + 2000 )
    }
}));

const o = new obj({
    str:"aaa",
    qq:"23545",
    lowerstr:'WErr',
    superstr:'werr   ',
    num:10,
    date: new Date( baseDateNum + 1111 )

});

//const err = o.validateSync();//获取同步信息 同步获取方式不能获取异步信息

o.save( function( err ){
    console.log( err );
})


