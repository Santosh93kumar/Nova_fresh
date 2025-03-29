const Product = require("../model/product_model");

const newProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    let {
        pname,
        short_description,
        long_description,
        stock,
        price,
        discount,
        discount_date,
        category,
        visibility,
        scheduled_date,
        images,
    } = req.body;

    let productData = {
        pname,
        short_description,
        long_description,
        stock,
        price,
        discount,
        discount_date,
        category,
        visibility,
        scheduled_date,
        images,
    };

    if (req.files && req.files.length > 0) {
        productData.images = req.files.map(file => file.filename);
    }

    let resObj;

    try {
        let newProduct = new Product(productData);
        let saveProduct = await newProduct.save();
        console.log("Product registered successfully:", saveProduct);

        resObj = {
            status: 1,
            msg: "Product registered successfully.",
            product: saveProduct,
        };
        res.send(resObj);
    } catch (error) {
        console.error("Error saving product details:", error);
        resObj = {
            status: 0,
            msg: "Error occurred while saving product details.",
        };
        res.send(resObj);
    }
};

const getProducts = async (req, res) => {
    console.log('pro',)
    try {
        const products = await Product.find();
        console.log("propducy",products)
        res.json({ status: 1, products: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ status: 0, msg: "Internal server error" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ status: 0, msg: "Product not found" });
        }
        res.json({ status: 1, msg: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ status: 0, msg: "Internal server error" });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length === 0) {
            return res.status(400).json({ status: 0, msg: "No products found",products: [] });
        }

        const products = await Product.find({
            pname: { $regex: q.trim(), $options: "i" }
        });

        res.json({ status: 1, products });
    } catch (error) {
        console.error("Error searching product:", error);
        res.status(500).json({ status: 0, msg: "Internal server error" });
    }
};



module.exports = {
    newProduct,
    getProducts,
    deleteProduct,
    searchProduct
};