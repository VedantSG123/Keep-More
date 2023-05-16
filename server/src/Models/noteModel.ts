import mongoose from "mongoose"



const noteModel =new mongoose.Schema(
  {
    noteHeading:{type:String},
    isGroupNote:{type:Boolean, default:false},
    users:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    noteAuthor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps:true
  }
)

const Note = mongoose.model("Note", noteModel)
export { Note }
//note Heading
//isGroupNote
//users
//author of the Note

