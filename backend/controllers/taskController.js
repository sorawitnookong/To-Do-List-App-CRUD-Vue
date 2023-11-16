const taskModel = require('../models/taskModel');

module.exports.getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.saveTask = async (req, res) => {
    try {
        const { text } = req.body;
        const newTask = await taskModel.create({ text });
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.updateTask = async (req, res) => {
    try {
        const { _id, text } = req.body;
        await taskModel.findByIdAndUpdate(_id, { text });
        res.json({ message: "Updated Successfully..." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        const { _id } = req.body;
        await taskModel.findByIdAndDelete(_id);
        res.json({ message: "Deleted Successfully..." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
