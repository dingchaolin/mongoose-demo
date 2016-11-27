/**
 * Created by Administrator on 2016/11/27 0027.
 */
const mongoose = require('mongoose');
function User( key, opts ){//继承了构造函数 特权属性
    mongoose.SchemaType.call( this, key, opts, 'User');
}

User.prototype = Object.create( mongoose.SchemaType.prototype );//继承原型

User.prototype.cast = function( val ){
    if( val.loginname && val.password && val.loginname.length > 3){
        return {
            loginname:val.loginname,
            password:val.password
        }
    }else{
        throw new Error('user has error');
    }
}

mongoose.Schema.Types.User = User;
module.exports = User;

