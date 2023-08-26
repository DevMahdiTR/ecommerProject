import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import {DeleteFromUserCart, getUserCart, UpdateFromUserCart} from "../service/cart/cartService";
import {CheckCircleOutlined} from "@ant-design/icons";
import {Form, Input, Modal} from "antd";
import {userCommand} from "../service/commands/commandsService";

const Cart = () => {
  const [data, setData] = useState([])
  const [text, setText] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0)
  const getData = () =>{
    getUserCart().then((res)=>{
      setData(res.data)
      setTotal(res.data.reduce((acc, item)=>acc+item.article.price*item.quantity, 0))
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
  const handleCommand = (value) => {
    console.log(value)
        value = {
            ...value,
            total: total,
        }
        console.log(value)
    userCommand(value).then(r=>{
      console.log(r.data)
      setModalVisible(false);
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
              <h4 className="cart-col-1">Produit</h4>
              <h4 className="cart-col-2">Prix</h4>
              <h4 className="cart-col-3">Quantité</h4>
              <h4 className="cart-col-4">Total</h4>
              <h4 className="cart-col-5">Action</h4>
            </div>
            {
              data.map((item, index)=>{
                return (
                    <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center" key={index}>
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
                              onBlur={() => handleEditQuantity(item)}
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
                  Continuer vos achats
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>Total price: {total} DT</h4>
                <button onClick={() => setModalVisible(true)} className="button mb-14 mt-8">
                  Commander
                </button>
              </div>
            </div>
          </div>
          <Modal
              title={"Command"}
              open={modalVisible}
              okType={"default"}
              onCancel={()=>{
                setModalVisible(false);
                form.resetFields();
              }}
              onOk={()=>form.submit()}
              okText={"Commander"}
          >
            <Form form={form} onFinish={handleCommand}>
              <Form.Item name="adresse" label="Address" rules={[{required: true, message: 'Address is required'}]}>
                <Input/>
              </Form.Item>
              <Form.Item name="telephone" label="Numéro de téléphone" rules={[{required: true, min: 8, message: 'min length is 2'}]}>
                <Input/>
              </Form.Item>
              <Form.Item name="total" label="Total">
               <p className="font-bold">{total} DT</p>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Container>
    </>
  );
};

export default Cart;
