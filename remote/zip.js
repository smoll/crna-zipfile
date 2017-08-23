const zipdir = require('zip-dir')

function zipUpAsync(folder, zipPath) {
  return new Promise((resolve, reject) => {
    zipdir(folder, { saveTo: zipPath }, function (err, buffer) {
      // `buffer` is the buffer of the zipped file
      if (err) reject(err)
      resolve(buffer)
    })
  })
}

zipUpAsync('files', 'files.zip')
