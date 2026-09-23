  const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Please provide name, email, and password',
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
      })
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    })

    if (existingUser) {
      return res.status(400).json({
        message: 'An account with this email already exists',
      })
    }

    // Only allow public users to register as
    // jobseekers or employers.
    // Admin accounts must never be created from
    // the public registration form.
    const userRole =
      role === 'employer'
        ? 'employer'
        : 'jobseeker'

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: userRole,
    })

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    res.status(201).json({
      message: 'Account created successfully',

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(
      'Registration error:',
      error.message
    )

    res.status(500).json({
      message: 'Failed to create account',
    })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password',
      })
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    })

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    res.json({
      message: 'Login successful',

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(
      'Login error:',
      error.message
    )

    res.status(500).json({
      message: 'Failed to log in',
    })
  }
})

module.exports = router