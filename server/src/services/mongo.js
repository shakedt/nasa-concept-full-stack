const mongose = require('mongoose');

const MONGO_URL = 'mongodb+srv://nasa-api:v5ZbESztkLjpSNE2@nasa-cluster.ibwcj.mongodb.net/nasa?retryWrites=true&w=majority';

mongose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongose.connection.on('error', (err) => {
    console.error(`this is a mongodb error`);
    console.error(err);
});

async function mongoConnect() {
    await mongose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}
module.exports = {
    mongoConnect,
    mongoDisconnect
};