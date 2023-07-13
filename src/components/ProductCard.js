import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import {addFav} from "../service/favories/favoriesService";
const ProductCard = (props) => {
  const grid = props.index;
  let location = useLocation();
  const {featured} = props;
  console.log(featured)
  return (
    <>
      <div
        className={` ${
          location.pathname === "/product" ? `gr-${grid}` : "col-3"
        } `}
      >
        <Link
          to={`${
            location.pathname === "/"
              ? `/product/:${featured?.id}`
              : location.pathname === `/product/:${featured?.id}`
              ? `/product/:${featured?.id}`
              : `:${featured?.id}`
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent"
            onClick={() => {
              addFav({article_id: featured?.id}).then(res => {
                console.log(res)
                })
            }}>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={featured?.medias[0]?.url} className="img-fluid" alt="product image" />
            <img src={featured?.medias[1]?.url} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{featured?.slug}</h6>
            <h5 className="product-title">
              {featured?.name}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                {featured?.description}
            </p>
            <p className="price">${featured?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
