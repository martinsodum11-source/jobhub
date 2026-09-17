const validateJob = (req, res, next) => {
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

  const requiredFields = {
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
  }

  const missingFields = Object.entries(
    requiredFields
  )
    .filter(
      ([, value]) =>
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
    )
    .map(([field]) => field)

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: 'Please provide all required job fields',
      missingFields,
    })
  }

  if (!Array.isArray(requirements)) {
    return res.status(400).json({
      message: 'Requirements must be an array',
    })
  }

  if (!Array.isArray(benefits)) {
    return res.status(400).json({
      message: 'Benefits must be an array',
    })
  }

  if (!Array.isArray(skills)) {
    return res.status(400).json({
      message: 'Skills must be an array',
    })
  }

  if (type && ![
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
  ].includes(type)) {
    return res.status(400).json({
      message: 'Invalid job type',
    })
  }

  next()
}

module.exports = {
  validateJob,
}