require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const Job = require('./models/Job')
const Application = require('./models/Application')
const User = require('./models/User')

const authRoutes = require('./routes/auth')
const protect = require('./middleware/auth')
const authorize = require('./middleware/role')
const { validateJob } = require('./middleware/validate')

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  'http://localhost:5173',
  'https://jobhub-eight-liard.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    },
  })
)

app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'JobHub API is running 🚀',
  })
})

// Get all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('employer', 'name email')
      .sort({ createdAt: -1 })

    res.json(jobs)
  } catch (error) {
    console.error('Failed to fetch jobs:', error.message)

    res.status(500).json({
      message: 'Failed to fetch jobs',
    })
  }
})

// Get one job
app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employer', 'name email')

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      })
    }

    res.json(job)
  } catch (error) {
    console.error('Failed to fetch job:', error.message)

    res.status(500).json({
      message: 'Failed to fetch job',
    })
  }
})

// Get jobs created by logged-in employer
app.get(
  '/api/employer/jobs',
  protect,
  authorize('employer', 'admin'),
  async (req, res) => {
    try {
      const jobs = await Job.find({
        employer: req.user.userId,
      })
        .populate('employer', 'name email')
        .sort({ createdAt: -1 })

      res.json(jobs)
    } catch (error) {
      console.error(
        'Failed to fetch employer jobs:',
        error.message
      )

      res.status(500).json({
        message: 'Failed to fetch employer jobs',
      })
    }
  }
)

// Create a job
app.post(
  '/api/jobs',
  protect,
  authorize('employer', 'admin'),
  validateJob,
  async (req, res) => {
    try {
      const {
        title,
        company,
        location,
        type,
        salary,
        category,
        experience,
        posted,
        deadline,
        description,
        requirements,
        benefits,
        skills,
      } = req.body

      const job = await Job.create({
        employer: req.user.userId,
        title,
        company,
        location,
        type,
        salary,
        category,
        experience,
        posted,
        deadline,
        description,
        requirements,
        benefits,
        skills,
      })

      const populatedJob = await Job.findById(
        job._id
      ).populate('employer', 'name email')

      res.status(201).json({
        message: 'Job created successfully',
        job: populatedJob,
      })
    } catch (error) {
      console.error(
        'Failed to create job:',
        error.message
      )

      res.status(500).json({
        message: 'Failed to create job',
      })
    }
  }
)

// Update a job
app.put(
  '/api/jobs/:id',
  protect,
  authorize('employer', 'admin'),
  validateJob,
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)

      if (!job) {
        return res.status(404).json({
          message: 'Job not found',
        })
      }

      const isOwner =
        job.employer &&
        job.employer.toString() ===
          req.user.userId.toString()

      const isAdmin = req.user.role === 'admin'

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message:
            'You can only edit your own jobs',
        })
      }

      const {
        title,
        company,
        location,
        type,
        salary,
        category,
        experience,
        posted,
        deadline,
        description,
        requirements,
        benefits,
        skills,
      } = req.body

      job.title = title
      job.company = company
      job.location = location
      job.type = type
      job.salary = salary
      job.category = category
      job.experience = experience
      job.posted = posted
      job.deadline = deadline
      job.description = description
      job.requirements = requirements
      job.benefits = benefits
      job.skills = skills

      await job.save()

      const updatedJob = await Job.findById(
        job._id
      ).populate('employer', 'name email')

      res.json({
        message: 'Job updated successfully',
        job: updatedJob,
      })
    } catch (error) {
      console.error(
        'Failed to update job:',
        error.message
      )

      res.status(500).json({
        message: 'Failed to update job',
      })
    }
  }
)

// Delete a job
app.delete(
  '/api/jobs/:id',
  protect,
  authorize('employer', 'admin'),
  async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)

      if (!job) {
        return res.status(404).json({
          message: 'Job not found',
        })
      }

      const isOwner =
        job.employer &&
        job.employer.toString() ===
          req.user.userId.toString()

      const isAdmin = req.user.role === 'admin'

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message:
            'You can only delete your own jobs',
        })
      }

      await Application.deleteMany({
        job: req.params.id,
      })

      await Job.findByIdAndDelete(req.params.id)

      res.json({
        message: 'Job deleted successfully',
      })
    } catch (error) {
      console.error(
        'Failed to delete job:',
        error.message
      )

      res.status(500).json({
        message: 'Failed to delete job',
      })
    }
  }
)

