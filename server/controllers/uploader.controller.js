var Busboy = require('busboy');
var fs = require('fs');
var path = require('path');
var Transform = require('stream').Transform;
var crypto = require('crypto');
var sharp = require('sharp');

var TMP_DIR = require('os').tmpDir();

exports.postUpload = function (req, res) {
    var app = req.app;
    var UPLOADS_ROOT = app.get('UPLOADS_ROOT');
    var uploadsConf = req.app.get('conf').uploads;
    var allowedUploadTypes = Object.keys(uploadsConf);
    var type = req.params.type;

    if (allowedUploadTypes.indexOf(type) === -1) {
        return res.status(400).json({ errors: ['Illegal upload type']});
    }

    var typeConf = uploadsConf[type];
    var busboy = new Busboy({ headers: req.headers });
    var uploadPromise;

    busboy
        .on('file', function (fieldname, file, filename, encoding, mimetype) {
            var ext = path.extname(filename);

            if (typeConf.mimetypes.indexOf(mimetype) === -1) {
                return res.status(400).json({ errors: ['Illegal file type']});
            }

            uploadPromise = uploadToTmpDir(file, filename, path.join(TMP_DIR, getRandomName(ext)), typeConf.size)
                .then(function (tmpPath) {
                    return getMD5Hash(tmpPath).then(function (hash) {
                        return {
                            tmpPath: tmpPath,
                            destPath: path.join(UPLOADS_ROOT, typeConf.path, hash + ext)
                        };
                    });
                })
                .then(function (data) {
                    return resizeImage(data.tmpPath, data.destPath, typeConf.resizeTo);
                })
                .catch(function (error) {
                    var resData = { errors: [error.message]};

                    if (app.get('isDev')) {
                        resData.stack = error.stack;
                    }

                    return res
                        .status(error instanceof UploadValidationError ? 400 : 500)
                        .json(resData);
                });
        })
        .on('finish', function () {
            uploadPromise.then(function (imagePath) {
                return res.json({ url: imagePath.replace(path.resolve(UPLOADS_ROOT, '..'), '') });
            });
        });

    req.pipe(busboy);
};

function uploadToTmpDir(stream, filename, path, sizeLimit) {
    return new Promise(function (resolve, reject) {
        var writeStream = fs.createWriteStream(path);
        var fileSize = 0;

        stream
            .pipe(new Transform({
                transform: function (chunk, encoding, callback) {
                    fileSize += chunk.length;

                    if (fileSize > sizeLimit) {
                        callback(new UploadValidationError(
                            'File ' + filename + ' have size that exceeds limit: ' + formatFilesize(sizeLimit)
                        ));
                    }

                    callback(null, chunk);
                }
            }))
            .on('error', function (error) {
                var cb = function () { reject(error); };
                removeFile(path).then(cb, cb);
            })
            .pipe(writeStream)
            .on('finish', function () {
                resolve(writeStream.path);
            })
            .on('error', function (error) {
                stream.destroy();
                writeStream.end();
                reject(error);
            });
    });
}

function resizeImage(fromPath, toPath, sizes) {
    return new Promise(function (resolve, reject) {
        var sharpInst = sharp(fromPath);

        sharpInst
            .resize.apply(sharpInst, sizes)
            .toFile(toPath, function (error) {
                if (error) {
                    return reject(error);
                }

                resolve(toPath);
            });
    });
}

function formatFilesize(fileSize) {
    var KILO = 1024;
    var JEDEC = ['B', 'KB', 'MB', 'GB', 'TB'];
    var size = fileSize;
    var i = 0;

    while (size > KILO) {
        size = size / KILO;
        i++;
    }

    return (i ? size.toFixed(2) : size) + ' ' + JEDEC[i];
}

function getRandomName(ext) {
    const randomName = crypto.randomBytes(24)
        .toString('base64')
        .replace(/\//g, '_')
        .replace(/\+/g, '-');

    return randomName + ext;
}

function getMD5Hash(path) {
    return new Promise(function (resolve, reject) {
        var readStream = fs.createReadStream(path);
        var createHashStream = crypto.createHash('md5');
        var hash = '';

        createHashStream.setEncoding('hex');

        readStream
            .pipe(createHashStream)
            .on('data', function (part) {
                hash += part;
            })
            .on('finish', function () {
                resolve(hash);
            })
            .on('error', function (error) {
                createHashStream.end();
                reject(error);
            });
    });
}

function removeFile(path) {
    return new Promise(function (resolve, reject) {
        fs.unlink(path, function (error) {
            if (error) {
                return reject(error);
            }

            resolve();
        });
    });
}

function UploadValidationError(message) {
    this.message = message;
}
