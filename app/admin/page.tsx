"use client"
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaInstagram, FaPlus } from "react-icons/fa";
import { Product, products as productsData } from "@/lib/products-data";
import Header from "@/components/Header";

const accent = "#FFA726"; // Light orange

const emptyProduct = {
  id: 0,
  name: "",
  price: 0,
  originalPrice: undefined as number | undefined,
  category: "",
  image: "",
  images: [],
  rating: 0,
  reviews: 0,
  inStock: true,
  description: "",
  longDescription: "",
  instagram: "",
  instagramlink: "",
  specifications: {},
  features: [],
  brand: "",
  brandImage: "",
  sku: "",
};

const page = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct as Product);
  const [isAddMode, setIsAddMode] = useState(false);

//   useEffect(() => {
//     if (formRef.current) {
//       gsap.from(formRef.current, {
//         opacity: 0,
//         y: 40,
//         duration: 0.8,
//         ease: "power2.out",
//       });
//     }
//   }, [selectedProduct, isAddMode]);

  // Preview for main image
  useEffect(() => {
    if (mainImage) {
      const url = URL.createObjectURL(mainImage);
      setMainImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (selectedProduct.image) {
      setMainImagePreview(selectedProduct.image);
    } else {
      setMainImagePreview(null);
    }
  }, [mainImage, selectedProduct.image]);

  // Preview for additional images
  useEffect(() => {
    if (additionalImages.length > 0) {
      const urls = additionalImages.map((file) => URL.createObjectURL(file));
      setAdditionalImagesPreview(urls);
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else if (selectedProduct.images && selectedProduct.images.length > 0) {
      setAdditionalImagesPreview(selectedProduct.images);
    } else {
      setAdditionalImagesPreview([]);
    }
  }, [additionalImages, selectedProduct.images]);

  // Drag and drop handlers for main image
  const handleMainImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setMainImage(e.dataTransfer.files[0]);
    }
  };

  // Drag and drop handlers for additional images
  const handleAdditionalImagesDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setAdditionalImages((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  // Handle product selection
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsAddMode(false);
    setMainImage(null);
    setAdditionalImages([]);
  };

  // Handle add product mode
  const handleAddProduct = () => {
    setSelectedProduct(emptyProduct);
    setIsAddMode(true);
    setMainImage(null);
    setAdditionalImages([]);
  };

  // Controlled form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : name === "inStock"
          ? value === "true"
          : value,
    }));
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Header />
      <main className="flex-1 px-4 md:px-24 py-10 flex gap-8">
        {/* Dummy products list */}
        <aside className="w-full max-w-xs bg-gray-50 rounded-xl shadow-lg p-6 space-y-4 overflow-auto h-[80vh]">
          <h3 className="text-lg font-bold mb-2 text-black">Products</h3>
          {productsData.slice(0, 5).map((product) => (
            <button
              key={product.id}
              type="button"
              className={`w-full text-left flex items-center gap-3 bg-white rounded-lg p-2 shadow hover:shadow-md transition border ${
                selectedProduct.id === product.id && !isAddMode
                  ? "border-orange-400"
                  : "border-transparent"
              }`}
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <div className="font-semibold text-black">{product.name}</div>
                <div className="text-xs text-gray-500">{product.category}</div>
              </div>
            </button>
          ))}
          <button
            type="button"
            className="w-full mt-4 py-2 rounded bg-orange-400 hover:bg-orange-500 text-white font-semibold transition-all duration-200"
            onClick={handleAddProduct}
          >
            + Add Product
          </button>
        </aside>
        {/* Form */}
        <form
          ref={formRef}
          className="flex-1 max-w-2xl bg-white rounded-xl rounded-l-3xl shadow-lg p-8 space-y-6"
          style={{ borderTop: `6px solid ${accent}` }}
        >
          <h2 className="text-2xl font-bold text-black mb-4">
            {isAddMode ? "Add Product" : "Update Product"}
          </h2>
          {/* Main Image Preview */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Main Image Preview
            </label>
            {mainImagePreview ? (
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="w-32 h-32 object-cover rounded mb-2 border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded mb-2 border text-gray-400">
                No Image
              </div>
            )}
          </div>
          {/* Main Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="main-image"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-orange-400 transition relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleMainImageDrop}
            >
              <FaPlus className="text-2xl text-gray-400 mb-2" />
              <span className="text-black text-sm">Drag & drop or click to add main image</span>
              <input
                id="main-image"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setMainImage(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>
          {/* Additional Images Preview */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Additional Images Preview
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {additionalImagesPreview.length > 0 ? (
                additionalImagesPreview.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Additional Preview ${idx}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded border text-gray-400">
                  No Images
                </div>
              )}
            </div>
          </div>
          {/* Additional Images Upload */}
          <div className="mb-4">
            <label
              htmlFor="additional-images"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-24 cursor-pointer hover:border-orange-400 transition relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleAdditionalImagesDrop}
            >
              <FaPlus className="text-xl text-gray-400 mb-1" />
              <span className="text-black text-sm">Drag & drop or click to add additional images</span>
              <input
                id="additional-images"
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files) {
                    setAdditionalImages((prev) => [
                      ...prev,
                      ...Array.from(e.target.files as FileList),
                    ]);
                  }
                }}
              />
            </label>
          </div>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Name</label>
            <input
              name="name"
              type="text"
              value={selectedProduct.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
            />
          </div>
          {/* Price */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-1">Price</label>
              <input
                name="price"
                type="number"
                value={selectedProduct.price}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-1">Original Price</label>
              <input
                name="originalPrice"
                type="number"
                value={selectedProduct.originalPrice ?? ""}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              />
            </div>
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Category</label>
            <input
              name="category"
              type="text"
              value={selectedProduct.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
            />
          </div>
          {/* In Stock */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">In Stock</label>
            <select
              name="inStock"
              value={selectedProduct.inStock ? "true" : "false"}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Description</label>
            <textarea
              name="description"
              value={selectedProduct.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              rows={3}
            />
          </div>
          {/* Instagram */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="flex items-center gap-2 text-sm font-medium text-black mb-1">
                <FaInstagram className="text-pink-500" />
                Instagram
              </label>
              <input
                name="instagram"
                type="text"
                value={selectedProduct.instagram}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-black mb-1">Instagram Link</label>
              <input
                name="instagramlink"
                type="text"
                value={selectedProduct.instagramlink}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              />
            </div>
          </div>
          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Brand</label>
            <input
              name="brand"
              type="text"
              value={selectedProduct.brand}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
            />
          </div>
          {/* SKU */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">SKU</label>
            <input
              name="sku"
              type="text"
              value={selectedProduct.sku}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
            />
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded bg-orange-400 hover:bg-orange-500 text-white font-semibold transition-all duration-200"
          >
            {isAddMode ? "Add Product" : "Update Product"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default page;
