import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  quesionText:{
    type:String,
    required:true
  },
  option:[{
    type:String,
  },
],
correctOption:{
  type:Number,
  required:true
},
// score:{
//   type: Number,
//   default: 0
// }
})

const paperSchema = new mongoose.Schema({
  paperName:{
    type: String,
    required: true
  },
  timeDuration:{
    type:Number,
    required: true,
  },
  paperMarks:{
    type: Number,
    required: true
  },
  questions:[questionSchema],

});

const courseTestSchema = new mongoose.Schema({
  testName:{
    type : String,
    required : true,
  },
  skillTags:[{
    type: String
  }],
  fullMarks:{
    type: Number,
    required: true
  },
  testDescription: {
    type: String,
    required: true
  },
  badges:[String],
  papers: [paperSchema]
}, {timestamps: true});

export default mongoose.model('CourseTest', courseTestSchema);