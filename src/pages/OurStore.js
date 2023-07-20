import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import {getPublicCategories} from "../service/categories/categoriesService";
import {getArticles, getArticlesBuCategories, getArticlesPublic} from "../service/Articles/articlesServices";
import {useLocation} from "react-router-dom";


const OurStore = () => {
  const [grid, setGrid] = useState(4);
const [categories, setCategories] = useState([]);
const [articles, setArticles] = useState([]);
const params = new URLSearchParams(useLocation().search);
console.log(params.get('category'))

  useEffect(()=>{
    getPublicCategories().then(res => {
      setCategories(res.data)
    })
    if (params.get('category')){
        getArticlesBuCategories(params.get('category')).then(res => {
            setArticles(res.data.articles)
        })
    } else {
      getArticlesPublic().then(res => {
        setArticles(res.data)
      })
    }

  },[])
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories.map((item, index) => (
                    <li
                        onClick={() => {
                          getArticlesBuCategories(item.id).then(res => {
                            setArticles(res.data.articles)
                            })
                        }}
                        key={index}>{item.name}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      name="available"
                      id="stock"
                        onChange={(e) => {
                            if (e.target.checked){
                                setArticles(articles.filter(item => {return item.status=== 'IN STOCK'}))
                            } else {
                                getArticlesPublic().then(res => {
                                    setArticles(res.data)
                                })
                            }}}
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock ({articles.filter(item => {return item.status=== 'IN STOCK'}).length})
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      name="available"
                      id="stock"
                      onChange={(e) => {
                        if (e.target.checked){
                          setArticles(articles.filter(item => {return item.status=== 'OUT OF STOCK'}))
                      } else {
                            getArticlesPublic().then(res => {
                                setArticles(res.data)
                            })
                      }}}
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock({articles.filter(item => {return item.status=== 'OUT OF STOCK'}).length})
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {articles?.map((article, index) => (
                  <ProductCard featured={article} key={index} grid={grid}/>
                ))}
              </div>
              <div className="d-flex align-middle flex-wrap justify-center mt-8">
                {
                  articles.length === 0 && (
                        <h5>
                          No products in this Categories
                        </h5>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
