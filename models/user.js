var mongoose = require('mongoose'); //Object relational language
var bcrypt = require('bcrypt-nodejs'); //Password encryption library
var Schema = mongoose.Schema

/* The user schemas */
var UserSchema = new Schema({
    email:{ type: String, unique: true, lowercase: true},
    password: String,
    
    profile: {
        name: {type: String, default: ''},
        picture: {type: String, default: ''}
    },
    
    address: String,
    history: [{
        date: Date,
        paid: {type: Number, default: 0},
       // item: {type: Schema.Type.ObjectId, ref: ''}
    }]
});



/* Hash the password */

var user = new User();
UserSchema.pre('save', function(next){ //.pre - before saving to databse 
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            next();
        }); 
    });
});


/* Compare user typed password to the database's */

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
