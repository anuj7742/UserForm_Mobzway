const isAlphaWithSpaces = (value) => /^[a-zA-Z\s]+$/.test(value);
const isValidStreet = (value) =>
  /^[a-zA-Z0-9\s.,-]+$/.test(value) && /[a-zA-Z]/.test(value);
const isValidMobileNo = (value) => {
  return /^[1-9][0-9]{9}$/.test(value);
};
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    validate: {
      validator: isAlphaWithSpaces,
      message: "First name can only contain alphabetic characters and spaces",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: isAlphaWithSpaces,
      message: "Last name can only contain alphabetic characters and spaces",
    },
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
    validate: {
      validator: isValidMobileNo,
      message:
        "Mobile number must be exactly 10 digits and cannot start with 0",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: isValidEmail,
      message: "Please enter a valid email address in the format 'example@domain.com'.",
    },
  },
  address: {
    street: {
      type: String,
      required: [true, "Street is required"],
      validate: {
        validator: isValidStreet,
        message:
          "Street must contain at least one alphabetic character and can include numbers, spaces, commas, periods, and hyphens",
      },
    },
    city: {
      type: String,
      required: [true, "City is required"],
      validate: {
        validator: isAlphaWithSpaces,
        message: "City can only contain alphabetic characters and spaces",
      },
    },
    state: {
      type: String,
      required: [true, "State is required"],
      validate: {
        validator: isAlphaWithSpaces,
        message: "State can only contain alphabetic characters and spaces",
      },
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      validate: {
        validator: isAlphaWithSpaces,
        message: "Country can only contain alphabetic characters and spaces",
      },
    },
  },
  loginId: {
    type: String,
    required: [true, "Login ID is required"],
    match: [
      /^[a-zA-Z0-9]{8}$/ && /[a-zA-Z]/,
      "Login ID must be exactly 8 alphanumeric characters and contain at least one letter",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
      "Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, and one special character",
    ],
  },
  creationTime: { type: Date, default: Date.now },
  lastUpdatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
