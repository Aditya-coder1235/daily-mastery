const multer=require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
})


const upload=multer({
    storage,
    limits:{fileSize:4 *1024*1024},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true)
        }else{
            cb(new Error('Only images allowed'));
        }
    }
});

module.exports=upload