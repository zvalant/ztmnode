
const {getAllLaunches, scheduleNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model')

async function httpGetAllLaunches(req,res){
    return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req,res){
    const launch = req.body;
    if (!launch.launchDate || !launch.rocket || !launch.mission || !launch.target){
        return res.status(400).json({err: "missing information"});

    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)){
        return res.status(400).json({err: "invalid launch data"})
    }
    try{
        await scheduleNewLaunch(launch);
    }catch(error){
        return res.status(400).json({err: 'Launch could not be completed'})
    }
    
    return res.status(201).json(launch);
}
async function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch){
        return res.status(404).json({
            error: "launch not found",
        })
    }
    const aborted = await abortLaunchById(launchId);
    if (!aborted){
        res.status(400).json({error: 'Launch not aborted'});
    }
    return res.status(200).json({ok: true});


}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}