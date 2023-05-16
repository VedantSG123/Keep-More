import mongoose from "mongoose"

const ConnectDB = async() => {
  try{
    const connection = await mongoose.connect(process.env.MONGO_DB_URL as string)
    console.log(`MongoDB connected to ${connection.connection.host}`)
  }
  catch(err){
    console.log(`Failed to connect to MongoDB`)
  }
}

export default ConnectDB