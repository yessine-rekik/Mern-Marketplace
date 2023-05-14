const DatabaseError = require('./DatabaseError');

function handleErrors(err, res) {
  console.log(err.message);

  if (err instanceof DatabaseError) {
    switch (err.name) {
      case 'CastError' || 'ValidationError':
        return res.status(422).send(err.message);

      default:
        return res.status(err.statusCode).send(err.message);
    }
  }

  return res.status(500).send(err.message);
}

module.exports = handleErrors;
