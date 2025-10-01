"use client"
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaInstagram, FaPlus } from "react-icons/fa";
import { Product } from "@/lib/products-data";
import Header from "@/components/Header";

const accent = "#FFA726"; // Light orange
// i'm just testing to see if deployment would work
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
  const [brandImage, setBrandImage] = useState<File | null>(null);
  const [brandImagePreview, setBrandImagePreview] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct as Product);
  const [isAddMode, setIsAddMode] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          // Map _id to id for compatibility
          const mappedProducts = data.map((p: any) => ({ ...p, id: p._id }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  // Preview for brand image
  useEffect(() => {
    if (brandImage) {
      const url = URL.createObjectURL(brandImage);
      setBrandImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (selectedProduct.brandImage) {
      setBrandImagePreview(selectedProduct.brandImage);
    } else {
      setBrandImagePreview(null);
    }
  }, [brandImage, selectedProduct.brandImage]);

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

  // Drag and drop handlers for brand image
  const handleBrandImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setBrandImage(e.dataTransfer.files[0]);
    }
  };

  // Handle product selection
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsAddMode(false);
    setMainImage(null);
    setAdditionalImages([]);
    setBrandImage(null);
  };

  // Handle add product mode
  const handleAddProduct = () => {
    setSelectedProduct(emptyProduct);
    setIsAddMode(true);
    setMainImage(null);
    setAdditionalImages([]);
    setBrandImage(null);
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let mainImageUrl = selectedProduct.image;
      let additionalImageUrls = selectedProduct.images || [];
      let brandImageUrl = selectedProduct.brandImage;

      // Upload main image if new
      if (mainImage) {
        const formData = new FormData();
        formData.append('file', mainImage);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          mainImageUrl = data.url;
        } else {
          throw new Error('Failed to upload main image');
        }
      }

      // Upload additional images if new
      if (additionalImages.length > 0) {
        const uploadPromises = additionalImages.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          if (res.ok) {
            const data = await res.json();
            return data.url;
          } else {
            throw new Error('Failed to upload additional image');
          }
        });
        additionalImageUrls = await Promise.all(uploadPromises);
      }

      // Upload brand image if new
      if (brandImage) {
        const formData = new FormData();
        formData.append('file', brandImage);
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          brandImageUrl = data.url;
        } else {
          throw new Error('Failed to upload brand image');
        }
      }

      // Prepare product data
      const productData = {
        ...selectedProduct,
        image: mainImageUrl,
        images: additionalImageUrls,
        brandImage: brandImageUrl,
      };

      let res;
      if (isAddMode) {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } else {
        res = await fetch(`/api/products/${selectedProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }

      if (res.ok) {
        // Refresh products
        const productsRes = await fetch('/api/products');
        if (productsRes.ok) {
          const data = await productsRes.json();
          const mappedProducts = data.map((p: any) => ({ ...p, id: p._id }));
          setProducts(mappedProducts);
        }
        // Reset form
        setSelectedProduct(emptyProduct);
        setIsAddMode(false);
        setMainImage(null);
        setAdditionalImages([]);
        setBrandImage(null);
      } else {
        throw new Error('Failed to save product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Header />
      <main className=" px-2 md:px-24 py-6 flex flex-col-reverse max-md:mb-16 md:flex-row gap-8">
        {/* Products List - above form on mobile, beside on desktop */}
        <aside className="w-full md:max-w-xs bg-gray-50 rounded-xl shadow-lg p-4 md:p-6 space-y-4 overflow-auto mb-6 md:mb-0 h-auto md:h-[80vh] order-1 md:order-none">
          <h3 className="text-lg font-bold mb-2 text-black">Products</h3>
          <div className="flex flex-col gap-2">
            {products.slice(0, 5).map((product) => (
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
          </div>
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
          onSubmit={handleSubmit}
          className="flex-1 w-full md:w-3xl max-w-3xl mx-auto bg-white rounded-xl rounded-l-3xl shadow-lg p-4 md:p-8 space-y-6"
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
          {/* Brand Image Preview */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Brand Image Preview
            </label>
            {brandImagePreview ? (
              <img
                src={brandImagePreview}
                alt="Brand Preview"
                className="w-32 h-32 object-cover rounded mb-2 border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded mb-2 border text-gray-400">
                No Image
              </div>
            )}
          </div>
          {/* Brand Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="brand-image"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 cursor-pointer hover:border-orange-400 transition relative"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleBrandImageDrop}
            >
              <FaPlus className="text-2xl text-gray-400 mb-2" />
              <span className="text-black text-sm">Drag & drop or click to add brand image</span>
              <input
                id="brand-image"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setBrandImage(e.target.files[0]);
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
          <div className="flex flex-col md:flex-row gap-4">
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
          {/* Long Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Long Description</label>
            <textarea
              name="longDescription"
              value={selectedProduct.longDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
              rows={5}
            />
          </div>
          {/* Instagram */}
          <div className="flex flex-col md:flex-row gap-4">
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
          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Specifications</label>
            {Object.entries(selectedProduct.specifications || {}).map(([key, value], index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={key}
                  onChange={(e) => {
                    const newSpecs = { ...selectedProduct.specifications };
                    delete newSpecs[key];
                    newSpecs[e.target.value] = value;
                    setSelectedProduct((prev) => ({ ...prev, specifications: newSpecs }));
                  }}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={value}
                  onChange={(e) => {
                    const newSpecs = { ...selectedProduct.specifications };
                    newSpecs[key] = e.target.value;
                    setSelectedProduct((prev) => ({ ...prev, specifications: newSpecs }));
                  }}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSpecs = { ...selectedProduct.specifications };
                    delete newSpecs[key];
                    setSelectedProduct((prev) => ({ ...prev, specifications: newSpecs }));
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newSpecs = { ...selectedProduct.specifications, "": "" };
                setSelectedProduct((prev) => ({ ...prev, specifications: newSpecs }));
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Specification
            </button>
          </div>
          {/* Features */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Features</label>
            {selectedProduct.features?.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...(selectedProduct.features || [])];
                    newFeatures[index] = e.target.value;
                    setSelectedProduct((prev) => ({ ...prev, features: newFeatures }));
                  }}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 text-black"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = (selectedProduct.features || []).filter((_, i) => i !== index);
                    setSelectedProduct((prev) => ({ ...prev, features: newFeatures }));
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newFeatures = [...(selectedProduct.features || []), ""];
                setSelectedProduct((prev) => ({ ...prev, features: newFeatures }));
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Feature
            </button>
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 rounded bg-orange-400 hover:bg-orange-500 disabled:bg-orange-300 text-white font-semibold transition-all duration-200"
          >
            {submitting ? "Saving..." : (isAddMode ? "Add Product" : "Update Product")}
          </button>
        </form>
      </main>
    </div>
  );
};

export default page;
