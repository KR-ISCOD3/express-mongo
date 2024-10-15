import Job from "../model/jobModel.js"

export const get_data = async (req,res) => {
    try{
        const allJobs = await Job.find();
        res.status(200).json({
            message:"Job here is available",
            jobs: allJobs
        })
    }catch(err){

    }
}

export default{
    get_data
}