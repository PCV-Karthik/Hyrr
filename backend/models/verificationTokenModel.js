const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const verificationTokenSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    token : {
        type : "String",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 3600
    }
});

verificationTokenSchema.methods.compareToken = async function (token) {
    return await bcrypt.compare(token, this.token);
  };
  
  verificationTokenSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.token = await bcrypt.hash(this.token, salt);
  });
  
  module.exports = mongoose.model("VerificationToken", verificationTokenSchema);