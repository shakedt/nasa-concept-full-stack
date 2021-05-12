const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

function existsLaunchWithId(launchId) {
    // return launches.has(launchId);
}

async function saveLaunch(launch) {
    const planet = planets.findOne({ 
        keplerName: launch.target
    });

    if (!planet) {
       throw new Error('No Matching Planet Was Found'); 
    }

    await launches.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches
        .find()
        .sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch[0].flightNumber;
}

async function getAllLaunches() {
   return await launches
    .find({}, { '_id': 0, '__v': 0 });
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero To Mastery', 'NASA'],
        flightNumber: newFlightNumber
    }); 

    await saveLaunch(newLaunch);
}

function abortLaunchById(launchId) {
    // big data style delete
    const aborted = launches.get(launchId);

    aborted.upcoming = false;
    aborted.success = false;

    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
}