const DB = require('../db/user')
const helper = require('../utils/helper')



const login = async (req, res, next) => {
    try {
        let phoneUser = await DB.findOne({ phone: req.body.phone });

        if (phoneUser) {
            if (helper.comparePass(req.body.password, phoneUser.password)) {
                let user = phoneUser.toObject();
                user.token = helper.makeToken(user);
                await DB.updateOne({ _id: phoneUser._id }, { token: user.token });

                return helper.fMsg(res, "Login success", user);
            } else {
                return next(new Error("Credential error"));
            }
        } else {
            return next(new Error("Credential error"));
        }
    } catch (err) {
        return next(err); // Handle any unexpected errors
    }
};


const register = async (req, res, next) => {

    let nameUser = await DB.findOne({ name: req.body.name })
    if (nameUser) {
        next(new Error("Name is already in use"))
        return
    }

    let emailUser = await DB.findOne({ name: req.body.email })
    if (emailUser) {
        next(new Error("Email is already in use"))
        return
    }

    let phoneUser = await DB.findOne({ name: req.body.phone })
    if (phoneUser) {
        next(new Error("phone is already in use"))
        return
    }

    req.body.password = helper.encode(req.body.password)
    let result = await new DB(req.body).save();

    helper.fMsg(res, "register success", result)

}


const updateProfile = async (req, res) => {
    try {
        const userId = await DB.findById(req.params.id);

        if (!userId) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if a file is uploaded
        if (req.file) {
            // Include the path of the uploaded file in the update
            req.body.profileImage = req.file.path;
        }

        console.log('req.params:', req.params);
        console.log('req.body:', req.body);

        // Update the user profile
        const updatedUser = await DB.findByIdAndUpdate(
            userId._id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Profile image updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
    register, login, updateProfile
}