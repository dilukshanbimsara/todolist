const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    project_title:{
        type : String
    },
    project_description:{
        type : String
    },
    due_date:{
        type:String
    },
    start_date:{
        type:String
    },
    owner:{
        type:String
    },
    task:{
        type:Array
    }
    
},{
    collection:'project'
})

module.exports = mongoose.model('Project', Project)