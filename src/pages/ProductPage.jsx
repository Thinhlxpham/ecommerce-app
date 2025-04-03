import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Product from "../components/ui/Product";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import ProductPageSkeleton from "../components/ProductPageSkeleton";
import SuccessPopUp from "../components/ui/SuccessPopUp";

const ProductPage = () => {
  const { products, addToCart } = useContext(AppContext);
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce-samurai.up.railway.app/product/${id}`
      );
      const productsData = data.data;

      setSelectedProduct(productsData);
      setSelectedImage(productsData.images[0]);
      setLoading(false);
    } catch (e) {
      alert(e);
    }
  }

  function openSuccess() {
    setSuccessOpen(true);

    setTimeout(() => {
      setSuccessOpen(false);
    }, 1000);
  }

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    fetchProducts();
  }, [id]);
  return (
    <main className="products__main">
      <SuccessPopUp successOpen={successOpen} />
      <div className="container">
        <div className="row product-page__row">
          {loading ? (
            <ProductPageSkeleton />
          ) : (
            <>
              <div className="selected-product">
                <div className="selected-product__left">
                  <figure className="selected-product__img__wrapper">
                    <img
                      src={`https://ecommerce-samurai.up.railway.app/${selectedImage}`}
                      alt=""
                      className="selected-product__img"
                    />
                  </figure>
                  <div className="selected-product__img__options">
                    {selectedProduct?.images.map((image, index) => (
                      <img
                        key={index}
                        src={`https://ecommerce-samurai.up.railway.app/${image}`}
                        alt=""
                        onClick={() => setSelectedImage(image)}
                        className="selected-product__img__option"
                      />
                    ))}
                  </div>
                </div>
                <div className="selected-product__right">
                  <h1 className="selected-product__title">
                    {products[0]?.name}
                  </h1>
                  <p className="selected-product__para">
                    {products[0]?.description}
                  </p>
                  <div className="selected-product__quantity">
                    <span className="selected-product__quantity__span selected-product__quantity__span-1">
                      Quantity
                    </span>
                    <div className="selected-product__quantity__wrapper">
                      <button
                        className="selected-product__quantity__btn "
                        onClick={() =>
                          setQuantity((preQuantity) =>
                            preQuantity > 1 ? preQuantity - 1 : preQuantity
                          )
                        }
                      >
                        -
                      </button>
                      <div className="selected-product__quantity__amount">
                        {quantity}
                      </div>
                      <button
                        className="selected-product__quantity__btn"
                        onClick={() =>
                          setQuantity((preQuantity) => preQuantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <span className="selected-product__quantity__span selected-product__quantity__span-2">
                      $ {products[0]?.price * quantity}
                    </span>
                  </div>
                  <button
                    className="selected-product__add"
                    onClick={() => {
                      addToCart(selectedProduct, quantity);
                      openSuccess();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="specifications">
                <div className="spec">
                  <h2 className="spec__title">Weight</h2>
                  <span className="spec__detail">{products[0]?.weight}</span>
                </div>
                <div className="spec">
                  <h2 className="spec__title">Texture</h2>
                  <span className="spec__detail">{products[0]?.texture}</span>
                </div>
                <div className="spec">
                  <h2 className="spec__title">Size</h2>
                  <span className="spec__detail">{products[0]?.size}</span>
                </div>
              </div>
            </>
          )}
          <div className="recommendations">
            <h2 className="products__title">Trending Now</h2>
            <div className="products__list">
              {products.length > 0 && loading !== true
                ? products
                    .filter((product) => product.id !== selectedProduct.id)
                    .slice(0, 4)
                    .map((product) => (
                      <Product product={product} key={product.id} />
                    ))
                : new Array(4)
                    .fill(0)
                    .map((_, index) => <ProductSkeleton key={index} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
