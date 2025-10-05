const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('file'), (req, res)=>{
  if(!req.file) return res.status(400).json({ message: 'Нет файла' });
  res.json({ url: '/uploads/' + req.file.filename });
});
module.exports = router;
