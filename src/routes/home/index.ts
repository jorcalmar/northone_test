export const homeController = (_req, res, next) => {
    res.send(200, {
        info: 'Homepage reached'
    })
    return next();
}