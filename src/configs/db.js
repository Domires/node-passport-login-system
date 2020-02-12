require('dotenv').config()

const { connect } = require('mongoose')

module.exports = async function initializeMongoDBconnection() {
    const config = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
    try {
        await connect(process.env.MONGODB_URI, config)
    } catch (err) {
        console.log('error when starting connection', err)
    }
}