// Submit an application
app.post(
  '/api/applications',
  protect,
  authorize('jobseeker'),
  async (req, res) => {
    try {
      const {
        job,
        phone,
        coverLetter,
        resume,
      } = req.body

      if (
        !job ||
        !phone ||
        !coverLetter
      ) {
        return res.status(400).json({
          message:
            'Please provide all required fields',
        })
      }

      const applicant = await User.findById(
        req.user.userId
      )

      if (!applicant) {
        return res.status(404).json({
          message: 'User account not found',
        })
      }

      const existingJob = await Job.findById(job)

      if (!existingJob) {
        return res.status(404).json({
          message: 'Job not found',
        })
      }

      const existingApplication =
        await Application.findOne({
          job,
          applicant: req.user.userId,
        })

      if (existingApplication) {
        return res.status(400).json({
          message:
            'You have already applied for this job',
        })
      }

      const application =
        await Application.create({
          job,
          applicant: applicant._id,
          fullName: applicant.name,
          email: applicant.email,
          phone,
          coverLetter,
          resume: resume || '',
        })

      res.status(201).json({
        message:
          'Application submitted successfully',
        application,
      })
    } catch (error) {
      console.error(
        'Failed to submit application:',
        error.message
      )

      res.status(500).json({
        message: 'Failed to submit application',
      })
    }
  }
)

// Get applications submitted by logged-in job seeker
app.get(
  '/api/my-applications',
  protect,
  authorize('jobseeker'),
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          applicant: req.user.userId,
        })
          .populate('job')
          .sort({ createdAt: -1 })

      res.json(applications)
    } catch (error) {
      console.error(
        'Failed to fetch my applications:',
        error.message
      )

      res.status(500).json({
        message:
          'Failed to fetch your applications',
      })
    }
  }
)

// Get applications for employers
app.get(
  '/api/employer/applications',
  protect,
  authorize('employer', 'admin'),
  async (req, res) => {
    try {
      const jobs = await Job.find({
        employer: req.user.userId,
      }).select('_id')

      const jobIds = jobs.map(
        (job) => job._id
      )

      const applications =
        await Application.find({
          job: { $in: jobIds },
        })
          .populate('job')
          .populate(
            'applicant',
            'name email'
          )
          .sort({ createdAt: -1 })

      res.json(applications)
    } catch (error) {
      console.error(
        'Failed to fetch employer applications:',
        error.message
      )

      res.status(500).json({
        message:
          'Failed to fetch applications',
      })
    }
  }
)

// Update an application status
app.put(
  '/api/employer/applications/:id/status',
  protect,
  authorize('employer', 'admin'),
  async (req, res) => {
    try {
      const { status } = req.body

      const allowedStatuses = [
        'Pending',
        'Reviewed',
        'Accepted',
        'Rejected',
      ]

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message:
            'Invalid application status',
        })
      }

      const application =
        await Application.findById(
          req.params.id
        ).populate('job')

      if (!application) {
        return res.status(404).json({
          message:
            'Application not found',
        })
      }

      const isAdmin =
        req.user.role === 'admin'

      const isOwner =
        application.job &&
        application.job.employer &&
        application.job.employer.toString() ===
          req.user.userId.toString()

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          message:
            'You can only update applications for your own jobs',
        })
      }

      application.status = status

      await application.save()

      const updatedApplication =
        await Application.findById(
          application._id
        ).populate('job')

      res.json({
        message:
          'Application status updated successfully',
        application: updatedApplication,
      })
    } catch (error) {
      console.error(
        'Failed to update application status:',
        error.message
      )

      res.status(500).json({
        message:
          'Failed to update application status',
      })
    }
  }
)

const startServer = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    )

    console.log(
      'MongoDB connected successfully ✅'
    )

    app.listen(PORT, () => {
      console.log(
        `JobHub server running on port ${PORT}`
      )
    })
  } catch (error) {
    console.error(
      'MongoDB connection failed ❌'
    )

    console.error(error.message)
  }
}

if (require.main === module) {
  startServer()
}

module.exports = {
  app,
  startServer,
}