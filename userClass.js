/**
 * Created by Administrator on 2016/11/27 0027.
 */
const mongoose = require('mongoose');

class User extends mongoose.SchemaType{
    constructor( key, opts ){
        super( key, opts, "User");
    }
    cast( val ){
        if( val.loginname && val.password && val.loginname.length > 3){
            return {
                loginname:val.loginname,
                password:val.password
            }
        }else{
            throw new Error('user has error');
        }
    }
}

mongoose.Schema.Types.User = User;
module.exports = User;

