import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'                               // middleware qui catch les erreurs, on peut alors omettre try-catch
import generateToken from "../routes/utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })                            // Trouve l'usagé dans la DB
  if (user && (await user.matchPassword(password))) {                   // Si pw match, 
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


// @desc    Enregistre un nouvel usagé
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await User.create({ name, email, password })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Obtient le profil de l'usagé
// @route   GET /api/users/profile
// @access  Private
// Le middleware 'protect' est appliqué dans userRoutes 
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


export { authUser, registerUser, getUserProfile }