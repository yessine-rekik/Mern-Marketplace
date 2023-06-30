const Categories = require('./category.model');

async function insert(req, res) {
  const { name } = req.body;
  if (!name) return res.sendStatus(422);
  try {
    const result = await Categories.create({ name });
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function fetchAll(req, res) {
  try {
    const result = await Categories.aggregate([
      {
        $lookup: {
          from: 'subcategories',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'subcategories',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          subcategories: { _id: 1, name: 1 },
        },
      },
    ]);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = {
  fetchAll,
  insert,
};
