import LayoutAdmin from "/components/layout/LayoutAdmin";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "chart.js/auto";
import { useQRCode } from "next-qrcode";
import { presaleAdmin, presaleUser, IERC20, presaleFactory, Tools } from "/components/web3/abi";
import Web3 from "web3";
import { detailsAbi } from "/components/web3/detailsAbi";
import { presaleView } from "/components/web3/presaleView";
import YouTube from "react-youtube";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Link from "next/link";
import ProgressBar from "/components/elements/ProgressBar";
import { toast } from 'react-toastify';
import dynamic from "next/dynamic";
import Count from "/component/Count"
import { Upvote, Message, Downvote, Send, Report } from "/component/Images";
import { Button, Button3 } from "/component/Comps";
import Game from "/components/elements/game"
import { checkLogin, changeChain } from "/component/connect";
import WeLaunchCharts from '../chart'
import Axios from "axios"
import { rand } from "/component/randBanner"
import { pinksaleAbi1, pinksaleAbi2, pinksaleAbi3 } from "/components/web3/pinksaleAbi";
function Item({ p }) {

  const router = useRouter();
  const { id } = router.query;
  const paramChain = router.query.chain;
  const {
    address,
    userProfile,
    BlurAddress,
    bn,
    chain,
    connected,
    thisWeb3,
    balance,
    rpcURL,
    blockURL,
    isSigned,
    pContract,
    sendData,
    extractErrorCode,
    username,
    handleChain,
    BN,
    setFavorited,
    setBalance,
    setWeb3,
    setBlurAddress,
    setChain,
    setAddress,
    setConnected
  } = p;

  const [isOnNetwork, setIsOnNetwork] = useState(false);
  const [ban, setBan] = useState()

  const [dataS, setDataS] = useState([
    {
      "id": "Burned",
      "label": "Burned",
      "value": 76,
      "color": "#3DFFDC"
    },
    {
      "id": "Liquidity",
      "label": "Liquidity",
      "value": 559,
      "color": "#20D7FF"
    },
    {
      "id": "Presale",
      "label": "Presale",
      "value": 276,
      "color": "#FC78E6"
    },
    {
      "id": "Unlocked",
      "label": "Unlocked",
      "value": 460,
      "color": "#4B2EFF"
    }
  ])
  const [isAddress, setIsAddress] = useState(true)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [isPremium, setIsPremium] = useState(false);
  const [premiumColor2, setPremiumColor2] = useState("hsl(191deg 98% 59%)");
  const [canvasColor, setCanvasColor] = useState("#036AE3");
  const [premiumColor, setPremiumColor] = useState("hsl(212deg 97% 45%)");
  // Presale Locked
  const [audit, setAudit] = useState("");
  const [isTokenInsured, setIsTokenInsured] = useState(false);

  // Whitelist State && Paging
  const [pageCount, setPagecount] = useState(0);
  const [perPage, setPerpage] = useState(15);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState("");

  const [isDescription, setIsDescription] = useState("auto audit");
  const [safeWL, setSafeWL] = useState(false);


  const [whitelistest, setWhitelistest] = useState([]);

  const [amount, setAmount] = useState();
  const [yourContribution, setyourContribution] = useState(null);
  const [tokenOwed, setTokenOwed] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const { Image, Canvas } = useQRCode();

  const [message, setMessage] = useState("");

  const [noImage, setNoImage] = useState(false);
  const [contractVerified, setContractVerified] = useState(true);
  const [bannerLoaded, setBannerLoaded] = useState(false);

  const [saved, setSaved] = useState(0);




  const [startUTC, setStartUTC] = useState("Jan 01 1785 00:00:00");
  const [endUTC, setEndUTC] = useState("Jan 01 1785 00:00:00");

  const [string, setString] = useState([]);
  const [uint, setUint] = useState([]);
  const [presaleStatus, setPresaleStatus] = useState(0);
  const [presaleInfo, setPresaleInfo] = useState([]);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [addressPresale, setAddressPresale] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [presaleType, setPresaleType] = useState("Public")
  const [headerImage, setHeaderImage] = useState()
  const [comments, setComments] = useState([])
  const [topComments, setTopComments] = useState([])

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setOffset(offset);
    const data = whitelistest;
    setPagecount(Math.ceil(data.length / perPage));
  };

  function getTimeUTC(x) {
    let target = new Date(x);
    target = new Date(
      target.getUTCFullYear(),
      target.getUTCMonth(),
      target.getUTCDate(),
      target.getUTCHours(),
      target.getUTCMinutes(),
      target.getUTCSeconds()
    );
    return target;
  }


  const swapRouter = [

    {
      chain: "BSC",
      router: [
        { name: "Pancakeswap", address: "0x10ed43c718714eb63d5aa57b78b54704e256024e" },
        { name: "Bakeryswap", address: "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F" },
        { name: "Biswap", address: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8" },
        { name: "BabyDogeswap", address: "0xC9a0F685F39d05D835c369036251ee3aEaaF3c47" }
      ]
    },
    {
      chain: "BSC-tsnt",
      router: [
        { name: "Pancakeswap", address: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3" },
      ]
    },
    {
      chain: "ETH",
      router: [
        { name: "UniSwap", address: "0x7a250d5630b4cf539739df2c5dacb4c659f2488d" },
      ]
    },
    {
      chain: "OKC",
      router: [
        { name: "OKCSwap", address: "0xc97b81b8a38b9146010df85f1ac714afe1554343" },
        { name: "JSwap", address: "0x069a306a638ac9d3a68a6bd8be898774c073dcb3" },
      ]
    }

  ]

  function handleRouter() {
    const addr = addressPresale.router
    let x = 0
    let result = "-"
    swapRouter.map((item, i) => {
      if (item.chain == paramChain) {
        x = i
      }
    })
    for (let i = 0; i < swapRouter[x].router.length; i++) {
      if (swapRouter[x].router[i].address == addr) {
        result = swapRouter[x].router[i].name
      }
    }
    return result
  }

  function setMax() {
    if (connected) {
      if (balance > uint.maximumBuy / 1e18) {
        setAmount((uint.maximumBuy / 1e18).toString());
      } else {
        if (balance <= 0.03) {
          setAmount(balance);
        } else {
          setAmount(balance - 0.03);
        }
      }
    } else {
      setAmount(0);
    }
  }

  async function cancelPresale() {
    const web3 = new Web3(thisWeb3);
    let isNetwork = false
    try {
      const chainId = web3.utils.toHex(await web3.eth.getChainId());
      if (chainId == '0x61' && paramChain == 'BSC-tsnt') {
        isNetwork = true
      } else if (chainId == '0x38' && paramChain == 'BSC') {
        isNetwork = true
      } else if (chainId == '0x1' && paramChain == 'ETH') {
        isNetwork = true
      } else if (chainId == '0x42' && paramChain == 'OKC') {
        isNetwork = true
      }
      if (!isNetwork) {
        toast.error("Please change network")
        setIsOnNetwork(false)
        changeNetworks(true)
        return
      }
    } catch (_) { }
    const presaleTools = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
    try {
      await presaleTools.methods.cancelPresale(id, false).call({ from: address })
      await presaleTools.methods.cancelPresale(id, false).send({ from: address })
      toast("Success!")
      loadNew()
    } catch (e) {
      try {
        toast.error(extractErrorCode(e));
      } catch (_) {
        try {
          toast.error(e.message);
        } catch (er) {
          toast.error("Something Error!");
        }
      }
    }
  }

  async function finalize() {
    const web3 = new Web3(thisWeb3);
    let isNetwork = false
    try {
      const chainId = web3.utils.toHex(await web3.eth.getChainId());
      if (chainId == '0x61' && paramChain == 'BSC-tsnt') {
        isNetwork = true
      } else if (chainId == '0x38' && paramChain == 'BSC') {
        isNetwork = true
      } else if (chainId == '0x1' && paramChain == 'ETH') {
        isNetwork = true
      } else if (chainId == '0x42' && paramChain == 'OKC') {
        isNetwork = true
      }
      if (!isNetwork) {
        toast.error("Please change network")
        setIsOnNetwork(false)
        changeNetworks(true)
        return
      }
    } catch (_) { }
    const PresaleContract = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
    try {
      await PresaleContract.methods
        .finishPresale(id, false)
        .call({ from: address })
        .then(async function () {
          await PresaleContract.methods
            .finishPresale(id, false)
            .send({ from: address })
            .then(async function () {
              toast("Success!")
              loadNew()
            })
        })
    } catch (e) {
      try {
        toast.error("Presale not met yet!");
      } catch (_) {
        try {
          toast.error(e.message);
        } catch (er) {
          toast.error("Something Error!");
        }
      }
    }
  }

  async function addToMetamask() {
    try {
      await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: addressPresale.token,
            symbol: tokenInfo.symbol,
            decimals: tokenInfo.decimal,
            image: string.logo,
          },
        },
      });
    } catch (_) { }
  }

  async function getContract(link, contract) {
    var opt = {
      method: "GET",
      url: link,
      params: {
        module: "contract",
        action: "getsourcecode",
        address: contract,
      },
    };
    axios.request(opt).then(function (response) {
      if (
        response.data["result"][0]["ABI"] == "Contract source code not verified"
      ) {
        setContractVerified(false);
      }
    });
  }

  const calculate = (amount, listMulti, liq) => {
    const liqAmount = +bn(amount).multipliedBy(listMulti).multipliedBy(liq).div(10000)
    const feeAmount = +bn(amount).multipliedBy(tokenFee).div(10000)
    return +bn(amount).plus(liqAmount).plus(feeAmount)
  }

  async function checkSave() {
    const savedData = await sendData({ req: "getsave", address: address })
    const pAddr = savedData.presale;
    for (let i = 0; i < pAddr.length; i++) {
      if (pAddr[i][0] == id) {
        setSaved(true);
      }
    }
  }

  const [isReply, setIsReply] = useState(-1);
  const [isComment, setIsComment] = useState(-1);
  const [buyTax, setBuyTax] = useState("Unknown")
  const [sellTax, setSellTax] = useState("Unknown")
  const [setFee, setSetFee] = useState("Unknown")
  const [blackList, setBlackList] = useState("Unknown")
  const [pauseTrade, setPauseTrade] = useState("Unknown")
  const [proxy, setProxy] = useState("Unknown")

  function showMessage(e, isTopComment) {
    if (isTopComment) {
      const s = topComments[e].reply
      let last = -1;
      s.forEach((datas, i) => {
        if (datas.hidden) {
          if (last == -1) {
            last = i
          }
        }
      });
      if (last != -1) {
        if (s.length - last > 3) {
          for (let i = last; i < 3; i++) {
            s[i].hidden = false
          }
        } else {
          for (let i = last; i < s.length; i++) {
            s[i].hidden = false
          }
        }
      }
    } else {
      const s = comments[e].reply
      let last = -1;
      s.forEach((datas, i) => {
        if (datas.hidden) {
          if (last == -1) {
            last = i
          }
        }
      });
      if (last != -1) {
        if (s.length - last > 3) {
          for (let i = last; i < 3; i++) {
            s[i].hidden = false
          }
        } else {
          for (let i = last; i < s.length; i++) {
            s[i].hidden = false
          }
        }
      }
    }
  }


  function hide(e, isTopComment) {
    if (isTopComment) {
      const s = topComments[e].reply
      s.forEach((datas, i) => {
        datas.hidden = true;
      });
    } else {
      const s = comments[e].reply
      s.forEach((datas, i) => {
        datas.hidden = true;
      });
    }
  }
  const [shortLink, setShortLink] = useState(id)
  const [tokenFee, setTokenFee] = useState(0)
  const [baseFee, setBaseFee] = useState(0)
  const [isEndorse, setEndrose] = useState(0)
  async function init() {
    setBan(rand())
    if (id) {

      const res = await sendData({ req: 'getComment', address: id }, false)
      const shortlink = await sendData({ req: "getShortlink", contract: id }, false)
      if(shortlink.link) setShortLink(shortlink.link);

      const f = JSON.parse(JSON.stringify(res.comments));
      f.forEach((data) => {
        const s = data.reply
        s.forEach((datas) => {
          datas.hidden = true
        });
      });
      setComments(f);
      const x = JSON.parse(JSON.stringify(res.comments));
      x.forEach((data) => {
        const s = data.reply
        s.forEach((datas) => {
          datas.hidden = true
        });
      });
      setTopComments((x).sort((a, b) => b.total - a.total))
    }
    let start1 = 0; // Declaration Start Time
    let end1 = 0; // Declaration End Time
    if (pContract[chain]) {
      const web3 = new Web3(rpcURL);
      if (!web3.utils.isAddress(id)) {
        setIsAddress(false)
        setLoaded(true)
        return
      }


      if (connected && address) {
        const web3 = new Web3(thisWeb3)
        try {
          const chainId = web3.utils.toHex(await web3.eth.getChainId());
          if (chainId == '0x61' && paramChain == 'BSC-tsnt') {
            setIsOnNetwork(true)
          } else if (chainId == '0x38' && paramChain == 'BSC') {
            setIsOnNetwork(true)
          } else if (chainId == '0x1' && paramChain == 'ETH') {
            setIsOnNetwork(true)
          } else if (chainId == '0x42' && paramChain == 'OKC') {
            setIsOnNetwork(true)
          }
        } catch (_) { }
      }

      // Check Save
      try {
        if (connected && address) {
          await checkSave()
        }
      } catch (_) { }
      
      const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
      try {
        await presaleViewContract.methods.getPresale(id).call()
      } catch (_) {
        setIsAddress(false)
        setLoaded(true)
        return
      }
      const feePrice = await presaleViewContract.methods.GUINTS().call()
      setTokenFee(+feePrice.T_FEE_R)
      setBaseFee(+feePrice.B_FEE_R)
      const presaleUsers = new web3.eth.Contract(presaleUser, pContract[chain]["cDeposit"]);
      const resData = await presaleViewContract.methods.getPresale(id).call()
      let totalbbuyer = 0
      const uintParam = resData.uints
      const adrParam = resData.adrs
      const boolParam = resData.bools
      const socialParam = resData.social
      const tokenParam = resData.tokenInfo
      setEndrose(+(uintParam.endoRate) / 100)
      start1 = Number(uintParam.startTime) * 1000;
      end1 = Number(uintParam.endTime) * 1000;
      if (uintParam.status == 0 || uintParam.status == 1) {
        setStart(start1)
        setEnd(end1)
      } else {
        setStart(0)
        setEnd(0)
      }
      const canvas = (socialParam.color).split("|")[0]
      const pColor = (socialParam.color).split("|")[1]
      const pColor2 = (socialParam.color).split("|")[2]
      if (boolParam.isEP) {
        setHeaderImage(socialParam.banner)
        setIsPremium(true)
        setCanvasColor(canvas)
        setPremiumColor(pColor)
        setPremiumColor2(pColor2)
      }
      // getBuyer
      try {
        const r = await presaleUsers.methods.getBiIdxs(id, id, 0, 0).call()
        totalbbuyer = r[3].length
      } catch (_) { }
      setIsTokenInsured(boolParam.insured);
      setPresaleStatus(uintParam.status);

      setPresaleInfo({
        whitelist: boolParam.isWhitelist,
        LP: boolParam.finished,
        cancelReason: uintParam.cancelReason,
        canceled: boolParam.canceled,
        baseCollected: uintParam.totalRaised,
        totalBuyer: totalbbuyer,
        isRefund: boolParam.returnLeft,
      });
      if (boolParam.isWhitelist) {
        const presaleAdmins = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
        const addressWhitelist = await presaleAdmins.methods.getWls(id, id, 0, 0).call()
        const wt = addressWhitelist[3];
        setSafeWL(wt.includes(address))
        setWhitelistest(wt)
        setPagecount(Math.ceil(wt.length / perPage));

      }
      const checkRes = await axios.request({
        method: 'POST',
        url: 'https://imanrep.com/y/run',
        data: { address: adrParam.token }
      })
      const ressX = checkRes.data.data.message
      if (ressX != "Contract not verified") {
        if (!ressX.err) {
          setBuyTax(`${ressX.tax.buyTax}%`)
          setSellTax(`${ressX.tax.buyTax}%`)
        }
        setSetFee(ressX.setting.setFeeBool ? "Yes" : "No")
        setBlackList(ressX.setting.blackListBool ? "Yes" : "No")
        setPauseTrade(ressX.setting.pausedBool ? "Yes" : "No")
        setProxy(ressX.setting.isProxy ? "Yes" : "No")
      }

      const symbol = tokenParam.symbol
      const decimal = tokenParam.decimal
      const name = tokenParam.name
      const ts = tokenParam.totalSupply
      const devDecimal = +(bn(10).exponentiatedBy(decimal));
      const totalSupply = BN(ts, decimal);
      setTokenInfo({
        symbol,
        decimal,
        name,
        totalSupply,
      });
      setAddressPresale({
        owner: adrParam.owner,
        token: adrParam.token,
        router: adrParam.router,
      });

      let presRate = uintParam.presaleRate
      let listRate = uintParam.listingRate.length > 18 ? +(bn(uintParam.listingRate).div(decimal)) : uintParam.listingRate
      setString({
        website: socialParam.website,
        telegram: socialParam.tele,
        twitter: socialParam.twitter,
        discord: socialParam.discord,
        medium: socialParam.medium,
        reddit: socialParam.reddit,
        logo: socialParam.logo,
        banner: socialParam.banner,
        detail: socialParam.detail,
        audit: "",
        kyc: "",
      });

      
      const liq = +(bn(uintParam.amount).multipliedBy(uintParam.listingRate).multipliedBy(uintParam.liq).div(100).div(devDecimal));
      const amount = +bn(uintParam.amount).div(devDecimal)
      const tokenForPresaless = +(bn(calculate(amount, uintParam.listingRate, (uintParam.liq*100))));
      const tokenForPresalessPercent = +(bn(tokenForPresaless).div(totalSupply).multipliedBy(100));
      const liqPercent = +(bn(liq).div(totalSupply).multipliedBy(100));
      const burnUnlock = await presaleViewContract.methods._getTotalValues(id).call();
      const totalBurned = +(bn(burnUnlock[0]).div(devDecimal))
      const totalBurnedPercent = +(bn(totalBurned).div(totalSupply).multipliedBy(100));
      const totalUnlocked = +(bn(burnUnlock[1]).div(devDecimal))
      const totalUnlockedPercent = +(bn(totalUnlocked).div(totalSupply).multipliedBy(100));
      setDataS([
        {
          "id": "Burned",
          "label": `Burned (${(totalBurnedPercent).toLocaleString()}%)`,
          "value": totalBurned,
          "color": "#3DFFDC"
        },
        {
          "id": "Liquidity",
          "label": `Liquidity (${(liqPercent).toLocaleString()}%)`,
          "value": liq,
          "color": "#20D7FF"
        },
        {
          "id": "Presale",
          "label": `Presale (${(tokenForPresalessPercent).toLocaleString()}%)`,
          "value": (tokenForPresaless),
          "color": "#FC78E6"
        },
        {
          "id": "Unlocked",
          "label": `Unlocked (${(totalUnlockedPercent).toLocaleString()}%)`,
          "value": totalUnlocked,
          "color": "#4B2EFF"
        }
      ])
      let totalMaxBuy = uintParam.max
      if (connected && address) {
        const maxBuy = await presaleViewContract.methods.getPresaleUser(id, address).call();
        if (uintParam.presaleType == 0) {
          totalMaxBuy = +(bn(uintParam.max).minus(maxBuy[1].bDepo));
          const rn = +bn(uintParam.hardCap).minus(uintParam.totalRaised)
          if (totalMaxBuy > rn) {
            totalMaxBuy = rn
          }
        } else {
          totalMaxBuy = +bn(uintParam.max).minus(maxBuy[1].bDepo)
        }
        setyourContribution(maxBuy[1][0] - maxBuy[1].bWith);
        setTokenOwed(maxBuy[1][2]);
      } else {
        setUint({
          preRate: presRate,
          minimumBuy: uintParam.min,
          maximumBuy: totalMaxBuy,
          hardCap: uintParam.hardCap,
          softCap: uintParam.softCap,
          tokenForPresale: tokenForPresaless,
          tokenForLiquidity: liq,
          liquidity: uintParam.liq,
          listRate: listRate,
          startDate: uintParam.startTime,
          endDate: uintParam.endTime,
          lockup: +bn(uintParam.lockUp).div(86400),
          mode: uintParam.presaleType
        });
      }

      if (uintParam.publicSaleStartTime == uintParam.startTime) {
        setPresaleType("Public")
      } else if (uintParam.publicSaleStartTime >= uintParam.eTime) {
        setPresaleType("Private")
      } else if (uintParam.publicSaleStartTime != uintParam.publicSaleStartTime) {
        setPresaleType("Semi Public")
      }

      if (chain == "0x61") {
        getContract("https://api-testnet.bscscan.com/api", adrParam.token);
      } else if (chain == "0x1") {
        getContract("https://api.etherscan.io/api", adrParam.token);
      } else if (chain == "0x42") {
        getContract("https://www.oklink.com/okexchain/api", adrParam.token);
      }


      setStartUTC(getTimeUTC(start1).toString());
      setEndUTC(getTimeUTC(end1).toString());
      setInterval(() => loadNew(), 15000);
      setLoaded(true);
    }


  }


  function localSplit(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    const res = str.join('.')
    return res;
  }




  async function votes(idX, x, type, r) {
    const voteNow = comments[r].isVoted
    if (x == voteNow) {
      if (x == 0) {
        comments[r].total--
      } else {
        comments[r].total++
      }
      comments[r].isVoted = 2
    } else {
      if (x == 0) {
        comments[r].total++
        comments[r].total++
      } else {
        comments[r].total--
        comments[r].total--
      }
      comments[r].isVoted = x
    }

    if (await isSigned()) {
      const res = await sendData({ req: 'vote', contract: id, vote: x, type: type, id: idX, chain: paramChain }, false)
      if (res.status) {
        const x = JSON.parse(JSON.stringify(res.comments));
        setComments(res.comments);
        setTopComments((x).sort((a, b) => b.total - a.total))
      } else {
        toast.error(res.message)
      }
    } else {
      toast.error("You need Sign to Comment!")
    }
  }
  useEffect(() => {
    handlePageClick;
    init();
  }, [address, balance, rpcURL, paramChain]);

  function getSocial(x) {
    return (
      <Link href={string[x] ? string[x] : "#"}>
        <a target="_blank" rel="noopener noreferrer" className={`social_box ${x} c-pointer`}>
          <img src={`/images/Fa/${x}.svg`} style={{ width: '25px' }} />
        </a>
      </Link>
    )
  }

  async function changeNetworks(e) {
    checkLogin().then((r) => {
      if (r.status) {
        setConnected(true)
        changeChain(r.provider, paramChain, router).then((res) => {
          if (res.status) {
            setIsOnNetwork(true)
            const result = res.data
            setConnected(true)
            setAddress(result.address)
            setChain(result.chainId)
            setBlurAddress(blur(result.address))
            setWeb3(result.web3)
            setBalance(result.balance)
          }
        })
      }
    })
  }

  function contribute() {
    const buttonDisabled = ((x) => (<button className="btn x-btn" disabled>{x}</button>))
    const button = ((x) => (<button className="btn x-btn" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }} onClick={(e) => Contribute(e)}>{x}</button>))
    const changeNetwork = ((x) => (<button className="btn x-btn" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }} onClick={(e) => changeNetworks(e)}>{x}</button>))
    if (!amount) return
    if (presaleStatus != 1) return
    if (!isOnNetwork) return changeNetwork("Change Network")
    if (+amount > balance) return (buttonDisabled("Exceeced Balance"))
    if (+amount > uint.maximumBuy / 1e18) return (buttonDisabled("Max Limit"))
    if (presaleType != "Public") {
      if (safeWL) return (button("Contribute"))
      else return (buttonDisabled("Not Whitelisted"))
    } else {
      if (uint.mode == 0) {
        if (uint.hardCap - presaleInfo.baseCollected < uint.minimumBuy) {
          if (+amount && +amount <= uint.maximumBuy / 1e18) return (button("Contribute"))
          else return (buttonDisabled("Max Limit"))
        } else {
          if (+amount && amount >= uint.minimumBuy / 1e18) return (button("Contribute"))
          else return (buttonDisabled("Min Limit"))
        }
      } else {
        if (uint.softCap - presaleInfo.baseCollected < uint.minimumBuy) {
          if (+amount && +amount <= uint.maximumBuy / 1e18) return (button("Contribute"))
          else return (buttonDisabled("Max Limit"))
        } else {
          if (+amount && amount >= uint.minimumBuy / 1e18) return (button("Contribute"))
          else return (buttonDisabled("Min Limit"))
        }
      }
    }
  }
  async function saveUnsave() {
    if (connected) {
      const web3 = new Web3(rpcURL);
      if (await isSigned()) {
        const saves = await sendData({ req: 'save', contract: id, external: "", chain: paramChain }, false)
        setSaved(saves.status)
        const savedData = await sendData({ req: "getsave", address: address }, false)
        const pAddr = savedData.presale;
        const xArray = []
        const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
        const PresaleData = new web3.eth.Contract(detailsAbi, pContract[chain]["chPresale"]);
        for (let i = 0; i < pAddr.length; i++) {
          if (paramChain == pAddr[i][3]) {

            if (pAddr[i][1] != 0) {
              if (pAddr[i][2].length) {
                let PresaleData = new web3.eth.Contract(pinksaleAbi1, id);
                const version = await PresaleData.methods.version().call();
                if (version >= 27) {
                  if (version == 81) {
                    PresaleData = new web3.eth.Contract(pinksaleAbi3, id);
                  } else {
                    PresaleData = new web3.eth.Contract(pinksaleAbi2, id);
                  }
                }
                const [f, uintParam] = await Promise.all([
                  await PresaleData.methods.poolStates().call(),
                  await PresaleData.methods.poolSettings().call()
                ]);
                const social = JSON.parse(f.poolDetails)

                xArray.push({ logo: social.a, status: 1, contract: pAddr[i][0], external: pAddr[i][2] })
              } else {
                const [f, x] = await Promise.all([
                  await PresaleData.methods.SP(pAddr[i][0]).call(),
                  await presaleViewContract.methods.getPresaleFactory(pAddr[i][0]).call()
                ]);
                const r = x[1] // Status
                xArray.push({ logo: f[6], status: r, contract: pAddr[i][0], external: pAddr[i][2] })
              }
            }
          }
        }
        setFavorited(xArray);
        toast("Success!")
      } else {
        toast.error("Account not signed")
      }
    } else {
      toast.error("Not Connected")
    }
  }
  async function postChat() {
    if (connected) {
      if (await isSigned()) {
        if (message.length >= 1 && message.length <= 120) {
          const res = await sendData({ req: 'sendChat', chain: paramChain, contract: id, text: message, type: isReply == -1 ? 0 : 1, commentId: topComments[isReply] ? selection == 0 ? topComments[isReply].id : comments[isReply].id : 0 }, false)
          if (res.status) {
            const x = JSON.parse(JSON.stringify(res.comments));
            setComments(res.comments);
            setTopComments((x).sort((a, b) => b.total - a.total))
            setMessage("");
            setTextInputHeight(34)
            toast("This is beta phase, you must join premium later")
          } else {
            toast.error(res.message)
            setTextInputHeight(34)
            setMessage("");
          }

        } else {
          toast.error("Text minimum 1 length and maximum 120 length")
        }
      } else {
        toast.error("Account not signed")
      }
    } else {
      toast.error("Not Connected")
    }
  }

  const showBanner = () => {
    if (string.banner) {
      try {
        if ((string.banner).split("/")[2] != "youtu.be" && ((string.banner).split(".")[0]).split("/")[2] != "youtube" && ((string.banner).split(".")[1]).split(".")[0] != "youtube") {
          if (!noImage) {
            if (bannerLoaded) {
              return (
                <img
                  className="rounded-2 cntr-image"
                  src={string.banner}
                  alt="project-banner"
                />
              );
            } else {
              return (
                <div>
                  <SkeletonTheme
                    baseColor="#414141"
                    highlightColor="#252526"
                    height={"250px"}
                  >
                    <Skeleton />
                  </SkeletonTheme>
                  <img
                    className="rounded-2 cntr-image"
                    src={string.banner}
                    onLoad={() => setBannerLoaded(true)}
                    onError={() => setNoImage(true)}
                    alt="project-banner"
                    style={{ display: "none" }}
                  />
                </div>
              );
            }
          }
        } else {
          const opts = {
            height: "390",
            width: "100%",
            playerVars: {
              autoplay: false,
            },
          };
          if ((string.banner).split("watch?v=")[1]) {
            return (
              <div className="rounded-2 cntr-image">
                <YouTube videoId={(string.banner).split("watch?v=")[1]} opts={opts} />
              </div>
            );
          } else {
            return (
              <div className="rounded-2 cntr-image">
                <YouTube videoId={(string.banner).split("/")[3]} opts={opts} />
              </div>
            );
          }

        }
      } catch (e) { }
    }
  };

  async function eWithdraw() {
    try {
      const web3 = new Web3(thisWeb3);
      let sttcontract = new web3.eth.Contract(
        presaleUser,
        pContract[chain]["cDeposit"]
      );
      await sttcontract.methods
        .withdraw(id)
        .call({ from: address })
        .then(async function () {
          await sttcontract.methods
            .withdraw(id)
            .send({ from: address })
            .then(async function () {
              loadNew();
            });
        });
    } catch (e) {
    }
  }



  async function loadNew() {
    const web3 = new Web3(rpcURL);
    const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
    const presaleUsers = new web3.eth.Contract(presaleUser, pContract[chain]["cDeposit"]);

    const resData = await presaleViewContract.methods.getPresale(id).call()

    const uintParam = resData.uints
    const boolParam = resData.bools
    const tokenParam = resData.tokenInfo




    const decimal = tokenParam.decimal
    let totalMaxBuy = uintParam.max
    if (connected) {
      if (address) {
        const maxBuy = await presaleViewContract.methods.getPresaleUser(id, address).call();
        if (uintParam.presaleType == 0) {
          totalMaxBuy = +bn(uintParam.max).minus(maxBuy[1].bDepo)
          const rn = +bn(uintParam.hardCap).minus(uintParam.totalRaised)
          if (totalMaxBuy > rn) {
            totalMaxBuy = rn
          }
        } else {
          totalMaxBuy = +bn(uintParam.max).minus(maxBuy[1].bDepo)
        }
      }
    } else {
      totalMaxBuy = uintParam.max
    }
    let presRate = uintParam.presaleRate
    let listRate = uintParam.listingRate.length > 18 ? +(bn(uintParam.listingRate).div(decimal)) : uintParam.listingRate
    const divDecimal = 10 ** decimal
    const liq = +(bn(uintParam.amount).multipliedBy(uintParam.listingRate).multipliedBy(uintParam.liq).div(100).div(divDecimal));
    const amount = +bn(uintParam.amount).div(divDecimal)
    const tokenForPresaless = +(bn(calculate(amount, uintParam.listingRate, (uintParam.liq*100))));

    if (totalMaxBuy) {

      setUint({
        preRate: presRate,
        minimumBuy: uintParam.min,
        maximumBuy: totalMaxBuy,
        hardCap: uintParam.hardCap,
        softCap: uintParam.softCap,
        tokenForPresale: tokenForPresaless,
        tokenForLiquidity: liq,
        liquidity: uintParam.liq,
        listRate: listRate,
        startDate: uintParam.startTime,
        endDate: uintParam.endTime,
        lockup: +bn(uintParam.lockUp).div(86400),
        mode: uintParam.presaleType
      });
    }

    let totalbbuyer = 0
    try {
      const r = await presaleUsers.methods.getBiIdxs(id, id, 0, 0).call()
      totalbbuyer = (r[3]).length
    } catch (_) { }
    setIsTokenInsured(boolParam.insured);
    setPresaleStatus(uintParam.status);
    setPresaleInfo({
      whitelist: boolParam.isWhitelist,
      LP: boolParam.finished,
      cancelReason: uintParam.cancelReason,
      canceled: boolParam.canceled,
      baseCollected: uintParam.totalRaised,
      totalBuyer: totalbbuyer,
      isRefund: boolParam.returnLeft,
    });
  }


  const filteredWhitelist = whitelistest.map((WL, i) => {
    if ((WL).toLowerCase().includes(filter.toLowerCase())) {
      return <p key={i}>{WL}</p>;
    }
  });
  const allWhitelist = whitelistest
    .slice(offset, offset + perPage)
    .map((WL, i) => {
      return <p key={i}>{WL}</p>;
    });

  const getWhitelist = () => {
    if (whitelistest.length) {
      return (
        <>
          <div className="col-12">
            <div className="filter-tab">
              <div className="searchAddress">
                <span>
                  <i className="ri-search-line"></i>
                </span>
                <input
                  type="text"
                  placeholder="Search Address"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
          {filter ? filteredWhitelist : allWhitelist}
          <div className="pages">
            <nav
              className="pagination is-centered"
              role="navigation"
              aria-label="pagination"
            >
              {!filter && (
                <ReactPaginate
                  previousLabel={""}
                  nextLabel={""}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={filter == "all" ? pageCount : pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={2}
                  onPageChange={
                    filter == "all" ? handlePageClick : handlePageClick
                  }
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  breakLinkClassName="pagination-link"
                  pageLinkClassName="pagination-link"
                  activeLinkClassName="active"
                />
              )}
            </nav>
          </div>
        </>
      );
    } else {
      return (
        <div className="  text-center text-gray-light">
          There is no whitelist yet
        </div>
      );
    }
  };



  const [selection, setSelection] = useState(0)
  const [highlithed, setHighlithed] = useState(0)

  async function Contribute(e) {
    e.target.classList.add("disabled");
    try {
      let isNetwork = false
      const web3 = new Web3(thisWeb3);
      try {
        const chainId = web3.utils.toHex(await web3.eth.getChainId());
        if (chainId == '0x61' && paramChain == 'BSC-tsnt') {
          isNetwork = true
        } else if (chainId == '0x38' && paramChain == 'BSC') {
          isNetwork = true
        } else if (chainId == '0x1' && paramChain == 'ETH') {
          isNetwork = true
        } else if (chainId == '0x42' && paramChain == 'OKC') {
          isNetwork = true
        }
        if (!isNetwork) {
          toast.error("Please change network")
          setIsOnNetwork(false)
          changeNetworks(true)
          e.target.classList.remove("disabled");
          return
        }
      } catch (_) { }
      const bbtotal = web3.utils.toWei(amount, "ether");
      const sttcontract = new web3.eth.Contract(presaleUser, pContract[chain]["cDeposit"]);
      let endo = "0x0000000000000000000000000000000000000000"
      if (router.query.ref) {
        if (web3.utils.isAddress(router.query.ref)) endo = router.query.ref
      }
      await sttcontract.methods.deposit(id, bbtotal, endo).call({ from: address, value: bbtotal }).then(async function () {
        await sttcontract.methods.deposit(id, bbtotal, endo).send({ from: address, value: bbtotal }).then(async function () {
          toast("Success");
          loadNew();
          setAmount("");
          e.target.classList.remove("disabled");
        });
      });
    } catch (x) {
      try {
        toast.error(extractErrorCode(x));
      } catch (_) {
        try {
          toast.error(x.message);
        } catch (_) {
          toast.error("Something Error!");
        }
      }
      e.target.classList.remove("disabled");
    }
  }
  async function withdraw(e) {
    try {
      const web3 = new Web3(thisWeb3);
      const sttcontract = new web3.eth.Contract(presaleUser, pContract[chain]["cDeposit"]);

      await sttcontract.methods.withdraw(id).call({ from: address }).then(async function () {
        await sttcontract.methods.withdraw(id).send({ from: address }).then(async function () {
          toast("Success");
          loadNew();
          setAmount("");
          e.target.classList.remove("disabled");
        });
      });
    } catch (x) {
      try {
        toast.error(extractErrorCode(x));
      } catch (_) {
        try {
          toast.error(x.message);
        } catch (_) {
          toast.error("Something Error!");
        }
      }
      e.target.classList.remove("disabled");
    }
  }
  const cardComments = useRef()
  const scroll2El = elID => {
    cardComments.current.scrollTo({
      top: document.getElementById(elID).offsetTop - 60,
      behavior: 'smooth',
    });
  };

  const inputRef = useRef()

  function goInput() {
    window.scrollTo({
      top: document.getElementById("input-comment").offsetTop + 600,
      behavior: 'smooth',
    });
    inputRef.current.focus()
  }
  async function handleReplayTo(x) {
    scroll2El(x);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    setHighlithed(x)
    await delay(1000);
    setHighlithed(0)
  }
  const getQR = () => {
    if (addressPresale.token != null) {
      return (
        <Canvas
          text={addressPresale.token}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            level: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000",
            },
          }}
        />
      );
    } else {
      return (
        <Canvas
          text={"Add to TrustWallet"}
          options={{
            type: "image/jpeg",
            quality: 0.3,
            level: "M",
            margin: 3,
            scale: 4,
            width: 200,
            color: {
              dark: "#000",
            },
          }}
        />
      );
    }
  };


  function handleCommentsDate(x) {
    var seconds = Math.floor((new Date() - x * 1000) / 1000);
    const day = seconds / 86400;
    const hour = seconds / 3600;
    const minutes = seconds / 60;
    const old = getTimeUTC(Number(x)).toString(); //months from 1-12
    const monthS = old.split(" ")[1]
    const dayS = old.split(" ")[2]
    if (day > 1) {
      return (
        <span className="date-comments">{monthS} {dayS}</span>
      )
    } else if (hour > 1) {
      return (
        <span className="date-comments">{Math.floor(hour)} hours ago</span>
      )
    } else if (minutes > 1) {
      return (
        <span className="date-comments">{Math.floor(minutes)} minutes ago</span>
      )
    } else {
      return (
        <span className="date-comments">{Math.floor(seconds)} seconds ago</span>
      )
    }

  }

  function calcHeight(value) {
    let numberOfLineBreaks = (value.match(/\n/g) || []).length;
    // min-height + lines x line-height + padding + border
    let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
    return newHeight;
  }
  const [textInputHeight, setTextInputHeight] = useState(34)
  async function hey(e) {
    setMessage(e.target.value)
    setTextInputHeight(calcHeight(e.target.value));
  }

  if (!loaded) {
    return (
      <LayoutAdmin
        headTitle={
          tokenInfo.name ? "Pool details - " + tokenInfo.name : "Pool Details"
        }
        pageTitle=""
        pageTitleSub={""}
        pageclassName={"front"}
        parent={""}
        p={p}
      >
        <div className="loader">Loading...</div>
      </LayoutAdmin>
    )
  }




  if (!isAddress) {
    return (
      <LayoutAdmin
        headTitle={
          tokenInfo.name ? "Pool details - " + tokenInfo.name : "Pool Details"
        }
        pageTitle=""
        pageTitleSub={""}
        pageclassName={"front"}
        parent={""}
        p={p}
      >
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <p className="text-center mb-0">It looks like you're lost.<br />You can play game here or back to <Link href={`/?chain=${paramChain}`}>Home</Link></p>
            </div>
            <Game />
          </div>
        </div>
      </LayoutAdmin>
    )
  }
  return (
    <>
      <LayoutAdmin
        headTitle={
          tokenInfo.name ? "Pool details - " + tokenInfo.name : "Pool Details"
        }
        pageTitle=""
        pageTitleSub={""}
        pageclassName={"front"}
        parent={""}
        p={p}
      >
        <div className="item-single">
          <div
            className="ant-modal-root"
            style={showModal ? { display: "block" } : { display: "none" }}
          >
            <div className="ant-modal-mask"></div>
            <div className="ant-modal-wrap">
              <div
                className="ant-modal antd-modal-content-border-15"
                style={{ width: "520px", transformOrigin: "805.5px -47px" }}
              >
                <div className="ant-modal-content">
                  <div className="ant-modal-body">
                    <div className="sc-bdfBQB kkYuxV">
                      <div
                        className="row-between"
                        style={{ justifyContent: "space-between" }}
                      >
                        <p className="titlem">Add Suggested Tokens</p>
                        <button
                          className="ant-btn ant-btn-icon-only ant-btn-background-ghost btn-close"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="anticon anticon-close"></span>
                        </button>
                      </div>
                      <p style={{ margin: "unset" }}>
                        1. Open your Trust Wallet and click Add Custom Token
                      </p>
                      <p style={{ margin: "unset" }}>2. Click Scan Button </p>
                      <div className="container-modal">
                        <div style={{ margin: "auto" }}>{getQR()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="ant-modal-root"
            style={showMess ? { display: "block" } : { display: "none" }}
          >
            <div className="ant-modal-mask"></div>
            <div className="ant-modal-wrap">
              <div
                className="ant-modal antd-modal-content-border-15"
                style={{ width: "520px", transformOrigin: "805.5px -47px" }}
              >
                <div className="ant-modal-content">
                  <div className="ant-modal-body">
                    <div className="sc-bdfBQB kkYuxV">
                      <div
                        className="row-between"
                        style={{ justifyContent: "space-between" }}
                      >
                        <p className="titlem">You can't join the chat</p>
                        <button
                          className="ant-btn ant-btn-icon-only ant-btn-background-ghost btn-close"
                          onClick={() => setShowMess(false)}
                        >
                          <span className="anticon anticon-close"></span>
                        </button>
                      </div>
                      <p style={{ margin: "unset" }}>
                        blabla
                      </p>
                      <p style={{ margin: "unset" }}>
                        Buy now on{" "}
                        <a
                          href="https://pancakeswap.finance/swap?outputCurrency=0x1AEb3f66d96bFaF74fCBD15Dc21798De36F6F933"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Pancakeswap
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="right-presale_info ">
              <div className="card-body ">
                <div className="row">
                  <div className="col-md-8">
                    <div className="card-up card-bg-image rounded-top pres" style={{ backgroundImage: headerImage ? `url("${headerImage}")` : `url("/images/bg/bg${ban}.png")` }}>
                      <div className="premium-top rounded-top">
                        <div className="d-flex gap-2 badge-badge">
                          {(presaleInfo.cancelReason == 1 || presaleInfo.cancelReason == 2) && (
                            <div className="badge-status alert-badge">
                              {presaleInfo.cancelReason == 1 && ("Canceled by Owner")}
                              {presaleInfo.cancelReason == 2 && ("Canceled by Welaunch")}
                            </div>
                          )}

                          {string.kyc && (
                            <div className="badge-status kyc">
                              KYC
                            </div>
                          )}
                          {string.audit && (
                            <div className="badge-status audit">
                            Audit
                          </div>
                          )}
                         
                          {isTokenInsured && (
                            <div className="badge-status insurance">
                              Insurance
                            </div>
                          )}
                          {!contractVerified && (
                            <div className="badge-status yellow-badge">
                              Unverified Contract
                            </div>
                          )}

                          {presaleStatus == 0 && (
                            <div className="_progress _S0 ms-auto">
                              <img src="/images/Fa/upcoming.svg" />
                              Upcoming
                            </div>
                          )}
                          {presaleStatus == 1 && (
                            <div className="_progress _S1 ms-auto" >
                              <img src="/images/Fa/radio.svg" />
                              Sale Live
                            </div>
                          )}

                          {presaleStatus == 2 && (
                            <div className="_progress _S2 ms-auto">
                              <img src="/images/Fa/ended.svg" />
                              Ended
                            </div>
                          )}
                          {presaleStatus == 3 && (
                            <div className="_progress _S3 ms-auto">
                              <img src="/images/Fa/filled.svg" />
                              Filled
                            </div>
                          )}

                          {presaleStatus == 4 && (
                            <div className="_progress _S4 ms-auto">
                              <img src="/images/Fa/radio.svg" />
                              Canceled
                            </div>
                          )}

                          <div className="stars_save c-pointer" onClick={saveUnsave} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                              <path d="M24.2243 9.45108L17.0296 8.35612L13.8133 1.5282C13.7255 1.34126 13.581 1.18992 13.4024 1.09793C12.9547 0.866479 12.4106 1.05936 12.1868 1.5282L8.97055 8.35612L1.77582 9.45108C1.57746 9.48076 1.39611 9.57868 1.25725 9.72705C1.08939 9.90772 0.996892 10.1508 1.00008 10.4028C1.00327 10.6549 1.10188 10.8953 1.27426 11.0713L6.47974 16.3858L5.24992 23.8903C5.22108 24.0649 5.23953 24.2444 5.30317 24.4086C5.36681 24.5727 5.47311 24.7149 5.60999 24.819C5.74688 24.9231 5.90889 24.985 6.07764 24.9976C6.24639 25.0102 6.41514 24.973 6.56475 24.8903L13.0001 21.3473L19.4354 24.8903C19.6111 24.9882 19.8151 25.0209 20.0106 24.9853C20.5037 24.8962 20.8352 24.4066 20.7502 23.8903L19.5204 16.3858L24.7259 11.0713C24.8675 10.9259 24.9611 10.736 24.9894 10.5282C25.0659 10.0089 24.7202 9.52823 24.2243 9.45108V9.45108Z"
                                stroke={!saved ? "#C3D4EF" : "transparent"} strokeWidth={"1.5"}
                                fill={saved ? "#FFCF73" : "transparent"}
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card detail_card presale-card mb-0">
                      <div className="card-body">
                        <div className="pp-card-top">
                          <div className="presale_logo">
                            <img
                              src={`${string.logo
                                ? string.logo
                                : "/images/profile/unknown.png"
                                }`}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/images/profile/unknown.png";
                              }}
                              style={{ width: "140px" }}
                              alt={"Logo"}
                            />
                          </div>

                          <div className="title-box" style={{ marginTop: '-20px' }}>
                            <a style={{ marginRight: "5px", fontSize: '25px' }}>
                              {tokenInfo.name == null ? (
                                "-"
                              ) : (
                                tokenInfo.name + ` ${uint.mode == 0 ? "Presale" : ""}${uint.mode == 1 ? "Fair Launch" : ""}`
                              )}
                            </a>
                            <div className="row" style={{ gap: '15px', paddingLeft: '15px' }}>
                              {string.telegram && (getSocial("telegram"))}
                              {string.medium && (getSocial("medium"))}
                              {string.discord && (getSocial("discord"))}
                              {string.twitter && (getSocial("twitter"))}
                              {string.reddit && (getSocial("reddit"))}
                              <div className="social_box_website c-pointer">{string.website && (<a href={string.website} target="_blank" rel="noopener noreferrer"><b>Website</b></a>)}</div>

                            </div>
                          </div>
                        </div>
                        <p className="mb-3 mt-5 desc_p">{string.detail}</p>




                      </div>

                    </div>


                    {string.banner && (
                      <div className="card pres_1">
                        <div className="card-body">
                          <div className="featured-image">{showBanner()}</div>

                          <div>
                            <h3 className="mb-3">


                            </h3>

                          </div>
                        </div>
                      </div>
                    )}

                    <div className="card pres_1">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-xl-4 col-12 presale-image-card">
                            <img src="/images/Fa/Rocket-Presale.svg" className="presale-card-filter" />
                          </div>
                          <div className="col-xl-8 col-12">
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Presale Start</div><div>{startUTC.split(" ")[1]} {startUTC.split(" ")[2]}{" "}{startUTC.split(" ")[3]} {startUTC.split(" ")[4]}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                <div className="text-white">Presale Finish</div><div>  {endUTC.split(" ")[1]} {endUTC.split(" ")[2]}{" "}{endUTC.split(" ")[3]} {endUTC.split(" ")[4]}</div>
                              </div>
                              {uint.mode == 0 && (
                                <div className="d-flex align-items-center justify-content-between py-2">
                                  <div className="text-white">Presale Rate</div><div>{uint.preRate ? `1 ${handleChain('symbol')} = ${localSplit(uint.preRate)} ${tokenInfo.symbol}` : "-"}</div>
                                </div>
                              )}
                              {uint.mode == 1 && (
                                <div className="d-flex align-items-center justify-content-between py-2">
                                  <div className="text-white">Presale Rate</div><div>{uint.preRate != 0 ? `1 ${handleChain('symbol')} = ${localSplit((uint.preRate))} ${tokenInfo.symbol}` : "N/A"}</div>
                                </div>
                              )}
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Listing Rate</div><div>{uint.listRate ? `1 ${handleChain('symbol')} = ${localSplit(uint.listRate)} ${tokenInfo.symbol}` : "-"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card pres_1">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-xl-4 col-12 presale-image-card">
                            <img src="/images/Fa/Coin-Presale.svg" className="presale-card-filter" />
                          </div>
                          <div className="col-xl-8 col-12">
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Token Symbol</div><div>{tokenInfo.symbol}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Contract</div><div><a href={`${blockURL}address/${addressPresale.token}#code`} target="_blank" rel="noopener noreferrer">BscScan</a></div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Token Name</div><div> {tokenInfo.name}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Token Decimal</div><div>{tokenInfo.decimal}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                <div className="text-white">Token Supply</div><div>{tokenInfo.totalSupply ? `${localSplit(tokenInfo.totalSupply)} ${tokenInfo.symbol}` : "-"}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Soft Cap</div><div> {uint.softCap ? `${localSplit(uint.softCap / 1e18)} ${handleChain('symbol')}` : "-"}</div>
                              </div>
                              {uint.mode == 0 && (
                                <div className="d-flex align-items-center justify-content-between py-2">
                                  <div className="text-white">Hard Cap</div><div>{uint.hardCap ? `${localSplit(uint.hardCap / 1e18)} ${handleChain('symbol')}` : "-"}</div>
                                </div>
                              )}
                              {uint.mode == 1 && (
                                <div className="d-flex align-items-center justify-content-between py-2">
                                  <div className="text-white">Hard Cap</div><div>∞</div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card pres_1">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-xl-4 col-12 presale-image-card">
                            <img src="/images/Fa/Listing-Presale.svg" className="presale-card-filter" />
                          </div>
                          <div className="col-xl-8 col-12">
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Listing On</div><div>{handleRouter()}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                <div className="text-white">Unsold Tokens</div><div>{presaleInfo.isRefund ? "Refund" : "Burn"}</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Liquidity</div><div>{uint.liquidity ? uint.liquidity : "-"}%</div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between py-2">
                                <div className="text-white">Lockup Time</div><div>{uint.lockup ? uint.lockup : "-"} days</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card pres_1">
                      <div className="card-body ">
                        <div className="welaunch-tokenomics">
                          <WeLaunchCharts data={dataS} name={tokenInfo.symbol} />
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 c-default">
                    <div className="card pres_1">
                      <div className="card-body">
                        <div className="text-center">
                          {presaleStatus == 0 && ("PRESALE STARTS IN")}
                          {presaleStatus == 1 && ("PRESALE ENDED IN")}
                          {presaleStatus == 2 && ("PRESALE ENDED")}
                          {presaleStatus == 3 && ("PRESALE SUCCESS")}
                          {presaleStatus == 4 && ("PRESALE CANCELED")}
                        </div>

                        {(presaleStatus == 0 || presaleStatus == 1) && (
                          <Count start={start} end={end} />
                        )}

                        <div style={{ margin: "20px 0px" }}>
                          <ProgressBar status={presaleStatus} premiumColor={premiumColor} premiumColor2={premiumColor2} canvas={canvasColor} presaleType={uint.mode} isPremium showSoftCap={true} color={`linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`} filled={presaleInfo.baseCollected / 1e18} softCap={uint.softCap / 1e18} hardCap={uint.hardCap / 1e18} />
                          <div className="d-flex text-white justify-content-between">
                            <span>{presaleInfo.baseCollected / 1e18} {handleChain('symbol')}</span>
                            {uint.mode == 0 &&
                              (
                                <span>{uint.hardCap / 1e18} {handleChain('symbol')}</span>

                              )}

                            {uint.mode == 1 &&
                              (
                                <span>{uint.softCap / 1e18} {handleChain('symbol')}</span>

                              )}


                          </div>
                        </div>
                        {presaleStatus != 1 ? (
                          <div></div>
                        ) : (
                          <div>
                            <div className="align-items-center mt-2">
                              <div className="ant-col info-contribution ant-col-xs-12 ant-col-sm-12 ant-col-md-24 ant-col-lg-24 input_contribute ">
                                <input
                                  type="number"
                                  placeholder="Ex: 1.5"
                                  className="input-contrib"
                                  value={amount}
                                  onChange={(e) =>
                                    e.target.value < 0
                                      ? setAmount(0)
                                      : setAmount(e.target.value)
                                  }
                                />
                                <div className="max" style={{ color: `${canvasColor}` }} onClick={() => setMax()}>
                                  MAX
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {amount && uint.mode == 0 ? (
                          <div
                            className="d-flex align-items-center mt-2"
                            style={{ color: "#187ed7" }}
                          >
                            <span className="price">
                              You will get{" "}
                              {(uint.preRate * amount).toLocaleString()}{" "}
                              {tokenInfo.symbol}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="atc-form mt-3">
                          {contribute()}
                          {(presaleStatus == 3 || presaleStatus == 2) && yourContribution > 0 ? (
                            tokenOwed > 0 ? (
                              presaleInfo.LP ? (
                                <button
                                  className="btn x-btn"
                                  onClick={() => withdraw()}
                                >
                                  Claim {tokenInfo.symbol}
                                </button>
                              ) : (
                                <button className="btn x-btn" disabled>
                                  Claim {tokenInfo.symbol}
                                </button>
                              )
                            ) : (
                              <button className="btn x-btn" disabled>
                                Claimed
                              </button>
                            )
                          ) : (
                            ""
                          )}

                          {presaleInfo.canceled && +tokenOwed > 0 ? (
                            <button
                              className="btn x-btn"
                              onClick={(e) => withdraw(e)}
                            >
                              Withdraw
                            </button>
                          ) : (
                            ""
                          )}

                        </div>
                      </div>


                    </div>
                    {addressPresale.owner && addressPresale.owner == address && (
                      <div>
                        <Link href={`/edit/${id}?chain=${paramChain}`}>
                          <button className="btn w-100 btn-outline btn-back second-gray py-2 text-normal" >Edit Presale</button>
                        </Link>
                      </div>
                    )}
                    <div className="mb-5">
                      <div className="d-flex gap-4">
                        {addressPresale.owner && addressPresale.owner == address && (
                          <div className="w-100">
                            <button className="w-100 btn x-btn py-2" onClick={() => finalize()} disabled={uint.softCap < presaleInfo.baseCollected && (presaleStatus == 2 || presaleStatus == 1) || presaleInfo.canceled ? true : false} style={presaleStatus != 3 ? {} : { background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>Finalize</button>
                          </div>
                        )}
                        {addressPresale.owner && addressPresale.owner == address && (
                          <div className="w-100">
                            <button className="btn x-btn mr-2 w-100 red py-2" onClick={() => cancelPresale()} disabled={presaleInfo.canceled || presaleInfo.LP}>Cancel Presale</button>
                          </div>
                        )}
                      </div>

                      {yourContribution > 0 && (presaleStatus == 1 || presaleStatus == 4) ? (
                        <button
                          className="btn w-100 btn-outline btn-back second-gray py-2 text-normal"
                          onClick={() => eWithdraw()}
                        >
                          Emergency Withdraw
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="card pres_1">
                      <div className="card-body disable-pad-5 border-row c-default">


                        <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                          <div style={{ color: '#00B2FF' }}> Add to Wallet</div><div><img onClick={() => addToMetamask()} src="/images/wallet/metamask.svg" className="c-pointer" style={{ width: '30px', marginRight: '10px' }} />
                            <img onClick={() => setShowModal(true)} src="/images/wallet/trustwallet.svg" className="c-pointer" style={{ width: '30px', marginRight: '10px' }} /></div></div>
                        <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                          <div>Sale type</div>
                          <div>
                            {presaleType}
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                          <div>Minimum Buy</div>
                          <div>
                            {uint.mode == 0 && (
                              uint.maximumBuy < uint.minimumBuy
                                ? uint.maximumBuy / 1e18
                                : uint.minimumBuy / 1e18
                            )}{" "}

                            {uint.mode == 1 && (
                              uint.maximumBuy < uint.minimumBuy
                                ? uint.maximumBuy / 1e18
                                : uint.minimumBuy / 1e18
                            )}{" "}
                            {handleChain("symbol")}
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                          <div>Maximum Buy</div>
                          <div>
                            {uint.maximumBuy / 1e18}{" "}
                            {handleChain("symbol")}
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                          <div>Total Contributor</div>
                          <div>{presaleInfo.totalBuyer}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                          <div>Your Contribution</div>
                          <div>
                            {yourContribution / 1e18}{" "}
                            {handleChain("symbol")}
                          </div>
                        </div>
                        {yourContribution != null && yourContribution != 0 && (
                          <div className="d-flex align-items-center justify-content-between border-dark-100 py-2">
                            <div>To Be Claim</div>
                            <div>
                              {(
                                +tokenOwed /
                                10 ** +tokenInfo.decimal
                              ).toLocaleString()}{" "}
                              {tokenInfo.symbol}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {isEndorse > 0 ? (
                      <div className="card pres_1 mt-3"><div className="card-body disable-pad-5">
                        <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                          <div>Endorse This Project</div><div className="endorses">{isEndorse}%<img src="/images/items/endorse-charge-active.png" style={{ width: '20px', margin: '0px 10px' }} /></div></div>
                        <div className="position-relative">
                          <input type="text" className="ps-3 py-2 presale-input rounded w-100 aInput mt-3" readOnly value={`https://welaunch.app/s/${shortLink}${connected ? `?ref=${address}` : ""}`} />
                          <div className="endorse-input"></div>
                        </div>
                        <div className="d-flex align-items-center gap-3 py-3">
                          <Button className="w-100" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>Share</Button>
                          <Button3 className="w-80 px-5"><img src="/images/Fa/Copy.svg" style={{ width: '25px' }} onClick={() => { navigator.clipboard.writeText(`https://welaunch.app/s/${shortLink}${connected ? `?ref=${address}` : ""}`) }} /></Button3>
                        </div>
                      </div>
                      </div>

                    ) : (
                      <div className="card pres_1"><div className="card-body disable-pad-5">
                        <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                          <div>Share This Project</div>
                        </div>
                        <div className="position-relative">
                          <input type="text" className="px-3 py-2 presale-input rounded w-100 aInput mt-3" readOnly value={`https://welaunch.app/s/${shortLink}${connected ? `?ref=${address}` : ""}`} />
                        </div>
                        <div className="d-flex align-items-center gap-3 py-3">
                          <Button className="w-100" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>Share</Button>
                          <Button3 className="w-80 px-5"><img src="/images/Fa/Copy.svg" style={{ width: '25px' }} onClick={() => { navigator.clipboard.writeText(`https://welaunch.app/s/${shortLink}${connected ? `?ref=${address}` : ""}`) }} /></Button3>
                        </div>
                      </div>
                      </div>
                    )}
                    <div className="card">
                      <div className="card-head">
                        {connected && address && (
                          <div className="users pt-2">
                            <div className="profile-image">
                              <img src={userProfile ? userProfile : "/images/profile/avatar.png"} onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/images/profile/avatar.png";
                              }}
                                alt="Profile" />
                            </div>
                            <div className="uName">{username ? username : BlurAddress}</div>
                          </div>
                        )}
                        <div className="pb-3 pt-4 comments">
                          {selection == 0 ?
                            isReply != -1 && (
                              <div className="d-flex justify-content-between"><span>Replying to <span className="bold">
                                {isComment != -1 ? (
                                  topComments[isComment].reply[isReply].username
                                ) : (
                                  topComments[isReply].username
                                )}
                              </span></span><span className="c-pointer" onClick={() => setIsReply(-1)}>X</span></div>

                            ) :
                            isReply != -1 && (
                              <div className="d-flex justify-content-between"><span>Replying to <span className="bold">
                                {isComment != -1 ? (
                                  comments[isReply].text
                                ) : (
                                  comments[isReply].username
                                )}
                              </span></span><span className="c-pointer" onClick={() => setIsReply(-1)}>X</span></div>

                            )}
                          <div className="d-flex">
                            <textarea id="input-comment" ref={inputRef} className="resize-ta input-comments" style={{ height: `${textInputHeight}px`, resize: 'none', padding: '0px 25px 0px 10px' }} value={message} onChange={(e) => hey(e)}></textarea>
                            <button className="send-comments d-flex align-items-center" onClick={postChat}><Send /></button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-around pt-2 comments-info border-bottom-grey pb-2">
                        <div className="d-flex flex-column c-pointer" onClick={() => setSelection(0) + setIsReply(-1)}>
                          <span className={selection == 0 ? "actives comments-text" : "comments-text"}>Top</span>
                          <span className="active anim-1" style={selection == 0 ? {} : { display: 'none' }}></span>
                        </div>
                        <div className="d-flex flex-column c-pointer" onClick={() => setSelection(1) + setIsReply(-1)}>
                          <span className={selection == 1 ? "actives comments-text-2" : "comments-text-2"}>Latest</span>
                          <span className="active anim-2" style={selection == 1 ? {} : { display: 'none' }}></span>

                        </div>
                      </div>
                      <div className="card-comments" ref={cardComments}>
                        <div className="comments-content">


                          {selection == 0 ?
                            (
                              topComments.map((data, i) => {
                                const reply = data.reply
                                return (
                                  <>
                                    <div className="comment-user py-2 border-bottom-grey" key={i}>
                                      <div className="content-user pt-2">
                                        <div className="d-flex">
                                          <img src={data.pic ? `https://welaunch.app/api/user_image/${data.pic}` : "/images/profile/avatar.png"} onError={({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = "/images/profile/avatar.png";
                                          }} className="comments-pic" alt="pic" />
                                          <div className="d-flex ms-2 flex-column">
                                            <span className="text-white username-comments bold c-default">{data.username}</span>
                                            <span className="date-comments c-default">{handleCommentsDate(data.time)}</span>
                                          </div>
                                          {data.role == "Welaunch" && (
                                            <div className="badge-status welaunch ms-auto c-default">
                                              Welaunch
                                            </div>
                                          )}
                                        </div>
                                        <div className="comment-text pt-3">
                                          <div className="d-flex flex-column">
                                            <span className="text-white comment-message c-default">{data.text}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="d-flex mt-2 justify-content-between">
                                        <div className="d-flex vote gap-1 text-white">
                                          <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${data.isVoted == 0 ? "active" : ""}`} onClick={() => votes(data.id, 0, 0, i)}><Upvote /></span><span className={`ms-2 me-1 c-default align-self-center bold ${data.isVoted == 0 || data.isVoted == 1 ? "active" : ""}`}>{data.total}</span></div>
                                          <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${data.isVoted == 1 ? "active" : ""}`} onClick={() => votes(data.id, 1, 0, i)}><Downvote /></span></div>
                                        </div>
                                        <div className="text-white c-default d-flex"><span className="d-flex bg-comments px-2 py-1 c-pointer" onClick={() => showMessage(i, true)}><Message /></span> <span className="ms-2 align-self-center">{data.reply.length}</span></div>
                                        <div className=""><span className="d-flex px-2 py-1 bg-comments c-pointer" onClick={() => goInput() + setIsReply(i) + setIsComment(-1)}>Reply</span></div>
                                        <div className="d-flex"><span className="d-flex px-2 py-1 bg-comments c-pointer" ><Report /></span></div>
                                      </div>
                                    </div>
                                    {reply.length != 0 && (
                                      reply.map((datas, is) => {

                                        if (!datas.hidden) {
                                          let last = false
                                          let hideLast = reply.length - 1
                                          if (reply[is + 1]) {
                                            last = reply[is + 1].hidden
                                          }
                                          if (last) {
                                            hideLast = is
                                          }
                                          return (
                                            <div className="comment-user py-2 border-bottom-grey" id={datas.id} key={is}>
                                              {datas.replyTo != 0 && (
                                                <div className="replyto">Replying to
                                                  <span className="bold c-pointer" onClick={() => handleReplayTo(datas.replyTo)}> {data.reply[datas.replyTo].username}</span>
                                                </div>
                                              )}
                                              <div className={`content-user sub-reply pt-2 ${datas.id == highlithed ? "highlight" : ""}`}>
                                                <div className="d-flex">
                                                  <img src={data.pic ? `https://welaunch.app/api/user_image/${data.pic}` : "/images/profile/avatar.png"} onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "/images/profile/avatar.png";
                                                  }} className="comments-pic" alt="pic" />
                                                  <div className="d-flex ms-2 flex-column">
                                                    <span className="text-white username-comments bold c-default">{datas.username}</span>
                                                    <span className="date-comments c-default">{handleCommentsDate(datas.time)}</span>
                                                  </div>
                                                  {datas.role == "Welaunch" && (
                                                    <div className="badge-status welaunch ms-auto c-default">
                                                      Welaunch
                                                    </div>
                                                  )}
                                                </div>
                                                <div className="comment-text pt-3">
                                                  <div className="d-flex flex-column">
                                                    <span className="text-white comment-message c-default">{datas.text}</span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="d-flex mt-2 justify-content-between">
                                                <div className="d-flex vote gap-1 text-white">
                                                  <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${datas.isVoted == 0 ? "active" : ""}`} onClick={() => votes(datas.id, 0, 1, is)}><Upvote /></span><span className={`ms-2 me-1 c-default align-self-center bold ${datas.isVoted == 0 || datas.isVoted == 1 ? "active" : ""}`}>{datas.total}</span></div>
                                                  <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${datas.isVoted == 1 ? "active" : ""}`} onClick={() => votes(datas.id, 1, 1, is)}><Downvote /></span></div>
                                                </div>
                                                <div className="text-white c-default d-flex vis-n"><span className="d-flex bg-comments px-2 py-1 c-pointer"><Message /></span> <span className="ms-2 align-self-center">3</span></div>
                                                <div className=""><span className="d-flex px-2 py-1 bg-comments c-pointer" onClick={() => goInput() + setIsReply(is) + setIsComment(i)}>Reply</span></div>
                                                <div className="d-flex"><span className="d-flex px-2 py-1 bg-comments c-pointer" ><Report /></span></div>
                                              </div>
                                              <div className="d-flex py-2 px-2 justify-content-between">
                                                {last && (
                                                  <span onClick={() => showMessage(i, true)} className="c-pointer">Show More</span>
                                                )}
                                                {is == hideLast && (
                                                  <span onClick={() => hide(i, true)} className="c-pointer">Hide </span>
                                                )}
                                              </div>
                                            </div>
                                          )
                                        }
                                      })
                                    )}
                                  </>
                                )
                              })
                            ) : (comments.map((data, i) => {
                              const reply = data.reply
                              return (
                                <>
                                  <div className="comment-user py-2 border-bottom-grey" key={i}>
                                    <div className="content-user pt-2">
                                      <div className="d-flex">
                                        <img src={data.pic ? `https://welaunch.app/api/user_image/${data.pic}` : "/images/profile/avatar.png"} onError={({ currentTarget }) => {
                                          currentTarget.onerror = null;
                                          currentTarget.src = "/images/profile/avatar.png";
                                        }} className="comments-pic" alt="pic" />
                                        <div className="d-flex ms-2 flex-column">
                                          <span className="text-white username-comments bold c-default">{data.username}</span>
                                          <span className="date-comments c-default">{handleCommentsDate(data.time)}</span>
                                        </div>
                                        {data.role == "Welaunch" && (
                                          <div className="badge-status welaunch ms-auto c-default">
                                            Welaunch
                                          </div>
                                        )}
                                      </div>
                                      <div className="comment-text pt-3">
                                        <div className="d-flex flex-column">
                                          <span className="text-white comment-message c-default">{data.text}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex mt-2 justify-content-between">
                                      <div className="d-flex vote gap-1 text-white">
                                        <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${data.isVoted == 0 ? "active" : ""}`} onClick={() => votes(data.id, 0, 0, i)}><Upvote /></span><span className={`ms-2 me-1 c-default align-self-center bold ${data.isVoted == 0 || data.isVoted == 1 ? "active" : ""}`}>{data.total}</span></div>
                                        <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${data.isVoted == 1 ? "active" : ""}`} onClick={() => votes(data.id, 1, 0, i)}><Downvote /></span></div>
                                      </div>
                                      <div className="text-white c-default d-flex"><span className="d-flex bg-comments px-2 py-1 c-pointer" onClick={() => showMessage(i, false)}><Message /></span> <span className="ms-2 align-self-center">{data.reply.length}</span></div>
                                      <div className=""><span className="d-flex px-2 py-1 bg-comments c-pointer" onClick={() => goInput() + setIsReply(i) + setIsComment(-1)}>Reply</span></div>
                                      <div className="d-flex"><span className="d-flex px-2 py-1 bg-comments c-pointer" ><Report /></span></div>
                                    </div>
                                  </div>
                                  {reply.length != 0 && (
                                    reply.map((datas, is) => {

                                      if (!datas.hidden) {
                                        let last = false
                                        let hideLast = reply.length - 1
                                        if (reply[is + 1]) {
                                          last = reply[is + 1].hidden
                                        }
                                        if (last) {
                                          hideLast = is
                                        }
                                        return (
                                          <div className="comment-user py-2 border-bottom-grey" id={datas.id} key={is}>
                                            {datas.replyTo != 0 && (
                                              <div className="replyto">Replying to
                                                <span className="bold c-pointer" onClick={() => handleReplayTo(datas.replyTo)}> {data.reply[datas.replyTo].username}</span>
                                              </div>
                                            )}
                                            <div className={`content-user sub-reply pt-2 ${datas.id == highlithed ? "highlight" : ""}`}>
                                              <div className="d-flex">
                                                <img src={data.pic ? `https://welaunch.app/api/user_image/${data.pic}` : "/images/profile/avatar.png"} onError={({ currentTarget }) => {
                                                  currentTarget.onerror = null;
                                                  currentTarget.src = "/images/profile/avatar.png";
                                                }} className="comments-pic" alt="pic" />
                                                <div className="d-flex ms-2 flex-column">
                                                  <span className="text-white username-comments bold c-default">{datas.username}</span>
                                                  <span className="date-comments c-default">{handleCommentsDate(datas.time)}</span>
                                                </div>
                                                {datas.role == "Welaunch" && (
                                                  <div className="badge-status welaunch ms-auto c-default">
                                                    Welaunch
                                                  </div>
                                                )}
                                              </div>
                                              <div className="comment-text pt-3">
                                                <div className="d-flex flex-column">
                                                  <span className="text-white comment-message c-default">{datas.text}</span>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="d-flex mt-2 justify-content-between">
                                              <div className="d-flex vote gap-1 text-white">
                                                <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${datas.isVoted == 0 ? "active" : ""}`} onClick={() => votes(datas.id, 0, 1, is)}><Upvote /></span><span className={`ms-2 me-1 c-default align-self-center bold ${datas.isVoted == 0 || datas.isVoted == 1 ? "active" : ""}`}>{datas.total}</span></div>
                                                <div className="d-flex"><span className={`d-flex bg-comments px-2 py-1 c-pointer ${datas.isVoted == 1 ? "active" : ""}`} onClick={() => votes(datas.id, 1, 1, is)}><Downvote /></span></div>
                                              </div>
                                              <div className="text-white c-default d-flex vis-n"><span className="d-flex bg-comments px-2 py-1 c-pointer"><Message /></span> <span className="ms-2 align-self-center">3</span></div>
                                              <div className=""><span className="d-flex px-2 py-1 bg-comments c-pointer" onClick={() => goInput() + setIsReply(is) + setIsComment(i)}>Reply</span></div>
                                              <div className="d-flex"><span className="d-flex px-2 py-1 bg-comments c-pointer" ><Report /></span></div>
                                            </div>
                                            <div className="d-flex py-2 px-2 justify-content-between">
                                              {last && (
                                                <span onClick={() => showMessage(i, false)} className="c-pointer">Show More</span>
                                              )}
                                              {is == hideLast && (
                                                <span onClick={() => hide(i, false)} className="c-pointer">Hide </span>
                                              )}
                                            </div>
                                          </div>
                                        )
                                      }
                                    })
                                  )}
                                </>
                              )
                            }))
                          }
                          {!comments.length && (
                            <div className="no-comment">
                              No Comments here...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex ">
          <div className="filter nav col-12 ">
            <ul className="select-menus_detail c-pointer">
              <>
                <li
                  className={
                    isDescription == "auto audit" ? "active" : ""
                  }
                  onClick={() => setIsDescription("auto audit") + setFilter("")}
                >
                  <a>Auto Audit</a>
                </li>
              </>


              {presaleType != "Public" && (
                <li
                  className={
                    isDescription == "whitelist" ? "active" : ""
                  }
                  onClick={() => setIsDescription("whitelist")}
                >
                  <a>Whitelist</a>
                </li>
              )}

            </ul>
          </div>
        </div>
        <div className="related">
          <div className="container-1">
            <div className="card presale-details">
              <div className="row">
                <div className="col-xxl-8 col-xl-8 col-12">
                  <div className="card-body ">
                    <div className="bg-color-info rounded-2 ">
                      {isDescription == "auto audit" ? (
                        <div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="text-white">Buy Tax</div>
                            <div>{buyTax}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="text-white">Sell Tax</div>
                            <div>{sellTax}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="text-white">Set Fee</div>
                            <div>{setFee}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="text-white">Wallet Blacklist</div>
                            <div>{blackList}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="text-white">Pause Trading</div>
                            <div>{pauseTrade}</div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div className="text-white">Proxy</div>
                            <div>{proxy}</div>
                          </div>
                          <div className="mt-2 py-2 border-top border-dark-100 text-left text-gray-light ">
                            Audit provided by <a href="https://t.me/" target="_blank" rel="noopener noreferrer">Essential</a>
                          </div>
                        </div>
                      ) : isDescription == "whitelist" ? (
                        <>{getWhitelist()}</>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
export default Item;
