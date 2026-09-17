require('dotenv').config()

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Job = require('./models/Job')
const User = require('./models/User')
const jobs = require('./data/jobs')

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected successfully ✅')

    // Find or create a demo employer
    let employer = await User.findOne({
      email: 'demo@jobhub.com',
    })

    if (!employer) {
      const hashedPassword = await bcrypt.hash(
        'demo123456',
        10
      )

      employer = await User.create({
        name: 'JobHub Demo Employer',
        email: 'demo@jobhub.com',
        password: hashedPassword,
        role: 'employer',
      })

      console.log('Demo employer created ✅')
    }

    // Remove existing jobs
    await Job.deleteMany()

    // Attach the demo employer to every seed job
    const jobsWithEmployer = jobs.map((job) => {
      const { id, ...jobData } = job

      return {
        ...jobData,
        employer: employer._id,
      }
    })

    await Job.insertMany(jobsWithEmployer)

    console.log(
      `${jobsWithEmployer.length} jobs added to MongoDB successfully 🎉`
    )

    console.log('')
    console.log('Demo employer account:')
    console.log('Email: demo@jobhub.com')
    console.log('Password: demo123456')

    await mongoose.connection.close()

    console.log('MongoDB connection closed.')
  } catch (error) {
    console.error('Seeding failed ❌')
    console.error(error.message)

    process.exit(1)
  }
}

seedJobs()