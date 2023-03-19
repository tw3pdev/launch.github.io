import LayoutAdmin from "../components/layout/LayoutAdmin";
import ProfileMenu from "../components/layout/ProfileMenu";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { useRouter } from "next/router";
import { detailsAbi } from "/components/web3/detailsAbi";
import { presaleView } from "/components/web3/presaleView";
import "react-loading-skeleton/dist/skeleton.css";

function Profile({ p }) {
    const { address, userProfile, handleChain, balance, sendData, username, setUsername, setUserProfile, BlurAddress, chain, connected, blockURL, isSigned, rpcURL, pContract, uploadImage } = p
    const [wallet, setWallet] = useState([]);
    const [totalofPool, setTotalofPool] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    
    const [testnetPrice, setTestnetPrice] = useState(0);
    const [BNBPrice, setBNBPrice] = useState(0);
    const [ETHPrice, setETHPrice] = useState(0);
    const [OECPrice, setOECPrice] = useState(0);

    const [Contributed, setContributed] = useState([]);
    const [ETHContributed, setETHContributed] = useState(0);
    const [BUSD, setBUSD] = useState(0);
    const [presaleCreated, setPresaleCreated] = useState(0);

    const [totalBalance, setTotalBalance] = useState(0)
    const router = useRouter();
    const paramChain = router.query.chain

    async function init() {

        if (connected && address) {
        if (await isSigned()) { 
            if (address && userProfile) {
                if (userProfile.split(":image")[0] != "data") {
                }

            }
        } else {
            router.back()
        }
    }
        try {
            if (connected && address) {
                const ch = chain == "0x61" || chain == "0x38"
                ? "bsc"
                : chain == "0x1"
                    ? "eth"
                    : chain == "0x42"
                        ? "oec"
                        : ""
                const options = {
                    method: "GET",
                    url: `https://api.debank.com/token/balance_list?user_addr=${address}&is_all=false&chain=${ch}`,
                };
                axios
                    .request(options)
                    .then(function (response) {
                        try {
                            const resData = response.data.data
                            let x = []
                            let total = 0
                            for (let i = 0; i < resData.length; i++) {
                                const amount = resData[i].amount
                                const contract = resData[i].id
                                const name = resData[i].name
                                const symbol = resData[i].symbol
                                const value = amount * resData[i].price
                                const img = resData[i].logo_url
                                const price = resData[i].price
                                if (contract != "bsc" || contract != "eth" || contract != "oec") {
                                    if(value >= 0.1) {
                                        x.push({ name, value, amount, contract, symbol, price });
                                        total += value
                                    }
                                }
                            }
                            x.sort((a, b) => (b.value > a.value) ? 1 : -1)
                            setTotalBalance(total.toLocaleString())
                            setWallet(x)
                        } catch (e) { }
                    })
            }

            if (connected && address && chain) {
                const web3 = new Web3(rpcURL);
                const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
                const contributed = await presaleViewContract.methods.getPresaleOwnerByAddress(true).call({from:address})
                const PresaleData = new web3.eth.Contract(detailsAbi, pContract[chain]["chPresale"]);
                setTotalofPool(contributed.length)
                let datas = []
                let pCreated = 0
                let ethCon = 0
                let busd = 0
                
                try {
                    for (let i = 0; i < contributed.length; i++) {
                        let val = []
                        const addr = contributed[i].addresses[0]
                        const stringData = await PresaleData.methods.SP(addr).call()
                        const name = contributed[i].tokenName
                        const Startdates = (Number(contributed[i].uuint[5]) - 300) * 1000
                        const Endtdates = Number(contributed[i].uuint[5]) * 1000
                        const logo = stringData[6]
                        const total =  Number(contributed[i].uuint[3])
                        const hc =  Number(contributed[i].uuint[1])
                        const filled =  Number(contributed[i].uuint[0])
                        const status =  Number(contributed[i].uuint[4])
                        const response = await axios.request({
                            method: 'GET',
                            url: `https://api.binance.us/api/v3/klines?symbol=BNBUSDT&startTime=${Startdates}&interval=1m&endTime=${Endtdates}`
                        })
                        busd += response.data[0][1] * total / 1e18
                        val.push(addr, total, hc, filled, status, name, logo)
                        ethCon += total / 1e18
                        datas.push(val)
                    } 
                    setIsLoading(false)
                    setContributed(datas)
                    setPresaleCreated(pCreated)
                    setETHContributed(ethCon.toLocaleString())
                    setBUSD(busd.toLocaleString())
                } catch (e) {}

            }
            setTestnetPrice(await getBalance("https://data-seed-prebsc-1-s2.binance.org:8545"))
            setBNBPrice(await getBalance("https://bsc-dataseed1.ninicoin.io/"))
            setETHPrice(await getBalance("https://mainnet.infura.io/v3/3a07ff3925b24892b6b34817eaff64cd"))
            setOECPrice(await getBalance("https://exchainrpc.okex.org"))
        } catch (e) {
            setIsLoading(false)
        }

    }

    async function getBalance(x) {
        const web3 = new Web3(x);
        const bal = await web3.eth.getBalance(address) / 1e18
        return (bal.toLocaleString())
        
    }
    useEffect(() => {
        init()
    }, [address, connected, username])

    return (
        <>
            <LayoutAdmin
                headTitle="Profile"
                pageTitle=""
                pageTitleSub={""}
                pageclassName={"front"}
                parent={"Home"}
                child={"Profile"}
                p={p}
            >

                <div className="profile-page">
                    <div className="container-1">
                       {connected && (
                         <div className="row">
                         <div className="col-12">
                             <ProfileMenu p={p} uUname={username}/>
                         </div>
                         </div>
                       )}
                            {!isLoading ? (
                        connected ? (
                            <div className="row" style={{ placeContent: 'space-between' }}>
                                <div className="col-xl-4 col-xxl-4 col-12">
                                    <div className="stat-widget wid">
                                        <div className="widget-content">
                                            <span>{Contributed.length ? Contributed.length : "0"}</span>
                                            <p>Presale Contributed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-sm-6">
                                <div className="stat-widget wid">
                                        <div className="widget-content">
                                            <span>{Contributed.length ? ETHContributed : "0"} </span>
                                            <p>{handleChain('symbol')} Contributed</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-sm-6">
                                <div className="stat-widget wid">
                                        <div className="widget-content">
                                            <span>{BUSD}</span>
                                            <p>USD Contributed</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xxl-8 col-xl-8 col-lg-12">
                                    <div className="card-header px-0 pt-0 pb-0 text-uppercase">
                                        <h4 className="card-title">Latest Contributions</h4>

                                    </div>
                                    <div className=" top-creators-content">
                                        {Contributed.map((item, i) => {
                                            if (Contributed.length >= 3) {
                                                if ( i < 3) {
                                                    return (
                                                        <Link href={"pool/" + item[0] + "?chain=" + paramChain} key={i}>
                                                        <div className="row justify-content-between creator-widget active px-4 align-items-center" style={{ cursor: 'pointer'}}>
                                                            <div className="d-flex align-items-center col-12 col-xl-6">
                                                                <div className="token-img me-2"><span><img src={item[6]} onError={({ currentTarget }) => {currentTarget.onerror = null;currentTarget.src = "/images/profile/unknown.png";}}/></span></div>
                                                                <div className="latest-contribution d-flex flex-column">
                                                                    <span className="mb-0 text-grey bold">{item[5]}</span>
                                                                    {item[4] == 0 && (<span className="text-white">Upcoming</span>)}
                                                                    {item[4] == 1 && (<span className="text-white">Inprogress</span>)}
                                                                    {item[4] == 1 && (<span className="text-white">Ended</span>)}
                                                                    {item[4] == 1 && (<span className="text-white">Success</span>)}
                                                                    {item[4] == 4 && (<span className="text-white">Canceled</span>)}
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xl-6 d-flex align-items-center content-item-favorites justify-content-between text-center">
                                                            <div className="border-between"></div>
                                                            <span className="bold">{(item[3] / 1e18).toLocaleString()} / {(item[2] / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                            <div className="border-between"></div>
                                                           <span className="bold">{(item[1] / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                           <div className="border-between vis-n"></div>

                                                            </div>
                                                        </div>
                                                    </Link>
                                                    )
                                                }

                                            } else {
                                                return (
                                                    <Link href={"pool/" + item[0] + "?chain=" + paramChain} key={i}>
                                                        <div className="row justify-content-between creator-widget active px-4 align-items-center" style={{ cursor: 'pointer'}}>
                                                            <div className="d-flex align-items-center col-12 col-xl-6">
                                                                <div className="token-img me-2"><span><img src={item[6]} onError={({ currentTarget }) => {currentTarget.onerror = null;currentTarget.src = "/images/profile/unknown.png";}}/></span></div>
                                                                <div className="latest-contribution d-flex flex-column">
                                                                    <span className="mb-0 text-grey bold">{item[5]}</span>
                                                                    {item[4] == 0 && (<span className="text-white">Upcoming</span>)}
                                                                    {item[4] == 1 && (<span className="text-white">Inprogress</span>)}
                                                                    {item[4] == 2 && (<span className="text-white">Ended</span>)}
                                                                    {item[4] == 3 && (<span className="text-white">Success</span>)}
                                                                    {item[4] == 4 && (<span className="text-white">Canceled</span>)}
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-xl-6 d-flex align-items-center content-item-favorites justify-content-between text-center">
                                                            <div className="border-between"></div>
                                                            <span className="bold">{(item[3] / 1e18).toLocaleString()} / {(item[2] / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                            <div className="border-between"></div>
                                                           <span className="bold">{(item[1] / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                           <div className="border-between vis-n"></div>

                                                            </div>
                                                        </div>
                                                    </Link>
                                                )
                                            }
                                        })
                                        }
                                        {Contributed.length > 3 && (
                                            <Link href={"/my-contribution/?chain=" + paramChain} >
                                            <div className="card c-pointer">
                                                <div className="card-body py-2 text-uppercase bold text-center">
                                                    See more
                                                </div>
                                            </div>
                                            </Link>
                                        )}
                                        {!Contributed.length && (
                                            <div className="card c-pointer">
                                                <div className="card-body py-2 text-uppercase bold text-center">
                                                    No Contribution
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div >
                                <div className="col-xxl-4 col-xl-4 col-lg-12">
                                <div className="card-header px-0 pt-0 pb-0 text-uppercase">
                                        <h4 className="card-title">Latest Contributions</h4>

                                    </div>

                                    {paramChain == 'BSC-tsnt' && (
                                        <div className="card py-2 mb-0">
                                        <div className="card-body">
                                                <div className="d-flex flex-column ">
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <img src="/images/chain/bnb.png" style={{width:'20px'}} />
                                                        <span className="text-white">{testnetPrice} TBNB</span>
                                                    </div>
                                                    <span className="border-bottom-grey py-1"></span>
                                                    <a href={"https://testnet.bscscan.com/address/" + address} className="pt-1" target="_blank" rel="noopener noreferrer">
                                                        <span className="text-blue">View on BscScan</span>
                                                    </a>
                                                </div>
                                        </div>
                                    </div>
                                    )}
                                            <div className="card py-2 mb-0">
                                                <div className="card-body">
                                                        <div className="d-flex flex-column ">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <img src="/images/chain/bnb.png" style={{width:'20px'}} />
                                                                <span className="text-white">{BNBPrice} BNB</span>
                                                            </div>
                                                            <span className="border-bottom-grey py-1"></span>
                                                            <a href={"https://bscscan.com/address/" + address} className="pt-1" target="_blank" rel="noopener noreferrer">
                                                                <span className="text-blue">View on BscScan</span>
                                                            </a>
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="card py-2 mb-0">
                                                <div className="card-body">
                                                        <div className="d-flex flex-column ">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <img src="/images/chain/eth.svg" style={{width:'20px'}} />
                                                                <span className="text-white">{ETHPrice} ETH</span>
                                                            </div>
                                                            <span className="border-bottom-grey py-1"></span>
                                                            <a href={"https://etherscan.io/address/" + address} className="pt-1" target="_blank" rel="noopener noreferrer">
                                                                <span className="text-blue">View on Etherscan</span>
                                                            </a>
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="card py-2 mb-0">
                                                <div className="card-body">
                                                        <div className="d-flex flex-column ">
                                                            <div className="d-flex gap-2 align-items-center">
                                                                <img src="/images/chain/oec.png" style={{width:'20px'}} />
                                                                <span className="text-white">{OECPrice} OEC</span>
                                                            </div>
                                                            <span className="border-bottom-grey py-1"></span>
                                                            <a href={"https://www.oklink.com/okexchain/address/" + address} className="pt-1" target="_blank" rel="noopener noreferrer">
                                                                <span className=" text-blue">View on OKX Chain</span>
                                                            </a>
                                                        </div>
                                                </div>
                                            </div>

                                           
                                    </div>

                                <div className="col-xxl-12" >
                                    <div className="card-header px-0">
                                        <h4 className="card-title">Wallet </h4>
                                    </div>
                                    <div className="card" >
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="total-balance" style={{ padding: '20px' }}>
                                                        <p>Total Balance</p>
                                                        <h2>${totalBalance}</h2>
                                                    </div>
                                                    <div className="card" style={{ border: 'none' }}>

                                                        <div className="card-body" style={{ background: '#25364900' }}>
                                                            <div className="table-responsive">
                                                                <table className="table profile-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Assets</th>
                                                                            <th>Price</th>
                                                                            <th>Balance</th>
                                                                            <th>Value</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {wallet != [] ? wallet.map((data, i) => {
                                                                            return (
                                                                                <tr key={i}>
                                                                                    <td><span className="bscscan">
                                                                                    </span>{data['symbol']}</td>
                                                                                    <td>${data['price'].toFixed(2)}</td>
                                                                                    <td>{data['price']}</td>
                                                                                    <td>${data['value'].toLocaleString()}</td>
                                                                                    <td>
                                                                                        <a href={chain == "0x61" || chain == "0x38"
                                                                                            ? data['contract'] == "BNB" ? "https://bscscan.com/address/" + address : "https://bscscan.com/token/" + data['token'] + "?a=" + address
                                                                                            : chain == "0x1"
                                                                                                ? data['contract'] == "ETH" ? "https://etherscan.io/address/" + address : "https://etherscan.io/token/" + data['token'] + "?a=" + address
                                                                                                : chain == "0x42"
                                                                                                    ? data['contract'] == "OEC" ? "https://www.oklink.com/okexchain/address/" + address : "https://www.oklink.com/okexchain/token/" + data['token'] + "?a=" + address
                                                                                                    : ""} target="_blank" rel="noopener noreferrer" >View on  {chain == "0x61" || chain == "0x38"
                                                                                                        ? "BscScan"
                                                                                                        : chain == "0x1"
                                                                                                            ? "EtherScan"
                                                                                                            : chain == "0x42"
                                                                                                                ? "OKXScan"
                                                                                                                : ""} </a>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        }) : ""
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="total-balance" style={{ padding: '20px' }}>
                                                        <p>This API is fetched from <a href="https://debank.com">DeBank</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="nothing-here">
                                <img src="/images/chain/not_connected.png" style={{ width: '100%' }} />
                                <p>Oops! your Wallet is not connected!</p>
                            </div>
                        )
                        ) : (
                            <>
                            <div className="row" style={{height:'100px'}}>
                                          <div className="loader">Loading...</div>
                                        </div>
                            </>
                        )}

                        </div>
                        </div>
            </LayoutAdmin>
        </>
    );
}
export default Profile;
