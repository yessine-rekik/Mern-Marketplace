const Items = require('./items.model');
const cloudinary = require('../../config').cloudinary;
const Users = require('../user/user.model');

async function insert(req, res) {
  const images = [];
  const fs = require('fs');
  try {
    for (const img of req.files) {
      const result = await cloudinary.v2.uploader.upload(img.path);
      fs.unlink(img.path, (err) => {
        if (err) {
          console.log('Error deleting file');
          console.log(err);
        }
      });
      // console.log(result.secure_url);
      images.push(result.secure_url);
    }

    const result = await Items.create({
      ...req.body,
      images: images,
      postedBy: req.user,
    });
    await Users.findByIdAndUpdate(req.user, { $inc: { totalAds: 1 } });
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function fetchAll(req, res) {
  try {
    const { limit, skipAmount, search } = req.query;
    let query = {};

    if (search) {
      const searchTerms = search.trim().split(/\s+/);
      const searchString = searchTerms.map((term) => `"${term}"`).join(' ');
      query = {
        // $text: { $search: '"ps4" "bmw"' },
        $text: { $search: searchString },
      };
    }
    const result = await Items.find(query)
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

async function fetchOne(req, res) {
  try {
    const { id } = req.params;
    console.log('AAAAAAAAA');
    if (!id) return res.send(400);

    const result = await Items.findById(id)
      .populate('category')
      .populate('subcategory')
      .populate('user', '-password -refreshTokens');
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

module.exports = { insert, fetchAll, fetchOne };
