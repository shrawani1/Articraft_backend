const router =require('express').Router();
const productController =require('../controllers/productControllers');
const { authGuard, } = require('../middleware/authGuard');
const { getCategories } = require('../controllers/productControllers');


router.post('/create', productController.CreateProduct)

//fetch all products
router.get('/get_all_products',productController.getAllProducts)


//single product
router.get('/get_single_product/:id',productController.getSingleProduct)

//delete product
router.delete('/delete_product/:id',authGuard,productController.deleteProduct)

//update product
router.put('/update_product/:id',authGuard,productController.updateProudct)

//pagination
router.get('/pagination',productController.paginationProducts);

//get product count
router.get('/get_product_count',productController.getProductCount)

// router.get('/products/category/:category', productController.getProductsByCategory);

router.get("/category/:category", async (req, res) => {
    try {
        const { category } = req.params; // Extract category from request parameters
        const products = await Product.find({ productCategory: category }); // Match by productCategory field

        if (products.length > 0) {
            res.status(200).json({
                success: true,
                products,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No products found for this category.",
            });
        }
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});




module.exports=router


