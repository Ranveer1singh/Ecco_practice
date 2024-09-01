const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      require: true,
      trim: true,
    },
    LastName: {
      type: String,
      trim: true,
      // require:true
    },
    email: { type: String, required: true, unique: true , trim: true,},
    password: { type: String, required: true, trim: true, },
    isAdmin:{
      type:Boolean,
      default:false
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.IsPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this/password);
}
const User = mongoose.model("User", userSchema);

module.exports = User;
