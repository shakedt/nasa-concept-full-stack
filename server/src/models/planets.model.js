const csvParse = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

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

        stream.on('data', (data) => {
            if (isHabitablePlanet(data)) habitablePlanets.push(data);
        });
        
        stream.on('error', (err) => {
            reject(err);
        });

        stream.on('end', () => {
            const namedResults = habitablePlanets.map((planet) => {
                return planet.kepler_name;
            });

            resolve();
        });
    });
}


function getAllPlanets() {
    return habitablePlanets;
}
module.exports = {
    loadPlantsData,
    getAllPlanets
};