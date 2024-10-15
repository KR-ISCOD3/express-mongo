import Job from "../model/jobModel.js";

export const get_data = async(req,res) => {
    try{
        // find all jobs
        const jobs = await Job.find();
        // res all jobs
        res.status(200).json({
            jobs: jobs
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}
export const post_data = async (req,res) => {
    try{

        // get data from request
        const { title, company, location, salary, type, description,applyLink } = req.body;

         // Basic validation (you can expand this based on your requirements)
         if (!title || !company || !location || !salary || !type || !description || !applyLink) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        // create a new job
        const newjob = new Job({
            title,
            company,
            location,
            salary,
            type,
            description,
            applyLink
        })

        // save to database
        await newjob.save();

        // resposne result
        res.status(200).json({
            message: "Job saved successfully",
            Job: newjob
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}
export const put_data = async (req,res) => {
    try{
        // get id from params
        const { id } = req.params;
        // update job in database
        const updateJob = await Job.findByIdAndUpdate(id,req.body,{ new:true });

        // check job is available or not
        if(!updateJob){
            return res.status(404).json({
                message:"Job not found"
            })
        }
        // res data back if update already
        res.status(200).json({
            message: "Job updated successfully",
            Job: updateJob
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}
export const del_data = async (req,res) => {
    try{
        const { id } = req.params;
        const deleteJob = await Job.findByIdAndDelete(id);

        if(!deleteJob){
            return res.status(404).json({
                message:"Job not found"
            })
        }
        res.status(200).json({
            message: "Job delete successfully 🙄",
            Job: deleteJob
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

export default{
    get_data,
    post_data,
    put_data,
    del_data,
};