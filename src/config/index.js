module.exports = {
  port: process.env.PORT || '3000',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/secret-chat',
  },
  sessionConfig: {
    secret: process.env.SESSION_SECRET_KEY || 'cutiecat',
    resave: false,
    saveUninitialized: true,
  },
  memberVerification: {
    question: process.env.VERIFICATION_QUESTION ||
      'What is the capital city of Indonesia',
    answer: process.env.VERIFICATION_ANSWER || 'jakarta',
  }
}