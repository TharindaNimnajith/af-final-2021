const fileUpload = async (req, res) => {
  const data = {
    filename: req.file.filename,
    destination: req.file.destination
  }

  res.send({
    status: 200,
    data: data
  })
}

module.exports = {
  fileUpload
}
