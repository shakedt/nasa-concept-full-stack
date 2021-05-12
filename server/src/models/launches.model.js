const launches = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

async function existsLaunchWithId(launchId) {
    return await launches.findOne({
       flightNumber: launchId 
    });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({ 
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

async function abortLaunchById(launchId) {
    const aborted = await launches.updateOne({
        flightNumber: launchId
    }, {
        success: false,
        upcoming: false
    });

    return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById
}