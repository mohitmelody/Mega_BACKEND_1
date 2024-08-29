import { asynchandler } from '../utils/asynchandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import jwt from 'jsonwebtoken'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js"
import { User } from "../Models/user.models.js"

// get user details by frontend
// validation - not empty
// check if user already  exists : username , email
// check for images , check for avatar
// upload them to cloudinary , avatar
// user object - create entery in db 
// remove password and refersh token fild for response 
// check for user creation 
// get user details by frontend

const registerUser = asynchandler(async (req, res) => {

    const { username, email, password, fullName } = req.body
    console.log(`${username} ,${email} ,${password},${fullName}`)
    // if(fullName === ""){
    //     throw new ApiError( 400 ,"fullname is required ")
    // }
    // validation - not empty
    if (
        [
            fullName, username, password, email
        ].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, " all fields are required")
    }

    // check if user already  exists : username , email
    const checkExisted = User.findOne({
        $or: [{ username }, { email }]
    })
    if (checkExisted) {
        throw new ApiError(409, " your are already register")
    }
    // check for images , check for avatar
    // middleware bhi kuch method deta hai like request body ke andhar kuch extra field dalta hai 
    const avatarloacalPath = req.files?.avatar[0]?.path
    const coverImagelocalapth = req.files?.coverImage[0]?.path


    if (!avatarloacalPath) {
        throw new ApiError(400, " avatar file is required ")

    }
    const avatar = await uploadOnCloudinary(avatarloacalPath)
    const coverImage = await uploadOnCloudinary(coverImagelocalapth)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required ")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, " something wrong ")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, " user registered succfesfully ")
    )
})

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById({ userId })
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        // access token user ko de dete hai but db se save nahi rakte hai // refersh token ko save rakte hai in db
        user.refreshToken = refreshToken
        await user.save({ validateBeforesave: false })


        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating refersh token and access token ")
    }
}
// req.body se data 
// username and email both valid hai nahi 
//find the user 
//password check
// access and refreshtoken 
//send cookies 
const loginUser = asynchandler(async (req, res) => {

    const { email, username, password } = req.body
    if (!username && !email) {
        throw new ApiError(400, "username or email is required ")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, " user does not exist ")

    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (isPasswordValid) {
        throw new ApiError(401, "password is invalid")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    // cookies me kya kya bhejna hai 
    const loggedinUser = await User.findById(user._id).select("-password -refreshToken")


    // this code means it modify by server only
    const options = {
        httpOnly: true,
        secure: true

    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken ", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedinUser, accessToken, refreshToken
                }
                , "user logged in sucessfully"
            )
        )

})

const loggOutUser = asynchandler(async (req, res) => {
    // cookies ko manage karo 
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        },
    )


    const options = {
        httpOnly: true,
        secure: true


    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccesstoken = asynchandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorizes error")
    }
    try {
        const decodedtoken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = User.find(decodedtoken?._id)
        if (!user) {
            throw new ApiError(401, "unauthorized error ")


        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or user  ")
        }
        const options = {
            httpOnly: true,
            secure: true

        }
        await generateAccessAndRefreshToken(user._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                ),
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")

    }


})

const changeCurrentPassword = asynchandler(async(req,res)=>{
    const {oldPassword, newPassword} = req.body
    const user = User.findById(req.user?.id)
    await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }
    user.password = newPassword
    await user.save({validateBeforeSave: false})

    
    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})



export {
    registerUser,
    loginUser,
    loggOutUser,
    changeCurrentPassword,
}
