module.exports = {
  port: process.env.PORT || '3000',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/secret-chat',
  }
}