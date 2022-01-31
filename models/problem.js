const mongoose = require('mongoose')

const mySchema = new mongoose.Schema({
    problem_id:{
        type:String,
        required:true,
        unique:true
    },
    problem_title:{
        type:String,
        required:true
    },
    problem_desc:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    constraints:[String],
    example_cases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String
            }
        }
    ],
    test_cases:{
        type:String,
        required:true
    },
    topic_tags:[String]
},{timestamps:true})

module.exports = mongoose.model('Problem',mySchema)