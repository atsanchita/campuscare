import { registerUser } from "./auth.service.js";

import generateToken from "../../utils/generateToken.js";
import { loginUser } from "./auth.service.js";

import asyncHandler from "../../utils/asyncHandler.js";

// export const register = async (req, res) => {
//   try {
//     const user = await registerUser(req.body);

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: {
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   }
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const register = asyncHandler(async (req, res) => {

    const user = await registerUser(req.body);

    res.status(201).json({

        success: true,

        data: {

            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

        },

    });

});

//same for login
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await loginUser(
//       email,
//       password
//     );

//     const token = generateToken(user._id);

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};