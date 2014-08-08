/**
 * Created by MAKA on 6/08/14.
 */

var mongoose=require('mongoose');

var Schema=mongoose.Schema;

//Define de usar schema

var userSchema = new Schema ({
    firstname : {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    profile: {}

});

userSchema.pre('save', function(next) {
    var user=this;

    if (!user.isModified('password')) {
        return next ();
    } else {
        return next ();
    }
})


var User = mongoose.model('User', userSchema);

module.exports = User;