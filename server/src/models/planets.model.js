const csvParse = require('csv-parse');
const planets = require('./planets.mongo');
const fs = require('fs');
const path = require('path');

const isHabitablePlanet = (planet) => {
    const isConfirmed  = planet['koi_disposition'] === 'CONFIRMED';
    const isLow = planet['koi_insol'] > 0.36;
    const isHigh = planet['koi_insol'] < 1.11;
    const isRadius = planet['koi_prad'] < 1.6;

    return isConfirmed && isLow && isHigh && isRadius; 
}

function loadPlantsData() {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(csvParse({
            comment: '#',
            columns: true
        }));

        stream.on('data', async (data) => {
            if (isHabitablePlanet(data))  {
               savePlanet(data);
            }
        });
        
        stream.on('error', (err) => {
            reject(err);
        });

        stream.on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;

            console.log(`${countPlanetsFound} habitable plants found`);
            resolve();
        });
    });
}


async function getAllPlanets() {
    return await planets.find({}, {
         "__v": 0,
         "_id": 0
    });
};

async function savePlanet(planet) {
    try {
     await planets.updateOne({
        keplerName: planet.kepler_name
        }, {
        keplerName: planet.kepler_name
        }, {
        upsert: true
    });
    } catch(err) {
        console.error(`Could not save plant ${err}`);
    }

}

module.exports = {
    loadPlantsData,
    getAllPlanets
};