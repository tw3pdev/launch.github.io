import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import dynamic from "next/dynamic";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaAlignLeft, FaAlignRight, } from "react-icons/fa";
import { Twep, Eng, VRocket, VAntibot, VPlane, VRank, VCompas, Soon } from "/component/Images";
import { connectAccount, checkLogin } from "../../component/connect";
import { toast } from 'react-toastify';

const ThemeSwitch = dynamic(
  () => import("../elements/leftTheme"),
  {
    ssr: false,
  }
);
import lang from "/component/lang.json"

function Sidebar({ p }) {
  const router = useRouter();
  const paramChain = router.query.chain
  const [launch, setLaunch] = useState(false);
  const [browse, setbrowse] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [twepPrice, setTwepPrice] = useState(0)

  const path = useRouter().pathname;
  const {
    address,
    connected,
    BlurAddress,
    setMobileConnect,
    mobileNetwork,
    setMobileNetwork,
    mobileConnect,
    chain,
    setCollapse,
    userProfile,
    setConnected,
    setChain,
    username,
    sendData,
    balance,
    setWeb3,
    setAddress,
    setBlurAddress,
    theme,
    collapse,
    setBalance,
    handleChain
  } = p;

  function blur(x) {
    const f = x.substring(0, 6) + "..." + x.substring(x.length - 4)
    return f
  }

  async function connect() {
    connectAccount('walletconnect', paramChain, router).then((res) => {
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

  async function init() {
    const prices = await sendData({ req: "prices", chain: paramChain }, true)
    setTwepPrice((prices.price).toFixed(3));
  }
  function trustWallet() {
    window.open(`https://link.trustwallet.com/open_url?coin_id=$714&url=https://welaunch.app`, "_blank");
  }


    function copy() {
    navigator.clipboard.writeText(address)
    toast("Copy Success");


    }
  if (mobile) {
    if (!collapse) {
      document.body.classList.add("s_body")
    } else {
      document.body.classList.remove("s_body")
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader');
      const body = document.getElementById('__next');
  if (loader){
    setTimeout(() => {
      loader.style.display = 'none';
      body.style.display = 'block';
  }, 900);

  }
}
    if (typeof window !== 'undefined' && paramChain) {
      init()
      if (window.innerWidth <= 575) {
        setMobile(true)
      }
    }
  }, [address, connected,paramChain]);

  function handleMobilePopup(x) {
    if(x == 'network') {
      if(mobileNetwork) {
        setMobileNetwork(false)
        setMobileConnect(true)
      }else{
        setMobileConnect(!mobileConnect)
      }
    }else{
      if(mobileConnect) {
        setMobileConnect(false)
        setMobileNetwork(true)
      }else{
        setMobileNetwork(!mobileNetwork)
      }
    }
  }


  return (
    <>
      <div className="sidebar pos-r">
        <>
          <ProSidebar collapsed={mobile ? collapse : !collapse} toggled={mobile ? !collapse : collapse} className="md"  >
            <SidebarHeader style={mobileConnect || mobileNetwork ? { visibility: 'hidden' } : {}}>
              <div className="sidebar-header-pro hidden-mobile">
                <Link href={`/?chain=${paramChain}`}><img src={!collapse ? "/images/logov.svg" : theme == 'light-theme' ? "/images/header-light.svg" : "/images/header.svg"} className="c-pointer" /></Link>
              </div>
              <div className="hidden-d">
                <div className="d-flex  py-4 px-3 justify-content-between gap-3">
                  <div className="btn fsize h-rButton w-100" style={{ alignSelf: 'center' }} onClick={() => setMobileNetwork(!mobileNetwork)}>
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
                          ? "OKT"
                          : "UNKNOWN"}</a>
                  </div>
                  <div className="btn fsize h-rButton w-100" style={{ alignSelf: 'center' }} onClick={() => setMobileConnect(!mobileConnect)}>
                    <a style={{ fontSize: "15px" }}>{connected ? BlurAddress : "Connect"}</a>
                  </div>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent >
              <Menu iconShape="square" className="hidden-mobile">
                <MenuItem icon={collapse ? <FaAlignLeft /> : <FaAlignRight />} className="side1" onClick={() => { setCollapse(!collapse) }}></MenuItem>
              </Menu>
              <div className={path == "/project/presale" || path == "/project/lock" || path == "/project/token" ? "hover_active" : "hover_sub"}></div>
              <Menu iconShape="square">

                <SubMenu title={lang[p.lang].Sidebar[0]} defaultOpen={launch || path == "/project/presale" || path == "/project/lock" || path == "/project/token" ? true : false} icon={<VRocket />} className={launch || path == "/project/presale" || path == "/project/lock" || path == "/project/token" ? "side_active" : ""} onClick={() => setLaunch(!launch)}>

                  <div className={path == "/project/token" ? "subhover_sub" : ""}></div>
                  <Link href={`/project/token?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} active={path == "/project/token"} className="s_xleft">{lang[p.lang].Sidebar[1]}</MenuItem></Link>

                  <div className={path == "/project/presale" ? "subhover_sub" : ""}></div>
                  <Link href={`/project/presale?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} className="s_xleft" active={path == "/project/presale"}>{lang[p.lang].Sidebar[2]}</MenuItem></Link>

                  <div className={path == "/project/lock" ? "subhover_sub" : ""}></div>
                  <Link href={`/project/lock?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} className="s_xleft" active={path == "/project/lock"}>{lang[p.lang].Sidebar[3]}</MenuItem></Link>

                </SubMenu>
              </Menu>
              <div className={path == "/pool/[id]" || path == "/pools" ? "hover_active" : "hover_sub"}
              ></div>
              <Menu iconShape="square">
                <SubMenu title={lang[p.lang].Sidebar[4]} icon={<VCompas />} defaultOpen={browse || path == "/pool/[id]" || path == "/favorite" || path == "/pools" || path == "/locks" ? true : false} className={browse || path == "/pool/[id]" || path == "/pools" ? "side_active" : ""} onClick={() => setbrowse(!browse)}>
                  <MenuItem suffix={<Soon />} className="s_xleft">{lang[p.lang].Sidebar[5]}</MenuItem>

                  <div className={path == "/pools" ? "subhover_sub" : ""}></div>
                  <Link href={`/pools?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} className="s_xleft" active={path == "/pools" || path == "/pool/[id]"}>{lang[p.lang].Sidebar[6]}</MenuItem></Link>

                  <div className={path == "/locks" ? "subhover_sub" : ""}></div>
                  <Link href={`/locks?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} className="s_xleft" active={path == "/locks"}>{lang[p.lang].Sidebar[7]}</MenuItem></Link>
                  
                  <div className={path == "/favorite" ? "subhover_sub" : ""}></div>
                  <Link href={`/favorite?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} className="s_xleft" active={path == "/favorite"}>Favorites</MenuItem></Link>

                </SubMenu>
              </Menu>
              <div className="hover_sub"></div>
              <Menu iconShape="square">

                <Link href={`/leaderboard?chain=${paramChain}`}><MenuItem onClick={() => mobile && setCollapse(!collapse)} icon={<VRank />} active={path == "/leaderboard"}>{lang[p.lang].Sidebar[8]}</MenuItem></Link>
              </Menu>
              <div className="hover_sub"></div>
              <Menu iconShape="square">

                <Link href={`/anti-bot?chain=${paramChain}`}><MenuItem icon={<VAntibot />} active={path == "/anti-bot"}>{lang[p.lang].Sidebar[9]}</MenuItem></Link>
              </Menu>
              <div className="hover_sub"></div>
              <Menu iconShape="square">
              <Link href={`/sender?chain=${paramChain}`}><MenuItem icon={<VPlane />} active={path == "/sender"} >{lang[p.lang].Sidebar[10]}</MenuItem></Link>

                
              </Menu>

            </SidebarContent>

            <SidebarFooter>
              <Menu iconShape="square">

                <MenuItem icon={<Twep />} suffix={`$${twepPrice}`} >TWEP</MenuItem>
                <MenuItem icon={`$${twepPrice}`} className="price_hidden" ></MenuItem>
                <MenuItem icon={<Eng />} suffix={<ThemeSwitch p={p} />} >English</MenuItem>
                <MenuItem icon={<ThemeSwitch p={p} />} className="price_hidden" ></MenuItem>
              </Menu>
            </SidebarFooter>
          </ProSidebar>

          <ProSidebar collapsed={mobile ? collapse : !collapse} toggled={mobile ? !collapse : collapse} className="md bg-tr hidden-d" style={mobileConnect ? {} : { visibility: 'hidden' }}  >
            <SidebarHeader>
              <div className="sidebar-header-pro hidden-mobile">
                <Link href={`/?chain=${paramChain}`}><img src={!collapse ? "/images/logov.svg" : theme == 'light-theme' ? "/images/header-light.svg" : "/images/header.svg"} className="c-pointer" /></Link>
              </div>
              <div className="hidden-d">
                <div className="d-flex  py-4 px-3 justify-content-between gap-3">
                  <div className="btn fsize h-rButton w-100" style={{ alignSelf: 'center' }} onClick={() => handleMobilePopup('connect')}>
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
                          ? "OKT"
                          : "UNKNOWN"}</a>
                  </div>
                  <div className="btn fsize h-rButton w-100" style={{ alignSelf: 'center',border: '1px solid white' }} onClick={() => setMobileConnect(!mobileConnect)}>
                    <a style={{ fontSize: "15px" }}>Connect</a>
                  </div>
                </div>
              </div>
            </SidebarHeader>
            {
              connected ? (
                <SidebarContent  className={mobileConnect ? "tog active" : "tog"}>
                  <div className="hover_sub sub-sub"></div>
                  <Menu iconShape="square">

                    <MenuItem className="bg-bg" icon={<img src={userProfile} style={{borderRadius:'15px'}} />}>{username}
                      <div style={{fontSize:'15px'}}>
                        {(+balance).toFixed(2)} {handleChain('symbol')}
                      </div>
                     <div className="d-flex gap-2">
                     <div className="address-profile">
                        {address}
                      </div>
                      <div onClick={() => copy()}>
                      <i className="ri-file-copy-2-line"></i>
                      </div>
                     </div>
                      </MenuItem>
                  </Menu>
                  <div className="hover_sub"></div>
                  <Menu iconShape="square">
                    <MenuItem icon={<i className="ri-user-3-fill"></i>}>Profile</MenuItem>
                  </Menu>
                  <div className="hover_sub"></div>
                  <Menu iconShape="square">
                    <MenuItem icon={<i className="ri-logout-box-line"></i>}>Disconnect</MenuItem>
                  </Menu>

                </SidebarContent>
              ) : (
                  <>
                  <div className="mobile-text-popup">Connect your Wallet</div>
                <SidebarContent  className={mobileConnect ? "tog active" : "tog"}>
                  <div className="hover_sub hov-hov"></div>
                  <Menu iconShape="square">
                    <MenuItem className="bg-bg" ><div className="d-flex connect-wallet-ea" ><img className="me-3 >" src="/images/wallet/metamask.svg" /><div className="border-popup">Metamask</div></div>
                      <a target="_blank" href="https://metamask.app.link/dapp/development-app.welaunch.app/?chain=" rel="noopener noreferrer">
                      </a></MenuItem>
                  </Menu>
                  <div className="hover_sub hov-hov"></div>
                  <Menu iconShape="square">
                    <MenuItem className="bg-bg" onClick={() => trustWallet()} ><div className="d-flex connect-wallet-ea" ><img className="me-3 " src="/images/wallet/trustwallet.svg" /><div className="border-popup">Trust Wallet</div></div></MenuItem>
                  </Menu>
                  <div className="hover_sub hov-hov"></div>
                  <Menu iconShape="square">
                    <MenuItem className="bg-bg" onClick={() => connect()} >
                    <div className="d-flex connect-wallet-ea" ><img className="me-3 mt-1 image-popup-center"  src="/images/wallet/walletconnect.png" /><div className="border-popup">Wallet Connect</div></div>
                      </MenuItem>
                  </Menu>

                </SidebarContent>
                </>
              )
            }
          <SidebarFooter>
              <Menu iconShape="square">
            <div className="close-button-mobile mb-5" onClick={() => setMobileConnect(false)&&  setMobileNetwork(false)}>Close</div>
              </Menu>
            </SidebarFooter>

          </ProSidebar>

          <ProSidebar collapsed={mobile ? collapse : !collapse} toggled={mobile ? !collapse : collapse} className="md bg-tr network-bg hidden-d" style={mobileNetwork ? {} : { visibility: 'hidden' }}  >
            <SidebarHeader>
              <div className="sidebar-header-pro hidden-mobile">
                <Link href={`/?chain=${paramChain}`}><img src={!collapse ? "/images/logov.svg" : theme == 'light-theme' ? "/images/header-light.svg" : "/images/header.svg"} className="c-pointer" /></Link>
              </div>
              <div className="hidden-d">
                <div className="d-flex  py-4 px-3 justify-content-between gap-3">
                  <div className="btn fsize h-rButton w-100" style={{ alignSelf: 'center',border: '1px solid white' }} onClick={() => setMobileNetwork(!mobileNetwork)}>
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
                          ? "OKT"
                          : "UNKNOWN"}</a>
                  </div>
                  <div className="btn fsize h-rButton w-100"  onClick={() =>  handleMobilePopup('network')}>
                    <a style={{ fontSize: "15px" }}>Connect</a>
                  </div>
                </div>
              </div>
            </SidebarHeader>

                  <>
                  <div className="mobile-text-popup">Select Network</div>
                <SidebarContent  className={mobileNetwork ? "tog active" : "tog"}>
                  <div className={paramChain == "BSC-tsnt" || paramChain == "BSC" ? `hover_sub hov-chain bsc` : `hover_sub hov-chain`}></div>
                  <Menu iconShape="square">
                    <MenuItem className="bg-bg" ><div className="d-flex select-network-ea" onClick={() => toast("Please change network on your app")}>
                      <img  src="/images/chain/smartChain.svg" /><div className={paramChain == "BSC-tsnt" || paramChain == "BSC" ? `text bsc` : `text`}>Binance Smart Chain</div></div>
                      </MenuItem>
                  </Menu>
                  <div className={ paramChain == "ETH" ? `hover_sub hov-chain eth` : `hover_sub hov-chain`}></div>
                  <Menu iconShape="square">
                    <MenuItem className="bg-bg" ><div className="d-flex select-network-ea" onClick={() => toast("Please change network on your app")}>
                      <img  src="/images/chain/eth.svg" /><div className={ paramChain == "ETH" ? `text eth` : `text`}>Ethereum Mainnet</div></div>
                      </MenuItem>
                  </Menu>
                  <div className={ paramChain == "OKC" ? `hover_sub hov-chain okt` : `hover_sub hov-chain`}></div>
                  <Menu iconShape="square">
                    <MenuItem className="bg-bg" ><div className="d-flex select-network-ea" onClick={() => toast("Please change network on your app")}>
                      <img  src="/images/chain/oec.png" /><div className={ paramChain == "OKC" ? `text oec` : `text`}>OKC</div></div>
                      </MenuItem>
                  </Menu>

                </SidebarContent>
                </>

          <SidebarFooter>
              <Menu iconShape="square">
            <div className="close-button-mobile mb-5" onClick={() => setMobileNetwork(false)}>Close</div>
              </Menu>
            </SidebarFooter>

          </ProSidebar>
        </>

      </div>

    </>
  );
}



export default Sidebar;
