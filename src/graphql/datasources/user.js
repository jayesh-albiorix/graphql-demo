const UserModel = require('./../../models/user');
const bcrypt = require("bcrypt");

const getUserList = async () => {
    try {
        const userList = await UserModel.find();
        return {
            data: userList
        }

    } catch (error) {
        throw new Error("getting list failed")
    }
}
const getUser = async (_id) => {
    try {
        const user = await UserModel.findById(_id);
        console.log('user: ', user);

        return user
    } catch (error) {
        throw new Error("Getting user failed")
    }
}
const addUser = async (postData) => {
    try {
        encryptedPassword = await bcrypt.hash(postData.password, 10);
        postData.password = encryptedPassword;
        return await UserModel.create(postData);

    } catch (error) {
        throw new Error("Add user failed")
    }
}
const updateUser = async (_id, postData) => {
    try {
        const updatedUser = await UserModel.findOneAndUpdate({ _id: _id }, postData, { new: true });
        if (!updatedUser) {
            throw new Error("Document Not Found");
        }
        return updatedUser;

    } catch (error) {
        throw new Error(error.message || "Update user failed")
    }
}
const removeUser = async (_id) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(_id)
        console.log('deletedUser: ', deletedUser);
        if (!deletedUser) throw new Error("Document Not Found")

        return deletedUser
    } catch (error) {
        console.log('error: ', error.message);
        throw new Error(error.message || "Delete user failed")

    }
}

module.exports = {
    getUserList: getUserList,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    removeUser: removeUser
}