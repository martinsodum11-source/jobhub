const test = require('node:test')
const assert = require('node:assert')
const jwt = require('jsonwebtoken')

const protect = require('../middleware/auth')
const authorize = require('../middleware/role')
const { validateJob } = require('../middleware/validate')

const createResponse = () => ({
  statusCode: null,
  body: null,

  status(code) {
    this.statusCode = code
    return this
  },

  json(data) {
    this.body = data
  },
})

// Authentication tests

test('protect middleware rejects requests without a token', () => {
  const req = {
    headers: {},
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  protect(req, res, next)

  assert.strictEqual(res.statusCode, 401)

  assert.deepStrictEqual(res.body, {
    message: 'Authentication required',
  })

  assert.strictEqual(nextCalled, false)
})

test('protect middleware rejects an invalid token', () => {
  process.env.JWT_SECRET = 'test-secret'

  const req = {
    headers: {
      authorization: 'Bearer invalid-token',
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  protect(req, res, next)

  assert.strictEqual(res.statusCode, 401)

  assert.deepStrictEqual(res.body, {
    message: 'Invalid or expired token',
  })

  assert.strictEqual(nextCalled, false)
})

test('protect middleware accepts a valid token', () => {
  process.env.JWT_SECRET = 'test-secret'

  const token = jwt.sign(
    {
      userId: '123456789',
      role: 'jobseeker',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  )

  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  protect(req, res, next)

  assert.strictEqual(nextCalled, true)

  assert.strictEqual(req.user.userId, '123456789')
  assert.strictEqual(req.user.role, 'jobseeker')
})

// Authorization tests

test('authorize middleware rejects unauthenticated users', () => {
  const req = {}

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  authorize('employer')(req, res, next)

  assert.strictEqual(res.statusCode, 401)

  assert.deepStrictEqual(res.body, {
    message: 'Authentication required',
  })

  assert.strictEqual(nextCalled, false)
})

test('authorize middleware rejects users with the wrong role', () => {
  const req = {
    user: {
      userId: '123456789',
      role: 'jobseeker',
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  authorize('employer')(req, res, next)

  assert.strictEqual(res.statusCode, 403)

  assert.deepStrictEqual(res.body, {
    message:
      'You do not have permission to access this resource',
  })

  assert.strictEqual(nextCalled, false)
})

test('authorize middleware allows users with the correct role', () => {
  const req = {
    user: {
      userId: '123456789',
      role: 'employer',
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  authorize('employer')(req, res, next)

  assert.strictEqual(nextCalled, true)
})

test('authorize middleware allows any of multiple permitted roles', () => {
  const req = {
    user: {
      userId: '123456789',
      role: 'admin',
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  authorize('employer', 'admin')(req, res, next)

  assert.strictEqual(nextCalled, true)
})

// Job validation tests

test('validateJob rejects jobs with missing required fields', () => {
  const req = {
    body: {},
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  validateJob(req, res, next)

  assert.strictEqual(res.statusCode, 400)

  assert.strictEqual(
    res.body.message,
    'Please provide all required job fields'
  )

  assert.ok(
    res.body.missingFields.includes('title')
  )

  assert.ok(
    res.body.missingFields.includes('company')
  )

  assert.ok(
    res.body.missingFields.includes('description')
  )

  assert.strictEqual(nextCalled, false)
})

test('validateJob rejects non-array requirements', () => {
  const req = {
    body: {
      title: 'Frontend Developer',
      company: 'TechFlow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$1,500',
      category: 'Frontend Development',
      experience: 'Junior',
      posted: 'Today',
      deadline: '2026-12-31',
      description: 'Frontend development role',
      requirements: 'React experience',
      benefits: ['Remote work'],
      skills: ['React'],
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  validateJob(req, res, next)

  assert.strictEqual(res.statusCode, 400)

  assert.deepStrictEqual(res.body, {
    message: 'Requirements must be an array',
  })

  assert.strictEqual(nextCalled, false)
})

test('validateJob rejects non-array benefits', () => {
  const req = {
    body: {
      title: 'Frontend Developer',
      company: 'TechFlow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$1,500',
      category: 'Frontend Development',
      experience: 'Junior',
      posted: 'Today',
      deadline: '2026-12-31',
      description: 'Frontend development role',
      requirements: ['React experience'],
      benefits: 'Remote work',
      skills: ['React'],
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  validateJob(req, res, next)

  assert.strictEqual(res.statusCode, 400)

  assert.deepStrictEqual(res.body, {
    message: 'Benefits must be an array',
  })

  assert.strictEqual(nextCalled, false)
})

test('validateJob rejects non-array skills', () => {
  const req = {
    body: {
      title: 'Frontend Developer',
      company: 'TechFlow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$1,500',
      category: 'Frontend Development',
      experience: 'Junior',
      posted: 'Today',
      deadline: '2026-12-31',
      description: 'Frontend development role',
      requirements: ['React experience'],
      benefits: ['Remote work'],
      skills: 'React',
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  validateJob(req, res, next)

  assert.strictEqual(res.statusCode, 400)

  assert.deepStrictEqual(res.body, {
    message: 'Skills must be an array',
  })

  assert.strictEqual(nextCalled, false)
})

test('validateJob rejects an invalid job type', () => {
  const req = {
    body: {
      title: 'Frontend Developer',
      company: 'TechFlow',
      location: 'Remote',
      type: 'Invalid Type',
      salary: '$1,500',
      category: 'Frontend Development',
      experience: 'Junior',
      posted: 'Today',
      deadline: '2026-12-31',
      description: 'Frontend development role',
      requirements: ['React experience'],
      benefits: ['Remote work'],
      skills: ['React'],
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  validateJob(req, res, next)

  assert.strictEqual(res.statusCode, 400)

  assert.deepStrictEqual(res.body, {
    message: 'Invalid job type',
  })

  assert.strictEqual(nextCalled, false)
})

test('validateJob accepts valid job data', () => {
  const req = {
    body: {
      title: 'Frontend Developer',
      company: 'TechFlow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$1,500',
      category: 'Frontend Development',
      experience: 'Junior',
      posted: 'Today',
      deadline: '2026-12-31',
      description: 'Frontend development role',
      requirements: ['React experience'],
      benefits: ['Remote work'],
      skills: ['React'],
    },
  }

  const res = createResponse()

  let nextCalled = false

  const next = () => {
    nextCalled = true
  }

  validateJob(req, res, next)

  assert.strictEqual(nextCalled, true)
})