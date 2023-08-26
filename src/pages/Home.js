import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import {getPromotions} from "../service/promotions/promotionsService";
import {getArticlesPublic, getNewestArticles} from "../service/Articles/articlesServices";
import {getBanners} from "../service/banners/bannersService";
import {useDispatch} from "react-redux";
import {setLoader} from "../redux/action/loaderAction";

const Home = () => {
  const dispatch = useDispatch();

  const [promotions, setPromotions] = useState([])
  const [articles, setArticles] = useState([])
  const [banners, setBanners] = useState([])
  const [newest, setNewest] = useState([])
  useEffect( () => {
     getArticlesPublic().then(
    res => {
      setArticles(res.data.filter(v=>v?.promotion === null))
      setPromotions(res.data.filter(v=>v?.promotion !== null))

    })
     getBanners().then(
        res => {
          setBanners(res.data)
        })
     getNewestArticles(10).then(
        res => {
            setNewest(res.data)
        })
    dispatch(setLoader(false));

  },[])

  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src={banners[0]?.url}
                className="mainBanner rounded-3"
                alt="main banner"
              />
            </div>
          </div>
          <div className="col-6">
              <div className=" position-relative">
                <img
                  src={banners[1]?.url}
                  className="screen rounded-3"
                  alt="main banner"
                />
              </div>
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src={banners[2]?.url}
                  className="secondaryBanner rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={banners[3]?.url}
                  className="secondaryBanner rounded-3"
                  alt="main banner"
                />
              </div>
          </div>
            </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              {articles.map((article, index) => {
                  return (
                      <div className="d-flex gap align-items-center" key={index}>
                        <div>
                          <h6>{article.name}</h6>
                          <p>{article.quantity} Items</p>
                        </div>
                        <img src={article?.medias[0]?.url} alt={article.description} className={'object-cover h-20 w-40'} />
                      </div>
                  )
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Collection en vedette</h3>
          </div>
          {articles?.map((article, index) => {
            return (
                <ProductCard featured={article} key={index}/>
                )
          })}
        </div>
      </Container>

    {/*  <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="../images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="../images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="../images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="../images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>*/}

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Produits speciaux</h3>
          </div>
        </div>
        <div className="row">
          {promotions.map((item)=>{
            return (
                <SpecialProduct specials={item}  />
            )
          })}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Nos produits populaires</h3>
          </div>
        </div>
        <div className="row">
          {newest.map((item, index)=>{
            return (
                <ProductCard featured={item}  key={index}/>
            )}
          )}
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="../images/brand-01.png" className={'w-40'} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../images/brand-03.png" className={'w-40'} alt="brand" />
                </div>
                  <div className="mx-4 w-25">
                  <img src="../images/brand-04.png" className={'w-40'} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="../images/brand-07.png" alt="brand" />
                </div>
                  <div className="mx-4 w-25">
                  <img src="../images/img.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

    </>
  );
};

export default Home;
