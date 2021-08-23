const TodoModel = require('./../../models/todo');

const getTodoList = async () => {
    try {
        const postList = await TodoModel.find();

        return {
            data: postList
        }
    } catch (err) {
        console.log(err)
        throw new Error("getting list failed")
    }
}

const getTodo = async (_id) => {
    try {
        const todo = await TodoModel.findById(_id);

        return todo
    } catch (error) {
        throw new Error("getting list failed")
    }
}

const addTodo = async (postData) => {
    try {
        return await TodoModel.create(postData);
    } catch (error) {
        throw new Error("Add todo failed")
    }
}

const updateTodo = async (_id, postData) => {
    try {
        const updatedTodo = await TodoModel.findOneAndUpdate({ _id: _id }, postData, { new: true });
        if (!updatedTodo) {
            throw new Error("Document Not Found");
        }
        return updateTodo;

    } catch (error) {
        throw new Error(error.message || "Update todo failed")
    }
}

const removeTodo = async (_id) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(_id)
        console.log('deletedTodo: ', deletedTodo);
        if (!deletedTodo) throw new Error("Document Not Found")

        return deletedTodo
    } catch (error) {
        console.log('error: ', error.message);
        throw new Error(error.message || "Delete todo failed")

    }
}


module.exports = {
    getTodoList: getTodoList,
    getTodo: getTodo,
    addTodo: addTodo,
    updateTodo: updateTodo,
    removeTodo: removeTodo
};