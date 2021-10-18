const multer = require("multer")
const path = require("path")


module.exports = {
    upload_any_single_file: function(req, res){
        const dir = path.join(__dirname, "../assets")
        const upload = multer({
            dest: dir
        })

        const result = upload.single("profile")
        console.log(dir)
        res.json({
            msg: "Kuch to hua hai",
            result: result
        })
    }
}