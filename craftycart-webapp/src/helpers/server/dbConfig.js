import mongoose from 'mongoose';

export async function connect() {
    try {
        const options = {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            
            //useFindAndModify: false,
            //useCreateIndex: true,
          };

        mongoose.connect(process.env.MONGO_URI, options);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ', err);
        });
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }
}