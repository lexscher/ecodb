// env variables
const dotenv = require('dotenv');
dotenv.config()

// Export variables

module.exports = {
  connectionString: process.env.MONGODB_ENV
}