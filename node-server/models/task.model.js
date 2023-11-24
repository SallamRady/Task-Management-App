const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        categories: {
            type: [String],
        },
        creator: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
