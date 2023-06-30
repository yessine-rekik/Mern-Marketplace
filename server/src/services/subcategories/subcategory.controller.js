const SubCategories = require('./subcategory.model');

async function insert(req, res) {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) return res.sendStatus(422);
  try {
    const result = await SubCategories.create({ name, categoryId });
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = {
  insert,
};
