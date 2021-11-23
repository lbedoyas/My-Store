const express = require("express");
const ProductServices = require('../Services/productService');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');



const router = express.Router();
const service = new ProductServices();

router.get("/", async (req, res) =>{
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('soy un filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
    const product = await service.findOne(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        message:'id no encontrado'
      })
    }
    } catch (error) {
      next(error)
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  if (newProduct) {
    res.status(201).json({
      message: 'Creacion',
      data: newProduct
    });
  } else {
    res.status(500).json({
      message:'Ocurrio un error'
    })
  }

});

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'Actualizacion',
      data: product,
      id: id
    });
  } catch (error) {
    next(error);
    // res.status(404).json({
    //   message: error.message
    // });
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json({
    message: 'Eliminar',
    id: rta
  });
});

module.exports = router;
