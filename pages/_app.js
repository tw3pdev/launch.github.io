import 'react-perfect-scrollbar/dist/css/styles.css';
import Layout from '../component/Layout'
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import '../public/css/style.css';
import React, { useEffect, useState } from "react";
import NextNProgress from 'nextjs-progressbar';
import axios from "axios";
import rot47 from "rot47";
import cookieCutter from 'cookie-cutter'
import BigNumber from "bignumber.js"


function MyApp(p) {
  const router = useRouter();
  const network = router.query.chain
  const { Component } = p;
  const [address, setAddress] = useState(null);
  const [connected, setConnected] = useState(false);
  const [BlurAddress, setBlurAddress] = useState(null);
  const [balance, setBalance] = useState(0)
  const [BlurBalance, setBlurBalance] = useState(null)
  const [chain, setChain] = useState(null)
  const [rpcURL, setRpcURL] = useState(null)
  const [blockURL, setBlockURL] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [isAuditor, setIsAuditor] = useState(false)
  const [mobileConnect, setMobileConnect] = useState(false);
  const [mobileNetwork, setMobileNetwork] = useState(false);
  const [thisWeb3, setWeb3] = useState(null)
  const [trendingData, setTrending] = useState([]);
  const [collapse, setCollapse] = useState(true);
  const [favorited, setFavorited] = useState([]);
  const [username, setUsername] = useState(null);
  const [userStatus, setUserStatus] = useState("basic");
  const [theme, setTheme] = useState('light-theme');
  const [lang, setLang] = useState('en');

  const isIWETH = (x) => {
    if(x.toLocaleLowerCase() == "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd".toLocaleLowerCase()) {
      return true
    }else  if(x.toLocaleLowerCase() == "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c".toLocaleLowerCase()) {
      return true
    }else  if(x.toLocaleLowerCase() == "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLocaleLowerCase()) {
      return true
    }else  if(x.toLocaleLowerCase() == "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15".toLocaleLowerCase()) {
      return true
    }else {
      return false
    }
  }
  const handleSymbol = (x) => {
    if(!x) return
    if(x.toLocaleLowerCase() == "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd".toLocaleLowerCase()) {
      return "BNB"
    }
    if(x.toLocaleLowerCase() == "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c".toLocaleLowerCase()) {
      return "BNB"
    }
    if(x.toLocaleLowerCase() == "0x55d398326f99059fF775485246999027B3197955".toLocaleLowerCase()) {
      return "USDT"
    }
    if(x.toLocaleLowerCase() == "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56".toLocaleLowerCase()) {
      return "BUSD"
    }
    if(x.toLocaleLowerCase() == "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2".toLocaleLowerCase()) {
      return "ETH"
    }
    if(x.toLocaleLowerCase() == "0xdAC17F958D2ee523a2206206994597C13D831ec7".toLocaleLowerCase()) {
      return "USDT"
    }
    if(x.toLocaleLowerCase() == "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15".toLocaleLowerCase()) {
      return "OKT"
    }
    if(x.toLocaleLowerCase() == "0x382bB369d343125BfB2117af9c149795C6C65C50".toLocaleLowerCase()) {
      return "USDT"
    }
  }
  const pContract = {
    "0x61": {
      cPresale: "0x7f4915B8d5232C3baaB07Df9E2f3340283BE82D9", // Presale Setting
      chPresale: "0x86ff873c87315b7738C7661D857f950745f1c3ed", // Presale Factory
      ctPresale: "0x1bc60c4046B7411E375Fa51DEDe412dA8Dc82ddA", // Presale Admin
      cDeposit: "0xd64b719243b5BCEE7e789f875aA313F05638ac0A", // Presale User
      presaleLocker: "0xeE0bCB7409e15dC9046f48ce9D9d8a25E538D736", // Presale Locker
      cData: "0x29022AC22bf0fb59978D3b7e5F5840dAE9b76022", // Presale View
      antibot: "0xaD8Ea768A8Dbeb2dca90C2017ca4e34353074796", // Antibot
      tools: "0xaFA660C83cE21B1d1F8cdd586FdB76F98Fd6c381", // tools
      tokenSender: "0xB3575853e445bDb1D602C169Efa8b37c97E380E1",
      tokenFactory: "0x1868989c063037c16A452ae6914cD9905392DC69",
      ctToken: "",
      aggr : "0x9c18E9079eCa439528435cF09a9ff215600f97f5",
      currency : {
        "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd" : "BNB"
      } 
    },
    "0x38":
    {
      cPresale: "0xd2cd81911CC4073772a878eCE2bad8cd7188c45d", // Presale Setting
      chPresale: "0x9eaa044c5F73bAb066598eF09887f2bb714dD6b1", // Presale Factory
      ctPresale: "0xFE6Fb9E560259e5cAA761fCc2822a4FE59dd8f13", // Presale Admin
      cDeposit: "0x1a686eb0A350731C4E87da0BaA0D10b8e69b1556", // Presale User
      presaleLocker: "0x2a749f90159d8d105B1b26101A38FC7a214d60F5", // Presale Locker
      cData: "0x544A6cc8d79d5D23F94218A9C7363DB943CB6cDd", // Presale View
      antibot: "0xaD8Ea768A8Dbeb2dca90C2017ca4e34353074796", // Antibot
      tools: "0xa7e8f372790AFD5097ba911D0E077DdDBa5033B0", // tools
      tokenSender: "0xB3575853e445bDb1D602C169Efa8b37c97E380E1",
      tokenFactory: "0xe946ce40BE9FAa46C2214104372E4053325767f0",
      aggr : "0x3bC9303C6536456487C197473B8f677aE5f98D77",
      currency : {
        "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" : "BNB",
        "0x55d398326f99059fF775485246999027B3197955" : "USDT",
        "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" : "BUSD",
      }
    }
    ,
    "0x1":
    {
      "cPresale": "",
      "ctPresale": "",
      "cLock": "",
      "ctLock": "",
      "ctToken": "",
      currency : {
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" : "ETH",
        "0xdAC17F958D2ee523a2206206994597C13D831ec7" : "USDT"
      }
    }
    ,
    "0x42":
    {
      "cPresale": "",
      "ctPresale": "",
      "cLock": "",
      "ctLock": "",
      "ctToken": "",
      tokenFactory: "0xb0A464937850890c48fFc01d55B6fbB1Df24D1D0",
      currency : {
        "0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15" : "OKT",
        "0x382bB369d343125BfB2117af9c149795C6C65C50" : "USDT"
      }
    }
    ,
  }



  const extractErrorCode = (str) => {
    const delimiter = '"\n}';
    const s = str.toString()
    const f = s.split(`"message": "execution reverted:`)[1]
    return f.split(`"`)[0]
  }
  async function isSigned() {
    const bearer = cookieCutter.get('welaunchSignMessage')
    const x = await axios.request({
      method: 'POST', url: 'https://welaunch.app/api/welaunch', data: { req: 'validate', address: address }, headers: {
        Authorization: bearer
      }
    })
    if (x.data.response == 200) {
      if (cookieCutter.get('welaunchSignMessage')) {
        return true
      } else {
        const web3 = thisWeb3
        axios.request({ method: 'POST', url: 'https://welaunch.app/api/welaunch', data: { req: 'sign_request', address: address } }).then(async function (response) {
          const message = response.data.data.message
          const mes = await web3.eth.personal.sign(message, address)
          axios.request({ method: 'POST', url: 'https://welaunch.app/api/welaunch', data: { req: 'sign_done', message: message, signed: mes, address: address } }).then(async function (response) {
            const message = response.data.data.token
            cookieCutter.set('welaunchSignMessage', message)
            return true;
          }).catch(function (error) {
            return false
          });
        }).catch(function (error) {
          return false
        });

      }
    } else {
      cookieCutter.set('welaunchSignMessage', "")
      const web3 = thisWeb3
      axios.request({ method: 'POST', url: 'https://welaunch.app/api/welaunch', data: { req: 'sign_request', address: address } }).then(async function (response) {
        const message = response.data.data.message
        const mes = await web3.eth.personal.sign(message, address)
        axios.request({ method: 'POST', url: 'https://welaunch.app/api/welaunch', data: { req: 'sign_done', message: message, signed: mes, address: address } }).then(async function (response) {
          const message = response.data.data.token
          cookieCutter.set('welaunchSignMessage', message)
          return true;
        }).catch(function (error) {
          return false
        });
      }).catch(function (error) {
        return false
      });
    }
  }

  async function sendData(req, form) {
    const bearer = cookieCutter.get('welaunchSignMessage')
    if (form) {
      const key = Object.keys(req)
      const forms = new FormData();
      for (let i = 0; i < key.length; i++) {
        forms.append(key[i], req[key[i]]);
      }


      const thisData = await axios.request({
        method: 'POST',
        url: 'https://welaunch.app/api/welaunch',
        headers: { 'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001' },
        data: forms
      })
      return thisData.data.data
    } else {
      if (bearer) {
        const thisData = await axios.request({
          method: 'POST', url: 'https://welaunch.app/api/welaunch', data: req, headers: {
            Authorization: bearer
          }
        })
        return thisData.data.data
      } else {
        const thisData = await axios.request({ method: 'POST', url: 'https://welaunch.app/api/welaunch', data: req })
        return thisData.data.data
      }
    }
  }

  async function uploadImage(req, data) {
    const bearer = cookieCutter.get('welaunchSignMessage')
    if (bearer) {
      const form = new FormData();
      form.append("req", req);
      form.append("img", data);
      const options = {
        method: 'POST',
        url: 'https://welaunch.app/api/welaunch',
        headers: {
          Authorization: bearer,
          'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
        },
        data: form
      };
      const thisData = await axios.request(options)
      return thisData.data.data
    } else {
      const thisData = await axios.request({ method: 'POST', url: 'https://welaunch.app/api/welaunch', data: req })
      return thisData.data.data
    }
  }

  async function init() {
    if (!localStorage.getItem("welaunch_lang")) {
      localStorage.setItem('welaunch_lang', "en");
    } else {
      setLang(localStorage.getItem('welaunch_lang'))
    }
    if (address) {
      ethereum.on("accountsChanged", () => {
        cookieCutter.set('welaunchSignMessage', "")
      })
    }
    if (network == 'BSC-tsnt') {
      setRpcURL("https://data-seed-prebsc-1-s3.binance.org:8545");
      setBlockURL("https://testnet.bscscan.com/");
      setChain('0x61')

    } else if (network == 'BSC') {
      setRpcURL("https://bsc-dataseed1.ninicoin.io/");
      setBlockURL("https://bscscan.com/");
      setChain('0x38')
    } else if (network == 'ETH') {
      setRpcURL("https://mainnet.infura.io/v3/3a07ff3925b24892b6b34817eaff64cd");
      setBlockURL("https://etherscan.io/");
      setChain('0x1')
    } else if (network == 'OKC') {
      setRpcURL("https://exchainrpc.okex.org");
      setBlockURL("https://www.oklink.com/okexchain");
      setChain('0x42')
    } else {
    }
    const trends = await axios.request({ method: 'GET', url: 'https://welaunch.app/api/trending/BSC-trend.json' })
    setTrending(trends.data)
  }

  function BN(x, y) {
    return +(new BigNumber(x).div(new BigNumber(10).exponentiatedBy(y)))
  }
  function bn(x) {
    return new BigNumber(x)
  }

  function rand(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function randNum(x) {
    return Math.floor(10 ** x + Math.random() * 90 ** x);
  }

  async function postData(link, datas, address) {
    const noHw = new Date();
    let g = noHw.getTime() / 1000;
    if (g.toString().includes(".")) {
      g = g.toString().split(".")[0];
    }
    const s = Math.floor(Math.random() * datas.length);

    const headers = rot47(
      rand(randNum(1.5)) +
      "." +
      randNum(5) +
      "." +
      rand(randNum(1.5)) +
      "." +
      g +
      "." +
      randNum(5) +
      "." +
      rand(randNum(1.5)) +
      "." +
      datas[s] +
      "." +
      address +
      "." +
      randNum(5) +
      rand(randNum(1.5))
    );
    const options = {
      method: "GET",
      url: link,
      headers: {
        BlockchainData: headers,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        return (response.data);
      })
  }



  useEffect(() => {
    if (!router.isReady) return;
    if (!network && router.pathname != "/s/[id]") {
      router.push('/?chain=BSC')
    };
    init()

  }, [network, router.isReady])

  function handleChain(x) {
    if (x == 'img') {
      if (network == 'BSC' || network == 'BSC-tsnt') {
        return "/images/chain/smartChain.svg"
      } else if (network == 'ETH') {
        return "/images/chain/eth.svg"
      } else if (network == 'OKC') {
        return "/images/chain/oec.png"
      } else {
        return '/images/wallet/unknown.png'
      }
    }
    if (x == 'symbol') {
      if (network == 'BSC' || network == 'BSC-tsnt') {
        return "BNB"
      } else if (network == 'ETH') {
        return "ETH"
      } else if (network == 'OKC') {
        return "OKT"
      } else {
        return '???'
      }
    }
  }
  useEffect(() => {

  }, [address, network, router])
  p = {
    ...p,
    address,
    setAddress,
    connected,
    setConnected,
    BlurAddress,
    setBlurAddress,
    balance,
    setTheme,
    theme,
    setBalance,
    BlurBalance,
    setBlurBalance,
    isIWETH,
    setWeb3,
    chain,
    setChain,
    rpcURL,
    setRpcURL,
    setUserProfile,
    bn,
    userProfile,
    blockURL,
    setBlockURL,
    setUsername,
    extractErrorCode,
    setUserStatus,
    mobileConnect,
    setMobileConnect,
    userStatus,
    username,
    pContract,
    mobileNetwork,
    setMobileNetwork,
    setIsAuditor,
    handleSymbol,
    isAuditor,
    thisWeb3,
    handleChain,
    trendingData,
    postData,
    setCollapse,
    BN,
    collapse,
    isSigned,
    uploadImage,
    sendData,
    favorited,
    setFavorited,
    lang,
    setLang
  }
  return (
    <>
      <NextNProgress />
      <Layout {...p} >

        <Component key={router.asPath} />
      </Layout>
    </>

  )
}

export default MyApp
