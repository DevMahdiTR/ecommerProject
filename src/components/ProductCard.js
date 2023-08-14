import React, {useEffect, useState} from "react";
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
  const [avg, setAvg] = useState(-1);
  useEffect(() => {
    if(featured) {
      setAvg(featured?.reviews
          .map((item, index) => item?.rate)
          .reduce((a, b) => a + b, 0) / featured?.reviews.length)
    }
  }, [avg])

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
            <img src={featured?.medias[0]?.url} className="object-cover h-56 w-96" alt="product image" />
            <img src={featured?.medias[1]?.url} className="object-cover h-56 w-96" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{featured?.slug}</h6>
            <h5 className="product-title">
              {featured?.name}
            </h5>
            {
              avg>0?
                  <ReactStars
                      count={5}
                      size={24}
                      value={avg}
                      edit={false}
                      activeColor="#ffd700"
                  />
                  :
                  <></>
            }
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}>
                {featured?.description}
            </p>
            <p className="price">{featured?.price} DT</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
