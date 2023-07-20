import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {DeleteFromUserCart, getUserCart, UpdateFromUserCart} from "../service/cart/cartService";
import {CheckCircleOutlined} from "@ant-design/icons";

const Cart = () => {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const getData = () =>{
    getUserCart().then((res)=>{
      setData(res.data)
    })
  }
  useEffect(()=>{
    getData()
  },[])
  const  handleEditQuantity = (item)=>{
      UpdateFromUserCart({article_id: item.article.id, quantity: Number(text)}).then(()=>{
        getData()
      })
  }
  const  handleDeleteArticle = (item)=>{
      DeleteFromUserCart({cart_id: item.id}).then(()=>{
        getData()
      })
  }
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
              <h4 className="cart-col-5">Action</h4>
            </div>
            {
              data.map((item)=>{
                return (
                    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                      <div className="cart-col-1 gap-15 d-flex align-items-center">
                        <div className="w-25">
                          <img src={item?.article?.medias[0].url} className="img-fluid" alt="product image" />
                        </div>
                        <div className="w-75">
                          <p>{item?.article?.name}</p>
                        </div>
                      </div>
                      <div className="cart-col-2">
                        <h5 className="price">{item.article.price} DT</h5>
                      </div>
                      <div className="cart-col-3 d-flex align-items-center gap-15">
                        <div>
                          <input
                              className="form-control"
                              type="number"
                              min={1}
                              max={100}
                              defaultValue={item.quantity}
                              onChange={(event)=>{setText(event.target.value)}}
                          />
                        </div>
                        <div>
                          <CheckCircleOutlined onClick={()=>handleEditQuantity(item)} />

                        </div>
                      </div>
                      <div className="cart-col-4">
                        <h5 className="price">{item?.article?.price * item?.quantity} DT</h5>
                      </div>
                      <div className="cart-col-5">
                        <h5 className="price">
                          <AiFillDelete className="text-danger text-3xl cursor-pointer	"  onClick={()=>handleDeleteArticle(item)}/>
                        </h5>
                      </div>
                    </div>
                )
              })
            }

          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Total price: $ 1000</h4>
                <Link to="/t" className="button mb-14 mt-8">
                  Commander
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
