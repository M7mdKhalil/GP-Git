const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:'dar969tda',
    api_key:491892666858591,
    api_secret:'BH_RvE_zxpIHy73rspDFnkVqd1o'
})

const storage = new CloudinaryStorage({
    cloudinary,
    folder:'HireHup',
    allowedFormats:['jpeg','jpg','png']
})

module.exports ={
    cloudinary,
    storage
}