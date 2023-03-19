import { Progress } from "reactstrap";
import React, { useState, useEffect, Component } from "react";
import ProgressBar from "./ProgressBar";
import { useRouter } from "next/router";
import Link from "next/link";
import Web3 from "web3";
import { toast } from 'react-toastify';
import { presaleView } from "/components/web3/presaleView";
import { detailsAbi } from "/components/web3/detailsAbi";
import { pinksaleAbi1, pinksaleAbi2, pinksaleAbi3 } from "/components/web3/pinksaleAbi";
import {rand} from "/component/randBanner"

export default function Card({ p, Datas }) {
    const { handleChain, rpcURL, sendData, setFavorited,favorited, connected, address, isSigned, pContract, chain, handleSymbol } = p


    const presaleType = Datas.presaleType
    const status = Datas.status
    const router = useRouter();
    const paramChain = router.query.chain;
    const [daysr, setDaysr] = useState('00');
    const [hoursr, setHoursr] = useState('00');
    const [minutesr, setMinutesr] = useState('00');
    const [secondsr, setSecondsr] = useState('00');
    const [bamn, setBan] = useState('00');
    const [saved, setSaved] = useState(false);

    async function saveUnsave() {
        if (connected) {
          const web3 = new Web3(rpcURL);
          if (await isSigned()) {
            const saves = await sendData({ req: 'save', contract: Datas.contract, external:Datas.external, chain: paramChain }, false)
            setSaved(saves.status)
            const savedData = await sendData({ req: "getsave", address: address }, false)
            const pAddr = savedData.presale;
            const xArray = []
            const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
            const PresaleData = new web3.eth.Contract(detailsAbi, pContract[chain]["chPresale"]);
            for (let i = 0; i < pAddr.length; i++) {
                if(paramChain == pAddr[i][3]) {
                    if(paramChain == pAddr[i][3]){

                        if(pAddr[i][1] != 0){
                            if(pAddr[i][2].length) {
                              let PresaleData = new web3.eth.Contract(pinksaleAbi1, pAddr[i][0]);
                              const version = await PresaleData.methods.version().call();
                              if (version >= 27) {
                                if(version == 81) {
                                  PresaleData = new web3.eth.Contract(pinksaleAbi3, pAddr[i][0]);
                                }else {
                                  PresaleData = new web3.eth.Contract(pinksaleAbi2, pAddr[i][0]);
                                }
                              }
                              const [f, uintParam] = await Promise.all([
                                await PresaleData.methods.poolStates().call(),
                                await PresaleData.methods.poolSettings().call()
                              ]);
                              const social = JSON.parse(f.poolDetails)
                              
                              xArray.push({ logo: social.a, status: 1, contract: pAddr[i][0], external: pAddr[i][2] })
                            }else {
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
            }
            setFavorited(xArray);
            toast("Success!")
          }else{
            toast.error("Account not signed")
          }
        }else {
          toast.error("Not Connected")
        }
      }
    const getTimeUntil = (deadline, endtime) => {
        let target = new Date(deadline / 1000);
        target = new Date(
            target.getUTCFullYear(),
            target.getUTCMonth(),
            target.getUTCDate(),
            target.getUTCHours(),
            target.getUTCMinutes(),
            target.getUTCSeconds()
        );
        const now = new Date();

        var nowUTC = new Date(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            now.getUTCHours(),
            now.getUTCMinutes(),
            now.getUTCSeconds()
        );
        const time = Date.parse(target) - Date.parse(new Date(nowUTC));
        let Endtarget = new Date(endtime / 1000);
        Endtarget = new Date(
            Endtarget.getUTCFullYear(),
            Endtarget.getUTCMonth(),
            Endtarget.getUTCDate(),
            Endtarget.getUTCHours(),
            Endtarget.getUTCMinutes(),
            Endtarget.getUTCSeconds()
        );
        const differenceEnd = Date.parse(Endtarget) - Date.parse(new Date(nowUTC));
        if(status == 0 || status == 1) {
            if (time > 0) {
                const sec = Math.floor((time / 1000) % 60);
                const min = Math.floor((time / 1000 / 60) % 60);
                const hour = Math.floor((time / (1000 * 60 * 60)) % 24);
                const day = Math.floor(time / (1000 * 60 * 60 * 24));
                setSecondsr(sec < 10 ? `0${sec}` : sec);
                setMinutesr(min < 10 ? `0${min}` : min);
                setHoursr(hour < 10 ? `0${hour}` : hour);
                setDaysr(day < 10 ? `0${day}` : day);
            } else if (time < 0 && differenceEnd > 0) {
                const sec = Math.floor((differenceEnd / 1000) % 60);
                const min = Math.floor((differenceEnd / 1000 / 60) % 60);
                const hour = Math.floor((differenceEnd / (1000 * 60 * 60)) % 24);
                const day = Math.floor(differenceEnd / (1000 * 60 * 60 * 24));
                setSecondsr(sec < 10 ? `0${sec}` : sec);
                setMinutesr(min < 10 ? `0${min}` : min);
                setHoursr(hour < 10 ? `0${hour}` : hour);
                setDaysr(day < 10 ? `0${day}` : day);
            } 
        }else {
            setSecondsr('00');
                setMinutesr('00');
                setHoursr('00');
                setDaysr('00');
        }
    };

    async function init() {
            setBan(rand())
         setSaved(Datas.isFavorited)
         for(let i =0 ; i < favorited.length ; i++) {
            if(favorited[i].contract[0] == Datas.contract) setSaved(true)
         }
        setInterval(() => getTimeUntil(Datas.startTime * 1000, Datas.endTime * 1000), 1000);
    }

    function handleDirect(x) {
        if(x == 'redirect') {
            if(Datas.external == "Pinksale") {
                return `/pool/pinksale/${Datas.contract}?chain=${paramChain}`
            }
            if(Datas.external == "DxSale") {
                return `/pool/dx/${Datas.saleId}?chain=${paramChain}`
            }else {
                return `/pool/${Datas.contract}?chain=${paramChain}`
            }
        }else if(x == 'links') {
            if(Datas.external == "Pinksale") {
                return `https://pinksale.finance/launchpad/${Datas.contract}`
            }
            if(Datas.external == "DxSale") {
                return `https://dxsale.app/dxsaleview?saleID=${Datas.saleId}`
            }
        }
    }
    
    useEffect(() => {
        init();
    }, []);
    return (
        <div className={Datas.pools ? "col-xxl-4 col-xl-4 col-lg-6 col-md-6 mt-4" : "col-xxl-4 col-xl-4 col-lg-6 col-md-6"} style={{zIndex:'0'}}>
            {Datas.contract == 0 && (<h4 className="card-title mb-2 vis-n">Create Presale 3/4</h4>)}
            <div className={Datas.contract == 0 || Datas.edit  ? "text-center sticky-card" : "text-center d-flex flex-column h-100"}>
               <div>
               <div className="card-up card-bg-image rounded-top" style={{ backgroundImage: `url("${Datas.headerImage ? Datas.headerImage : `/images/bg/bg${bamn}.png`}")` }}>
                    <div style={{ textAlign: 'end', padding: "10px" }}>
                        <div className="d-flex justify-content-end gap-2">
                            
                        {presaleType == 0 && (
                                <div className="_progress _presale-type me-auto">
                                Presale
                              </div>
                              )}
                        {presaleType == 1 && (
                                <div className="_progress _presale-type me-auto">
                                Fair Launch
                              </div>
                              )}
                        {presaleType == 2 && (
                                <div className="_progress _presale-type me-auto">
                                Fomo
                              </div>
                              )}
                        {presaleType == 3 && (
                                <div className="_progress _presale-type me-auto">
                                Subscription
                              </div>
                              )}

                        {presaleType == 4 && (
                                <div className="_progress _presale-type me-auto">
                                Dutch Auction
                              </div>
                              )}

                            {presaleType == 5 && (
                                <div className="_progress _presale-type me-auto">
                                Overflow
                              </div>
                              )}
                        {status == 0 && (
                                <div className="_progress _S0">
                                  <img src="/images/Fa/upcoming.svg" />
                                  Upcoming
                                </div>
                              )}
                              {status == 1 && (
                                <div className="_progress _S1">
                                  <img src="/images/Fa/radio.svg" />
                                  Sale Live
                                </div>
                              )}

                              {status == 2 && (
                                <div className="_progress _S2 ">
                                  <img src="/images/Fa/ended.svg" />
                                  Ended
                                </div>
                              )}
                              {status == 3 && (
                                <div className="_progress _S3">
                                  <img src="/images/Fa/filled.svg" />
                                  Filled
                                </div>
                              )}

                              {status == 4 && (
                                <div className="_progress _S4">
                                  <img src="/images/Fa/canceled.svg" />
                                  Canceled
                                </div>
                              )}
                              
                        </div>
                    </div>
                </div>
                <div className="avatar mx-auto bg-avatar">
                <Link href={handleDirect('redirect')}>

                    <img src={Datas.logoURL ? Datas.logoURL : "/images/profile/unknown.png"} onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "/images/profile/unknown.png";
                    }} className="rounded-circle img-responsive p-3 logosImage c-pointer" alt="." />
                </Link>
                </div>
               </div>

                <div className="card-body bg-blues rounded-bottom pt-0">
                    <h2 className="title text-white font-weight-bold">{Datas.name}</h2>
                    <div className="d-flex gap-1 justify-content-center pb-3">
                    {Datas.insurance && (
                        <div className="badge-status insurance bold">Insurance</div>
                    )}
                        {Datas.safe.kyc && (
                        <a href={Datas.safe.kyc} target="_blank" rel="noopener noreferrer"><div className="badge-status kyc">KYC</div></a>
                        )}
                        {Datas.safe.audit && (
                        <a href={Datas.safe.audit} target="_blank" rel="noopener noreferrer"><div className="badge-status audit">Audit</div></a>
                        )}
                        {Datas.external && (
                        <a href={handleDirect('links')} target="_blank"><div className="badge-status aggr">
                        Aggregated
                    </div></a>
                        )}
                    </div>
                    <p style={{ fontSize: "14px" }} className="bold"><i className="text-title"></i>
                    {status == 0 && "PRESALE STARTS IN" } 
                    {status == 1 && "PRESALE ENDS IN" } 
                    {status == 2 && "PRESALE ENDED" } 
                    {status == 3 && "PRESALE ENDED" } 
                    {status == 4 && "PRESALE CANCELED" } 
                    </p>
                    <div className="d-flex" style={{ placeContent: 'center', marginTop: '15px', gap: "10px" }}>
                        <div className="d-flex flex-column">
                            <div className="cd_top text-center">
                                <b>{daysr}</b>
                            </div>
                            <div className="cd_bottom text-center">
                                <div className="d-flex flex-column span">
                                    <span>DAYS</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="cd_top text-center">
                                <b>{hoursr}</b>
                            </div>
                            <div className="cd_bottom text-center">
                                <div className="d-flex flex-column span">
                                    <span>HOURS</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="cd_top text-center">
                                <b>{minutesr}</b>
                            </div>
                            <div className="cd_bottom text-center">
                                <div className="d-flex flex-column span">
                                    <span>MINUTES</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="cd_top text-center">
                                <b>{secondsr}</b>
                            </div>
                            <div className="cd_bottom text-center">
                                <div className="d-flex flex-column span">
                                    <span>SECONDS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <ProgressBar status={status} presaleType={presaleType} showSoftCap={true} premiumColor2={Datas.premiumColor2} premiumColor={Datas.premiumColor} filled={Datas.Filled} softCap={Datas.softCap} hardCap={Datas.hardCap}/>
                    <div className="d-flex text-white justify-content-between  border-bottom_grey border-dark-100 py-2">
                        <span>{Datas.softCap} {Datas.currency ? pContract[chain].currency[Datas.currency] : handleChain('symbol')}</span>
                        {presaleType == 0 &&
                            (
                                <span>{Datas.hardCap} {handleSymbol(Datas.currency)}</span>

                            )}

                        {presaleType == 1 &&
                            (
                                <span>∞ {handleChain('symbol')}</span>

                            )}


                    </div>
                    
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div className="text-white">Liquidity</div>
                        <div className="text-grey">{Datas.liqRate}%</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div className="text-white">Lockup Time</div>
                        <div className="text-grey">{Datas.lockup < 1 ? `${Math.floor(Datas.lockup * 1440)} Minutes` : `${(Datas.lockup) > 5000 ? "∞" : Math.floor(Datas.lockup)} Days`}</div>
                    </div>
                        <div className="d-flex mt-3 gap-2">
                            {Datas.contract == 0 ? (
                                      <a className="w-100"> <button className="btn x-btn w-100 " style={{ background: `linear-gradient(92.09deg, ${Datas.premiumColor2} -11.68%, ${Datas.premiumColor} 97.36%)`, border: `1px solid ${Datas.canvasColor}` }} type="submit">View Presale</button></a>

                                ) : (
                                    Datas.isPremium ? (
                                            <Link  href={handleDirect('redirect')}><a className="w-100">  <button className="btn x-btn w-100 " style={{ background: `linear-gradient(92.09deg, ${Datas.premiumColor2} -11.68%, ${Datas.premiumColor} 97.36%)`, border: `1px solid ${Datas.canvasColor}` }} type="submit">View Presale</button></a></Link>

                                        ) : (
                                            <Link  href={handleDirect('redirect')}><a className="w-100">  <button className="btn x-btn w-100" type="submit">View Presale</button></a></Link>
                                        )
                                    
                            )}
                        <div className="card-favorite c-pointer" onClick={() => Datas.contract == 0 ? "" : saveUnsave()}>
                        <svg style={saved ? {width:'20px',fill:"#FFCF73"}: {width:'20px'}} xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                            <path d="M26.1597 11.1553L18.3654 9.96913L14.8811 2.57222C14.7859 2.3697 14.6294 2.20575 14.436 2.1061C13.9509 1.85535 13.3615 2.0643 13.119 2.57222L9.63477 9.96913L1.84047 11.1553C1.62558 11.1875 1.42911 11.2936 1.27869 11.4543C1.09684 11.65 0.996633 11.9134 1.00009 12.1864C1.00354 12.4595 1.11037 12.7199 1.29711 12.9105L6.93639 18.668L5.60408 26.7978C5.57284 26.987 5.59282 27.1815 5.66177 27.3593C5.73072 27.5371 5.84586 27.6912 5.99416 27.8039C6.14245 27.9167 6.31796 27.9837 6.50078 27.9974C6.68359 28.011 6.86641 27.9708 7.02848 27.8812L14.0001 24.0429L20.9716 27.8812C21.162 27.9873 21.383 28.0226 21.5948 27.984C22.129 27.8876 22.4881 27.3572 22.396 26.7978L21.0637 18.668L26.703 12.9105C26.8565 12.753 26.9578 12.5473 26.9885 12.3223C27.0714 11.7597 26.6969 11.2389 26.1597 11.1553V11.1553Z" stroke="#FED735" strokeOpacity="0.69" strokeWidth="2"/>
                            {!saved && (<path d="M26.1597 11.1553L18.3654 9.96913L14.8811 2.57222C14.7859 2.3697 14.6294 2.20575 14.436 2.1061C13.9509 1.85535 13.3615 2.0643 13.119 2.57222L9.63477 9.96913L1.84047 11.1553C1.62558 11.1875 1.42911 11.2936 1.27869 11.4543C1.09684 11.65 0.996633 11.9134 1.00009 12.1864C1.00354 12.4595 1.11037 12.7199 1.29711 12.9105L6.93639 18.668L5.60408 26.7978C5.57284 26.987 5.59282 27.1815 5.66177 27.3593C5.73072 27.5371 5.84586 27.6912 5.99416 27.8039C6.14245 27.9167 6.31796 27.9837 6.50078 27.9974C6.68359 28.011 6.86641 27.9708 7.02848 27.8812L14.0001 24.0429L20.9716 27.8812C21.162 27.9873 21.383 28.0226 21.5948 27.984C22.129 27.8876 22.4881 27.3572 22.396 26.7978L21.0637 18.668L26.703 12.9105C26.8565 12.753 26.9578 12.5473 26.9885 12.3223C27.0714 11.7597 26.6969 11.2389 26.1597 11.1553V11.1553Z" stroke="#C2A01C" strokeWidth="2"/>
                            )}
                        </svg>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}