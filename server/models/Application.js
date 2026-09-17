const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },

    resume: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: [
        'Pending',
        'Reviewed',
        'Accepted',
        'Rejected',
      ],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
)

// A job seeker can apply to a particular job only once
applicationSchema.index(
  { job: 1, applicant: 1 },
  { unique: true }
)

module.exports = mongoose.model(
  'Application',
  applicationSchema
)