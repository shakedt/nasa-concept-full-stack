const http = require('http');

const app = require('./app');

const {
    loadPlantsData
} = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
    await loadPlantsData();
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

startServer();