// middleware/auth.js

// Example middleware for authentication
// for deleting the Events 

export const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) { // Assuming you're using a method like `req.isAuthenticated()`
        return next();
    }
    res.status(401).json({ message: 'Unauthorized access' });
};

// Example middleware for authorization
export const isAuthorized = (requiredRole, resource) => {
    return (req, res, next) => {
        // Example check for user roles (adjust to your application's logic)
        if (req.user && req.user.roles.includes(requiredRole)) {
            return next();
        }
        res.status(403).json({ message: `Forbidden: Insufficient permissions to ${requiredRole} ${resource}` });
    };
};
