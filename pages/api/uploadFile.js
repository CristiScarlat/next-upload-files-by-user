import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async (req, res) => {
    const userbaseId = req.cookies?.userbaseId?.replace(/"/g, '');
    if(!userbaseId){
        res.status(401).json({error: "not authenticated"});
        return;
    }
    const uploadPath = `public/uploads/${userbaseId}`;
    if (!fs.existsSync(`public/uploads/${userbaseId}`)){
        fs.mkdirSync(`public/uploads/${userbaseId}`);
    }
    const form = new formidable.IncomingForm();
    form.uploadDir = uploadPath;
    form.parse(req, (err, fields, files) => {
        if(files){
            Object.values(files).forEach(file => {
                console.log(file)
                fs.renameSync(uploadPath + '/' + file.newFilename, uploadPath + "/" + file.originalFilename, (error) => {
                    console.log(error);
                    res.status(500).json({error: error});
                    return;
                })
            })
        }
    });
    form.on('end', () => {
        res.status(201).json({status: "ok"})
    });
    form.on('error', (err) => {
        console.log(err);
        res.status(400).json({error: err});
    })
};

const get = async (req, res) => {
    const userbaseId = req.cookies.userbaseId.replace(/"/g, '');
    const uploadPath = `public/uploads/${userbaseId}`;
    if (fs.existsSync(`public/uploads/${userbaseId}`)){
        fs.readdir(uploadPath, (err, files) => {
            if(err)res.status(500).json({error: err})
            res.status(200).json({files})
        });
    }
    else {
        res.status(200).json({files: []})
    }

}

export default (req, res) => {
    switch(req.method){
        case "POST":
            post(req, res);
            break;
        case "DELETE":
            console.log(req.method);
            break;
        case "UPDATE":
            console.log(req.method);
            break;
        case "GET":
            get(req, res);
            break;
        default:
            res.status(404).send("");
    }
};
