const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

function existsLaunchWithId(launchId) {
    // return launches.has(launchId);
}

async function saveLaunch(launch) {
    const planet = planets.findOnce({ 
        keplerName: launch.target
    });

    if (!planet) {
       throw new Error('No Matching Planet Was Found'); 
    }

    await launches.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function getLatestFlightNumber() {
    const latestFlightNumber = 100;
    const latestLaunch = await launches
        .find()
        .sort('-flightNumber');

    if (latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches() {
   return await launches
    .find({}, { '_id': 0, '__v': 0 });
}

function addNewLaunch(launch) {
    // launches.set(
    //     ++latestFlightNumber,
    //     Object.assign(launch, {
    //         upcoming: true,
    //         success: true,
    //         flightNumber: latestFlightNumber,
    //         customers: ['Zero To Mastery', 'NASA'],
    //     })
    // );
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
    addNewLaunch,
    abortLaunchById
}