const  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
const User =require('./user'); //require('./userClass');
const People = mongoose.model("People", new mongoose.Schema({
    user:User
}));

const o = new People( {
    user:{
        loginname:'dcl888',
        password:'123'
    }
});

o.save( function( err,res ){
    console.log( err );
})
