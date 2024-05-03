import AuthentiCation from "../middleware/authentication.js";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';

const userController = {
    signupController: async (req, res) => {
        try {
            const { username, email, mobile, password, confirm_password, name, isAdmin } = req.body;
            const saltRounds = 10;

            if (password !== confirm_password) {
                return res.status(403).json({ status: false, message: 'Passwords do not match' });
            }

            const hashPassword = await bcrypt.hash(password, saltRounds);
            const user = await UserModel.create({
                name, username, email, mobile, password: hashPassword, isAdmin
            });

            if (!user) {
                return res.status(403).json({ status: false, message: 'Some error occurred while creating user' });
            }
            res.status(200).json({ status: true, message: 'User registered successfully', user: user });

        } catch (error) {
            res.status(500).json({ message: "Internal server error", success: false, error: error.message });
            console.error(error.message);
        }
    },

    loginController: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: "Email and password are required." });
            }

            const user = await UserModel.findOne({ email: email });

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found." });
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if (!comparePassword) {
                return res.status(401).json({ success: false, message: "Incorrect password." });
            }

            const token = AuthentiCation.generateToken(user._id)

            res.status(200).json({ success: true, message: "User authenticated successfully.", user,token });

        } catch (error) {
            console.error("Error in login:", error);
            res.status(500).json({ success: false, message: "Internal server error." });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json({ success: true, users });
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({ success: true, user });
        } catch (error) {
            console.error('Error getting user by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({ success: true, message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            console.error('Error updating user by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            console.error('Error deleting user by ID:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

export default userController;
