const mongoose = require("mongoose");
const moment = require("moment")

const exchange_schema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  year_established: {
    type: Number,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  image: {
    type: String,
  },
  has_trading_incentive: {
    type: Boolean,
    require: true,
  },
  trust_score: {
    type: Number,
    require: true,
  },

  trust_score_rank: {
    type: Number,
    require: true,
  },

  trade_volume_24h_btc: {
    type: Number,
    require: true,
  },

  trade_volume_24h_btc_normalized: {
    type: Number,
    require: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default:  moment().format('LLL')
},
});

module.exports = mongoose.model('exchange-2',exchange_schema)