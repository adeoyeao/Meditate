const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const findOrCreate = require("mongoose-findorcreate")

const UserSchema = mongoose.Schema({
      username: String,
      googleId: String,
      facebookId: String
})

UserSchema.plugin(findOrCreate)
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("user", UserSchema)