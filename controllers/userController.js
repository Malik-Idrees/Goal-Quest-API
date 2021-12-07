import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import UserProfile from '../models/userProfileModel.js'
import generateToken from '../utils/generateToken.js'

// @desc      Auth user & get token
// @route    POST /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// @desc     Register a user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    const currentUser = req.user

    const userProfileData = await UserProfile.findOne({
        // user: { _id: currentUser._id }
        currentUser,
    })
    .populate("user")

    if (userProfileData) {
        res.status(200).json({
            // username: userProfileData.user.name,
            // email: userProfileData.user.email
            userProfileData
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


//@desc     Create user profile
//@route    POST /api/users/profile
//@access   Private
const createUserProfile = asyncHandler(async (req, res) => {
    const { profession, goalToAchieve, expertiseLevel, dailyTime } = req.body

    const currentUser = req.user

    const profileExist = await UserProfile.findOne({
        user: { _id: currentUser._id },
    })

    let profile

    if (!profileExist) {
        profile = await UserProfile.create({
            user: currentUser._id,
            profession,
            goalToAchieve,
            expertiseLevel: expertiseLevel.toLowerCase(),
            dailyTime,
        })
        return res.status(201).json(profile)
    }

    res.status(404)
    throw new Error('Profile Already Exists')
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export {
    authUser,
    registerUser,
    getUserProfile,
    createUserProfile,
    updateUserProfile,
}
