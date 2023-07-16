import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import {Link, useLocation } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import {getArticlesDetails, getArticlesPublic, getNewestArticles} from "../service/Articles/articlesServices";
import {getPromotions} from "../service/promotions/promotionsService";
import {getBanners} from "../service/banners/bannersService";
import {addFav} from "../service/favories/favoriesService";
const SingleProduct = () => {

  const location = useLocation();
  const id = location.pathname.split("/")[2].split(":")[1];
  const [singleProduct, setSingleProduct] = useState();
  const[imgSize, setImgSize] = useState({imgHeight: 0, imgWidth: 0})
  const [avg, setAvg] = useState(-1);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getArticlesDetails(id).then(res => {
      setSingleProduct(res.data)
      //getData();
    });
  },[])

  useEffect(() => {
    if(singleProduct) {
      setAvg(singleProduct?.reviews
          .map((item, index) => item?.rate)
          .reduce((a, b) => a + b, 0) / singleProduct?.reviews.length)
    }
  }, [singleProduct])

  function getData() {
    (singleProduct?.medias[0]?.url).onLoad = () => {
      setImgSize({imgHeight: singleProduct?.medias[0]?.url.height, imgWidth: singleProduct?.medias[0]?.url.width})
    }
  }


  const props = {
    width: imgSize.imgWidth,
    height: imgSize.imgHeight,
    zoomWidth: 600,
    img: (singleProduct?.medias[0]?.url)?
        singleProduct?.medias[0]?.url
        :
        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };


  const [orderedProduct, setorderedProduct] = useState(true);

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {};
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
                            className="img-fluid"
                            alt=""
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
                <p className="price">$ {singleProduct?.price}</p>
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
                  <p className="mb-0 t-review">( {singleProduct?.reviews.length} Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type : </h3>
                  <p className="product-data">{singleProduct?.category?.name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand : </h3>
                  <p className="product-data">{singleProduct?.slug}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category : </h3>
                  <p className="product-data">{singleProduct?.category?.name}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability : </h3>
                  <p className="product-data">{singleProduct?.status}</p>
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                    >
                      Add to Cart
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="" onClick={() =>
                        addFav({'article_id': id})
                            .then((res) => console.log(res))}>
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
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
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
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
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur fugit ut excepturi quos. Id reprehenderit
                    voluptatem placeat consequatur suscipit ex. Accusamus dolore
                    quisquam deserunt voluptate, sit magni perspiciatis quas
                    iste?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
