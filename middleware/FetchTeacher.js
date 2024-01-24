import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env['JWT_SECRET']

const fetchTeacher = async (req, res, next) => {
	const authToken = req.header('auth-token');
	if(!authToken) {
		return res.status(401).json({error: 'No auth token provided'})
	}
	try {
		const data = jwt.verify(authToken, JWT_SECRET)
		req.teacher = data.teacher
		next()
	} catch {
		res.status(401).json({error: 'Invalid auth token'})
	}
}

export default fetchTeacher;
