export const isAuthenticated = (res, req, next) => {
    if(req.session.DNI) {
        return next();
    }
    return res.status(401).json({ message: 'No autorizado' })
}