/**
 * Created by Administrator on 2016/11/27 0027.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const userShema = new mongoose.Schema({
    name: String,
    qq:{ type: String,default:"1124373818" }
});

const User = mongoose.model( 'User', userShema );

const user01 = new User();

user01.save();

const user02 = new User({name:"dcl",qq:"112543879"});
user02.save();