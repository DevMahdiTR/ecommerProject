import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {

  const {name, status, description, price, quantity, medias} = props?.specials;
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex">
            <div style={{width:"250px", height:"250px", marginRight:"10px"}}>
              <img src={medias[0]?.url} className="img-fluid" alt="watch"/>
            </div>
            <div className="special-product-content">
              <h5 className="brand">{name}</h5>
              <h6 className="title">
                {description}
                {/*Samsung Galaxy Note10+ Mobile Phone; Sim...*/}
              </h6>
              <ReactStars
                count={5}
                size={24}
                value={4}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">{price} DT</span> &nbsp; <span>{status}</span>
              </p>
              {/*<div className="discount-till d-flex align-items-center gap-10">*/}
              {/*  <p className="mb-0">*/}
              {/*    <b>5 </b>days*/}
              {/*  </p>*/}
              {/*  <div className="d-flex gap-10 align-items-center">*/}
              {/*    <span className="badge rounded-circle p-3 bg-danger">1</span>:*/}
              {/*    <span className="badge rounded-circle p-3 bg-danger">1</span>:*/}
              {/*    <span className="badge rounded-circle p-3 bg-danger">1</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="prod-count my-3">
                <p>Products: {quantity}</p>
              </div>
              <Link className="button" to="">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
