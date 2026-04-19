const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sets: { type: Number, required: true, min: 1 },
  reps: { type: Number, required: true, min: 1 },
  weight: { type: Number, default: 0, min: 0 },
  duration: { type: Number, default: 0, min: 0 },
  restTime: { type: Number, default: 60, min: 0 },
});

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a workout title'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['strength', 'cardio', 'hiit', 'yoga', 'flexibility', 'sports', 'custom'],
      default: 'custom',
    },
    exercises: [exerciseSchema],
    duration: {
      type: Number,
      default: 0,
      min: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
      min: 0,
    },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate',
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['planned', 'in_progress', 'completed'],
      default: 'completed',
    },
    scheduledDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

workoutSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Workout', workoutSchema);
