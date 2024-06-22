import { Router } from "express"

import { registerUser, loginUser } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middlewares.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { verify } from "jsonwebtoken"
import {refreshAccesstoken } from '../controllers/user.controllers.js'
const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1

        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)
router.route('./login').post(loginUser)

// secured routes

 router.route('/logout').post(verifyJWT , logOutUser)

 router.route("/refresh-token").post(refreshAccesstoken)

export default router
