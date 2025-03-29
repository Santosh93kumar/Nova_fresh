import React, { useState, useEffect } from "react";
import { Calendar, Plus, X } from "lucide-react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    pname: "",
    short_description: "",
    long_description: "",
    stock: "",
    price: "",
    discount: "",
    discountEnabled: false,
    category: "",
    selectedTags: [],
    visibility: "Published",
    discount_date: "",
    scheduled_date: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/`);
        console.log("Full API Response:", response.data); // Debugging

        const products = response.data.products;

        if (Array.isArray(products)) {
          const uniqueCategories = [
            ...new Set(
              products.map((product) => product.category).filter(Boolean)
            ),
          ];
          console.log("Extracted Categories:", uniqueCategories);
          setCategories(uniqueCategories);
        } else {
          console.error(
            "API response does not contain an array:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const files = Array.from(e.target.files);
    console.log("Selected Files:", files); // Debugging log

    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Ensure File objects are stored
    }));

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...imageUrls]);

    console.log("Updated Product State:", product); // Debugging log
  };

  const removeImage = (index) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [], // Ensure fallback to []
    }));

    setPreviewImages((prev) => prev?.filter((_, i) => i !== index) || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      if (key === "images") {
        product[key].forEach((image) => {
          formData.append("images", image);
        });
      } else {
        formData.append(key, product[key]);
      }
    });

    console.log("Form Data:", ...formData.entries());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/new`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === 1) {
        alert("Product details saved successfully!");
        setProduct({
          pname: "",
          short_description: "",
          long_description: "",
          stock: "",
          price: "",
          discount: "",
          discountEnabled: false,
          category: "",
          selectedTags: [],
          visibility: "Published",
          discount_date: "",
          scheduled_date: "",
          images: [],
        });
        setPreviewImages([]);
      } else {
        alert("Error saving product details.");
      }
    } catch (error) {
      console.error("Error submitting product data:", error);
    }
  };

  const removeTag = (tagToRemove) => {
    setProduct((prevData) => ({
      ...prevData,
      selectedTags: prevData.selectedTags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Add product</h1>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-6 bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium">Basic Information</h2>

            <div>
              <input
                type="text"
                name="pname"
                placeholder="Product Name"
                className="w-full p-3 border border-gray-200 rounded-lg"
                value={product.pname}
                onChange={handleChange}
              />
            </div>

            <div>
              <textarea
                name="short_description"
                placeholder="Short Description"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20"
                value={product.short_description}
                onChange={handleChange}
              />
            </div>

            <div>
              <textarea
                name="long_description"
                placeholder="Long Description"
                className="w-full p-3 border border-gray-200 rounded-lg resize-none h-32"
                value={product.long_description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium">Product Image</h2>

            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center h-64">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="cursor-pointer">
                <Plus className="h-6 w-6 text-gray-400 mx-auto" />
                <p className="text-gray-700 font-medium">
                  Upload your product images.
                </p>
                <p className="text-gray-400 text-sm">
                  PNG, JPG formats allowed.
                </p>
              </label>
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt="Product Preview"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white md:col-span-3 p-6 rounded-lg space-y-6">
            <h2 className="text-lg font-medium">Stock and pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="stock"
                  placeholder="Stock"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  value={product.stock}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  value={product.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="scheduleDiscount"
                name="discountEnabled"
                checked={product.discountEnabled}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="scheduleDiscount" className="ml-2 text-sm">
                Schedule a discount
              </label>
            </div>

            {product.discountEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="discount"
                    placeholder="Discount"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    value={product.discount}
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="discount_date"
                    placeholder="Select date"
                    className="w-full p-3 pl-12 border border-gray-200 rounded-lg"
                    value={product.discount_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white md:col-span-2 p-6 rounded-lg space-y-6">
            <h2 className="text-lg font-medium">Visibility</h2>

            <div className="space-y-2"></div>

            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Published"
                  name="visibility"
                  value="Published"
                  checked={product.visibility === "Published"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="Published" className="ml-2">
                  Published
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="scheduled"
                  name="visibility"
                  value="Scheduled"
                  checked={product.visibility === "Scheduled"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="Scheduled" className="ml-2">
                  Scheduled
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  id="Hidden"
                  name="visibility"
                  value="Hidden"
                  checked={product.visibility === "Hidden"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor="Hidden" className="ml-2">
                  Hidden
                </label>
              </div>
            </div>

            {product.visibility === "Scheduled" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="scheduled_date"
                  placeholder="Select date"
                  className="w-full p-3 pl-12 border border-gray-200 rounded-lg"
                  value={product.scheduled_date}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 md:col-span-3 rounded-lg space-y-6">
            <h2 className="text-lg font-medium">Category</h2>

            <div>
              <input
                type="text"
                name="category"
                placeholder="Search or create category"
                className="w-full p-3 border border-gray-200 rounded-lg"
                value={product.category}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <option className="bg-gray-100 px-2 py-1 rounded-lg"
                 key={category._id || category} value={category}>
                  {category}
                </option>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 font-bold rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
