const UserModel = require('./../../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userLogin = async (payload) => {
    try {
        const user = await UserModel.findOne({ email: payload.email });
        if (!user) {
            throw new Error("user not found")
        }
        const validPassword = await bcrypt.compare(
            payload.password,
            user.password
        );

        if (!validPassword) {
            throw new Error("Email or Password does not match")
        }
        const token = jwt.sign({ id: user._id }, "jwtsecretkey", { expiresIn: '20d' });

        return {
            user: user,
            auth_token: token
        }

    } catch (error) {
        console.log('error: ', error);
        throw new Error("login failed", error)
    }
}

module.exports = {
    userLogin: userLogin
}