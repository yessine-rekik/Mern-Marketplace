const dbQueries = require('./dbQueries');
const handleDatabaseError = require('./dbErrorHandler');

const createDocument = async (req, res, Model, conditions) => {
  try {
    const data = req.body;
    await dbQueries.createDocument(Model, data, conditions);
    return res.sendStatus(201);
  } catch (err) {
    handleDatabaseError(err, res);
  }
};

const deleteDocument = async (req, res, Model) => {
  try {
    const { id } = req.params;
    await dbQueries.deleteDocument(Model, id);
    return res.sendStatus(204);
  } catch (err) {
    handleDatabaseError(err, res);
  }
};

const updateDocument = async (req, res, Model) => {
  try {
    await dbQueries.updateDocument(Model, req.body);
    return res.sendStatus(200);
  } catch (err) {
    handleDatabaseError(err, res);
  }
};

const fetchDocuments = async (req, res, Model) => {
  try {
    const conditions = req.body;
    const { id } = req.params;

    if (id) {
      conditions['_id'] = id;
    }

    res.send(await dbQueries.fetchDocuments(Model, conditions));
  } catch (err) {
    handleDatabaseError(err, res);
  }
};

module.exports = {
  createDocument,
  deleteDocument,
  fetchDocuments,
  updateDocument,
};
