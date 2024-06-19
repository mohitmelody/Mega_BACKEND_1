import { asynchandler } from '../utils/asynchandler.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js"
import { User } from "../Models/user.models.js"
const registerUser = asynchandler(async (req, res) => {
    // get user details by frontend
    // validation - not empty
    // check if user already  exists : username , email
    // check for images , check for avatar
    // upload them to cloudinary , avatar
    // user object - create entery in db 
    // remove password and refersh token fild for response 

    // check for user creation 
    // get user details by frontend
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
    const avatarloacalPath = req.files?.avatar[0]?.path
    const coverImagelocalapth = req.files?.coverImage[0]?.path


    if (!avatarloacalPath){
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
      const createdUser =  await User.findById(user._id).select("-password -refreshToken")

      if (!createdUser){
       throw new ApiError(500 ," something wrong ") 
      }

      return res.status(201).json(
        new ApiResponse(200, createdUser , " user registered succfesfully ")
      )
})
// check if empty 
 
export {
    registerUser,
}