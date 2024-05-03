exports.serverError = (res) => (err) => {
    console.log(err);
    res.status(500).json({
        error: {
            msg: err.message,
        },
        msg: 'Cannot process response at this time. Please try again shortly.'
    });
};
