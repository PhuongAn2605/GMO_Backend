const uploads = async (req, res, next) => {
    const image = req.file.path;

    res.json({ image })
}

exports.uploads = uploads;