import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {getFavList} from "../service/favories/favoriesService";

const Wishlist = () => {
  const [favs, setFavs] = useState([]);
  useEffect(
    () => {
      getFavList().then(
            res =>{
              setFavs(res.data)
              console.log(res.data);
            }
        )},[])

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {favs.map((fav, index) => {
            return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                        src="../images/cross.svg"
                        alt="cross"
                        className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image">
                      <img
                          src="../images/watch.jpg"
                          className="img-fluid w-100"
                          alt="watch"
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">
                          {fav?.article?.name}
                      </h5>
                      <h6 className="price">$ {fav?.article?.price}</h6>
                    </div>
                  </div>
                </div>
            )}
          )}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
