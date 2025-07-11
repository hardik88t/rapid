import mongoose from 'mongoose';

export const connectToMongoDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI);
        console.log("=====MongoDB is Connected=====".green.bold.italic);
    } catch (error) {
        console.log("=====++++++MongoDB Error++++++=====".green.bold.italic);
        console.error(error.green);
    }
};
