import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import {Link, useLocation} from "react-router-dom";
import {Button} from "antd";
const SpecialProduct = (props) => {

  const {id,name, status, description, price, quantity, medias,reviews,promotion} = props?.specials;
  const [avg, setAvg] = useState(-1);
  const [newPrice, setNewPrice] = useState(-1);
  let location = useLocation();
  useEffect(() => {
    if(reviews) {
      setAvg(reviews
          .map((item, index) => item?.rate)
          .reduce((a, b) => a + b, 0) / reviews.length)
    }
    setNewPrice(price - (price * promotion.value)/100)
  }, [avg, price])

  return (
    <>
      <div className="col-6">
        <div className="special-product-card">
          <div className="d-flex">
            <div style={{width:"250px", height:"250px", marginRight:"10px"}}>
              <img src={medias[0]?.url} className="img-fluid" alt="watch"/>
            </div>
            <div className="special-product-content mt-8">
              <h5 className="brand">{name}</h5>
              <h6 className="title">
                {description}
                {/*Samsung Galaxy Note10+ Mobile Phone; Sim...*/}
              </h6>
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
              <p className="price">
                <span className="line-through text-red-600">{price} DT </span> <span>&nbsp; &nbsp;{newPrice} DT</span>  <span>{status}</span>&nbsp;
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
                <p>Quantité: {quantity}</p>
              </div>
              <Link
                  to={`${
                  location.pathname === "/"
                      ? `/product/:${id}`
                      : location.pathname === `/product/:${id}`
                          ? `/product/:${id}`
                          : `:${id}`
              }`}
                     clas className="button" >
                Detail</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
