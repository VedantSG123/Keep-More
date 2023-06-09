interface User {
  _id: string
  password: string
  name: string
  email: string
  token: string
}

interface Note {
  _id: string
  title: string
  content: object
  color: string
  isGroupNote: boolean
  collaborators: Array<User["_id"]>
  author: User["_id"]
}

interface Request {
  _id: string
  sender: User["_id"]
  receiver: User["_id"]
  note: User["_id"]
  status: string
}

interface Collaborator {
  _id: string
  user: User["_id"]
  note: Note["_id"]
}

const emptyNote: Note = {
  _id: "",
  title: "",
  content: {},
  color: "",
  isGroupNote: false,
  collaborators: [],
  author: "",
}

export type { Note, User, Request, Collaborator }
export { emptyNote }
