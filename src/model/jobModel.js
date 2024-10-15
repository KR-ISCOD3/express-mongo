import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{type:String,require:true},
    company:{type:String,require:true},
    location:{type:String,require:true},
    salary:{type:Number},
    type:{type:String,enum:["Full-time","Part-time","Contract","Internship"]},
    description:{type:String,require:true},
    postedDate:{type:Date,defalt:Date.now()},
    applyLink:{type:String}
});

const Job = mongoose.model("job",jobSchema);

export default Job;