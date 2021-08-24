const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/')
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '-'+ Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req,file, cb)=>{
        const filter = /jpeg|png|gif|jpg/
        const extCheck = filter.test(path.extname(file.originalname).toLowerCase())
        const mimeCheck = filter.test(file.mimetype)
        if(extCheck && mimeCheck){
            cb(null,true)
        }else{
            cb("Only images are allowed")
        }
    }
}).single('userImage')

module.exports = upload