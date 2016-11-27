const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");

const User = mongoose.model( "User", new mongoose.Schema({
   name:{
       type:String,
       validate:{
           validator(value){
               return value.length <= 9;
           }
       }
   },
}));

const u = new User({
    name:"fsafdsafdsaf"
});

u.save( function( err ){
    console.log( err );
})

