const axios = require('axios');


const launchesDatabase = require('./launches.mongo');

const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100

let latestFlightNumber = 100;

const launch = {
flightNumber: 100,
mission: 'Kepler Exploration X',
rocket: 'Explorer IS1',
launchDate: new Date('December 27, 2030'),
target: 'Kepler-442 b',
customer: ['ZTM', 'NASA'],
upcoming: true, 
success: true,
};
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'
async function loadLaunchesData(){
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },{
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    })
}

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    })

}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase.findOne()
    .sort('-flightNumber');

    if (!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestLaunch.flightNumber;

}

async function getAllLaunches(){
    return await launchesDatabase.find({}, {
        '_id': 0, '__v': 0
    });
}
async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet){
        throw new Error('matching planet was not found');
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,

    }, launch, {
        upsert: true,
    })
}
async function scheduleNewLaunch(launch){
    const newFlightNumber = await getLatestFlightNumber()+1;
    const newLaunch = Object.assign(launch,{
        flightNumber: newFlightNumber,
        customer: ['ZTM', 'NASA'],
        upcoming: true, 
        success: true,

    });
    await saveLaunch(newLaunch);


}

async function abortLaunchById(launchId){
    const aborted =  await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount ===1;
}
module.exports = {
    loadLaunchesData,
    getAllLaunches,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById
}