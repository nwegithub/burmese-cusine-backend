const DB = require('../db/user')
const helper = require('../utils/helper')



const login = async (req, res, next) => {
    try {
        console.log("Phone from request:", req.body.phone);

        let phoneUser = await DB.findOne({ phone: req.body.phone });

        if (!phoneUser) {
            console.log("User not found");
            return next(new Error("Credential error"));
        }

        // console.log("Stored password:", phoneUser.password);
        // console.log("Entered password:", req.body.password);

        const isPasswordValid = helper.comparePass(req.body.password, phoneUser.password);
        console.log("Password valid:", isPasswordValid);

        if (isPasswordValid) {
            let user = phoneUser.toObject();
            user.token = helper.makeToken(user);
            await DB.updateOne({ _id: phoneUser._id }, { token: user.token });

            return helper.fMsg(res, "Login success", user);
        } else {
            return next(new Error("Credential error"));
        }
    } catch (err) {
        return next(err);
    }
};



const register = async (req, res, next) => {
    try {
        let phoneUser = await DB.findOne({ phone: req.body.phone });
        if (phoneUser) {
            throw new Error("Phone number is already in use");
        }

        let emailUser = await DB.findOne({ email: req.body.email });
        if (emailUser) {
            throw new Error("Email is already in use");
        }

        req.body.password = helper.encode(req.body.password);
        let result = await new DB(req.body).save();

        helper.fMsg(res, "Register success", result);
    } catch (err) {
        next(err);
    }
};



const getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Get user ID from the request parameters
      const user = await DB.findById(userId).select('-password'); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  };
 

  // Controller function to get all users
  const getAllUsers = async (req, res) => {
    try {
      const users = await DB.find(); // Fetch all users from the database
      res.status(200).json(users); // Send the users as a JSON response
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
  };


module.exports = {
    register, login,getUserById,getAllUsers

}