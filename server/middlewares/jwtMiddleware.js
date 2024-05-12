const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;
    console.log('token: ', token)

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET);
        // const userId = decoded.id;
        // req.userId = userId;
        // Attach the decoded token to the request object
        req.user = decoded;
        console.log(req.user);
        

        // Call the next middleware or route handler
        next();
        
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = jwtMiddleware;