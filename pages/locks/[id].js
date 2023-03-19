import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { IERC20, presaleLockerAbi } from "/components/web3/abi"
import { useRouter } from "next/router";
import Counter2 from "/component/Counter2"
import CounterProgress from "/component/CounterProgress"
import { toast } from 'react-toastify';

function LocksId({ p }) {
    const {
        address,
        userProfile,
        BlurAddress,
        BlurBalance,
        blockURL,
        bn,
        chain,
        extractErrorCode,
        handleChain,
        connected,
        balance,
        rpcURL,
        thisWeb3,
        pContract,
    } = p;
    const router = useRouter();

    const lockId = router.query.id

    const [name, setName] = useState(" ");
    const [symbol, setSymbol] = useState(" ");
    const [decimal, setDecimal] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);
    const [logs, setLogs] = useState([])
    const [nowUTC, setNowUTC] = useState(0)
    const [isOwner, setIsOwner] = useState(false)
    const [token, setToken] = useState()



    const address0 = "0x0000000000000000000000000000000000000000"


    function getUTC(x) {
        let target = new Date(x * 1000);
        target = new Date(
            target.getUTCFullYear(),
            target.getUTCMonth(),
            target.getUTCDate(),
            target.getUTCHours(),
            target.getUTCMinutes(),
            target.getUTCSeconds()
        );
        return target
    }
    async function init() {
        if (pContract[chain]) {
            const web3 = new Web3(rpcURL);
            const getContract = new web3.eth.Contract(presaleLockerAbi, pContract[chain]["presaleLocker"])
            const datas = await getContract.methods.TL(lockId).call()
            setIsOwner(datas.lOwner == address);
            const tokenContract = new web3.eth.Contract(IERC20, datas.tAdr)
            const [name, symbol, decimals, totalSupply] = await Promise.all([
                await tokenContract.methods.name().call(),
                await tokenContract.methods.symbol().call(),
                await tokenContract.methods.decimals().call(),
                await tokenContract.methods.totalSupply().call(),
            ])
            setToken(datas.tAdr)
            const div = 10 ** decimals
            setName(name)
            setSymbol(symbol)
            setDecimal(decimals)
            setTotalSupply(+bn(totalSupply).div(div))

            const target = getUTC(+new Date() / 1000)
            const nows = +target / 1000
            // 0 = locked
            // 1 = unlocked
            // 2 = withdrawed
            let status = 0
            const vesting = 10000 - datas.uRate
            const firstLock = +bn(bn(datas.amount).div(div)).multipliedBy(+bn(datas.uRate).div(10000))
            let leftAmount = +bn(bn(datas.amount).div(div)).minus(firstLock)
            let lastVesting = +datas.uTime

            if (nows > lastVesting) {
                status = 1
                if (datas.vCount > 0) {
                    status = 2
                }
            }
            const events = [{
                amount: leftAmount,
                time: lastVesting,
                status
            }]

            setNowUTC(nows);
            let x = 1
            const nLock = +bn(bn(datas.amount).div(div)).multipliedBy(+bn(datas.vRate).div(10000))
            for (let i = vesting; i > 0; i -= datas.vRate) {
                    lastVesting = Math.floor(lastVesting + +(datas.vPeriod))
                    let status = 0
                    if (nows > lastVesting) {
                        status = 1
                        if (datas.vCount > x) {
                            status = 2
                        }
                    }
                    const VestingEvents = {
                        amount: nLock,
                        time: lastVesting,
                        status
                    }
                    events.push(VestingEvents)
                x++
            }
            setLogs(events)
        }
    }
    useEffect(() => {
        if (pContract.length == 0) return
        init()
    }, [rpcURL, pContract]);

    async function unlock() {
        const web3 = thisWeb3
        const getContract = new web3.eth.Contract(presaleLockerAbi, pContract[chain]["presaleLocker"])
        getContract.methods.unlock(lockId).call({from:address}).then (() => {
            getContract.methods.unlock(lockId).send({from:address}).then (async () => {
                toast("Unlock Success")
                await init()
            }).catch((e) => {
                try{
                    toast.error(extractErrorCode(e));
                }catch(_) {
                    toast.error(e.message);
                }
            })
        }).catch((e) => {
            try{
                toast.error(extractErrorCode(e));
            }catch(_) {
                toast.error(e.message);
            }
        })
    }


    function unlockAt(x) {
        const dates = getUTC(x).toString()
        const res = ""
        res += dates.split(" ")[1] + " "
        res += dates.split(" ")[2] + " "
        res += dates.split(" ")[3] + " "
        res += dates.split(" ")[4] + " "

        return res
    }



    return (
        <>
            <LayoutAdmin
                headTitle="WeLaunch - Lock Token"
                pageTitle=""
                pageTitleSub={"Lock your Token"}
                pageclassName={"admin"}
                parent={"Create Project"}
                child={""}
                p={p}
            >
                <div className="row" style={{ paddingTop: '20px' }}>
                    <div className="col-xxl-8 col-xl-8 col-lg-8">
                        <h4 className="card-title mb-2 text-uppercase">Lock details</h4>
                        <div className="card detail_card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        {logs.map((data, i) => {
                                            return (
                                                <div className={`d-flex mb-3 ${i + 1 < logs.length ? "bt-bt" : ""}`}>
                                                    <div className="me-3">{i + 1}. </div>
                                                    <div className="d-flex flex-column">
                                                        <span className="">{data.amount} {symbol}</span>
                                                        <span className="my-2"><CounterProgress start={(nowUTC) * 1000} end={data.time * 1000} current={0} status={data.status} /></span>
                                                        <span className=""><Counter2 start={(nowUTC) * 1000}  end={data.time * 1000} /></span>
                                                        <span className={`${i + 1 < logs.length ? "mb-2" : ""}`}>Unlock at {unlockAt(data.time)}</span>
                                                    </div>
                                                    <div className="d-flex ms-auto align-items-center">
                                                        {data.status == 2 ? (
                                                            <div className="badge-status kyc">
                                                                Withdrawed
                                                            </div>
                                                        ) : ""}
                                                        {data.status == 1 ? (
                                                            <div className="badge-status audit">
                                                                Unlocked
                                                            </div>
                                                        ) : ""}

                                                        {data.status == 0 ? (
                                                            <div className="badge-status insurance">
                                                                Locked
                                                            </div>
                                                        ) : ""}
                                                        {isOwner  && data.status == 1? (
                                                            <div className="button view center-svg c-pointer ms-2" style={{padding: '5px 8px', height:'30px'}} onClick={() => unlock()}>
                                                            Unlock
                                                        </div>
                                                        ) : ""}

                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-4 col-lg-6">
                        <h4 className="card-title mb-2 vis-n">Preview</h4>
                        <div className="card items border-0">
                            <div className="card-body">


                                <div className="infos_i">


                                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                        <div>Name</div>
                                        <div
                                            className={`val right-presalerate`} >
                                            {name != " " && name ? name : "-"}
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                        <div>Symbol</div>
                                        <div
                                            className={`val right-presalerate`} >
                                            {symbol != " " && symbol ? symbol : "-"}
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                        <div>Decimal</div>
                                        <div
                                            className={`val right-presalerate`} >
                                            {decimal != " " && decimal ? decimal : "-"}
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                        <div>Total Supply</div>
                                        <div
                                            className={`val right-presalerate`}>
                                            {totalSupply != " " && totalSupply ? (+totalSupply).toLocaleString() : "-"}
                                        </div>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                                        <div>Token</div>
                                        <a href={`${blockURL}address/${token}`} target="_blank">
                                        <div
                                            className={`val right-presalerate`}>
                                            {token != " " && token ? token.substring(0, 6) + "..." + token.substring(token.length - 4) : "-"}
                                        </div>
                                        </a>
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
export default LocksId;
