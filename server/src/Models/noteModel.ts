import mongoose from "mongoose"
import { IUser } from "./userModel"

interface INote extends mongoose.Document {
  title: string
  content: object
  isGroupNote: boolean
  collaborators: Array<IUser["_id"]>
  author: IUser["_id"]
}

const noteModel = new mongoose.Schema<INote>(
  {
    title: { type: String, default: "" },
    content: { type: Object, default: {} },
    isGroupNote: { type: Boolean, default: false },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Note = mongoose.model("Note", noteModel)
export { Note, INote }
