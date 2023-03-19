import Link from "next/link";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { connectAccount, checkLogin, changeChain } from "../../component/connect";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(
  () => import("../../components/elements/ThemeSwitch"),
  {
    ssr: false,
  }
);

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import makeBlockie from "ethereum-blockies-base64";
import { Menu, Close } from "/component/Images"
import { FaRocket, FaGlobe, FaAlignLeft, FaAlignRight, FaListAlt, FaShieldVirus, FaPaperPlane } from "react-icons/fa";
import { detailsAbi } from "/components/web3/detailsAbi";
import { presaleView } from "/components/web3/presaleView";
import Web3 from "web3";
import cookieCutter from 'cookie-cutter'
import { aggr } from "/components/web3/abi";
import { pinksaleAbi1, pinksaleAbi2, pinksaleAbi3 } from "/components/web3/pinksaleAbi";

function Header({ p }) {
  const {
    connected,
    address,
    BlurAddress,
    balance,
    setConnected,
    setChain,
    setBlurAddress,
    setBalance,
    setAddress,
    mobileNetwork,
    mobileConnect,
    setUserStatus,
    userStatus,
    collapse,
    setCollapse,
    setWeb3,
    handleChain,
    trendingData,
    sendData,
    pContract,
    rpcURL,
    chain,
    favorited,
    setUserProfile,
    userProfile,
    setFavorited,
    setUsername
  } = p;
  const [showModal, setShowModal] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [isClosedSaved, setClosedSaved] = useState(false);
  const [connectHover, setConnectHover] = useState(false)
  const [networkHover, setNetworkHover] = useState(false)
  const [createHover, setCreateHover] = useState(false)
  const router = useRouter();
  const paramChain = router.query.chain;

  async function init() {

    if (localStorage.getItem("savedPresale")) {
      setClosedSaved(true);
    }
    if (connected && address) {
      ethereum.on("accountsChanged", () => {
        onConnect('metamask')
      })
      try {
        const web3 = new Web3(rpcURL);
        const savedData = await sendData({ req: "getsave", address: address }, false)
        if (!pContract) return
        const pAddr = savedData.presale;
        const xArray = []
        const xxxxx = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
        const PresaleData = new web3.eth.Contract(detailsAbi, pContract[chain]["chPresale"]);
        for (let i = 0; i < pAddr.length; i++) {
          if (paramChain == pAddr[i][3]) {
            if (pAddr[i][1] != 0) {
              if (pAddr[i][2] == 'Pinksale') {
                let PresaleData = new web3.eth.Contract(pinksaleAbi1, pAddr[i][0]);
                const version = await PresaleData.methods.version().call();
                if (version >= 27) {
                  if (version == 81) {
                    PresaleData = new web3.eth.Contract(pinksaleAbi3, pAddr[i][0]);
                  } else {
                    PresaleData = new web3.eth.Contract(pinksaleAbi2, pAddr[i][0]);
                  }
                }
                const [f, uintParam] = await Promise.all([
                  await PresaleData.methods.poolStates().call(),
                  await PresaleData.methods.poolSettings().call()
                ]);
                const social = JSON.parse(f.poolDetails)

                xArray.push({ logo: social.a, status: 1, contract: pAddr[i][0], external: pAddr[i][2] })
              }else if (pAddr[i][2] == 'DX') {
                let aggrContract = new web3.eth.Contract(aggr, pContract[chain]['aggr']);
                const poolDetails = await aggrContract.methods.getDxSale(pAddr[i][0]).call()
                const social = poolDetails.social
                xArray.push({ logo: (social.BannerandLogo).split("@@@@")[0], status: 1, contract: pAddr[i][0], external: pAddr[i][2] })
              } else {
                const [f, x] = await Promise.all([
                  await PresaleData.methods.SP(pAddr[i][0]).call(),
                  await xxxxx.methods.getPresaleFactory(pAddr[i][0]).call()
                ]);
                const r = x[1] // Status
                xArray.push({ logo: f[6], status: r, contract: pAddr[i][0], external: pAddr[i][2] })
              }
            }
          }
        }
        setFavorited(xArray);
        if (xArray.length) {
          localStorage.setItem('savedPresale', true);
          setClosedSaved(true)
        }
      } catch (e) {

      }
    }
    if (paramChain) {
      // const options = {
      //   method: 'GET',
      //   url: 'https://welaunch.app/trending?chain='+paramChain
      // };
      // axios.request(options).then(function (response) {
      //   setTrending(response.data.trending);
      // })

      //   setInterval(() =>
      //   {
      //     const options = {
      //       method: 'GET',
      //       url: 'https://welaunch.app/trending?chain='+paramChain
      //     };
      //     axios.request(options).then(function (response) {
      //       setTrending(response.data.trending);
      //     })
      //   }
      //   , 30000)
      // }
    }
  }
  useEffect(() => {

    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 575) {
        setMobile(true)
      }
    }

    init()
    checkLogin().then((r) => {
      if (r.status) {
        setConnected(true)
        connectAccount(r.provider, paramChain, router).then((res) => {
          if (res.status) {
            const result = res.data
            setConnected(true)
            setAddress(result.address)
            setBlurAddress(blur(result.address))
            setWeb3(result.web3)
            setBalance(result.balance)
            makeImage();
          }
        })
      }

    })
  }, [connected, address, paramChain]);
  async function disconnect() {
    cookieCutter.set('welaunchSignMessage', "")
    setConnected(false);
  }
  async function makeImage() {
    if (connected && address) {
      try {
        const image = makeBlockie(address);
        const userData = await sendData({ req: "getUser", address: address, chain: paramChain }, false)
        if (!userData.status) {
          setUserProfile(image)
        } else {
          if (userData.user) {
            if (userData.user.pic != "") {
              setUserProfile(`https://welaunch.app/api/user_image/${userData.user.pic}`)
            } else {
              setUserProfile(image)
            }
            if (userData.user.isPremium) {
              setUserStatus("Premium")
            }
            setUsername(userData.user.username)
          } else {
            setUserProfile(image)
          }
        }
      } catch (e) { }
    }
  }
  function blur(x) {
    const f = x.substring(0, 6) + "..." + x.substring(x.length - 4)
    return f
  }

  function onConnect(x) {
    setShowModal(false)
    connectAccount(x, paramChain, router).then((res) => {
      if (res.status) {
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
  async function changeChains(x) {
    if (connected) {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          if (x == "0x38") {
            changeChain('metamask', 'BSC', router).then((res) => {
              if (res.status) {
                const result = res.data
                setConnected(true)
                setAddress(result.address)
                setChain(result.chainId)
                setBlurAddress(blur(result.address))
                setWeb3(result.web3)
                setBalance(result.balance)
              }
            })
            router.push({ path: router.pathname, query: { chain: "BSC" } });

          } else if (x == "0x1") {
            changeChain('metamask', 'ETH', router).then((res) => {
              if (res.status) {
                const result = res.data
                setConnected(true)
                setAddress(result.address)
                setChain(result.chainId)
                setBlurAddress(blur(result.address))
                setWeb3(result.web3)
                setBalance(result.balance)
              }
            })
            router.push({ path: router.pathname, query: { chain: "ETH" } });

          } else if (x == "0x42") {
            changeChain('metamask', 'OKC', router).then((res) => {
              if (res.status) {
                const result = res.data
                setConnected(true)
                setAddress(result.address)
                setChain(result.chainId)
                setBlurAddress(blur(result.address))
                setWeb3(result.web3)
                setBalance(result.balance)
              }
            })
            router.push({ path: router.pathname, query: { chain: "OKC" } });

          }
        } else {
          alert("Please Reconnect and change on your Wallet Manually");
        }
      } catch (err) { }
    } else {
      if (x == "0x38") {
        router.push({
          path: router.pathname,
          query: { chain: "BSC" },
        });
      } else if (x == "0x1") {
        router.push({
          path: router.pathname,
          query: { chain: "ETH" },
        });
      } else if (x == "0x42") {
        router.push({
          path: router.pathname,
          query: { chain: "OKC" },
        });
      }
    }
  }

  function closePresale() {
    localStorage.setItem('savedPresale', true);
    setClosedSaved(true)
  }

  function handleLink(x, y) {
    if(x == 'Pinksale') {
      return `/pool/pinksale/${y}?chain=${paramChain}`
    }else if(x == 'DX') {
      return `/pool/dx/${y}?chain=${paramChain}`
    }else  {
      return `/pool/${y}?chain=${paramChain}`
    }
  }
  return (
    <>
      {mobileConnect || mobileNetwork ? (
        <>
          <ThemeSwitch style={{ visibility: "hidden" }} />
        </>
      ) : (
        <div className={collapse ? "header header_open" : "header"}>
          {!collapse && (
            <>
              <div className="container header-trend hidden-d">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="navigation">
                      <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="trendingRow">
                          <ul className="navbar-nav me-auto trend-trending">
                            {trendingData.map((data, i) => {
                              if (i <= 12) {
                                return (
                                  <li style={{ borderBottom: "unset" }} key={i}>
                                    <Link href={`/pool/pinksale/${data.address}/?chain=${paramChain}`} >

                                      <a className="nav-link trend-text">
                                        <span className="hash_">#{i + 1}</span> {data.symbol}
                                      </a>
                                    </Link>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>

              <div className="head-d  mt-2 mb-2">
                <div className="container  d-flex mt-2 mb-2">
                  {favorited.map((item, i) => {
                    let image = item.logo
                    if (i == 0) {
                      return (
                        <a href={`/pool/${item.contract}?chain=${paramChain}`} key={i}><div className={`token imgs saved c-pointer c-save`} style={{ marginLeft: 'unset' }}><div className="inside_saved">
                          <img src={image} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/images/profile/unknown.png";
                          }} style={{ width: '100%' }} /></div></div>
                        </a>
                      )
                    } else {
                      return (
                        <a href={`/pool/${item.contract}?chain=${paramChain}`} key={i}><div className={`token imgs saved c-pointer c-save`}><div className="inside_saved">
                          <img src={item.logo} onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = "/images/profile/unknown.png";
                          }}
                            style={{ width: '100%' }} /></div></div>
                        </a>
                      )
                    }
                  })}
                  {userStatus == 'basic' && (
                    favorited.length < 3 && (
                      <>
                        <Link href={`/pools?chain=${paramChain}`}>
                          <div className={`token imgs saved c-save c-pointer`}><div className="inside_saved" style={{ background: 'none' }}>
                            <img src='/images/Fa/plus.svg'
                              style={{ width: '100%', height: '20px', margin: 'auto 0' }} /></div></div>
                        </Link>
                      </>
                    )
                  )}
                  {userStatus == 'Premium' && (
                    favorited.length < 5 && (
                      <>
                        <Link href={`/pools?chain=${paramChain}`}>
                          <div className={`token imgs saved c-save c-pointer`}><div className="inside_saved" style={{ background: 'none' }}>
                            <img src='/images/Fa/plus.svg'
                              style={{ width: '100%', height: '20px', margin: 'auto 0' }} /></div></div>
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </>
          )}
          <div className="container">
            <div className="row">
              <div className="col-xxl-12">
                <div className="header-content">
                  <div className="header-left hidden-d" style={!collapse ? { visibility: 'hidden' } : {}}>
                    <Link
                      href={`/?chain=${paramChain}`}
                    >
                      <img src={collapse ? "/images/header.svg" : "/images/logov.svg"} />

                    </Link>

                  </div>
                  {!collapse && (
                     <Link
                     href={`/?chain=${paramChain}`}
                   >
                    <div className="header-left hidden-d">
                      <img src="/images/logov.svg" style={{ width: '55px', marginTop: '5px' }} />
                    </div>
                    </Link>
                  )}
                  <div className="hidden-d">
                    {collapse ? (
                      <span className="hidden-d" onClick={() => setCollapse(!collapse)}>
                        <Menu />
                      </span>
                    ) : (
                      <span className="hidden-d" onClick={() => setCollapse(!collapse)}>
                        <Close />
                      </span>)}
                  </div>
                  <div className="header-left hidden-mobile">

                    <div className="hidden-d">
                      {collapse ? (
                        <span style={{ marginRight: '20px' }} className="hidden-d" onClick={() => setCollapse(!collapse)}>
                          <FaAlignLeft />
                        </span>
                      ) : (
                        <span style={{ marginRight: '20px' }} className="hidden-d" onClick={() => setCollapse(!collapse)}>

                          <FaAlignRight />
                        </span>)}
                    </div>

                    <a href="https://theweb3project.com" target="_blank">
                    <div className="circle_token" style={isClosedSaved ? { marginRight: '15px' } : {}}>
                      <div className="inside_circle">
                        <img src="/images/items/TWEP.svg" className="img_token" />
                      </div>
                    </div>
                    </a>

                    {!isClosedSaved && (
                      <>
                        <div className="circle_saved" style={{ marginRight: '15px' }}>
                          <div className="inside_saved">
                            <img src="/images/items/star.svg" className="img_token" />
                          </div>
                        </div>
                        <div className="dialouge">
                          See your favorite projects here!
                          <span style={{ marginLeft: '35px' }} className="saved_presale" onClick={() => closePresale()} >x</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="d-flex header-center">
                    {favorited.map((item, i) => {
                      let image = item.logo
                      if (i == 0) {
                        return (
                          <a href={handleLink(item.external, item.contract)} key={i}><div className={`token imgs saved c-pointer c-save`} style={{ marginLeft: 'unset' }}><div className="inside_saved">
                            <img src={image} onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "/images/profile/unknown.png";
                            }} style={{ width: '100%' }} /></div></div>
                          </a>
                        )
                      } else {
                        return (
                          <a href={handleLink(item.external, item.contract)} key={i}><div className={`token imgs saved c-pointer c-save`}><div className="inside_saved">
                            <img src={item.logo} onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "/images/profile/unknown.png";
                            }}
                              style={{ width: '100%' }} /></div></div>
                          </a>
                        )
                      }
                    })}
                    {isClosedSaved && userStatus == 'basic' && (
                      favorited.length < 3 && (
                        <>
                          <Link href={`/pools?chain=${paramChain}`}>
                            <div className={`token imgs saved c-save c-pointer`}><div className="inside_saved" style={{ background: 'none' }}>
                              <img src='/images/Fa/plus.svg'
                                style={{ width: '100%', height: '20px', margin: 'auto 0' }} /></div></div>
                          </Link>
                        </>
                      )
                    )}
                    {isClosedSaved && userStatus == 'Premium' && (
                      favorited.length < 5 && (
                        <>
                          <Link href={`/pools?chain=${paramChain}`}>
                            <div className={`token imgs saved c-save c-pointer`}><div className="inside_saved" style={{ background: 'none' }}>
                              <img src='/images/Fa/plus.svg'
                                style={{ width: '100%', height: '20px', margin: 'auto 0' }} /></div></div>
                          </Link>
                        </>
                      )
                    )}
                  </div>

                  <div className="header-right">
                    <div className="signin-btn d-flex align-items-center">
                      <UncontrolledDropdown className="dropdown profile_log"
                        isOpen={createHover}
                        onMouseEnter={() => setCreateHover(true)}
                        onMouseLeave={() => setCreateHover(false)}
                      >
                        <DropdownToggle tag="div" data-toggle="dropdown">
                          <div
                            className="btn h-r1Button fsize hidden-mobile d-flex gap-2"
                            style={{ marginRight: "15px" }}
                          >
                            <img src="/images/top/plus-circle.svg" style={{ width: "20px" }} />
                            <a style={{ fontSize: "15px", color: 'black' }}>
                              Create
                            </a>
                          </div>
                        </DropdownToggle >
                        {createHover && (
                          <div className="saver"></div>
                        )}
                        <DropdownMenu className="dropdown-menu"
                          onMouseEnter={() => setCreateHover(true)}>
                          <Link href={`/project/token?chain=${paramChain}`}>
                            <a className="dropdown-item border-top-none">
                              <span>
                              </span>
                              Create Token
                            </a>
                          </Link>
                          <Link href={`/project/presale?chain=${paramChain}#wallet`}>
                            <a className="dropdown-item">
                              <span>
                              </span>
                              Create Presale
                            </a>
                          </Link>
                          <Link href={`/project/lock?chain=${paramChain}#wallet`}>
                            <a className="dropdown-item">
                              <span>
                              </span>
                              Create Locks
                            </a>
                          </Link>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown className="dropdown profile_log"
                        isOpen={networkHover}
                        onMouseEnter={() => setNetworkHover(true)}
                        onMouseLeave={() => setNetworkHover(false)}
                      >
                        {networkHover && (
                          <div className="saver"></div>
                        )}
                        <DropdownToggle tag="div" data-toggle="dropdown">
                          <div
                            className="btn fsize d-flex hidden-mobile h-rButton"
                          >
                            <img
                              src={handleChain('img')}
                              alt="chain"
                              style={{
                                width: "25px",
                                marginRight: "10px",
                                filter: "none",
                              }}
                            />
                            <a style={{ fontSize: "15px" }}>{paramChain == "BSC" ? "BSC" : paramChain == "BSC-tsnt"
                              ? "BSC"
                              : paramChain == "ETH"
                                ? "ETH"
                                : paramChain == "OKC"
                                  ? "OKC"
                                  : "UNKNOWN"}</a>
                          </div>
                        </DropdownToggle >
                        <DropdownMenu className="dropdown-menu"
                          onMouseEnter={() => setNetworkHover(true)}>
                          <a className="dropdown-item" onClick={() => changeChains("0x38")}>
                            <span className="me-2" >
                              <img src="/images/chain/smartChain.svg" style={{ width: "20px" }} />
                            </span>
                            <span style={paramChain == "BSC" || paramChain == "BSC-tsnt" ? { color: '#F0B90B' } : {}}>
                              Binance Smart Chain
                            </span>
                          </a>
                          <a className="dropdown-item" onClick={() => changeChains("0x1")}>
                            <span className="me-2" >
                              <img src="/images/chain/eth.svg" style={{ width: "20px" }} />
                            </span>
                            <span style={paramChain == "ETH" ? { color: '#627EEA' } : {}}>
                              Ethereum Mainnet
                            </span>
                          </a>
                          <a className="dropdown-item" onClick={() => changeChains("0x42")}>
                            <span className="me-2" >
                              <img src="/images/chain/oec.png" style={{ width: "20px" }} />
                            </span>
                            <span style={paramChain == "OKC" ? { color: '#0053D7' } : {}}>
                            OKC
                            </span>
                          </a>
                        </DropdownMenu>
                      </UncontrolledDropdown>

                      {connected ? (
                        <UncontrolledDropdown
                          tag="div"
                          className="dropdown profile_log"
                        >
                          <DropdownToggle tag="div" data-toggle="dropdown">
                            <div className="user icon-menu active">
                              <span>
                                {address ? (
                                  <img src={userProfile ? userProfile : "/images/profile/avatar.png"} onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "/images/profile/avatar.png";
                                  }}
                                    alt="Profile" />
                                ) : (
                                  <img
                                    src="/images/wallet/unknown.png"
                                    alt="Profile"
                                  />
                                )}
                              </span>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu">
                            <div className="user-email">
                              <div className="user">
                                <div className="user-info">
                                  <h5>{BlurAddress}</h5>
                                  <span>
                                    {(+balance).toFixed(2)}{" "}
                                    {handleChain('symbol')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Link href={`/profile?chain=${paramChain}`}>
                              <a className="dropdown-item">
                                Profile
                              </a>
                            </Link>
                            <Link href={`/profile?chain=${paramChain}#wallet`}>
                              <a className="dropdown-item">
                                Wallet
                              </a>
                            </Link>
                            <a
                              className="dropdown-item logout"
                              onClick={() => disconnect()}
                            >
                              Disconnect
                            </a>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      ) : (
                        <UncontrolledDropdown className="dropdown profile_log"
                          isOpen={connectHover}
                          onMouseEnter={() => setConnectHover(true)}
                          onMouseLeave={() => setConnectHover(false)}
                        >

                          <DropdownToggle tag="div" data-toggle="dropdown">

                            <div
                              className="btn fsize d-flex hidden-mobile h-rButton"
                            >
                              Connect
                            </div>
                          </DropdownToggle >
                          {connectHover && (
                            <div className="saver"></div>
                          )}
                          <DropdownMenu className="dropdown-menu" onMouseEnter={() => setConnectHover(true)}>
                            <a className="dropdown-item" onClick={() => onConnect('metamask')}>
                              <span className="me-2" >
                                <img src="/images/wallet/metamask.svg" style={{ width: "20px" }} />
                              </span>
                              <span >
                                Metamask
                              </span>
                            </a>
                            <a className="dropdown-item" onClick={() => onConnect('walletconnect')}>
                              <span className="me-2" >
                                <img src="/images/wallet/walletconnect.png" style={{ width: "20px" }} />
                              </span>
                              <span >
                                Wallet Connect
                              </span>
                            </a>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      )}
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={!mobile ? !collapse ? "header-trending" : "header-trending_open" : collapse ? "header-trending" : "header-trending_open"} style={{ top: "unset" }}>
              <div
                className="container header-trend"
              >
                <div className="row">
                  <div className="col-xl-12">
                    <div className="navigation">
                      <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="trendingRow">
                          <ul className="navbar-nav me-auto trend-trending">
                            <li style={{ borderBottom: "unset" }}>
                              <a className="nav-link trend-text">
                                <img src="/images/Fa/arrow.svg" style={{ marginRight: '5px' }} /> TRENDING
                              </a>
                            </li>
                            {trendingData.map((data, i) => {
                              if (i <= 12) {
                                return (
                                  <li style={{ borderBottom: "unset" }} key={i}>
                                    <Link href={`/pool/pinksale/${data.address}/?chain=BSC`} >

                                      <a className="nav-link trend-text">
                                        <span className="hash_">#{i + 1}</span> {data.symbol}
                                      </a>
                                    </Link>
                                  </li>
                                );
                              }
                            })}
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                          <p className="titlem">Connect your wallet</p>
                          <button
                            className="ant-btn ant-btn-icon-only ant-btn-background-ghost btn-close"
                            onClick={(e) => setShowModal(false)}
                          >
                            <span className="anticon anticon-close">X</span>
                          </button>
                        </div>
                        <div className="container-modal">
                          <button
                            className="ant-btn metamask row-between"
                            onClick={() => onConnect('metamask')}
                          >
                            <img src={"/images/wallet/metamask.svg"} />
                            <div>
                              <h4
                                className="Montserrat-bold"
                                style={{ margin: "unset" }}
                              >
                                MetaMask{" "}
                              </h4>
                              <p>Injected Wallet or dApp</p>
                            </div>
                          </button>
                          <button
                            className="ant-btn metamask row-between"
                            onClick={() => onConnect('walletconnect')}
                          >
                            <img src={"/images/wallet/walletconnect.webp"} />
                            <div>
                              <h4
                                className="Montserrat-bold"
                                style={{ margin: "unset" }}
                              >
                                WalletConnect{" "}
                              </h4>
                              <p>Connect Ledger, etc using scan</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Header;
