import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            message: 'No Authorization Token in Cookie'
        });
    }
    try {
        const decode = jwt.verify(token, SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session Expired',
                error: error.message,
            });
        }
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenError) {
            return res.status(401).json({
                message: 'Invalid Token',
                error: error.message,
            });
        }
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            stack: error.stack
        });
    }
};

export const verifyAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: 'Admin role required'
        });
    }
    next();
};

export const verifyUserRole = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({
            message: 'User role required'
        });
    }
    next();
};


export const checkUserMatch = (req, res, next) => {
    const { id, email, username } = req.params;
    const { id: userId, email: userEmail, username: userUsername } = req.user;

    if (userId !== id || userEmail !== email || userUsername !== username) {
        return res.status(403).json({
            message: 'Unauthorized access, Only Created can delete Blog'
        });
    }
    next();
};
