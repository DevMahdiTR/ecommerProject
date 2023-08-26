import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactImageZoom from "react-image-zoom";
import { AiOutlineHeart } from "react-icons/ai";
import {Link, useLocation } from "react-router-dom";
import Container from "../components/Container";
import {getArticlesDetails} from "../service/Articles/articlesServices";
import {addFav} from "../service/favories/favoriesService";
import {addReview} from "../service/reviews/reviewsService";
import {addToCart} from "../service/cart/cartService";
import { notification } from "antd";
const SingleProduct = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2].split(":")[1];
  const [singleProduct, setSingleProduct] = useState();
  const [image , setImage] = useState('');
  const[imgSize, setImgSize] = useState({imgHeight: 0, imgWidth: 0})

  const [avg, setAvg] = useState(-1);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getArticlesDetails(id).then(res => {
      setSingleProduct(res.data)
      setImage(res.data.medias[0]?.url)
    });
  },[])

  useEffect(() => {
    if(singleProduct) {
      setAvg(singleProduct?.reviews
          .map((item, index) => item?.rate)
          .reduce((a, b) => a + b, 0) / singleProduct?.reviews.length)
    }
  }, [singleProduct])

  const props = {
    width: imgSize.imgWidth,
    height: imgSize.imgHeight,
    zoomWidth: 600,
    img: (singleProduct?.medias)?
       image
        :
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };
  const handleSubmitReview = (e)=>{
    e.preventDefault();
    addReview({rate: rating , content: review, article_id: id}).then((res)=>{
      setRating(0);
      setReview("");
      getArticlesDetails(id).then(r => {

        setSingleProduct(r.data)
      });
    })
  }
  const handleAddToCard = ()=>{
    addToCart({article_id:Number(id)}).then(()=>{
      notification.success({
        message: "Product added successfully to cart",
      });

    })
  }

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {singleProduct?.medias.map((item, index) => {
                  return (
                      <div key={index}>
                        <img
                            src={item?.url}
                            className="img-fluid cursor-pointer"
                            alt=""
                            onClick={()=>setImage(item?.url)}
                        />
                      </div>
                  )}
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                    {singleProduct?.name}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">{singleProduct?.price} DT</p>
                <div className="d-flex align-items-center gap-10">
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
                  <p className="mb-0 t-review">( {singleProduct?.reviews?.length} Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Écrire une critique
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type : </h3>
                  <p className="product-data">{singleProduct?.category?.name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Marque : </h3>
                  <p className="product-data">{singleProduct?.slug}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Catégorie : </h3>
                  <p className="product-data">{singleProduct?.category?.name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Disponibilité : </h3>
                  <p className="product-data">{singleProduct?.status}</p>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={handleAddToCard}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="" className={'flex'} onClick={() =>
                        addFav({'article_id': id})
                            .then((res) => console.log(res))}>
                      <AiOutlineHeart className="fs-5 me-2" /> Ajouter à la liste de souhaits
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                {singleProduct?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Commentaires</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Avis des clients</h4>
                  <div className="d-flex align-items-center gap-10">
                    {avg > 0 && (
                        <ReactStars
                            count={5}
                            size={24}
                            value={avg}
                            edit={false}
                            activeColor="#ffd700"
                        />
                    )}
                    <p className="mb-0">Baser sur {singleProduct  ? singleProduct?.reviews?.length : '0'} commentaires</p>
                  </div>
                </div>
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form onSubmit={handleSubmitReview} className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={rating}
                      edit={true}
                      activeColor="#ffd700"
                        onChange={(e) => setRating(e)}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0"  disabled={rating === null && review.length === 0}>Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {
                  singleProduct?.reviews?.length > 0 &&

                          singleProduct?.reviews?.map((item)=>{
                            return (
                                <div className="review mb-14">
                                  <div className="d-flex gap-10 align-items-center">
                                    <h6 className="mb-0">{item?.user?.name}</h6>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={item?.rate}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                  </div>
                                  <p className="mt-3">
                                    {item?.content}
                                  </p>
                                </div>
                            )
                        })
                }

              </div>
            </div>
          </div>
        </div>
      </Container>

    </>
  );
};

export default SingleProduct;
