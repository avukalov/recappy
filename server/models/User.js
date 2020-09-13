const mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const normalize = require('normalize-url');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String },
  gravatarUrl: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  favorites: {type: Object, default: {}},
});

UserSchema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  await bcrypt
    .hash(password, salt)
    .then((hash) => {
      this.password = hash;
    })
    .catch((error) => console.log(error));
};

UserSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.setGravatar = async function (email) {
  this.gravatarUrl = await normalize(
    gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    }),
    { forceHttps: true }
  );
};

UserSchema.methods.generateJwt = function (remember) {
  const expiry = new Date();
  if (remember) {
    expiry.setDate(expiry.getDate() + 7);
  } else {
    expiry.setDate(expiry.getDate() + 1);
  }

  const payload = {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    gravatarUrl: this.gravatarUrl,
    exp: Math.trunc(expiry.getTime() / 1000),
  };

  return jwt.sign(payload, config.get('jwtSecret'));
};

module.exports = mongoose.model('User', UserSchema);
