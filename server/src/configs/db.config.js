const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        const URI = process.env.MONGO_URI;
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database')
    } catch (error) {
        console.log(`Could not connect to the database. Exiting now... \n${error}`);
    }
}

module.exports = { connectDatabase }