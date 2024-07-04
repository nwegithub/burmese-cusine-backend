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


const register = async (req,res,next) =>{

    let nameUser = await DB.findOne({name: req.body.name})
    if(nameUser){
        next(new Error("Name is already in use"))
        return
    }

    let emailUser = await DB.findOne({name: req.body.email})
    if(emailUser){
        next(new Error("Email is already in use"))
        return
    }

    let phoneUser = await DB.findOne({name: req.body.phone})
    if(phoneUser){
        next(new Error("phone is already in use"))
        return
    }

    req.body.password = helper.encode(req.body.password)
    let result = await new DB(req.body).save();

    helper.fMsg(res,"register success", result)

}
 module.exports = {
    register,login
 }