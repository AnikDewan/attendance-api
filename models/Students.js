import mongoose from 'mongoose'

const studentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    presence: {
        type: String,
        default: ""
    },
    sec: {
        type: mongoose.Schema.Types.ObjectId,
			  ref: 'classes',
        required: true
		}
});

const Student = mongoose.model('students',studentsSchema);
Student.createIndexes();
export default Student;