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
        const { id } = req.params; // ✅ Extract ID correctly from route params

        if (!id) {
            return res.status(400).json({ status: 0, msg: "Product not found" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        console.log(deletedProduct)
        

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
const updateProduct = async (req, res) =>{
    console.log(req.body,"body");
    console.log(req.files,"file");
        const { id } = req.params; // Extract ID correctly from route params        
        console.log(req.body ,"req.body");
        console.log(id,"id")
        if (!id) {
            return res.status(400).json({ status: 0, msg: "Product not found" });
        }
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
            stock:Number(stock),
            price: Number(price),
            discount: discount === "null" || discount === "" ? null : Number(discount),
            discount_date: discount_date === "null" || discount_date === "" ? null : discount_date,
            category,
            visibility,
            scheduled_date: scheduled_date === "null" || scheduled_date === "" ? null : scheduled_date,
            images,
        };
    
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.filename);
        }

        console.log(productData,"productData")

        try {
        const updatedProduct = await Product.findByIdAndUpdate(id,{ ...productData }, { new: true });

        console.log(updatedProduct,"updatedProduct")
      
        if (!updatedProduct) {
            return res.status(404).json({ status: 0, msg: "Product not found" });
        }
   
       
        console.log("Product updated successfully:", updatedProduct);
        res.json({ status: 1, msg: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ status: 0, msg: "Internal server error" });
    }
}

const getProductbById=async(req,res)=>{
    try {
        const { id } = req.params; // Extract ID correctly from route params

        if (!id) {
            return res.status(400).json({ status: 0, msg: "Product not found" });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ status: 0, msg: "Product not found" });
        }

        res.json({ status: 1, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ status: 0, msg: "Internal server error" });
    }
}



module.exports = {
    newProduct,
    getProducts,
    deleteProduct,
    searchProduct,
    updateProduct,
    getProductbById
};