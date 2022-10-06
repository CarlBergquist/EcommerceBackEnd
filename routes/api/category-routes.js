const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
      const findAllcat = await Category.findAll({
        include: [{
          model: Product
        }]
      });
      res.status(200).json(findAllcat)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    })
    if (!catData) {
      res.status(404).json('No category with that id')
      return;
    }
    res.status(200).json(catData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  const createCat = await Category.create(req.body);
  res.status(200).json(createCat)
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCat = await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(updatedCat)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedCat = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(deletedCat)
});

module.exports = router;
