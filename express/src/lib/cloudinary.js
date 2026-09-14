import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config"

// Configuration

cloudinary.config({ 
    cloud_name: process.env.API_key_CLOUDINARY , 
    api_key: process.env.CLOUDINARY_NAME , 
    api_secret: process.env.API_SECRET_CLOUDINARY
});

export default cloudinary
