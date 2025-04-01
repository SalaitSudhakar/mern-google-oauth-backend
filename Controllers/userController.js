import User from './../Models/userModel.js';
import bcrypt from 'bcryptjs';
import {errorHandler} from '../Utills/error.js'; // Ensure this utility exists for custom error handling

// Update user
export const updateUser = async (req, res, next) => {
  
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }

  try {
    const userId = req.params.id;

    // Extract fields from request
    let updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) updateData.profile = req.file.path; // Handle profile image

    // Update user in the database with new: true to get the updated document
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await updatedUser.save();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating User: ', error);
    next(error);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User has been deleted...' });
  } catch (error) {
    next(error);
  }
};
