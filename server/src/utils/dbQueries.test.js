const dbQueries = require('./dbQueries');
const DatabaseError = require('./DatabaseError');

// Mock model
const Model = {
  findOne: jest.fn(),
  create: jest.fn(),
  findByIdAndDelete: jest.fn(),
  find: jest.fn(),
};

describe('dbQueries', () => {
  describe('createDocument', () => {
    it('should create a document', async () => {
      // Mock the necessary dependencies and set up the test data
      const data = { name: 'John Doe' };
      Model.create.mockResolvedValue({ _id: '123', ...data });

      const result = await dbQueries.createDocument(Model, data);

      expect(result).toEqual({ _id: '123', ...data });
    });

    it('should throw a DatabaseError if the document already exists', async () => {
      const data = { name: 'John Doe' };
      const conditions = { ...data };
      Model.findOne.mockResolvedValue({ _id: '123', ...data });

      await expect(
        dbQueries.createDocument(Model, data, conditions)
      ).rejects.toThrow(DatabaseError);

      expect(Model.findOne).toHaveBeenCalledWith(conditions);
    });
  });

  describe('deleteDocument', () => {
    it('should delete a document', async () => {
      const id = '123';
      Model.findByIdAndDelete.mockResolvedValue({ _id: id });

      const result = await dbQueries.deleteDocument(Model, id);

      expect(result).toEqual({ _id: id });
    });

    it('should throw a DatabaseError if the document is not found', async () => {
      const id = '123';
      Model.findByIdAndDelete.mockResolvedValue(null);

      await expect(dbQueries.deleteDocument(Model, id)).rejects.toThrow(
        DatabaseError
      );
    });
  });

  describe('fetchDocuments', () => {
    it('should filter and fetch documents', async () => {
      const conditions = { age: { $gte: 18 } };

      const documents = [
        { _id: '1', name: 'John Doe' },
        { _id: '2', name: 'Jane Smith', age: 50 },
      ];
      Model.find.mockResolvedValue(documents[1]);

      const result = await dbQueries.fetchDocuments(Model, conditions);

      expect(Model.find).toHaveBeenCalledWith(conditions);
      expect(result).toEqual(documents[1]);
    });
  });
});
