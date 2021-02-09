const writeLogs = (req, res, next) => {
    console.log(`${new Date().toISOString()} - Request from ${req.ip}`);
    next();
}

module.exports = {
    writeLogs,
}