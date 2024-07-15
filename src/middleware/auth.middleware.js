export const isAuthenticated = (req, res, next) => {
    if (req.session.DNI) {
        return next();
    }
    return res.status(401).json({ message: 'Sin autorización' });
};

export const isAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: 'Solo administradores' });
};

export const isUser = (req, res, next) => {
    if (req.session.role === 'user') {
        return next();
    }
    return res.status(403).json({ message: 'Solo usuarios' });
};