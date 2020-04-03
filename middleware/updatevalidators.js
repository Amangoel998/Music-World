const moment = require('moment');
const artistupdatevalidators = function(req, res, next){
    if(!req.body.artist_id){
        const payload = {
            error: "Must provide which Artist to Update"
        }
            res.status(400).json(payload);
    }
    if(!req.body.name && !req.body.dob && !req.body.bio){
        const payload = {
        error: "Must contain 1 Field to Change"
    }
        res.status(400).json(payload);
    }
    else if(req.body.name && req.body.name.trim().length<3){
        const payload = {
            error: "Artist Name must be of atleast 3 length"
        }
        res.status(400).json(payload);
    }else if(req.body.dob && !moment(req.body.dob, 'YYYY-MM-DD', true).isValid()){
        const payload = {
            error: "Wrong Date format {YYYY-MM-DD}"
        }
        res.status(400).json(payload);
    }else if(req.body.bio && req.body.bio.trim().length<10){
        const payload = {
            error: "Artist Bio must be of atleast 10 length"
        }
        res.status(400).json(payload);
    }
    next();
}
const songupdatevalidators = function(req, res, next){
    if(!req.body.song_id){
        const payload = {
            error: "Must provide which Song to Update"
        }
            res.status(400).json(payload);
    }
    if(!req.body.name && !req.body.releasedate && !req.body.album){
        const payload = {
        error: "Must contain 1 Field to Change"
    }
        res.status(400).json(payload);
    }
    if(req.body.name && req.body.name.trim().length<3){
        const payload = {
            error: "Song Name must be of atleast 3 length"
        }
        res.status(400).json(payload);
    }else if(req.body.releasedate && !moment(req.body.releasedate, 'YYYY-MM-DD', true).isValid()){
        const payload = {
            error: "Wrong Date format {YYYY-MM-DD}"
        }
        res.status(400).json(payload);
    }else if(req.body.album && req.body.album.trim().length<3){
        const payload = {
            error: "Album Name must be of atleast 3 length"
        }
        res.status(400).json(payload);
    }
    next();
}
module.exports = {
    artistupdatevalidators,
    songupdatevalidators
}