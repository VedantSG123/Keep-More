import asynchandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import { User } from "../Models/userModel"
import generateToken from "../Config/generateToken"

const registerUser = asynchandler(async(req:Request, res:Response) => {
  const { name, email, password } = req.body
  if(!name || !email || !password){
    res.status(400)
    throw new Error("Please enter all fields")
  }

  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error("User with this email already exists")
  }

  const user =await User.create({
    name,
    email,
    password
  })
  if(user){
    res.status(201).json({
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  }else{
    res.status(400)
    throw new Error("Failed to create User")
  }
})


const authUser = asynchandler(async (req:Request, res:Response) => {
  const { email, password } = req.body
  if(!email || !password){
    res.status(400)
    throw new Error("Please enter all fields")
  }
  const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))){
    res.json({
      _id:user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
    })
  }
})

export { registerUser, authUser }