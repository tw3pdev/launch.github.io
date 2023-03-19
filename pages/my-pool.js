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

function MyPool({ p }) {
    const { address, userProfile, handleChain, username, chain, connected,  isSigned, rpcURL, pContract } = p
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
                const contributed = await presaleViewContract.methods.getPresaleOwnerByAddress(false).call({from:address})
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
                                

                                <div className="col-12">
                                    <div className="card-header px-0 pt-0 pb-0 text-uppercase">
                                        <h4 className="card-title">My Contributions</h4>

                                    </div>
                                    <div className=" top-creators-content">
                                        {Contributed.map((item, i) => {
                                          return (
                                            <Link href={"pool/" + item[0] + "?chain=" + paramChain} key={i}>
                                                        <div className="row justify-content-between creator-widget active px-4 align-items-center" style={{ cursor: 'pointer'}}>
                                                            <div className="d-flex align-items-center col-12 col-md-6 col-xl-4">
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
                                                            <div className="col-12 col-xl-8 col-md-6 d-flex align-items-center content-item-favorites justify-content-between text-center">
                                                            <div className="border-between"></div>
                                                            <span className="bold">{(item[3] / 1e18).toLocaleString()} / {(item[2] / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                            <div className="border-between"></div>
                                                           <span className="bold">{(item[1] / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                           <div className="border-between vis-n"></div>

                                                            </div>
                                                        </div>
                                                    </Link>
                                          )
                                        })
                                        }
                                        {!Contributed.length && (
                                            <div className="card c-pointer">
                                                <div className="card-body py-2 text-uppercase bold text-center">
                                                    No Contribution
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div >
                                

                                
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
export default MyPool;
