const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const findAlltags = await Tag.findAll({
      include: [{
        model: Product
      }]
    });
    res.status(200).json(findAlltags)
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    })
    if (!tagData) {
      res.status(404).json('No tag with that id')
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  const createTag = await Tag.create(req.body);
  res.status(200).json(createTag)
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(updatedTag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(deletedTag)
});

module.exports = router;
