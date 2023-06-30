const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    subcategoryId: {
      type: mongoose.Types.ObjectId,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

ItemSchema.virtual('category', {
  ref: 'categories',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

ItemSchema.virtual('subcategory', {
  ref: 'subcategories',
  localField: 'subcategoryId',
  foreignField: '_id',
  justOne: true,
});

ItemSchema.virtual('user', {
  ref: 'users',
  localField: 'postedBy',
  foreignField: '_id',
  justOne: true,
});

module.exports = mongoose.model('items', ItemSchema);
