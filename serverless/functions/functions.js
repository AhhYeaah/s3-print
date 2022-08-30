const { imageHash } = require('image-hash');
var multipart = require('parse-multipart');
const crypto = require('crypto')

function validateRequest(event) {
    if (!event || !event.headers['content-type'] || !event.body) {
        return {
            error: "Bad Gateway",
            status: 401
        }
    }
}

function getParsedFile(event) {
    //Gathering usefull information from request (Boundary and body).
    let header = event.headers["content-type"];
    let boundary = header.split(" ")[1];
    boundary = header.split("=")[1];

    //Parsing file that comes in base64 thanks to multipart/form-data
    try {
        let body = Buffer.from(event.body, 'base64');
        let parsedFile = multipart.Parse(body, boundary);
        return parsedFile[0]
    } catch (error) {
        throw error
    }
}

function promissifyedImageHash(parsedFile) {
    //Promissifying callback function
    return new Promise(function (resolve, reject) {
        imageHash({ data: parsedFile.data }, 16, true, (error, data) => {
            if (error) reject(error);
            else resolve(data)
        });
    });
}
function createNameForImage(parsedFile){
    return crypto.randomBytes(32).toString('hex') + "." + parsedFile.filename.split('.')[1]
}

module.exports = {
    createNameForImage: createNameForImage,
    promissifyedImageHash: promissifyedImageHash,
    getParsedFile: getParsedFile,
    validateRequest: validateRequest
}