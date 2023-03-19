import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Progress } from "reactstrap";

SwiperCore.use([Autoplay, Navigation]);
const TrendingSlider = () => {
  const data = [
    {
      img: "9.jpg",
      title: "Test 1",
    },
    {
      img: "10.jpg",
      title: "Test 2",
    },
    {
      img: "11.jpg",
      title: "Test 3",
    },
    {
      img: "12.jpg",
      title: "Test 4",
    },
  ];

  return (
    <>

        {data.map((item, i) => (
            <div className="card items trending-row" key={i}>
              <div className="card-body">
                <div className="pp-card-top">
                  <div className="icon-box">
                    <span>
                      <img
                        src={`/images/items/${item.img}`}
                        style={{ width: "90px" }}
                        alt={item.title + " Logo"}
                      />
                    </span>
                  </div>
                  <div className="title-box">
                    <div
                      className="flex align-items-center text-white"
                      style={{ justifyContent: "unset" }}
                    >
                      <a style={{ marginRight: "5px" }}>{item.title}</a>
                    </div>
                    <div className="item-social">
                    <a><img src="/images/socials/website.svg" style={{width:'20px',margin:'5px'}} alt="website"/></a>
                    <a><img src="/images/socials/twitter.svg" style={{width:'20px',margin:'5px'}} alt="twitter"/></a>
                    <a><img src="/images/socials/telegram.svg" style={{width:'20px',margin:'5px'}} alt="telegram"/></a>
                    <a><img src="/images/socials/discord.svg" style={{width:'20px',margin:'5px'}} alt="discord"/></a>
                    <a><img src="/images/socials/medium.svg" style={{width:'20px',margin:'5px'}} alt="medium"/></a>
                    </div>
                    <a className="status-project">
                        <span className="status-ended">
                            Ended
                        </span>
                    </a>
                  </div>
                </div>
                <div className="part-prize">
                    <div className="d-flex mb-3">
                        <div className="pp-card-col">
                        Hard Cap
                        </div>
                        <div className="pp-card-col text-center">
                            End in
                        </div>
                        <div className="pp-card-col text-end">
                            Type
                        </div>
                    </div>
                    <p>4.4% (   30 BNB)</p>
                    <Progress max="100" value="60" color="default" style={{height: '5px'}}></Progress>
                </div>
                <p></p>
                <div className="d-flex justify-content-between">
                  <div className="text-start">
                    <p className="mb-2">Liquidity</p>
                    <p className="mb-2">Lockup Time</p>
                  </div>
                  <div className="text-end">
                  <h5 className="text-muted">20%</h5>
                    <h5 className="text-muted">300 days</h5>
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <Link href="/item">
                    <a className="btn btn-primary">Place a Bid</a>
                  </Link>
                </div>
              </div>
            </div>
        ))}
    </>
  );
};

export default TrendingSlider;
