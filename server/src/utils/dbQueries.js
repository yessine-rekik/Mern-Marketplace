const DatabaseError = require('./DatabaseError');

const createDocument = async (model, data, conditions) => {
  try {
    if (conditions) {
      if (await model.findOne(conditions)) {
        throw new DatabaseError('Document already exists', 409);
      }
    }

    return await model.create(data);
  } catch (err) {
    if (err instanceof DatabaseError) {
      throw err;
    }
    throw new DatabaseError(`Error creating document: ${err.message}`, 500);
  }
};

const deleteDocument = async (model, id) => {
  try {
    const deletedDocument = await model.findByIdAndDelete(id);
    if (!deletedDocument) {
      throw new DatabaseError('Document not found', 404);
    }
    return deletedDocument;
  } catch (err) {
    if (err instanceof DatabaseError) {
      throw err;
    }
    throw new DatabaseError(`Error deleting document: ${err.message}`, 500);
  }
};

const fetchDocuments = async (model, conditions) => {
  try {
    const documents = await model.find(conditions);
    return documents;
  } catch (err) {
    throw new DatabaseError(`Error fetching documents: ${err.message}`, 500);
  }
};

module.exports = {
  createDocument,
  deleteDocument,
  fetchDocuments,
};
