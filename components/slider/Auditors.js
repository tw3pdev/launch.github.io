import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

SwiperCore.use([Autoplay, Navigation]);
const Auditors = () => {
  const data = [
    {
      img: "interfi",
      title: "InterFi Network",
      desc: "A smart contract audit is an extensive analysis of solidity code",
      link: "https://www.interfi.network/",
    },
    {
      img: "coinscope",
      title: "CoinScope",
      desc: "Audits give a sense of security to the community using an informative report from solidity experts",
      link: "https://www.coinscope.co/",
    },
    {
      img: "certik",
      title: "CertiK",
      desc: "A comprehensive security assessment of your smart contract and blockchain code designed to identify vulnerabilities and offer solutions to fix them",
      link: "https://www.certik.com/",
    },
    {
      img: "ratetech",
      title: "Audit Rate Tech",
      desc: "We analyze smart contracts in depth line by line whilst also running tests when developing for our clients",
      link: "https://auditrate.tech/",
    },
    {
      img: "solidity",
      title: "Solidity.Finance",
      desc: "Solidity Finance is well-reputed in the community and is trusted as a top smart contract auditing company for the review of solidity code, no matter how complex",
      link: "https://solidity.finance/",
    },
    {
      img: "blocksafu",
      title: "BlockSAFU",
      desc: "BlockSAFU always tries to provide all security platforms to secure your investment funds from scammers.",
      link: "https://blocksafu.com/",
    },
  ];

  const Auditors = (() =>  (
    data.map((item, i) => (
        <div className="card-inside col-12 col-md-3" key={i}>
        <div className={`card-outside ${item.img}`}>
        </div>
        <div>
            <h4 className="card-title1">{item.title}</h4>
            <p
            style={{marginLeft:'20px',marginRight:'20px'}}>
            {item.desc}
            </p>
            <a href={item.link} target="_blank" style={{marginLeft:'20px'}} rel="noopener noreferrer">Explore<i className="bi bi-arrow-right-short"></i></a>
        </div>
      </div>
      ))
))

  return (
    <div className="row" style={{marginLeft:'auto',marginRight:'auto',placeContent:'space-around'}}>
      {Auditors()}
    </div>
  );
};

export default Auditors;
