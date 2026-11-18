const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = async () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("DB Connection Successful.");

        }) .catch((error) => {
            console.log("DB Connection Issue.");
            console.error(error);
            process.exit(1);
        });
}


// const startServer = async () => {
//     try {
//         await database.dbConnect();

//         cloudinary.cloudinaryConnect();

//         app.listen(PORT, () => {
//             console.log(`App is running Successfully at Port Number: ${PORT}`);
//         });

//     } catch (error) {
//         console.error("Server Startup Error:", error);
//         process.exit(1);
//     }
// };

// startServer();