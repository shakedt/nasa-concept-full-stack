const launches = new Map();

let latestFlightNumber = 100;

const launch = {
     flightNumber: latestFlightNumber,
     missionName: 'Kepler Exploration X',
     rocketName: 'Explorer IS1',
     launchDate: new Date('December 27, 2030'),
     target: 'Kepler-442 b',
     customers: ['ZTM', 'NASA'],
     upcoming: true,
     success: true
 };

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    launches.set(
        ++latestFlightNumber,
        Object.assign(launch, {
            upcoming: true,
            success: true,
            flightNumber: latestFlightNumber,
            customers: ['Zero To Mastery', 'NASA'],
        })
    );
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