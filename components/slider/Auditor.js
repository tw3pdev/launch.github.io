import React, {useEffect, useState} from 'react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from 'axios';
import { useRouter } from "next/router";
import Link from 'next/link'
SwiperCore.use([Autoplay, Navigation]);
const Auditor = () => {
    const router = useRouter();
    const  paramChain  = router.query.chain
    const [data, SetData] = useState([])
    async function init() {
      }
      useEffect(() => {
    init()
      }, [paramChain])


    return (
        <>
           <img className="floating-img" src="./images/items/coin.png" />


        </>
    );
};

export default Auditor;

