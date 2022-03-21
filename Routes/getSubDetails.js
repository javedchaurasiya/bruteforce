const router=require('express').Router()
const submission=require('../models/submission')
const problem=require('../models/problem')


router.post('/',async(req,res)=>{
    try {
        const {submission_id}=req.body;
        const response=await submission.findOne({submission_id})
        // console.log(response);
        const response1=await problem.findOne({problem_id:response.problem_id})
        // console.log(response1);
        if(!response)return res.status(404).json({error:'Not found'});
        else{
            var result={...response._doc,title:response1.title};
            // console.log(result);
            return res.status(200).json({result})
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({error})
    }
})

module.exports=router