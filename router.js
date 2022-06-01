const stream = require('stream');
const express = require('express');
const multer = require('multer');
const drive = require('./service');

const uploadRouter = express.Router();
const upload = multer();

const uploadFile = async (fileObject, FolderDriveId = "106V0148G1ALd7tjHA8RH8maiT5-gVdQB") => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await drive().files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: [FolderDriveId],
    },
    fields: 'id,name',
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
  return `https://drive.google.com/file/d/${data.id}`
};

uploadRouter.post('/upload', upload.any(), async (req, res) => {
  try {
    const { body, files } = req;

    const PublishFilePath = await uploadFile(files[0]);
    // for (let f = 0; f < files.length; f += 1) {
      // res.links({
      //   link:PublishFilePath
      // })
    // }

    // console.log(body);
    res.status(200).send({link:PublishFilePath})
    // res.status(200).send('Form Submitted');
  } catch (f) {
    res.send(f.message);
  }
});

module.exports = uploadRouter;