// import {asyncHandler} from '../utils/asyncHandler.js';
const registerUser = async (req, res) => {
  res.status(201).json({message: 'User registered successfully'});
};
export {registerUser};