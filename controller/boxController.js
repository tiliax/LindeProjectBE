export const addBox = async (req, res) => {
    const {
        boxLocationCity,
        boxLocationX,
        boxLocationY,
        books,
        cloths,
        dishes,
        toys,
        shoes,
        decoration,
        gadgets,
        tools,
        dvd,
        videogames,
        currentUser,
    } = req.body;

    await userModel.updateOne(
        { _id: currentUser },
        {
            $push: {
                userBoxes: {
                    x: parseFloat(boxLocationX),
                    y: parseFloat(boxLocationY),
                    boxImagePath: req.file ? req.file.filename : null,
                    boxLocationCity: boxLocationCity,
                },
            },
        },
    );
    res.json({ success: true, user: currentUser });
};