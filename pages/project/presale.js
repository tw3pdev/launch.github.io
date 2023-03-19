import LayoutAdmin from "/components/layout/LayoutAdmin";
import React from "react";
import { useState, useEffect, useRef } from "react";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Web3 from "web3";
import { Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { presaleSetting, presaleAdmin, IERC20 } from "/components/web3/abi";
import { HexColorPicker } from "react-colorful";
import "react-loading-skeleton/dist/skeleton.css";
import { regabi } from "/components/web3/regabi";
import Router from "next/router";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import YouTube from "react-youtube";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ProgressBar from "/components/elements/ProgressBar";
import Card from "/components/elements/cardPresale";
import { Button, Button3, HomeCard } from "/component/Comps";
import { toast } from 'react-toastify';
import dynamic from "next/dynamic";
import cookieCutter from 'cookie-cutter'
import { presaleView } from "/components/web3/presaleView";
import axios from "axios"

function SettingsProfile({ p }) {
  const WeLaunchCharts = dynamic(() => import('../chart'), { ssr: false })
  const {
    address,
    userProfile,
    extractErrorCode,
    BlurAddress,
    BlurBalance,
    chain,
    connected,
    bn,
    balance,
    handleChain,
    rpcURL,
    thisWeb3,
    pContract,
  } = p;

  const [dataS, setDataS] = useState([
    {
      "id": "Burned",
      "label": "Burned",
      "value": 20,
      "color": "#3DFFDC"
    },
    {
      "id": "Liquidity",
      "label": "Liquidity",
      "value": 20,
      "color": "#20D7FF"
    },
    {
      "id": "Presale",
      "label": "Presale",
      "value": 20,
      "color": "#FC78E6"
    },
    {
      "id": "Unlocked",
      "label": "Unlocked",
      "value": 20,
      "color": "#4B2EFF"
    }
  ])

  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  // STEP 1
  const [contract, setContract] = useState("");
  const [contractValid, setContractValid] = useState(false);
  const [symbol, setSymbol] = useState(null);
  const [decimal, setDecimal] = useState(null);
  const [name, setName] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [yourBalance, setYourBalance] = useState(0);
  const [approved, setApprove] = useState(false);


  const [logoURL, setLogoURL] = useState("");
  const [handleLogoURL, setHandleLogoURL] = useState("");
  const [website, setWebsite] = useState("");
  const [endorsePercent, setEndorsePercent] = useState(10);
  const [isEndorse, setEndorse] = useState(false);
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [medium, setMedium] = useState("");
  const [reddit, setReddit] = useState("");
  const [banner, setBanner] = useState("");
  const [headerImage, setHeaderImage] = useState("");
  const [description, setDesc] = useState("");

  const [insured, setInsured] = useState(true);
  const [isEPActive, setEPActive] = useState(false);
  const [referral, setReferral] = useState("0xC1293d2A92a2ddCC3A38d5B061DD3aCa35F4d715");

  // STEP 2
  const [isRegistered, setIsRegistered] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [softCap, setSoftCap] = useState(" ");
  const [hardCap, setHardCap] = useState(" ");
  const [totalAmount, setTotalAmount] = useState(" ");
  const [minimumBuy, setMinimumBuy] = useState(" ");
  const [maximumBuy, setMaximumBuy] = useState(" ");
  const [liqRate, setLiquidityPercent] = useState(" ");
  const [router, setRouter] = useState("Pancakeswap");
  const [unsoldToken, setUnsoldToken] = useState("Burn");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [startTimeUnix, setStartTimeUnix] = useState(null);
  const [endTimeUnix, setEndTimeUnix] = useState(null);
  const [preRate, setPresaleRate] = useState(" ");
  const [listRate, setListingRate] = useState(" ");
  const [lockup, setLockup] = useState(" ");
  const [unixLock, setUnixLock] = useState(" ");

  const [capError, setCapError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [month, setMonth] = useState(null);
  const [date, setDate] = useState(null);
  const [year, setYear] = useState(null);

  const [canvasColor, setCanvasColor] = useState("#036AE3");
  const [premiumColor, setPremiumColor] = useState("hsl(212deg 97% 45%)");
  const [premiumColor2, setPremiumColor2] = useState("hsl(191deg 98% 59%)");
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [startTimeASCII, setStartTimeAscii] = useState(null);
  const [endTimeASCII, setEndTimeAscii] = useState(null);

  const [softCapValue, setSoftCapValue] = useState(" ");
  const [hardCapValue, setHardCapValue] = useState(" ");
  const [totalAmountValue, setTotalAmountValue] = useState(" ");
  const [minimumBuyValue, setMinimumBuyValue] = useState(" ");
  const [maximumBuyValue, setMaximumBuyValue] = useState(" ");
  const [preRateValue, setPresaleRateValue] = useState(" ");
  const [listRateValue, setListingRateValue] = useState(" ");

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

  function routerAddress() {
    let x = 0
    let result = ''
    swapRouter.map((item, i) => {
      if (item.chain == paramChain) {
        x = i
      }
    })
    for (let i = 0; i < swapRouter[x].router.length; i++) {
      if (swapRouter[x].router[i].name == router) {
        result = swapRouter[x].router[i].address
      }
    }
    return result
  }
  function routerOption() {
    let x = 0
    let option = []
    swapRouter.map((item, i) => {
      if (item.chain == paramChain) {
        x = i
      }
    })
    for (let i = 0; i < swapRouter[x].router.length; i++) {
      option.push(swapRouter[x].router[i].name)
    }
    return option
  }
  function disableColor() {
    setIsColorOpen(false)
  }

  function hexToHSL(H) {
    setCanvasColor(H)
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    const h2 = h -= 21
    const prem = "hsl(" + h + "deg " + s + "% " + l + "% / 18%)"
    const prem2 = "hsl(" + h2 + ", 98%, 59%)"
    setPremiumColor(H)
    setPremiumColor2(prem2)
  }

  function calLength(x) {
    try {
      if (x.length > 0 && x != " ") {
        return true
      } else {
        return false
      }
    } catch (e) { return false }
  }

  function getCalculate() {
    let points = 8;
    calLength(preRate) ? points += 1 : points -= 1
    calLength(softCapValue) ? points += 1 : points -= 1
    calLength(minimumBuyValue) ? points += 1 : points -= 1
    calLength(maximumBuyValue) ? points += 1 : points -= 1
    calLength(liqRate) ? points += 1 : points -= 1
    calLength(listRate) ? points += 1 : points -= 1
    calLength(lockup) ? points += 1 : points -= 1

    if (presaleType == 0) {
      calLength(hardCapValue) ? points += 1 : points -= 1
    } else {
      calLength(totalAmountValue) ? points += 3 : points -= 3
    }
    return points;
  }

  function getCalculate2() {
    let points = 4;
    calLength(logoURL) ? points += 1 : points -= 1
    calLength(website) ? points += 1 : points -= 1
    calLength(headerImage) ? points += 1 : points -= 1
    calLength(description) ? points += 1 : points -= 1
    return points;
  }

  function getSocial() {
    return [
      website,
      telegram,
      twitter,
      discord,
      medium,
      reddit,
      logoURL,
      banner,
      description,
      `${canvasColor}|${premiumColor}|${premiumColor2}`,
      headerImage
    ];
  }

  async function init() {
    if (chain) {
      const web3 = new Web3(rpcURL);
      const priceContract = new web3.eth.Contract(
        presaleAdmin,
        pContract[chain]["ctPresale"]
      );
      try {
        const feePrice = await priceContract.methods.GUINTS().call()
        setMinPresaleStartTime(+feePrice.MIN_PRESALE_TIME_LEFT)
        setMinPresaleTime(+feePrice.MIN_PRESALE_LENGTH)
        setMaxPresaleTime(+feePrice.MAX_PRESALE_LENGTH)
        setETHFee(+feePrice.ETH_GEN_FEE)
        setBaseFee(+feePrice.B_FEE_R)
        setTokenFee(+feePrice.T_FEE_R)
        setEpFee(+feePrice.ETH_EP_FEE)
      } catch (e) { }
    }
  }
  useEffect(() => {
    init()
  }, [chain, connected, address])

  const [minPresaleStartTime, setMinPresaleStartTime] = useState(0)
  const [minPresaleTime, setMinPresaleTime] = useState(0)
  const [maxPresaleTime, setMaxPresaleTime] = useState(0)
  const [baseFee, setBaseFee] = useState(0)
  const [tokenFee, setTokenFee] = useState(0)
  const [EPFee, setEpFee] = useState(0)
  const [ETHFee, setETHFee] = useState(0)
  async function contractValidation(e) {
    setApprove(false)
    setContractValid(false)
    if (e.length == 0) {
      setContract(e);
      setSymbol(null);
      setDecimal(null);
      setName(null);
      setContractValid(false);
      setIsRegistered("0x0000000000000000000000000000000000000000");
      setApprove(false);
    } else {
      try {
        setContract(e);
        const web3 = new Web3(rpcURL);
        let sttcontract = new web3.eth.Contract(IERC20, e);
        let sttcontract2 = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
        setContractValid(true);
        let symbol = await sttcontract.methods.symbol().call();
        let decimal = await sttcontract.methods.decimals().call();
        let bblanace = await sttcontract.methods.balanceOf(address).call();
        let name = await sttcontract.methods.name().call();
        let supply = await sttcontract.methods.totalSupply().call();
        const isReg = await sttcontract2.methods.checkPresale(e).call();
        setIsRegistered(isReg);
        setYourBalance(bblanace);
        var ifapproved = await sttcontract.methods
          .allowance(address, pContract[chain]["ctPresale"])
          .call();
        if (ifapproved > 1e50) {
          setApprove(true);
        }
        setSymbol(symbol);
        setDecimal(decimal);
        setTotalSupply(+bn(supply).div(+bn(10).exponentiatedBy(decimal)));
        setName(name);
        setContractValid(true);
      } catch (e) {
        setSymbol(null);
        setDecimal(null);
        setTotalSupply(null)
        setName(null);
        setContractValid(false);
      }
    }
  }
  function validURL(r) {
    let url
    try {
      url = new URL(r);
      return true
    } catch (_) {
      return false;
    }
  }
  function validURL2(r) {

    if (r.length == 0) {
      return true;
    } else {
      if (
        r.match(
          /^http([s]?):\/\/.*/
        )
      ) {
        return true;
      } else {
        return false;
      }
    }

  }
  async function approve() {
    const web3 = new Web3(thisWeb3);
    try {
      setIsLoading(true);
      let sttcontract = new web3.eth.Contract(IERC20, contract);
      await sttcontract.methods.approve(pContract[chain]["ctPresale"], "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: address })
        .then(function () {
          setIsLoading(false);
          setApprove(true);
        });
    } catch (e) {
      setIsLoading(false);
    }
  }
  function SoftCap(e) {
    setSoftCap(e);
    if (hardCap - e < 0 || e > hardCap || e < hardCap / 2 || e == hardCap) {
      setCapError(true);
    } else {
      setCapError(false);
    }
  }
  const routerr = useRouter();
  const paramChain = routerr.query.chain;
  function HardCap(e) {
    setHardCap(e);
    if (e - softCap < 0 || softCap > e || softCap < e / 2 || softCap == e) {
      setCapError(true);
    } else {
      setCapError(false);
    }
  }
  function getDateNow() {
    const now = new Date();
    var nowUTC = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
    return nowUTC;
  }

  const [oneActive, setOneActive] = useState(false);
  async function handleHover(e, x) {
    if (x) {
      setOneActive(e.target.id);
    } else {
      setOneActive("");
    }
  }
  async function handleReferral(x) {
    if (x.length) {
      try {
        const web3 = new Web3(rpcURL);
        let sttcontract2 = new web3.eth.Contract(
          presaleSetting,
          pContract[chain]["cPresale"]
        );
        const f = await sttcontract2.methods.getAllowedReferrersContains(x).call();
        f ? setReferral(x) : setReferral("false")
      } catch (e) {
        setReferral("false")
      }
    } else {
      setReferral("0xC1293d2A92a2ddCC3A38d5B061DD3aCa35F4d715")
    }
  }
  function startDatefunction(e) {
    setStartTime(e);
    const now = new Date(e);
    var userTimezoneOffset = now.getTimezoneOffset() * 60000;
    const nowUTC = new Date(now.getTime() - userTimezoneOffset);
    let target = new Date(Number(nowUTC));
    target = new Date(
      target.getUTCFullYear(),
      target.getUTCMonth(),
      target.getUTCDate(),
      target.getUTCHours(),
      target.getUTCMinutes(),
      target.getUTCSeconds()
    );
    setStartTimeUnix(Math.round(nowUTC.getTime() / 1000));
    setYear(target.toString().split(" ")[3]);
    setDate(target.toString().split(" ")[2]);
    setMonth(target.toString().split(" ")[1]);
    const dd = ((target.toLocaleString()).replaceAll("/", "-")).replace(",", "");
    setStartTimeAscii(dd)
    const difference = endTimeUnix * 1000 - nowUTC.getTime();
    if (difference < 0) {
      setDateError(true);
      setEndTime(null);
    } else {
      setDateError(false);
    }
  }


  function EndDatefunction(e) {
    setEndTime(e);
    const now = new Date(e);
    var userTimezoneOffset = now.getTimezoneOffset() * 60000;
    const nowUTC = new Date(now.getTime() - userTimezoneOffset);
    let target = new Date(Number(nowUTC));
    target = new Date(
      target.getUTCFullYear(),
      target.getUTCMonth(),
      target.getUTCDate(),
      target.getUTCHours(),
      target.getUTCMinutes(),
      target.getUTCSeconds()
    );
    setEndTimeUnix(Math.round(nowUTC.getTime() / 1000));
    const dd = ((target.toLocaleString()).replaceAll("/", "-")).replace(",", "");
    setEndTimeAscii(dd);
    const difference = nowUTC.getTime() - startTimeUnix * 1000;
    if (difference < 0) {
      setDateError(true);
      setEndTime(null);
    } else {
      setDateError(false);
    }
  }

  const calculate = (amounts, amount, listMulti, liq) => {
    const liqAmount = +bn(amount).multipliedBy(listMulti).multipliedBy(liq).div(10000)
    const feeAmount = +bn(amount).multipliedBy(tokenFee).div(10000)
    return +bn(amounts).plus(liqAmount).plus(feeAmount)
  }

  const totalCounts = () => {
    let total;
    if(presaleType == 0) {
      const amounts = +bn(preRateValue).multipliedBy(hardCapValue);
      const multiRate = (+bn(listRateValue).multipliedBy(preRateValue).div(10000).div(10000))
      const calcBaseFee = +bn(10000).minus(baseFee)
      total = calculate(amounts, +bn(amounts).multipliedBy(calcBaseFee).div(10000), multiRate, (+bn(liqRate).div(100).multipliedBy(10000)));
    }
    else if (presaleType == 1) {
      const amounts = totalAmountValue
      const calcBaseFee = +bn(10000).minus(baseFee)
      total = calculate(amounts, +bn(amounts).multipliedBy(calcBaseFee).div(10000), listRateValue, (+bn(liqRate).div(100).multipliedBy(10000)));
    }
    return total
  }

  const counts = () => {
    const total = totalCounts()
    const divDecimal = +bn(10).exponentiatedBy(decimal)
    if (total > +bn(yourBalance).div(divDecimal)) {
      if (listRate) {
        return (
          <div>You need <span className="text-red">{Math.round(total).toLocaleString()} {name}</span>  to run this launchpad.</div>
        )

      }
    } else {
      if (listRate) {
        return (
          <>
            <div>You need <span className="text-grey">{Math.round(total).toLocaleString()} {name}</span>  to run this launchpad.</div>
          </>
        )
      }
    }

  };

  function errorCard(x) {
    return (
      <div className="card items">
        <div className="card-body alert">

          <div className="infos_i">
            <div className="d-flex align-items-center py-2">
              <img src="/images/Fa/alert.svg" alt="alert" style={{ marginRight: '15px' }} />
              {x}
            </div>

          </div>
        </div>
      </div>
    )
  }
  function handleTimeError() {
    if (!startTimeUnix) return
    const now = Math.floor(Date.now() / 1000)
    if (now + minPresaleStartTime > startTimeUnix) return errorCard(`Start time must be ${minPresaleStartTime / 3600} hour from now`)
    if (!endTimeUnix) return
    if (startTimeUnix + minPresaleTime > endTimeUnix) return errorCard(`Presale time minimum is ${minPresaleTime / 3600} hour`)
    if (endTimeUnix > startTimeUnix + maxPresaleTime) return errorCard(`Presale time maximum is ${minPresaleTime / 3600} hour`)
  }
  function timeDisable() {
    const now = Math.floor(Date.now() / 1000)
    if (now + minPresaleStartTime > startTimeUnix) return false
    else if (startTimeUnix + minPresaleTime > endTimeUnix) return false
    else if (endTimeUnix > startTimeUnix + maxPresaleTime) return false
    else return true
  }
  function handleError() {
    if (listRateValue == " ") return

    if (!needAmounts()) return errorCard("Minimum 10,000 Token to start Presale")
    if (!needAmount()) return errorCard("Balance not enough")
    if (maximumBuyValue != "" && maximumBuyValue > (softCapValue * 0.2) && presaleType == 0) return errorCard("Maximum Buy must be lower than 20% of Soft Cap")

  }

  function needAmount() {
    const total = totalCounts()
    const divDecimal = +bn(10).exponentiatedBy(decimal)
    if (total >= 10000 && total <= (+bn(yourBalance).div(divDecimal))) {
      return true
    } else {
      return false
    }
  }

  function needAmounts() {
    const total = totalCounts()
    if (total >= 10000) {
      return true
    } else {
      return false
    }
  }
  function getUint() {
    if (presaleType == 0) {
      const divPre = preRate / 10 ** decimal
      return [
        "0",
        (preRate * 10000).toLocaleString("fullwide", { useGrouping: false }),
        ((((listRate / 10 ** decimal) * divPre) / 10000)).toLocaleString("fullwide", { useGrouping: false }),
        minimumBuy.toLocaleString("fullwide", { useGrouping: false }),
        maximumBuy.toLocaleString("fullwide", { useGrouping: false }),
        softCap.toLocaleString("fullwide", { useGrouping: false }),
        hardCap.toLocaleString("fullwide", { useGrouping: false }),
        startTimeUnix.toString(),
        endTimeUnix.toString(),
        unixLock.toString(),
        "0",
        "0"
      ];
    } else if (presaleType == 1) {
      const divDec = +bn(10).exponentiatedBy(decimal)
      return [
        (+bn(totalAmountValue).multipliedBy(divDec)).toLocaleString("fullwide", { useGrouping: false }),
        "0",
        (+bn(listRateValue).multipliedBy(10000)).toLocaleString("fullwide", { useGrouping: false }),
        minimumBuy.toLocaleString("fullwide", { useGrouping: false }),
        maximumBuy.toLocaleString("fullwide", { useGrouping: false }),
        softCap.toLocaleString("fullwide", { useGrouping: false }),
        "0",
        startTimeUnix.toString(),
        endTimeUnix.toString(),
        unixLock.toString(),
        "1",
        "0"
      ];
    }
  }
  function getUint2() {
    return [
      (liqRate * 100).toLocaleString("fullwide", { useGrouping: false, }),
      "0",
      "0",
      "0",
      "0",
      (endorsePercent*100).toLocaleString("fullwide", { useGrouping: false, }),
      "0",
      "0"
    ]
  }
  async function finishPool() {
    const web3 = new Web3(thisWeb3);
    let price = ETHFee
    if (isEPActive) {
      price += EPFee
    }
    const param1 = [
      address,
      "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      contract,
      referral,
      routerAddress()
    ];
    const param2 = getUint()
    const param22 = getUint2()
    const param3 = getSocial()
    if (connected) {
      try {
        setIsLoading(true);
        let sttcontract = new web3.eth.Contract(
          presaleAdmin,
          pContract[chain]["ctPresale"]
        );
        const pView = new web3.eth.Contract(presaleView, pContract[chain]["cData"])
        // const isEx = await pView.methods.getPresaleOwnerByAddress(false).call({from:address});
        const boolParam = [insured, setUnsoldToken == "Burn", false, false, false, false, false, true, isEPActive]
        await sttcontract.methods
          .createPresale(param1, param2, param22, param3, boolParam, 0)
          .call({ from: address, value: price })
          .then(async function () {
            await sttcontract.methods
              .createPresale(param1, param2, param22, param3, boolParam, 0)
              .send({ from: address, value: price })
              .then(function (transactionHash) {
                const rout = web3.eth.abi.decodeParameter(
                  "address",
                  transactionHash.events.PresaleCreated.raw.data
                );
                setIsLoading(false);
                Router.push("/pool/" + rout + "?chain=" + paramChain);
              });
          });
      } catch (e) {
        setIsLoading(false);
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
  }

  async function setLockupFunc(e) {
    setLockup(e);
    setUnixLock(86400 * e);
  }

  const [presaleType, setPresaleType] = useState(0)
  const [currency, setCurrency] = useState("0")

  function getSocialr(x, f) {
    return (
      <Link href={f ? f : "#"}>
        <a target="_blank" rel="noopener noreferrer" className={`social_box ${x} c-pointer`}>
          <img src={`/images/Fa/${x}.svg`} style={{ width: '25px' }} />
        </a>
      </Link>
    )
  }

  const showBanner = (content) => {
    if (banner) {
      try {
        if (content.split("/")[2] != "youtu.be" && (content.split(".")[0]).split("/")[2] != "youtube" && (content.split(".")[1]).split(".")[0] != "youtube") {
          return (
            <img
              className="rounded-2 cntr-image"
              src={content}
              alt="project-banner"
            />
          );
        } else {
          const opts = {
            height: "390",
            width: "100%",
            playerVars: {
              autoplay: false,
            },
          };
          if (content.split("watch?v=")[1]) {
            return (
              <div className="rounded-2 cntr-image">
                <YouTube videoId={content.split("watch?v=")[1]} opts={opts} />
              </div>
            );
          } else {
            return (
              <div className="rounded-2 cntr-image">
                <YouTube videoId={content.split("/")[3]} opts={opts} />
              </div>
            );
          }

        }
      } catch (e) { }
    }
  };
  async function handleEP() {
    if (isEPActive) {
      setCanvasColor("#036AE3");
      setPremiumColor("hsl(212deg 97% 45%)");
      setPremiumColor2("hsl(191deg 98% 59%)");
      setHeaderImage("")
    }
    setEPActive(!isEPActive)
  }
  const WeToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {

      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      top: "15px",
      maxWidth: 'none',
      color: "#00B2FF",
      fontSize: "15px",
      fontFamily: 'Sk-Modernist-Mono',
      backgroundColor: theme.palette.common.black,
    },
  }));

  const presaleRateRef = useRef(null);
  const totalSellingAmount = useRef(null);
  const SoftCapRef = useRef(null);
  const hardCapRef = useRef(null);
  const minBuyRef = useRef(null);
  const maxBuyRef = useRef(null);
  const liqPercentRef = useRef(null);
  const routerRef = useRef(null);
  const unsoldTokenRef = useRef(null);
  const listingRateRef = useRef(null);

  const [setHover, setHovered] = useState("");
  const handleRef = (e) => {
    if (e.current.state) {
      e.current.toggle("isOpen", true)
    } else {
      e.current.focus();
    }
  };


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

  return (
    <>
      <LayoutAdmin
        headTitle="WeLaunch - Create Presale"
        pageTitle=""
        pageTitleSub={""}
        pageclassName={"admin"}
        parent={"Create Project"}
        child={"Create Pool"}
        p={p}
      >
        <div className="upload-item section-padding" style={{ paddingTop: '110px' }}>
          <div className="container-1">

            {step != 4 && (
              <div className="stepper justify-content-center row hidden-mobile">
                <div className="col-1">
                  <div className={step == 2 || step == 3 || step == 4 ? "box-step done d-flex" : step == 1 ? "box-step d-flex current" : "box-step d-flex"}>
                    {step != 1 ? <div className="text-step mt-1 ms-1"><i className="ri-check-fill"></i></div> : <div className="text-step">1</div>}
                  </div>
                </div>
                <div className="col-1 my-auto">
                  <Progress
                    max="100"
                    value={symbol ? "100" : "0"}
                    color="default"
                    className="progress-step"
                    style={{ height: "11px" }}
                  />
                </div>
                <div className="col-1">
                  <div className={step == 3 || step == 4 ? "box-step done d-flex" : step == 2 ? "box-step d-flex current" : "box-step d-flex"}>
                    {step == 3 || step == 4 ? <div className="text-step mt-1 ms-1"><i className="ri-check-fill"></i></div> : <div className="text-step">2</div>}
                  </div>
                </div>
                <div className="col-1 my-auto">
                  <Progress
                    max="16"
                    value={step == 2 || step == 3 || step == 4 ? getCalculate() : "0"}
                    color="default"
                    className="progress-step"
                    style={{ height: "11px" }}
                  />
                </div>
                <div className="col-1">
                  <div className={step == 4 ? "box-step done d-flex" : step == 3 ? "box-step d-flex current" : "box-step d-flex"}>
                    {step == 4 ? <div className="text-step mt-1 ms-1"><i className="ri-check-fill"></i></div> : <div className="text-step">3</div>}
                  </div>
                </div>
                <div className="col-1 my-auto">
                  <Progress
                    max="8"
                    value={step == 3 || step == 4 ? getCalculate2() : "0"}
                    color="default"
                    className="progress-step"
                    style={{ height: "11px" }}
                  />
                </div>
                <div className="col-1">
                  <div className={step == 4 ? "box-step done d-flex current" : "box-step d-flex"}>
                    <div className="text-step">4</div>
                  </div>
                </div>
              </div>
            )}

            {connected ? (
              step == 1 && (
                <>
                  <div className="row justify-content-between">


                    <div className="col-xxl-2 col-xl-2 col-lg-4">
                      <h4 className="card-title mb-3">Select Type</h4>
                      <div className="card select_filter card_X1" onClick={() => setPresaleType(0)}>
                        <div className={presaleType == 0 ? "card-body s_type_selected" : "card-body s_type"}>
                          <img src={presaleType == 0 ? "/images/items/WTWEP.svg" : "/images/items/TWEP.svg"} className="logos_type" />
                          <h3 className="text-center mt-2">Standard<br></br> Presale</h3>

                          {presaleType == 0 ? (
                            <div className="type_selected">
                              <img src="/images/Fa/checklist.svg" style={{ margin: '13px 10px', width: '60%' }} />
                            </div>
                          ) : (
                            <div className="circle_type "></div>
                          )}

                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-2 col-xl-2 col-lg-4">
                      <h4 className="card-title mb-3 vis-n">Select Type</h4>

                      <div className="card select_filter card_X1" onClick={() => setPresaleType(1)}>
                        <div className={presaleType == 1 ? "card-body s_type_selected" : "card-body s_type"}>
                          <img src={presaleType == 1 ? "/images/items/WTWEP.svg" : "/images/items/TWEP.svg"} className="logos_type" />
                          <h3 className="text-center mt-2">Fair<br></br> Launch</h3>

                          {presaleType == 1 ? (
                            <div className="type_selected">
                              <img src="/images/Fa/checklist.svg" style={{ margin: '13px 10px', width: '60%' }} />
                            </div>
                          ) : (
                            <div className="circle_type "></div>
                          )}

                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-2 col-xl-2 col-lg-4">
                      <h4 className="card-title mb-3 vis-n">Select Type</h4>

                      <div className="card select_filter card_X1 disabled"
                      // onClick={() => setPresaleType(2)}
                      >
                        <div className={presaleType == 2 ? "card-body s_type_selected" : "card-body s_type"}>
                          <img src={presaleType == 2 ? "/images/items/WTWEP.svg" : "/images/items/TWEP.svg"} className="logos_type" />
                          <h3 className="text-center mt-2">Dutch<br></br> Auction</h3>

                          {presaleType == 2 ? (
                            <div className="type_selected">
                              <img src="/images/Fa/checklist.svg" style={{ margin: '13px 10px', width: '60%' }} />
                            </div>
                          ) : (
                            <div className="circle_type "></div>
                          )}

                        </div>
                      </div>
                    </div>

                    <div className="col-xxl-5 col-xl-4 col-lg-12">
                      <h4 className="card-title mb-2">Description</h4>
                      <div className="card items">
                        <div className="card-body">
                          <p style={{ marginBottom: 'unset' }}>
                            In the <b>
                              {presaleType == 0 && "Standard Presale "}
                              {presaleType == 1 && "Fair Launch "}
                            </b>
                            {presaleType == 0 && (
                              <>
                                investors are able to reserve tokens at a fixed rate. It has two targets:
                                <b> soft cap </b>
                                = minimum to raise and
                                <b> hard cap </b>
                                = maximum to raise.
                                <br></br>
                                <br></br>
                                It is deemed successful if it reaches the end time and has raised over the soft cap or before the end time if it has reached the hard cap.
                                <br></br><br></br>
                              </>

                            )}

                            {presaleType == 1 && (
                              <>
                                investors are able to reserve tokens at a fixed rate. It has one targets:
                                <b> soft cap </b>
                                = minimum to raise and investor can
                                <b> Unlimited </b> to raise the fund
                                <br></br>
                                <br></br>
                                It is deemed successful if it reaches the end time and has raised over the soft cap.
                                <br></br><br></br>
                              </>

                            )}
                            <Link href=""><a >Learn More</a></Link>
                          </p>


                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-start">
                    <div className="col-xxl-8 col-xl-8 col-lg-8">
                      <h4 className="card-title mb-2">Create Presale 1/4</h4>
                      <div className="card detail_card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-xxl-12"></div>
                            <div className="col-12 mb-3">
                              <label className="mb-1">
                                Token Address
                              </label>
                              <sup style={{ color: "#00B2FF" }}>*</sup>
                              <input
                                type="text"
                                className="isAddress rounded normal-input w-100 py-2 px-3"
                                value={contract}
                                onChange={(e) =>
                                  contractValidation(e.target.value)
                                }
                              />
                              {contract && !contractValid && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  Token Address Invalid
                                </div>
                              )}
                            </div>

                          </div>
                          {isRegistered !=
                            "0x0000000000000000000000000000000000000000" && (
                              <Link
                                href={
                                  "/pool/" + isRegistered + "?chain=" + paramChain
                                }
                              >
                                <p
                                  style={{ color: "#DC3545", cursor: "pointer" }}
                                >
                                  Click here to see {name} pool
                                </p>
                              </Link>
                            )}


                          <div className="d-flex justify-content-between">
                            {approved ? (
                              <button
                                type="submit"
                                className="btn btn-transparent  mr-2" style={{ float: 'right', width: 'unset', cursor: "default" }}
                              >
                                <img className="me-2" src="/images/Fa/yes.svg" />
                                Approved
                              </button>
                            ) : (
                              <button
                                onClick={() => !isLoading ? approve() : ""}
                                type="submit"
                                disabled={
                                  contractValid &&
                                    symbol &&
                                    isRegistered ==
                                    "0x0000000000000000000000000000000000000000"
                                    ? false
                                    : true
                                }
                                className="btn x-btn mr-2" style={{ float: 'right', width: 'unset' }}
                              >
                                {isLoading ? (
                                  <div
                                    className="spinner-border text-white"
                                    style={{
                                      width: "1rem",
                                      height: "1rem",
                                      marginRight: "5px",
                                      border: "0.15em solid currentColor",
                                      borderRightColor: "transparent",
                                    }}
                                  ></div>
                                ) : (
                                  <div className="radio-not-filled text-white"></div>

                                )}
                                Click to Approve
                              </button>
                            )}
                            <button
                              onClick={() => setStep(2)}
                              type="submit"
                              disabled={
                                contractValid && approved &&
                                  isRegistered ==
                                  "0x0000000000000000000000000000000000000000"
                                  ? false
                                  : true
                              }
                              className="btn x-btn mr-2" style={{ float: 'right' }}
                            >

                              Next
                            </button>
                          </div>

                          <div className="col-12 mt-5">
                            <label className="form-label">
                              Currency
                            </label>
                            <sup style={{ color: "#00B2FF" }}>*</sup>
                            <div onChange={(e) => setCurrency(e.target.value)}>
                              <input type="radio" value="0" name="currency" checked={true} readOnly /> <span className="r_1">{handleChain('symbol')}</span>
                              <span style={{ marginRight: '15px' }}></span>
                              <input type="radio" value="1" name="currency" disabled /> <span className="r_1" style={{ opacity: '0.1' }}>BUSD</span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3">Don’t have a token yet?
                          <Link href={`/project/token?chain=${paramChain}`}>
                            <span className="text-bs-gray bold c-pointer"> Create a token </span>
                          </Link>
                          in seconds with WeLaunch!
                        </p>
                      </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-6">
                      <h4 className="card-title mb-2">Preview</h4>
                      <div className="card items">
                        <div className="card-body">


                          <div className="infos_i">
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div>Name</div>
                              <div>
                                {" "}
                                {name ? name : "-"}
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div>Symbol</div>
                              <div>
                                {symbol ? symbol : "-"}
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div>Decimals</div>
                              <div>
                                {decimal ? decimal : "-"}
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div>Currency</div>
                              <div>{currency == 0 ? "BNB" : "BUSD"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )) : (
              <>
                <div className="mt-3">
                  <p>Connect your wallet to create your own pool</p>
                </div>


              </>
            )}
            {step == 2 && (
              <>
                <div className="row justify-content-center">
                  <div className="col-xxl-8 col-xl-8 col-lg-8">
                    <h4 className="card-title mb-2">Create Presale 2/4</h4>
                    <div className="card detail_card">
                      <div className="card-body">
                        {presaleType == 0 && (
                          <div>
                            <label className="form-label">
                              Presale Rate<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="number"
                                  id="presaleRate"
                                  onMouseEnter={(e) => handleHover(e, true)}
                                  onMouseLeave={(e) => handleHover(e, false)}
                                  ref={presaleRateRef}
                                  className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                  style={setHover == "Presale Rate" ? { border: '2px solid #252A46' } : {}}
                                  value={Number(preRateValue) != 0 && preRateValue}
                                  onChange={(e) =>
                                    setPresaleRate(
                                      (
                                        e.target.value *
                                        10 ** decimal
                                      ).toLocaleString("fullwide", {
                                        useGrouping: false,
                                      })
                                    ) + setPresaleRateValue(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                  style={setHover == "Presale Rate" ? { border: '2px solid #252A46' } : {}}
                                  readOnly={true}
                                  disabled={true}
                                  value={`${symbol} = 1 ${handleChain("symbol")}`}
                                />
                              </div>
                              <div className="invalid-feedback d-block">
                                {preRate != " " &&
                                  preRate <= 0 && (
                                    <div
                                      className="invalid-feedback d-block"
                                    >
                                      Presale Rate Invalid
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        )}


                        <div className="row">

                          {presaleType == 1 && (
                            <>

                              <div className="col-12 col-md-12">
                                <label className="form-label">
                                  Total Selling Amount<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                                </label>
                                <div className="row g-0">
                                  <div className="col-10">
                                    <input
                                      type="number"
                                      id="TotalSellingAmount"
                                      onMouseEnter={(e) => handleHover(e, true)}
                                      onMouseLeave={(e) => handleHover(e, false)}
                                      ref={totalSellingAmount}
                                      className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                      value={Number(totalAmountValue) != 0 && totalAmountValue}
                                      onChange={(e) =>
                                        setTotalAmount(Number(+bn(e.target.value).multipliedBy(10).exponentiatedBy(decimal))) + setTotalAmountValue(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-2">
                                    <input
                                      type="text"
                                      style={setHover == "Soft Cap" ? { border: '2px solid #252A46' } : {}}
                                      className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                      readOnly={true}
                                      disabled={true}
                                      value={symbol}
                                    />
                                  </div>
                                  <div className="invalid-feedback d-block">
                                    {presaleType == 1 && !(Number(totalAmount)) && typeof (totalAmount) != "string" && (
                                      <div className="invalid-feedback d-block">
                                        Total Amount can't be zero
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                            </>
                          )}
                          {presaleType == 0 && (
                            <>
                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Soft Cap<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                                </label>
                                <div className="row g-0">
                                  <div className="col-10">
                                    <input
                                      ref={SoftCapRef}
                                      type="number"
                                      id="softCap"
                                      style={setHover == "Soft Cap" ? { border: '2px solid #252A46' } : {}}
                                      onMouseEnter={(e) => handleHover(e, true)}
                                      onMouseLeave={(e) => handleHover(e, false)}
                                      autoComplete="nope"
                                      className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                      value={Number(softCapValue) != 0 && softCapValue}
                                      onChange={(e) =>
                                        SoftCap(Number(e.target.value * 10 ** 18)) + setSoftCapValue(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-2">
                                    <input
                                      type="text"
                                      style={setHover == "Soft Cap" ? { border: '2px solid #252A46' } : {}}
                                      className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                      readOnly={true}
                                      disabled={true}
                                      value={handleChain("symbol")}
                                    />
                                  </div>
                                  <div
                                    className="invalid-feedback"
                                    style={{ display: "block" }}
                                  >
                                    {presaleType == 0 && capError && softCapValue != " " && hardCapValue != " " && (
                                      <div
                                        className="invalid-feedback"
                                        style={{ display: "block" }}
                                      >
                                        Soft Cap must be equal or 50% less then Hard
                                        Cap
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Hard Cap<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                                </label>
                                <div className="row g-0">
                                  <div className="col-10">
                                    <input
                                      ref={hardCapRef}
                                      type="number"
                                      id="hardCap"
                                      onMouseEnter={(e) => handleHover(e, true)}
                                      onMouseLeave={(e) => handleHover(e, false)}
                                      style={setHover == "Hard Cap" ? { border: '2px solid #252A46' } : {}}
                                      className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                      value={Number(hardCapValue) != 0 && hardCapValue}
                                      onChange={(e) =>
                                        HardCap(Number(e.target.value * 10 ** 18)) + setHardCapValue(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-2">
                                    <input
                                      type="text"
                                      className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                      readOnly={true}
                                      style={setHover == "Hard Cap" ? { border: '2px solid #252A46' } : {}}
                                      disabled={true}
                                      value={handleChain("symbol")}
                                    />
                                  </div>
                                  <div className="invalid-feedback d-block"></div>
                                </div>
                              </div>
                            </>
                          )}


                          {presaleType == 1 && (
                            <>
                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Soft Cap<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                                </label>
                                <div className="row g-0">
                                  <div className="col-10">
                                    <input
                                      type="number"
                                      id="softCap"
                                      onMouseEnter={(e) => handleHover(e, true)}
                                      onMouseLeave={(e) => handleHover(e, false)}
                                      style={setHover == "Soft Cap" ? { border: '2px solid #252A46' } : {}}
                                      ref={SoftCapRef}
                                      className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                      value={Number(softCapValue) != 0 && softCapValue}
                                      onChange={(e) =>
                                        SoftCap(Number(e.target.value * 10 ** 18)) + setSoftCapValue(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="col-2">
                                    <input
                                      type="text"
                                      style={setHover == "Soft Cap" ? { border: '2px solid #252A46' } : {}}
                                      className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                      readOnly={true}
                                      disabled={true}
                                      value={handleChain("symbol")}
                                    />
                                  </div>
                                  {!(Number(softCap)) && typeof (softCap) != "string" && (
                                    <div className="invalid-feedback d-block">
                                      Can't be Zero
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="col-12 col-md-6">
                                <label className="form-label">
                                  Hard Cap <span className="info"><i className="ri-information-fill"></i></span>
                                </label>
                                <div className="row g-0">
                                  <div className="col-12">
                                    <input
                                      type="text"
                                      className="px-3 py-2 w-100 rounded presale-input"
                                      value="∞"
                                      readOnly={true}
                                      disabled={true}
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Minimum Buy<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  id="minBuy"
                                  onMouseEnter={(e) => handleHover(e, true)}
                                  onMouseLeave={(e) => handleHover(e, false)}
                                  style={setHover == "Minimum Buy" ? { border: '2px solid #252A46' } : {}}
                                  ref={minBuyRef}
                                  type="number"
                                  className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                  value={Number(minimumBuyValue) != 0 && minimumBuyValue}
                                  onChange={(e) =>
                                    setMinimumBuy(e.target.value * 1e18) + setMinimumBuyValue(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                  readOnly={true}
                                  style={setHover == "Minimum Buy" ? { border: '2px solid #252A46' } : {}}
                                  disabled={true}
                                  value={handleChain("symbol")}
                                />
                              </div>
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {minimumBuyValue != " " && maximumBuyValue != " " && (
                                  minimumBuyValue > maximumBuyValue ? (
                                    "Minimum Buy must be lower than Maximum Buy"
                                  ) :
                                    hardCap != " " && (
                                      maximumBuy > hardCap && presaleType == 0 && (
                                        "Maximum Buy must be lower than Hard Cap"
                                      )
                                    )
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Maximum Buy<span className="asterisk">*</span> <span className="c-pointer text-blue" onClick={() => maximumBuyValue != "Unlimited" ? setMaximumBuyValue("Unlimited") + setMaximumBuy(99*10**18) : setMaximumBuyValue(0) + setMaximumBuy(0)}>Max</span>
                            </label>
                            <div className="row g-0 x-col">
                              <div className="col-10">
                                <input
                                  id="maxBuy"
                                  onMouseEnter={(e) => handleHover(e, true)}
                                  onMouseLeave={(e) => handleHover(e, false)}
                                  style={setHover == "Maximum Buy" ? { border: '2px solid #252A46' } : {}}
                                  ref={maxBuyRef}
                                  type={maximumBuyValue != "Unlimited" ? "number" : "text"}
                                  className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                  value={maximumBuyValue}
                                  onChange={(e) => maximumBuyValue != "Unlimited" ?
                                    setMaximumBuy(e.target.value * 1e18) + setMaximumBuyValue(e.target.value) : setMaximumBuy(0) + setMaximumBuyValue(0)
                                  }
                                />

                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                  readOnly={true}
                                  style={setHover == "Maximum Buy" ? { border: '2px solid #252A46' } : {}}
                                  disabled={true}
                                  value={handleChain("symbol")}
                                />
                              </div>
                              <div className="invalid-feedback d-block"></div>

                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Unsold Token <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <UncontrolledDropdown className="option" ref={unsoldTokenRef}>
                              <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                                <div className="d-flex justify-content-between" >
                                  <div className="option">{unsoldToken}</div>
                                  <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                                </div>
                              </DropdownToggle>
                              <DropdownMenu className="w-100 rounded presale-dropdown">
                                <DropdownItem className={unsoldToken == "Burn" ? "item active" : "item"} onClick={() => setUnsoldToken("Burn")}>
                                  Burn
                                </DropdownItem>
                                <DropdownItem className={unsoldToken == "Refund" ? "item active" : "item"} onClick={() => setUnsoldToken("Refund")}>
                                  Refund
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label">Router</label>
                            <UncontrolledDropdown className="option" ref={routerRef} >
                              <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                                <div className="d-flex justify-content-between">
                                  <div className="option">{router}</div>
                                  <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                                </div>
                              </DropdownToggle>
                              <DropdownMenu className="w-100 rounded presale-dropdown">
                                {routerOption().map((item) => (
                                  <DropdownItem className={router == item ? "item active" : "item"} onClick={() => setRouter(item)}>
                                    {item}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Liquidity Percentage<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  id="liqPercent"
                                  onMouseEnter={(e) => handleHover(e, true)}
                                  onMouseLeave={(e) => handleHover(e, false)}
                                  style={setHover == "Liquidity" ? { border: '2px solid #252A46' } : {}}
                                  ref={liqPercentRef}
                                  type="number"
                                  className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                  value={Number(liqRate) != 0 && (liqRate)}
                                  onChange={(e) =>
                                    setLiquidityPercent(e.target.value)
                                  }
                                />

                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  style={setHover == "Liquidity" ? { border: '2px solid #252A46' } : {}}
                                  className="px-3 py-2 w-100 text-center rounded-end presale-input presale-input-label border-start-0"
                                  readOnly={true}
                                  disabled={true}
                                  value="%"
                                />
                              </div>
                              <div className="invalid-feedback d-block">
                                {liqRate == "" ? (
                                  "Liquidity Invalid"
                                ) : liqRate >= 50 &&
                                  liqRate <= 100 ? (
                                  ""
                                ) : liqRate != " " ? (
                                  <div
                                    className="invalid-feedback"
                                    style={{ display: "block" }}
                                  >
                                    Minimum Liquidity is 50% and maximum
                                    liquidity is 100%
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              WeLaunch Insurance <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div onClick={() => setInsured(!insured)} className="px-3 py-2 w-100 rounded presale-input presale-insurance c-pointer d-flex" style={insured ? { color: "#00B2FF" } : {}}>
                              {insured ? (
                                <img className="filled-check me-1 mb-0" style={{ width: '15px' }} src="/images/Fa/yes.svg" />
                              ) : (
                                <span className="empty-check me-1"></span>
                              )}
                              <span>{insured ? "Insurance Active" : "Insurance Off"}</span>

                            </div>
                          </div>


                          {/* listing rate */}
                          <div>
                            <label className="form-label">
                              Listing Rate<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  ref={listingRateRef}
                                  id="listingRate"
                                  style={setHover == "Listing Rate" ? { border: '2px solid #252A46' } : {}}
                                  onMouseEnter={(e) => handleHover(e, true)}
                                  onMouseLeave={(e) => handleHover(e, false)}
                                  type="number"
                                  className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                                  value={Number(listRateValue) != 0 && listRateValue}
                                  onChange={(e) =>
                                    setListingRate(
                                      (
                                        e.target.value *
                                        10 ** decimal
                                      ).toLocaleString("fullwide", {
                                        useGrouping: false,
                                      })
                                    ) + setListingRateValue(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0"
                                  readOnly={true}
                                  style={setHover == "Listing Rate" ? { border: '2px solid #252A46' } : {}}
                                  disabled={true}
                                  value={`${symbol} = 1 ${handleChain("symbol")}`}
                                />
                              </div>
                              <div className="invalid-feedback d-block">
                                {preRate != " " &&
                                  preRate <= 0 && (
                                    <div
                                      className="invalid-feedback d-block"
                                    >
                                      Presale Rate Invalid
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6">
                    <h4 className="card-title mb-2 vis-n">Preview</h4>
                    <div className="card items">
                      <div className="card-body">


                        <div className="infos_i">
                          {presaleType == 0 && (
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div >
                                <div>Presale Rate</div>
                                <div
                                  onMouseEnter={(e) => setHovered("Presale Rate")}
                                  onMouseLeave={(e) => setHovered("")}
                                  className={`val right-presalerate ${oneActive == "presaleRate" ? "active" : ""}`} onClick={() => handleRef(presaleRateRef)}>
                                  {" "}
                                  {Number(preRate) ? `1 ${handleChain("symbol")} = ${localSplit(preRateValue)} ${symbol}` : "-"}
                                </div>
                              </div>
                            </div>
                          )}

                          {presaleType == 1 && (
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div >
                                <div>Total Selling Amount</div>
                                <div
                                  onMouseEnter={(e) => setHovered("Total Amount")}
                                  onMouseLeave={(e) => setHovered("")}
                                  className={`val right-presalerate ${oneActive == "TotalSellingAmount" ? "active" : ""}`} onClick={() => handleRef(totalSellingAmount)}>
                                  {" "}
                                  {Number(totalAmountValue) ? `${localSplit(totalAmountValue)} ${symbol}` : "-"}
                                </div>
                              </div>
                            </div>
                          )}



                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Soft Cap</div>
                            <div
                              onMouseEnter={(e) => setHovered("Soft Cap")}
                              onMouseLeave={(e) => setHovered("")}
                              className={`val right-presalerate ${oneActive == "softCap" ? "active" : ""}`} onClick={() => handleRef(SoftCapRef)}>
                              {Number(softCap) ? `${localSplit(softCap / 1e18)} ${handleChain("symbol")}` : "-"}
                            </div>
                          </div>
                          {presaleType == 0 && (
                            <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                              <div>Hard Cap</div>
                              <div
                                onMouseEnter={(e) => setHovered("Hard Cap")}
                                onMouseLeave={(e) => setHovered("")}
                                className={`val right-presalerate ${oneActive == "hardCap" ? "active" : ""}`} onClick={() => handleRef(hardCapRef)}>
                                {Number(hardCap) ? `${localSplit(hardCap / 1e18)} ${handleChain("symbol")}` : "-"}
                              </div>
                            </div>
                          )}
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Minimum Buy</div>
                            <div onMouseEnter={(e) => setHovered("Minimum Buy")}
                              onMouseLeave={(e) => setHovered("")}
                              className={`val right-presalerate ${oneActive == "minBuy" ? "active" : ""}`} onClick={() => handleRef(minBuyRef)}>
                              {Number(minimumBuy) ? `${localSplit(minimumBuy / 1e18)} ${handleChain("symbol")}` : "-"}
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Maximum Buy</div>
                            <div onMouseEnter={(e) => setHovered("Maximum Buy")}
                              onMouseLeave={(e) => setHovered("")}
                              className={`val right-presalerate ${oneActive == "maxBuy" ? "active" : ""}`} onClick={() => handleRef(maxBuyRef)}>
                              {Number(maximumBuy) ? `${localSplit(maximumBuyValue)} ${handleChain("symbol")}` : "-"}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Liquidity Percent</div>
                            <div onMouseEnter={(e) => setHovered("Liquidity")}
                              onMouseLeave={(e) => setHovered("")}
                              className={`val right-presalerate ${oneActive == "liqPercent" ? "active" : ""}`} onClick={() => handleRef(liqPercentRef)}>
                              {Number(liqRate) ? `${liqRate}%` : "-"}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Router</div>
                            <div className={`val right-presalerate ${router == "presaleRate" ? "active" : ""}`} onClick={() => handleRef(routerRef)}>
                              <img src={
                                router == "Bakeryswap" ? "/images/Fa/bakeryswap.svg" :
                                  router == "Biswap" ? "/images/Fa/biswap.png" :
                                    router == "Bakeryswap" ? "/images/Fa/bakeryswap.svg" :
                                      router == "BabyDogeswap" ? "/images/Fa/babydogeswap.png" : "/images/Fa/pancakeswap.png"
                              } alt="Router" className="pcs" />
                              {router}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Unsold Token</div>
                            <div className="val  right-unsoldToken" onClick={() => handleRef(unsoldTokenRef)}>
                              {unsoldToken}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Insurance</div>
                            <div className="val">
                              {insured ? "Yes" : "No"}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div className="">
                              <div>Listing Rate</div>
                              <div onMouseEnter={(e) => setHovered("Listing Rate")}
                                onMouseLeave={(e) => setHovered("")}
                                className={`val right-presalerate ${oneActive == "listingRate" ? "active" : ""}`} onClick={() => handleRef(listingRateRef)}>
                                {Number(listRate) ? `1 ${handleChain("symbol")} = ${localSplit(listRateValue)} ${symbol}` : "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xxl-8 col-xl-8 col-lg-8">
                    <div className="card detail_card">
                      <div className="card-body">

                        <div className="row">
                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Start Time<span className="asterisk">*</span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <DatePicker
                                  selected={startTime}
                                  showTimeSelect
                                  dateFormat="MMMM d, yyyy h:mm aa"
                                  className="px-3 py-2 w-100 rounded-start border-end-0 presale-input presale-date"
                                  minDate={getDateNow()}
                                  onChange={(e) => startDatefunction(e.getTime())}
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label presale-input-image p-calendar border-start-0"
                                  readOnly={true}
                                  disabled={true}
                                  value=""
                                  style={{ backgroundImage: 'url(/images/Fa/Calendar.svg)' }}
                                />

                              </div>
                            </div>


                            {startTimeUnix * 1000 + 1209600000 <=
                              endTimeUnix * 1000 ? (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                Maximum presale is 2 weeks
                              </div>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              End Time<span className="asterisk">*</span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <DatePicker
                                  selected={endTime}
                                  showTimeSelect
                                  dateFormat="MMMM d, yyyy h:mm aa"
                                  className="px-3 py-2 presale-input rounded-start border-end-0 w-100"
                                  minDate={startTime}
                                  onChange={(e) => EndDatefunction(e.getTime())}
                                />
                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-3 py-2 w-100 text-center rounded-end presale-input presale-input-label p-calendar presale-input-image border-start-0"
                                  readOnly={true}
                                  disabled={true}
                                  value=""
                                  style={{ backgroundImage: 'url(/images/Fa/Calendar.svg)' }}
                                />

                              </div>
                            </div>
                          </div>


                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              Liquidity Lockup<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="number"
                                  className="px-3 py-2 presale-input rounded-start border-end-0 w-100"
                                  value={Number(lockup) != 0 && (lockup)}
                                  onChange={(e) => setLockupFunc(e.target.value)}
                                />

                              </div>
                              <div className="col-2">
                                <input
                                  type="text"
                                  className="px-2 py-2 w-100 text-center rounded-end presale-input presale-input-label border-start-0"
                                  readOnly={true}
                                  disabled={true}
                                  value="DAYS"
                                />
                              </div>
                            </div>

                            {lockup != " " ? (
                              lockup >= 90 ? (
                                ""
                              ) : (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  Minimum Lockup is 90 Days
                                </div>
                              )
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="col-12 col-md-6 mb-3">
                            <label className="form-label">
                              Referral <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <input
                              type="text"
                              style={{ width: "100%" }}
                              className="px-3 py-2 presale-input rounded w-100 isAddress aInput"
                              onChange={(e) => handleReferral(e.target.value)}
                            />
                            {referral == "false" && (
                              <div className="invalid-feedback d-block">
                                Referral Invalid
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="card detail_card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <button
                              onClick={() =>
                                setStep(1)
                              }
                              className="btn btn-outline w-100 second-gray"
                            >
                              Back
                            </button>
                          </div>
                          {presaleType == 0 && (
                            <div className="col-6">
                              <button
                                type="submit"
                                onClick={() => setStep(3)}
                                disabled={
                                  hardCap - softCap > 0 &&
                                    softCap < hardCap &&
                                    softCap >= hardCap / 2 &&
                                    softCap != hardCap &&
                                    minimumBuy <= maximumBuy &&
                                    minimumBuy != 0 &&
                                    liqRate >= 50 &&
                                    liqRate <= 100 &&
                                    preRate != 0 &&
                                    listRate != 0 &&
                                    maximumBuyValue <= (softCapValue * 0.2) &&
                                    needAmount() &&
                                    yourBalance > needAmount() &&
                                    timeDisable()
                                    && lockup >= 90
                                    ?
                                    false
                                    : true
                                }
                                className="btn x-btn w-100 h-100"
                              >
                                Next
                              </button>
                            </div>
                          )}

                          {presaleType == 1 && (
                            <div className="col-6">
                              <button
                                type="submit"
                                onClick={() => setStep(3)}
                                disabled={
                                  softCap > 0 &&
                                  (maximumBuyValue != "Unlimited" ? minimumBuy <= maximumBuy : minimumBuy) &&
                                    minimumBuy != 0 &&
                                    liqRate >= 50 &&
                                    liqRate <= 100 &&
                                    needAmount() &&
                                    yourBalance > needAmount() &&
                                    timeDisable()
                                    && lockup >= 90
                                    ?
                                    false
                                    : true
                                }
                                className="btn x-btn w-100 h-100"
                              >
                                Next
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-lg-6">
                    <div className="card items">
                      <div className="card-body">

                        <div className="infos_i">
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Starts</div>
                            <div className="val">
                              {startTimeASCII ? startTimeASCII : "-"}
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Ends</div>
                            <div className="val">
                              {endTimeASCII ? endTimeASCII : "-"}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Liquidity Lockup</div>
                            <div className="val">
                              {lockup ? `${lockup} days` : "-"}
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Referral</div>
                            <div className="val">
                              {referral != "0xC1293d2A92a2ddCC3A38d5B061DD3aCa35F4d715" ? "Yes" : "No"}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    <div className="card items">
                      <div className="card-body">

                        <div className="infos_i">
                          <div className="d-flex align-items-center  py-2">
                            <img src="/images/Fa/coinW.svg" alt="coin" style={{ marginRight: '15px' }} />
                            {counts()}
                          </div>

                        </div>
                      </div>
                    </div>

                    {handleError()}
                    {handleTimeError()}

                  </div>


                </div>
              </>
            )}

            {step == 3 && (
              <>
                <div className="row justify-content-center">
                  <div className="col-xxl-8 col-xl-8 col-lg-8">
                    <h4 className="card-title mb-2">Create Presale 3/4</h4>
                    <div className="card detail_card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">
                              Logo URL
                              <span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <input
                              type="text"
                              className="w-100 px-3 py-2 presale-input rounded"
                              value={logoURL}
                              onChange={(e) =>
                                setLogoURL(e.target.value) +
                                setHandleLogoURL(e.target.value)
                              }
                            />
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {logoURL
                                ? validURL(logoURL)
                                  ? ""
                                  : "Logo Invalid"
                                : ""}
                            </div>
                          </div>

                          <div className="col-12 mb-3">
                            <div className="card-body endorsement-card">
                              <div className="endorse-content">
                                <div className="p-3 px-4">
                                  <div className="row">
                                    <div className="col-xl-3 col-12 align-self-center">
                                      <img src={isEndorse ? "/images/items/endorse-charge-active.png" : "/images/items/endorse-charge.png"} />
                                    </div>
                                    <div className="col-xl-9 col-12">
                                      <p className={isEndorse ? "mb-0 active" : "mb-0"}>Endorsement System</p>
                                      <p>The percentage you want to give to people bringing funds by recommending your presale with their special, unique link. Available only to TWEP Super Fans (wallets with least 50k TWEP).</p>
                                      <div className="row">
                                        <div className="row g-0 align-items-center">
                                          {isEndorse ? <div className="big-radio-not-filled text-white me-3 c-pointer"
                                          onClick={() => setEndorse(!isEndorse)}
                                          ><img className="filled-check" src="/images/Fa/yes.svg" /> </div> : <div className="big-radio-not-filled not-filled text-white me-3 c-pointer"
                                          onClick={() => setEndorse(!isEndorse)}
                                          ></div>}
                                          <div className="row g-0" style={{ width: '120px' }}>
                                            <div className="col-7">
                                              <input
                                                type="number"
                                                className="w-100 px-3 py-2 presale-input disable-b-hover rounded-start border-end-0"
                                                value={endorsePercent}
                                                disabled={!isEndorse}
                                                onChange={(e) => e.target.value >= 100 - liqRate ? setEndorsePercent(100 - liqRate) : setEndorsePercent(e.target.value)}
                                              />

                                            </div>
                                            <div className="col-5">
                                                  <input
                                                    type="text"
                                                    className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-chain presale-input-image  border-start-0`}
                                                    readOnly={true}
                                                    disabled={true}
                                                    value="%"
                                                  />
                                            </div>

                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                        </div>


                        <div className="row">
                          <div className="col-6 mb-3">
                            <label className="form-label">Website
                              <span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={website}
                                  onChange={(e) => setWebsite(e.target.value)}
                                />

                              </div>
                              <div className="col-2 ">
                                <WeToolTip title={validURL(website) ? website : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={website} style={validURL(website) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-chain presale-input-image ${website ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/Chain.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>

                            </div>
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {website
                                ? validURL(website)
                                  ? ""
                                  : "Website Invalid"
                                : ""}
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">Telegram</label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={telegram}
                                  onChange={(e) => setTelegram(e.target.value)}
                                />
                              </div>
                              <div className="col-2 ">
                                <WeToolTip title={validURL2(telegram) ? telegram : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={telegram} style={validURL2(telegram) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-telegram presale-input-image ${website ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/FaTelegram.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>
                            </div>

                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {telegram
                                ? validURL2(telegram)
                                  ? ""
                                  : "Telegram Invalid"
                                : ""}
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">Twitter</label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={twitter}
                                  onChange={(e) => setTwitter(e.target.value)}
                                />
                              </div>
                              <div className="col-2 ">
                                <WeToolTip title={validURL2(twitter) ? twitter : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={twitter} style={validURL2(twitter) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-twitter presale-input-image ${twitter ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/FaTwitter.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>
                            </div>

                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {twitter
                                ? validURL2(twitter)
                                  ? ""
                                  : "Twitter Invalid"
                                : ""}
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">Discord</label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={discord}
                                  onChange={(e) => setDiscord(e.target.value)}
                                />
                              </div>
                              <div className="col-2">
                                <WeToolTip title={validURL2(discord) ? discord : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={discord} style={validURL2(discord) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-discord presale-input-image ${discord ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/FaDiscord.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>
                            </div>

                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {discord
                                ? validURL2(discord)
                                  ? ""
                                  : "Discord Invalid"
                                : ""}
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">Medium</label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={medium}
                                  onChange={(e) => setMedium(e.target.value)}
                                />

                              </div>
                              <div className="col-2">
                                <WeToolTip title={validURL2(medium) ? medium : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={medium} style={validURL2(medium) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-medium presale-input-image ${medium ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/FaMedium.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>
                            </div>
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {medium
                                ? validURL2(medium)
                                  ? ""
                                  : "Medium Invalid"
                                : ""}
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">Reddit</label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={reddit}
                                  onChange={(e) => setReddit(e.target.value)}
                                />
                              </div>
                              <div className="col-2">
                                <WeToolTip title={validURL2(reddit) ? reddit : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={reddit} style={validURL2(reddit) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-reddit presale-input-image ${reddit ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/FaReddit.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>
                            </div>
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {reddit
                                ? validURL2(reddit)
                                  ? ""
                                  : "Reddit Invalid"
                                : ""}
                            </div>
                          </div>
                          <div className="col-6 mb-3">
                            <label className="form-label">
                              Banner / Youtube
                            </label>
                            <div className="row g-0">
                              <div className="col-10">
                                <input
                                  type="text"
                                  className="w-100 px-3 py-2 presale-input rounded-start border-end-0"
                                  value={banner}
                                  onChange={(e) => setBanner(e.target.value)}
                                />

                              </div>
                              <div className="col-2">
                                <WeToolTip title={validURL2(banner) ? banner : null} arrow>
                                  <a target="_blank" rel="noopener noreferrer" href={banner} style={validURL2(banner) ? {} : { pointerEvents: 'none' }}>
                                    <input
                                      type="text"
                                      className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-youtube presale-input-image ${banner ? "active" : ""} border-start-0`}
                                      readOnly={true}
                                      disabled={true}
                                      value=""
                                      style={{ backgroundImage: 'url(/images/Fa/FaYoutube.svg)' }}
                                    />
                                  </a>
                                </WeToolTip>
                              </div>
                            </div>
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {banner
                                ? validURL2(banner)
                                  ? ""
                                  : "banner Invalid"
                                : ""}
                            </div>
                          </div>



                          <div className="col-12 mb-3">
                            <label className="form-label">Description
                              <span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <textarea
                              type="text"
                              style={{ padding: "20px", color: "#fff", height: '150px' }}
                              className="w-100 px-3 py-2 normal-input rounded"
                              value={description}
                              onChange={(e) =>
                                setDesc(e.target.value)}
                            />
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {description
                                ? description.length <= 64
                                  ? "Minimum length is 64 characther"
                                  : description.length >= 300 && "Maximum length is 300 characther"
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>


                      <h4 className="card-title mt-5 mb-2">EXTRA EXPOSURE PACK</h4>

                      <div className="card-body">
                        <div className="row">
                          <div className="col-12 col-md-6">
                            <label className="form-label">
                              EXTRA EXPOSURE PACK<span className="asterisk">*0.5 BNB</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <div onClick={() => handleEP()} className="px-3 py-2 w-100 rounded presale-input presale-insurance c-pointer d-flex" style={isEPActive ? { color: "#00B2FF" } : {}}>
                              {isEPActive ? (
                                <img className="filled-check me-1 mb-0" style={{ width: '15px' }} src="/images/Fa/yes.svg" />
                              ) : (
                                <span className="empty-check me-1"></span>
                              )}
                              <span>{isEPActive ? "On" : "Off"}</span>

                            </div>
                          </div>
                          <div className={`col-12 col-md-6 ${!isEPActive ? "d-none" : ""}`}>
                            <label className="form-label">
                              Promotional Cover
                              <span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                            </label>
                            <input
                              type="text"
                              className="w-100 px-3 py-2 presale-input rounded"
                              value={headerImage}
                              onChange={(e) => setHeaderImage(e.target.value)}
                            />
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {headerImage
                                ? validURL2(headerImage)
                                  ? ""
                                  : "Cover link Invalid"
                                : ""}
                            </div>
                          </div>



                          <div className={`mt-3  ${!isEPActive ? "d-none" : ""}`}>
                            <ClickAwayListener onClickAway={disableColor}>
                              <div>
                                <div className="row justify-content-center">
                                  <button className="btn x-btn w-50 me-0 ms-0" onClick={() => setIsColorOpen(!isColorOpen)} style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>Customize Button Color</button>
                                </div>
                                {isColorOpen ? (
                                  <HexColorPicker color={canvasColor} className="react-color" onChange={((e) => hexToHSL(e))} />
                                ) : null}
                              </div>
                            </ClickAwayListener>
                          </div>


                        </div>

                      </div>


                    </div>
                    <div className="card detail_card mb-0">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                            <button
                              onClick={() =>
                                setStep(2)
                              }
                              className="btn btn-outline w-100 btn-back second-gray"
                            >
                              Back
                            </button>
                          </div>
                          {presaleType == 0 && (
                            <div className="col-6">
                              <button
                                type="submit"
                                onClick={() => setStep(4)}
                                disabled={
                                  hardCap - softCap > 0 &&
                                    softCap < hardCap &&
                                    softCap >= hardCap / 2 &&
                                    softCap != hardCap &&
                                    minimumBuy <= maximumBuy &&
                                    minimumBuy != 0 &&
                                    liqRate >= 50 &&
                                    liqRate <= 100 &&
                                    preRate != 0 &&
                                    listRate != 0 &&
                                    needAmount() &&
                                    validURL(logoURL) &&
                                    validURL(website) &&
                                    validURL2(telegram) &&
                                    validURL2(twitter) &&
                                    validURL2(discord) &&
                                    validURL2(medium) &&
                                    validURL2(reddit) &&
                                    description.length <= 300 &&
                                    description.length >= 64 &&
                                    yourBalance > needAmount() &&
                                    timeDisable()
                                    && lockup >= 90
                                    ?
                                    false
                                    : isEPActive ? validURL(headerImage) ? false : true : false
                                }
                                className="btn x-btn w-100 h-100"
                              >
                                Next
                              </button>
                            </div>
                          )}

                          {presaleType == 1 && (
                            <div className="col-6">
                              <button
                                type="submit"
                                onClick={() => setStep(4)}
                                disabled={
                                  softCap > 0 &&
                                    minimumBuy <= maximumBuy &&
                                    minimumBuy != 0 &&
                                    liqRate >= 50 &&
                                    liqRate <= 100 &&
                                    needAmount() &&
                                    validURL(logoURL) &&
                                    validURL(website) &&
                                    validURL2(telegram) &&
                                    validURL2(twitter) &&
                                    validURL2(discord) &&
                                    validURL2(medium) &&
                                    validURL2(reddit) &&
                                    description.length <= 300 &&
                                    description.length >= 64 &&
                                    yourBalance > needAmount() &&
                                    timeDisable()
                                    && lockup >= 90
                                    ?
                                    false
                                    : isEPActive ? validURL(headerImage) ? false : true : false
                                }
                                className="btn x-btn w-100 h-100"
                              >
                                Next
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Card p={p} Datas={{ safe: { kyc: 'https://kyc.com', audit: 'https://audit.com' }, isFavorited: false, Filled: softCapValue, logoURL, startTime, endTime, name, presaleType, softCap: softCapValue, hardCap: hardCapValue, liqRate, lockup, contract: 0, headerImage, premiumColor, isPremium: isEPActive, insurance: insured, premiumColor2, canvasColor }} />
                </div>

              </>
            )}

            {step == 4 && (
              <>
                <div className="row justify-content-center">
                  <div className="col-xxl-12 col-xl-12 col-lg-12">
                    <h4 className="card-title mb-2">Create Presale 4/4</h4>
                    <div className="col-md-12" style={{ display: 'unset' }}>
                      <div className="card detail_card sticky-card" style={{ background: '#16152c' }}>
                        <div className="card-body">
                          <div
                            className="d-flex justify-content-between"
                          >
                            <button onClick={() => setStep(3)} style={{ marginRight: "15px", width: '20%' }} className="btn mr-2 btn-outline btn-back second-gray" >Back</button>
                            <p style={{ margin: 'unset', alignSelf: 'center' }}>EVERYTHING LOOKS EXACTLY HOW YOU WANT IT?</p>
                            {presaleType == 0 && (
                              <button
                                type="submit"
                                onClick={() => finishPool()}
                                style={{ width: '20%' }}
                                disabled={
                                  timeDisable() &&
                                    hardCap - softCap > 0 &&
                                    softCap < hardCap &&
                                    softCap >= hardCap / 2 &&
                                    softCap != hardCap &&
                                    minimumBuy <= maximumBuy &&
                                    minimumBuy != 0 &&
                                    liqRate >= 50 &&
                                    liqRate <= 100 &&
                                    preRate != 0 &&
                                    listRate != 0 &&
                                    needAmount() &&
                                    yourBalance > needAmount() &&
                                    startTime < endTime
                                    && lockup >= 90 &&
                                    !isLoading
                                    ?
                                    false
                                    : true
                                }
                                className="btn x-btn mr-2 "
                              >
                                {isLoading && (
                                  <div
                                    className="spinner-border text-white"
                                    style={{
                                      width: "1rem",
                                      height: "1rem",
                                      marginRight: "5px",
                                      border: "0.15em solid currentColor",
                                      borderRightColor: "transparent",
                                    }}
                                  ></div>
                                )}
                                Launch
                              </button>
                            )}

                            {presaleType == 1 && (
                              <button
                                type="submit"
                                onClick={() => finishPool()}
                                style={{ width: '20%' }}
                                disabled={
                                  timeDisable() &&
                                    softCap > 0 &&
                                    (maximumBuyValue != "Unlimited" ? minimumBuy <= maximumBuy : minimumBuy) &&
                                    minimumBuy != 0 &&
                                    liqRate >= 50 &&
                                    liqRate <= 100 &&
                                    needAmount() &&
                                    yourBalance > needAmount() &&
                                    startTime < endTime
                                    && lockup >= 90 &&
                                    !isLoading
                                    ?
                                    false
                                    : true
                                }
                                className="btn x-btn mr-2 "
                              >
                                {isLoading && (
                                  <div
                                    className="spinner-border text-white"
                                    style={{
                                      width: "1rem",
                                      height: "1rem",
                                      marginRight: "5px",
                                      border: "0.15em solid currentColor",
                                      borderRightColor: "transparent",
                                    }}
                                  ></div>
                                )}
                                Launch
                              </button>

                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        {isEPActive ? (
                          <>
                            <div className="card-up card-bg-image rounded-top pres" style={{ backgroundImage: `url(${headerImage})` }}>
                              <div className="premium-top rounded-top">
                                <div className="d-flex gap-2">
                                  <div className="badge-status kyc">
                                    KYC
                                  </div>
                                  <div className="badge-status audit">
                                    Audit
                                  </div>
                                  <div className="badge-status insurance">
                                    Insurance
                                  </div>
                                  <div className="_progress _S0 ms-auto">
                                    <img src="/images/Fa/radio.svg" />
                                    Upcoming
                                  </div>
                                  <div className="stars_save c-pointer" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                      <path d="M24.2243 9.45108L17.0296 8.35612L13.8133 1.5282C13.7255 1.34126 13.581 1.18992 13.4024 1.09793C12.9547 0.866479 12.4106 1.05936 12.1868 1.5282L8.97055 8.35612L1.77582 9.45108C1.57746 9.48076 1.39611 9.57868 1.25725 9.72705C1.08939 9.90772 0.996892 10.1508 1.00008 10.4028C1.00327 10.6549 1.10188 10.8953 1.27426 11.0713L6.47974 16.3858L5.24992 23.8903C5.22108 24.0649 5.23953 24.2444 5.30317 24.4086C5.36681 24.5727 5.47311 24.7149 5.60999 24.819C5.74688 24.9231 5.90889 24.985 6.07764 24.9976C6.24639 25.0102 6.41514 24.973 6.56475 24.8903L13.0001 21.3473L19.4354 24.8903C19.6111 24.9882 19.8151 25.0209 20.0106 24.9853C20.5037 24.8962 20.8352 24.4066 20.7502 23.8903L19.5204 16.3858L24.7259 11.0713C24.8675 10.9259 24.9611 10.736 24.9894 10.5282C25.0659 10.0089 24.7202 9.52823 24.2243 9.45108V9.45108Z"
                                        stroke={"#C3D4EF"} strokeWidth={"1.5"}
                                        fill="transparent" />
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
                                      src={`${handleLogoURL
                                        ? handleLogoURL
                                        : "/images/profile/unknown.png"
                                        }`}
                                      onError={() => {
                                        setHandleLogoURL("/images/profile/unknown.png");
                                      }}
                                      style={{ width: "140px" }}
                                      alt={"Logo"}
                                    />
                                  </div>

                                  <div className="title-box" style={{ marginTop: '-20px' }}>
                                    <a style={{ marginRight: "5px", fontSize: '25px' }}>
                                      {name == null ? (
                                        "-"
                                      ) : (
                                        name + ` ${presaleType == 0 ? "Presale" : ""}${presaleType == 1 ? "Fair Launch" : ""}`
                                      )}
                                    </a>
                                    <div className="row" style={{ gap: '15px', paddingLeft: '15px' }}>
                                      {telegram && (getSocialr("telegram", telegram))}
                                      {medium && (getSocialr("medium", telegram))}
                                      {discord && (getSocialr("discord", telegram))}
                                      {twitter && (getSocialr("twitter", telegram))}
                                      {reddit && (getSocialr("reddit", telegram))}
                                      {website && (<Link href={website ? website : "#"}><a target="_blank" rel="noopener noreferrer" className="social_box_website"><b>Website</b></a></Link>)}
                                    </div>
                                  </div>
                                </div>
                                <p className="mb-3 mt-5 desc_p">{description}</p>




                              </div>

                            </div>
                          </>
                        ) : (
                          <>
                            <div className="card-up card-bg-image rounded-top pres" style={{ height: '50px' }}>
                              <div className="not-premium rounded-top">
                                <div className="d-flex gap-2">
                                  <div className="badge-status kyc">
                                    KYC
                                  </div>
                                  <div className="badge-status audit">
                                    Audit
                                  </div>
                                  <div className="badge-status insurance">
                                    Insurance
                                  </div>
                                  <div className="_progress _S0 ms-auto">
                                    <img src="/images/Fa/radio.svg" />
                                    Upcoming
                                  </div>
                                  <div className="stars_save c-pointer" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                      <path d="M24.2243 9.45108L17.0296 8.35612L13.8133 1.5282C13.7255 1.34126 13.581 1.18992 13.4024 1.09793C12.9547 0.866479 12.4106 1.05936 12.1868 1.5282L8.97055 8.35612L1.77582 9.45108C1.57746 9.48076 1.39611 9.57868 1.25725 9.72705C1.08939 9.90772 0.996892 10.1508 1.00008 10.4028C1.00327 10.6549 1.10188 10.8953 1.27426 11.0713L6.47974 16.3858L5.24992 23.8903C5.22108 24.0649 5.23953 24.2444 5.30317 24.4086C5.36681 24.5727 5.47311 24.7149 5.60999 24.819C5.74688 24.9231 5.90889 24.985 6.07764 24.9976C6.24639 25.0102 6.41514 24.973 6.56475 24.8903L13.0001 21.3473L19.4354 24.8903C19.6111 24.9882 19.8151 25.0209 20.0106 24.9853C20.5037 24.8962 20.8352 24.4066 20.7502 23.8903L19.5204 16.3858L24.7259 11.0713C24.8675 10.9259 24.9611 10.736 24.9894 10.5282C25.0659 10.0089 24.7202 9.52823 24.2243 9.45108V9.45108Z"
                                        stroke={"#C3D4EF"} strokeWidth={"1.5"}
                                        fill="transparent" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card detail_card presale-card-not-premium">
                              <div className="card-body">
                                <div className="pp-card-top">
                                  <div className="presale_logo">
                                    <img
                                      src={`${handleLogoURL
                                        ? handleLogoURL
                                        : "/images/profile/unknown.png"
                                        }`}
                                      onError={() => {
                                        setHandleLogoURL("/images/profile/unknown.png");
                                      }}
                                      style={{ width: "140px" }}
                                      alt={"Logo"}
                                    />
                                  </div>

                                  <div className="title-box" style={{ marginTop: '-40px' }}>
                                    <a style={{ marginRight: "5px", fontSize: '25px' }}>
                                      {name == null ? (
                                        "-"
                                      ) : (
                                        name + ` ${presaleType == 0 ? "Presale" : ""}${presaleType == 1 ? "Fair Launch" : ""}`
                                      )}
                                    </a>
                                    <div className="row" style={{ gap: '15px', paddingLeft: '15px' }}>
                                      {telegram && (getSocialr("telegram", telegram))}
                                      {medium && (getSocialr("medium", telegram))}
                                      {discord && (getSocialr("discord", telegram))}
                                      {twitter && (getSocialr("twitter", telegram))}
                                      {reddit && (getSocialr("reddit", telegram))}
                                      {website && (<Link href={website ? website : "#"}><a target="_blank" rel="noopener noreferrer" className="social_box_website"><b>Website</b></a></Link>)}
                                    </div>
                                  </div>
                                </div>
                                <p className="mb-3 mt-5 desc_p">{description}</p>




                              </div>

                            </div>
                          </>
                        )}
                        {banner && (
                          <div className="card pres_1">
                            <div className="card-body">
                              <div className="featured-image">{showBanner(banner)}</div>

                              <div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="card pres_1">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-xl-4 col-12 presale-image-card">
                                <img src="/images/fa/Rocket-Presale.svg" className="presale-card-filter" />
                              </div>
                              <div className="col-xl-8 col-12">
                                <div className="w-100">
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Presale Start</div><div>{startTimeASCII}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                    <div className="text-white">Presale Finish</div><div> {endTimeASCII}</div>
                                  </div>
                                  {presaleType == 0 && (
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                      <div className="text-white">Presale Rate</div><div>{preRateValue} {symbol}</div>
                                    </div>
                                  )}
                                  {presaleType == 1 && (
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                      <div className="text-white">Presale Rate</div><div>N/A</div>
                                    </div>
                                  )}
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Listing Rate</div><div>{`1 ${handleChain('symbol')} = ${localSplit(listRateValue)} ${symbol}`}</div>
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
                                <img src="/images/fa/Coin-Presale.svg" className="presale-card-filter" />
                              </div>
                              <div className="col-xl-8 col-12">
                                <div className="w-100">
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Token Symbol</div><div>{symbol}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Token Name</div><div> {name}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Token Decimal</div><div>{decimal}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                    <div className="text-white">Token Supply</div><div>{localSplit(totalSupply)}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Soft Cap</div><div> {localSplit(softCapValue)}</div>
                                  </div>
                                  {presaleType == 0 && (
                                    <div className="d-flex align-items-center justify-content-between py-2">
                                      <div className="text-white">Hard Cap</div><div>{localSplit(hardCapValue)}</div>
                                    </div>
                                  )}
                                  {presaleType == 1 && (
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
                                <img src="/images/fa/Listing-Presale.svg" className="presale-card-filter" />
                              </div>
                              <div className="col-xl-8 col-12">
                                <div className="w-100">
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Listing On</div><div>{router}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                    <div className="text-white">Unsold Tokens</div><div> {unsoldToken}</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Liquidity</div><div>{liqRate}%</div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between py-2">
                                    <div className="text-white">Lockup Time</div><div>{lockup} days</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card pres_1">
                          <div className="card-body">
                            <div className="welaunch-tokenomics">
                              <WeLaunchCharts data={dataS} name={symbol} />
                            </div>
                            <div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card pres_1 rounded">
                          <div className="card-body">
                            <div className="text-center text-white">
                              PRESALE STARTS IN
                            </div>

                            <div className="d-flex" style={{ placeContent: 'center', marginTop: '15px', gap: "10px" }}>
                              <div className="d-flex flex-column">
                                <div className="cd_top text-center">
                                  <b>00</b>
                                </div>
                                <div className="cd_bottom text-center">
                                  <div className="d-flex flex-column span">
                                    <span>DAYS</span>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex flex-column">
                                <div className="cd_top text-center">
                                  <b>00</b>
                                </div>
                                <div className="cd_bottom text-center">
                                  <div className="d-flex flex-column span">
                                    <span>HOURS</span>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex flex-column">
                                <div className="cd_top text-center">
                                  <b>00</b>
                                </div>
                                <div className="cd_bottom text-center">
                                  <div className="d-flex flex-column span">
                                    <span>MINUTES</span>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex flex-column">
                                <div className="cd_top text-center">
                                  <b>00</b>
                                </div>
                                <div className="cd_bottom text-center">
                                  <div className="d-flex flex-column span">
                                    <span>SECONDS</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div style={{ margin: "20px 0px" }}>
                              <ProgressBar status={0} showSoftCap={true} presaleType={presaleType} premiumColor2={premiumColor2} premiumColor={premiumColor} filled={0} softCap={softCapValue} hardCap={hardCapValue} />
                              <div className="d-flex text-white justify-content-between">
                                <span>{softCapValue} {handleChain('symbol')}</span>
                                {presaleType == 0 &&
                                  (
                                    <span>{hardCapValue} {handleChain('symbol')}</span>

                                  )}

                                {presaleType == 1 &&
                                  (
                                    <span>∞ {handleChain('symbol')}</span>

                                  )}


                              </div>
                              <div className="align-items-center mt-3">
                                <div className="ant-col info-contribution ant-col-xs-12 ant-col-sm-12 ant-col-md-24 ant-col-lg-24 input_contribute ">
                                  <input
                                    type="number"
                                    placeholder="Ex: 1.5"
                                    className="input-contrib" />
                                  <div className="max">
                                    MAX
                                  </div>
                                </div>
                              </div>
                              <button className="btn x-btn w-100 mt-3" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>
                                Contribute
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card pres_1 mt-3"><div className="card-body disable-pad-5">
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div style={{ color: '#00B2FF' }}> Add to Wallet</div><div><img src="/images/wallet/metamask.svg" style={{ width: '30px', marginRight: '10px' }} />
                              <img src="/images/wallet/trustwallet.svg" style={{ width: '30px', marginRight: '10px' }} /></div></div>
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Sale type</div><div> Public Sale</div></div>
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Minimum Buy</div><div>{minimumBuyValue} BNB</div></div>
                            {maximumBuyValue != 'Unlimited' && (
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Maximum Buy</div><div>{maximumBuyValue} BNB</div></div>
                              
                            ) }
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Total Contributor</div><div>0</div></div>
                          <div className="d-flex align-items-center justify-content-between py-2">
                            <div>Your Contribution</div><div>0 BNB</div></div>
                        </div>
                        </div>
                        {isEndorse ? (
                        <div className="card pres_1 mt-3"><div className="card-body disable-pad-5">
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Endorse This Project</div><div className="endorses">{endorsePercent}%<img src="/images/items/endorse-charge-active.png" style={{ width: '20px', margin: '0px 10px' }} /></div></div>
                          <div className="position-relative">
                            <input type="text" className="ps-3 py-2 presale-input rounded w-100 aInput mt-3" readOnly value={"https://welaunch.app/s/yourProject"} />
                            <div className="endorse-input"></div>
                          </div>
                          <div className="d-flex align-items-center gap-3 py-3">
                            <Button className="w-100" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>Share</Button>
                            <Button3 className="w-80 px-5"><img src="/images/Fa/Copy.svg" style={{ width: '25px' }} /></Button3>
                          </div>
                        </div>
                        </div>

                        ): (
                          <div className="card pres_1"><div className="card-body disable-pad-5">
                          <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                            <div>Share This Project</div>
                            </div>
                          <div className="position-relative">
                            <input type="text" className="px-3 py-2 presale-input rounded w-100 aInput mt-3" readOnly value={`https://welaunch.app/s/yourProject`} />
                          </div>
                          <div className="d-flex align-items-center gap-3 py-3">
                            <Button className="w-100" style={{ background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`, border: `1px solid ${canvasColor}` }}>Share</Button>
                            <Button3 className="w-80 px-5"><img src="/images/Fa/Copy.svg" style={{ width: '25px' }} /></Button3>
                          </div>
                        </div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </>
            )}
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
export default SettingsProfile;
