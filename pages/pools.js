import React, { useRef, useState, useEffect, Component } from "react";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import { useRouter } from "next/router";
import Web3 from "web3";
import { presaleAdmin, IERC20, aggr } from "/components/web3/abi";
import { detailsAbi } from "/components/web3/detailsAbi";
import Overview from "../component/overview";
import "react-multi-carousel/lib/styles.css";
import { presaleView } from "/components/web3/presaleView";
import { presaleFactory } from "../components/web3/abi";
import { pinksaleAbi1, pinksaleAbi2 } from "../components/web3/pinksaleAbi";


function Home({ p }) {
  const [filter, setFilter] = useState("all");
  const [totalOfPool, setTotalOfPool] = useState([]);
  const [addressOfPool, setAddressOfPool] = useState([]);
  const [called, setCalled] = useState([]);
  const [dataAs, setDataAs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);


  const { chain, rpcURL, pContract } = p;

  const randomNumber = (max, min, except) => {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num === except ? randomNumber(max, min, except) : num;
  };


  async function Pinksale(aggrContract) {
    const totalPoolPinksale = Number(await aggrContract.methods.getPinksaleTotalNumberOfPools().call()) - 1
    const now = totalPoolPinksale - (pinkNow + 6)
    setPinkNow(pinkNow + 7)
    let to = totalPoolPinksale - pinkNow
    if (to < 0) to = 0
    const pinkData = await aggrContract.methods.getPinksalePools(now, to).call()
    pinkData.forEach((data, i) => {
      if (i < 0) return
      const adrs = data.adrs
      const external = data.ex
      const tokenInfo = data.tokenInfo
      const uints = data.uints
      const currency = adrs.currency
      const presaleAddress = adrs.pAdr;

      const social = JSON.parse(data.strings.poolDetails)
      let auditData = { a: "", b: "" }
      if (data.strings.kycDetails) {
        auditData = JSON.parse(data.strings.kycDetails)
      }
      if(adrs.token != "0x0000000000000000000000000000000000000000") {
        const name = tokenInfo.name
      const status = uints.status
      const logo = social.a;
      const website = social.b;
      const twitter = social.d;
      const medium = '';
      const discord = social.k;
      const telegram = social.f;
      const reddit = social.g;
      const audit = auditData.b;
      const kyc = auditData.a;

      const insurance = false;
      const softCap = uints.softCap;
      const hardCap = uints.hardCap;
      const liq = uints.liq * 100;
      const start = uints.startTime;
      const end = uints.endTime;
      const lockDur = uints.lockUp;
      const filled = uints.totalRaised;
      const mode = uints.presaleType
      dataAs.push({
        token: { presaleAddress, name, logo },
        social: { twitter, discord, telegram, medium, website, reddit },
        safe: { audit, kyc },
        num: {
          softCap,
          hardCap,
          liq,
          start,
          end,
          lockDur,
          filled,
        },
        status,
        mode,
        currency,
        insurance,
        headerImage: "",
        isPremium: true,
        canvasColor: "#036AE3",
        premiumColor: "hsl(212deg 97% 45%)",
        premiumColor2: "hsl(191deg 98% 59%)",
        external: external
      });
      }
      
    });
  }

  async function DxSale(aggrContract) {
    const totalPoolDxSale = Number(await aggrContract.methods.getDxSaleTotalNumberOfPools().call()) - 1
    const now = totalPoolDxSale - (dxNow + 6)
    let to = totalPoolDxSale - dxNow
    if (to < 0) to = 0
    setDxNow(dxNow + 7)
    if(now < 0) return
    const dxData = await aggrContract.methods.getDxSalePools(now, to).call()
    dxData.forEach((data, i) => {
      if (i < 0) return
      const adrs = data.adrs
      const external = data.ex
      const social = data.social
      const string = data.strings
      const tokenInfo = data.tokenInfo
      const uints = data.uints
      const currency = adrs.currency
      const presaleAddress = adrs.pAdr;
      const saleId = uints.saleId


      const name = tokenInfo.name
      const status = uints.status
      const logo = (social.BannerandLogo).split("@@@@")[0];
      const website = social.website;
      const twitter = social.twitter;
      const medium = '';
      const discord = social.discord;
      const telegram = social.tele;
      const reddit = social.reddit;
      const audit = (string.kycDetails).length != 0 ? (string.kycDetails).split("|")[0] : "";
      const kyc = (string.kycDetails).length != 0 ? (string.kycDetails).split("|")[1] : "";

      const insurance = false;
      const softCap = uints.softCap;
      const hardCap = uints.hardCap;
      const liq = uints.liq * 100;
      const start = uints.startTime;
      const end = uints.endTime;
      const lockDur = uints.lockUp - end;
      const filled = uints.totalRaised;
      const mode = uints.presaleType
      dataAs.push({
        token: { presaleAddress, name, logo },
        social: { twitter, discord, telegram, medium, website, reddit },
        safe: { audit, kyc },
        num: {
          softCap,
          hardCap,
          liq,
          start,
          end,
          lockDur,
          filled,
        },
        status,
        mode,
        currency,
        insurance,
        headerImage: (social.BannerandLogo).split("@@@@")[1],
        isPremium: true,
        canvasColor: "#036AE3",
        premiumColor: "hsl(212deg 97% 45%)",
        premiumColor2: "hsl(191deg 98% 59%)",
        external: external,
        saleId
      });
    });
  }

  const [pinkNow, setPinkNow] = useState(0)
  const [dxNow, setDxNow] = useState(0)

  async function getPinksale() {
    try {
      if (!pContract[chain]) return
    const web3 = new Web3(rpcURL);
    const aggrContract = new web3.eth.Contract(aggr, pContract[chain]['aggr']);
    await Pinksale(aggrContract);
    await DxSale(aggrContract)
    }catch(_){}
  }

  const [welaunchNow, setWelaunchNow] = useState(0)
  const [welaunchUsed, setwelaunchUsed] = useState([])

  async function getWelaunch() {
    try {
      if(!totalOfPool.length) return
      const web3 = new Web3(rpcURL);
      const totalPoolWelaunch = totalOfPool.length - 1
      const now = totalPoolWelaunch - welaunchNow
      setWelaunchNow(now - 5) 
      let welaunchData = [] 
      for(let i = now;i > now - 5 ; i --) {
        if(totalOfPool[i]) welaunchData.push(totalOfPool[i])
      }
      welaunchData.map(async (addr, idx) => {
        if(!welaunchUsed.includes(addr)) {
          welaunchUsed.push(addr)
          const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
          const resData = await presaleViewContract.methods.getPresale(addr).call()
          let canvasColor = "#036AE3"
          let premiumColor = "hsl(212deg 97% 45%)"
          let premiumColor2 = "hsl(191deg 98% 59%)"
          let headerImage = ""
          let isPremium = false
  
  
  
          const uintParam = resData.uints
          const adrParam = resData.adrs
          const boolParam = resData.bools
          const socialParam = resData.social
          const tokenParam = resData.tokenInfo 
          const canvas = (socialParam.color).split("|")[0]
          const pColor = (socialParam.color).split("|")[1]
          const pColor2 = (socialParam.color).split("|")[2]
          if (boolParam.isEp) {
            isPremium = true
            headerImage = (socialParam.premiumBanner)
            canvasColor = (canvas)
            premiumColor = (pColor)
            premiumColor2 = (pColor2)
          }
          const presaleAddress = addr;
          const name = tokenParam.name;
          const status = uintParam.status;
          const website = socialParam.website;
          const telegram = socialParam.tele;
          const twitter = socialParam.twitter;
          const discord = socialParam.discord;
          const medium = socialParam.medium;
          const reddit = socialParam.reddit;
          const logo = socialParam.logo;
          const audit = "";
          const kyc = "";
          const insurance = boolParam.insured;
          const softCap = uintParam.softCap;
          const hardCap = uintParam.hardCap;
          const liq = uintParam.liq * 100;
          const start = uintParam.startTime;
          const end = uintParam.endTime;
          const lockDur = uintParam.lockUp;
          const filled = uintParam.totalRaised;
          const mode = uintParam.presaleType;
          dataAs.push({
            token: { presaleAddress, name, logo },
            social: { twitter, discord, telegram, medium, website, reddit },
            safe: { audit, kyc },
            num: {
              softCap,
              hardCap,
              liq,
              start,
              end,
              lockDur,
              filled,
            },
            status,
            mode,
            insurance,
            headerImage,
            isPremium,
            canvasColor,
            currency: adrParam.currency,
            premiumColor,
            premiumColor2
          });
        }
      });
    } catch (e) {
      setIsLoading(false);
    }
  }
  async function init() {
    try {
      const web3 = new Web3(rpcURL);
      let sttcontract = new web3.eth.Contract(
        presaleAdmin,
        pContract[chain]["ctPresale"]
      );
      const r = await sttcontract.methods.getPresales("0x0000000000000000000000000000000000000000", 0, 0).call();
      const totalPool = r[3]
      setTotalOfPool(totalPool);
      await getWelaunch()
      setIsLoading(false);

    } catch (_) { 
      setIsLoading(false);

    }
  }

  const onRefresh = async () => {
    if(isLoading) return
    setIsLoading(true);
    try {
      await getPinksale()
      await getWelaunch()
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const adsData = [
    {
      img: "./images/items/dummy.png",
      title: "Toket Crypto",
      desc: "Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum",
    },
    {
      img: "./images/items/bg1.jpg",
      title: "Toket Crypto",
      desc: "Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum",
    },
    {
      img: "./images/items/dummy.png",
      title: "Toket Crypto",
      desc: "Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum",
    },
    {
      img: "./images/items/dummy.png",
      title: "Toket Crypto",
      desc: "Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum Lorem ipsum siamet Lorem ipsum",
    },
  ];
  const ads = (img, title, desc) => {
    return (
      <>
        <div className="d-flex flex-column ads_1">
          {/* 315 x 150 */}
          <img src={img} style={{ borderRadius: '12px', height: '150px', width: 'auto' }} />
          <p>
            {title.length > 18 ? "title" : title}
            <br />
            <b>{desc.length > 34 ? desc.substring(0, 34) + "..." : desc}</b>
          </p>
        </div>
      </>
    );
  };
  useEffect(() => {
    getPinksale()
  }, [chain])

  useEffect(() => {
    init();


  }, [rpcURL]);


  return (
    <>
      <LayoutAdmin
        headTitle="WeLaunch - Pool Dashboard"
        pageTitleSub={"Pool"}
        pageclassName={"admin"}
        parent={"Home"}
        child={"Pools"}
        p={p}
      >
        <div className="row" style={{ paddingTop: "20px" }}>
          {/* <Carousel responsive={responsive} autoPlay={true} partialVisible={true} >
            {adsData.map((x, i) => (
              <div key={i}>
                {ads(x.img, x.title, x.desc)} 
              </div>
            ))}
          </Carousel> */}

          {/* <div className="col-xxl-12">
            <div className="banner d-flex justify-content-between align-items-center">
              <div className="banner-detail" style={{ paddingTop: "20px" }}>
                <h3 className="text-white mb-3">
                  Contribute, Invest, Lock and Create your Own Pool
                </h3>
                <p>Join our Launchpad now!</p>
                <a
                  className="btn btn-primary me-3"
                  style={{ borderRadius: "8px" }}
                  href={"/project/pool?chain=" + paramChain}
                >
                  Create Pool
                </a>
                <a className="btn btn-secondary">Create Token</a>
              </div>
            </div>
          </div> */}
          <div className="collections section-padding">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="filter-tab">
                    {/* <div className="search">
                                            <span>
                                                <i className="ri-search-line"></i>
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Search Pools"
                                                value={searchFilter}
                                                onChange={(e) =>setSearchfilter(e.target.value)}
                                            />
                                    </div> */}
                    <div className="filter-nav mb-4 select_filter">
                      <a
                        className={filter == "all" ? "active" : ""}
                        onClick={() => setFilter("all") + onRefresh()}
                      >
                        All
                      </a>
                      <a
                        className={filter == "kyc" ? "active" : ""}
                        onClick={() => setFilter("kyc") + onRefresh()}
                      >
                        KYC
                      </a>
                      <a
                        className={filter == "upcoming" ? "active" : ""}
                        onClick={() => setFilter("upcoming") + onRefresh()}
                      >
                        Upcoming
                      </a>
                      <a
                        className={filter == "inprogress" ? "active" : ""}
                        onClick={() => setFilter("inprogress") + onRefresh()}
                      >
                        Inprogress
                      </a>
                      <a
                        className={filter == "ended" ? "active" : ""}
                        onClick={() => setFilter("ended") + onRefresh()}
                      >
                        Ended
                      </a>
                    </div>
                    <div className="row">
                      {dataAs.map((item, i) => {
                        if (filter == "all") {
                          return (
                            <Overview p={p} x={dataAs[i]} key={i} />

                          );
                        } else if (filter == "kyc") {
                          if (item.safe.kyc) {
                            return (
                              <Overview p={p} x={dataAs[i]} key={i} />
                            );
                          }
                        } else if (filter == "upcoming") {
                          if (item.status == "0") {
                            return (
                              <Overview p={p} x={dataAs[i]} key={i} />
                            );
                          }
                        } else if (filter == "inprogress") {
                          if (item.status == "1") {
                            return (
                              <Overview p={p} x={dataAs[i]} key={i} />
                            );
                          }
                        } else if (filter == "ended") {
                          if (item.status == "2" || item.status == "3") {
                            return (
                              < >
                                <Overview p={p} x={dataAs[i]} key={i} />
                              </>
                            );
                          }
                        }
                      })}
                      {isLoading ? (
                        <div className="row" style={{ height: '100px' }}>
                          <div className="loader">Loading...</div>
                        </div>
                      ) : ""}

                      {!isLoading ? (
                        <div className="d-flex justify-content-center">
                          <div className="c-pointer mt-5 py-2 px-3" onClick={onRefresh} style={{ background: '#1d2c6245', borderRadius: '6px' }}>
                            Load New
                          </div>
                        </div>
                      ) : ""}
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

export default Home;
