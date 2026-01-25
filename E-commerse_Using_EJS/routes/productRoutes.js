const express = require('express');
const router = express.Router();

const {
    home,
    getUpload,
    postUpload,
    getProduct,
    deleteProduct,
    getUpdate,
    updateProduct
} = require('../controllers/productController');

const { authMiddleware, isLoggedIn } = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', home);

router.get('/upload', isLoggedIn, getUpload);
router.post('/upload', isLoggedIn, postUpload);

router.get('/product/:id', getProduct);

router.delete('/deleteProduct/:id', isLoggedIn, deleteProduct);

router.get('/update/:id', isLoggedIn, getUpdate);
router.put('/update/:id', isLoggedIn, updateProduct);

module.exports = router;
