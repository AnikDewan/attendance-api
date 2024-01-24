import mongoose from 'mongoose'

const teachersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Teacher = mongoose.model('teachers',teachersSchema);
Teacher.createIndexes();
export default Teacher;