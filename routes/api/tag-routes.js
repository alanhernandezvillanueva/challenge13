const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [{
      model: Product,
      attributes: [
      'id', 
      'product_name', 
      'price', 
      'stock', 
      'category_id']
    }
  ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: "No data found" });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error "})
  });
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [{
      model: Product,
      attributes: ['id', 
      'product_name', 
      'price', 
      'stock', 
      'category_id']
    }
  ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: "No tag with that id found" });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error "})
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    res.status(500).json({ message: "There has been an error "});
  });
});

router.put('/:id', (req, res) => {
  // update a tag by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }
  )
  .then(dbTagData => res.json({ message: "The tag info has been updated!" }))
  .catch(err => {
    res.status(404).json({ message: "No tag found " });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: "No tag found with this id "});
      return;
    }
    res.json({ message: "The tag has been deleted" });
  })
  .catch(err => {
    res.status(500).json({ message: "There has been an error "})
  })
});

module.exports = router;