const mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/Rent&Drive';
if (process.env.NODE_ENV === 'production') {
    console.log("Trying connection to Mongodb Atlas");
    dbURI = process.env.MONGODB_CLOUD_URI;
}
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${dbURI}.`);
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose error on connection: ', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is not connected.');
});

const pravilnaZaustavitev = (message, povratniKlic) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose closed the connection with '${message}'`);
        povratniKlic();
    });
};

// Ponovni zagon nodemon
process.once('SIGUSR2', () => {
    pravilnaZaustavitev('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// Izhod iz aplikacije
process.on('SIGINT', () => {
    pravilnaZaustavitev('exit from application', () => {
        process.exit(0);
    });
});

// Izhod iz aplikacije na Heroku
process.on('SIGTERM', () => {
    pravilnaZaustavitev('exit from application on Heroku', () => {
        process.exit(0);
    });
});

require('./user');
require('./vehicle');