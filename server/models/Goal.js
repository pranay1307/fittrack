const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user ID'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a goal title'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'weekly_workouts', 'protein_intake', 'custom'],
      default: 'custom',
    },
    startingValue: {
      type: Number,
      required: [true, 'Please provide a target value'],
    },
    targetValue: {
      type: Number,
      required: [true, 'Please provide a target value'],
    },
    currentValue: {
      type: Number,
      default:0,
    },
    unit: {
      type: String,
      default: '',
    },
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'paused'],
      default: 'active',
    },
  },
  { timestamps: true }
);

goalSchema.virtual('progress').get(function () {

  if (this.type === 'weight_loss') {

    if (
      this.startingValue === undefined ||
      this.startingValue <= this.targetValue
    ) {
      return 0;
    }

    const totalToLose =
      this.startingValue - this.targetValue;

    const lostSoFar =
      this.startingValue - this.currentValue;

    return Math.min(
      Math.max(
        Math.round((lostSoFar / totalToLose) * 100),
        0
      ),
      100
    );
  }

  if (this.targetValue === 0) return 0;

  return Math.min(
    Math.round((this.currentValue / this.targetValue) * 100),
    100
  );
});

goalSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Goal', goalSchema);
