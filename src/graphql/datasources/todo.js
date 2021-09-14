const TodoModel = require('./../../models/todo');

const getTodoList = async (page, limit, searchVal) => {
    try {
        const skipValue = page ? ((parseInt(page) - 1) * parseInt(limit)) : 0;
        const limitValue = parseInt(limit) || 2;
        console.log('skipValue: ', skipValue);

        // const postList = await TodoModel.find().sort(
        //     { _id: 1 }).limit(limitValue).skip(skipValue);


        const [{ data, meta: [meta] }] = await TodoModel.aggregate([
            {
                $match: searchVal ? { $text: { $search: searchVal } } : {}
            },
            {
                $sort: { "createdAt": 1 }
            },
            {
                $facet: {
                    meta: [
                        { $count: "total" }
                    ],
                    data: [
                        { $skip: skipValue },
                        { $limit: limitValue }
                    ]
                }
            },
            {
                $addFields: {
                    meta: {
                        $cond: [
                            { $eq: ["$meta", []] },
                            [{ total: 0 }],
                            "$meta"
                        ]
                    }
                }
            }
        ])

        console.log('skipValue * limitValue: ', ((page) * limit));
        console.log('limitValue: ', limit);
        console.log('skipValue: ', page);
        console.log('meta: ', meta);
        meta.hasMore = ((page * limit) >= meta.total) ? false : true
        // console.log(postList[0]);
        // console.log(postList[0].metadata);
        // console.log(postList[0].data);
        return {
            data,
            meta
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