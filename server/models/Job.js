const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    },

    salary: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    posted: {
      type: String,
      required: true,
    },

    deadline: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: {
      type: [String],
      required: true,
    },

    benefits: {
      type: [String],
      required: true,
    },

    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Job', jobSchema)