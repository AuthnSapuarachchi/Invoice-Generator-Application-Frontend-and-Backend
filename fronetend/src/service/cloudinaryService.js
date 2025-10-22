import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", "Invoice_thumbnail");
    formData.append("cloud_name", "dwyypqs8g");


    const response = await axios.post(`https://api.cloudinary.com/v1_1/dwyypqs8g/image/upload`, formData);
    
    return response.data.secure_url;


}   