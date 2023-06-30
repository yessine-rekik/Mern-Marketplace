const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('subcategories', SubcategorySchema);
