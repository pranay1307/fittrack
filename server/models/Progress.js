const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
      index: true,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    weight: {
      type: Number,
      min: 0,
    },
    bodyFat: {
      type: Number,
      min: 0,
      max: 100,
    },
    bmi: {
      type: Number,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: 0,
    },
    caloriesConsumed: {
      type: Number,
      default: 0,
      min: 0,
    },
    proteinIntake: {
      type: Number,
      default: 0,
      min: 0,
    },
    workoutDuration: {
      type: Number,
      default: 0,
      min: 0,
    },
    steps: {
      type: Number,
      default: 0,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
progressSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Progress', progressSchema);
