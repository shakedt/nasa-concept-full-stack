const http = require('http');
const mongose = require('mongoose');

const app = require('./app');

const MONGO_URL = 'mongodb+srv://nasa-api:v5ZbESztkLjpSNE2@nasa-cluster.ibwcj.mongodb.net/nasa?retryWrites=true&w=majority';

const {
    loadPlantsData
} = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

mongose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongose.connection.on('error', (err) => {
    console.error(`this is a mongodb error`);
    console.error(err);
});

async function startServer() {
    await mongose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    await loadPlantsData();
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

startServer();