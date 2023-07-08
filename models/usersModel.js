const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    idNumber : {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isOperator: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//if operator is true, then add user to operator collection as well
userSchema.pre("save", async function (next) {
  if (this.isOperator) {
    const Operator = require("./operatorModel");
    //check if operator already exists
    const operatorExists = await Operator.findOne({ email: this.email });
    if (operatorExists) {
      return next();
    }
    
    const operator = new Operator({
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      isOperator: this.isOperator,
      isBlocked: this.isBlocked,
    });
    await operator.save();
  }
  next();
});


module.exports = mongoose.model("users", userSchema);
