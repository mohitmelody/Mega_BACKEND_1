import { Router } from "express";

// Import user controllers and middlewares (adjust paths as needed)
import { registerUser, loginUser, logOutUser, refreshAccessToken } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// User registration route
router.route('/register').post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

// User login route
router.route('/login').post(loginUser);

// Secured routes (require JWT verification)
router.route('/logout').post(verifyJWT, logOutUser);
router.route('/refresh-token').post(refreshAccessToken);

export default router;
