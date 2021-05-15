const http = require('http');

const app = require('./app');

const { 
    mongoConnect
} = require('./services/mongo');
const {
    loadPlantsData
} = require('./models/planets.model');
const {
    loadLaunchesData
} = require('./models/launches.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


async function startServer() {
    await mongoConnect();    
    await loadPlantsData();
    await loadLaunchesData();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

startServer();