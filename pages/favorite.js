import LayoutAdmin from "../components/layout/LayoutAdmin";
import ProfileMenu from "../components/layout/ProfileMenu";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { useRouter } from "next/router";
import { detailsAbi } from "/components/web3/detailsAbi";
import { IERC20 } from "/components/web3/abi";
import { presaleView } from "/components/web3/presaleView";
import "react-loading-skeleton/dist/skeleton.css";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { pinksaleAbi1, pinksaleAbi2, pinksaleAbi3 } from "/components/web3/pinksaleAbi";

function Favorites({ p }) {
    const { address, userProfile, rpcURL, pContract, handleChain, setFavorited, sendData, username, chain, connected, isSigned } = p
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);


    const [Contributed, setContributed] = useState([]);
    const router = useRouter();
    const paramChain = router.query.chain

    async function init() {
        if (connected && address) {
            if (await isSigned()) {
                if (connected && address && chain) {
                    try {
                        const web3 = new Web3(rpcURL);
                        const savedData = await sendData({ req: "getsave", address: address }, false)
                        const PresaleData = new web3.eth.Contract(detailsAbi, pContract[chain]["chPresale"]);
                        const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);

                        let datas = [
                            {
                                addr: "1",
                                total: 2,
                                hc: 2,
                                filled: 2,
                                status: 2,
                                name: "{pinned-not-pinned}",
                                logo: "a"
                            },
                            {
                                addr: "2",
                                total: 2,
                                hc: 2,
                                filled: 2,
                                status: 2,
                                name: "{pinned-not-pinned}",
                                logo: "a"
                            },
                            {
                                addr: "3",
                                total: 2,
                                hc: 2,
                                filled: 2,
                                status: 2,
                                name: "{pinned-not-pinned}",
                                logo: "a"
                            }
                        ]
                        let posSaved = 0;
                        let notSaved = 3;
                        for (let i = 0; i < savedData.presale.length; i++) {
                            const addr = savedData.presale[i][0];
                            const isActive = savedData.presale[i][1];
                            const external = savedData.presale[i][2];
                            try {
                                if (external.length > 0) {
                                    let PresaleData = new web3.eth.Contract(pinksaleAbi1, addr);
                                    const version = await PresaleData.methods.version().call();
                                    if (version >= 27) {
                                        if (version == 81) {
                                            PresaleData = new web3.eth.Contract(pinksaleAbi3, addr);
                                        } else {
                                            PresaleData = new web3.eth.Contract(pinksaleAbi2, addr);
                                        }
                                    }
                                    const [f, uintParam] = await Promise.all([
                                        await PresaleData.methods.poolStates().call(),
                                        await PresaleData.methods.poolSettings().call()
                                    ]);
                                    const social = JSON.parse(f.poolDetails)
                                    const token = uintParam.token
                                    const tokenContract = new web3.eth.Contract(IERC20, token);
                                    const name = await tokenContract.methods.name().call()
                                    const logo = social.a
                                    let total = "-"
                                    const hc = uintParam.hardCap ? Number(uintParam.hardCap) : "-"
                                    const filled = f.totalRaised
                                    let status = 0;
                                    const now = Math.floor(+(new Date()) / 1000)
                                    const amountTot = f.totalRaised
                                    if (now > uintParam.endTime || amountTot == uintParam.hardCap) {
                                    status = 2
                                    } else if (now > uintParam.startTime) {
                                    status = 1
                                    }
                                    if (isActive != 0) {
                                        datas[posSaved] = { addr, total, hc, filled, status, name, logo }
                                        posSaved++
                                    } else {
                                        datas[notSaved] = { addr, total, hc, filled, status, name, logo }
                                        notSaved++
                                    }

                                } else {
                                    const [ad, string, uint, statuses, totalRaised] = await Promise.all([
                                        await PresaleData.methods.AP(addr).call(),
                                        await PresaleData.methods.SP(addr).call(),
                                        await presaleViewContract.methods.getPresaleFactory(addr).call(),
                                        await presaleViewContract.methods.getPresaleStatus(addr).call(),
                                        await presaleViewContract.methods.totalRaised(addr).call()
                                    ]);
                                    const token = ad.tAdr;
                                    const tokenContract = new web3.eth.Contract(IERC20, token);
                                    const name = await tokenContract.methods.name().call()
                                    const logo = string.logo
                                    let total = "-"
                                    const hc = Number(uint[1].hc)
                                    const filled = Number(uint[4].bDepoTot)
                                    const status = Number(statuses[3])
                                    if (isActive != 0) {
                                        datas[posSaved] = { addr, total, hc, filled, status, name, logo }
                                        posSaved++
                                    } else {
                                        datas[notSaved] = { addr, total, hc, filled, status, name, logo }
                                        notSaved++
                                    }

                                }
                            } catch (_) {
                            }
                        }
                        setIsLoading(false)
                        setContributed(datas)
                    } catch (e) {
                    }

                }
            } else {
                router.back()
            }
        }

    }

    function checkOrder(data) {
        const sData = data
        for (let i = 0; i < data.length; i++) {
            if (i <= 1) {
                if (data[i].name == "{pinned-not-pinned}") {
                    const x = i + 1
                    if (data[x].name != "{pinned-not-pinned}") {
                        const empty = data[i]
                        const filled = data[x]
                        sData[i] = filled
                        sData[x] = empty
                    }
                }
            } else if (i > 2) {
                if (data[i].name == "{pinned-not-pinned}") {
                    sData.slice[i]
                }
            }
        }
        return sData;
    }

    async function sendDataR(items) {
        const sendDatas = []
        sendDatas.slice[0]
        for (let i = 0; i < items.length; i++) {
            if (items[i].name != "{pinned-not-pinned}") {
                if (i <= 2)
                    items[i].isActive = 1
                else
                    items[i].isActive = 0
                sendDatas.push(items[i])
            }
        }
        await sendData({ req: "saveObject", contract: sendDatas }, false)
        const sv = []
        for (let i = 0; i < sendDatas.length; i++) {
            if (items[i].isActive) {
                sv.push(items[i])
            }
        }
        setFavorited(sv)

    }

    async function removeDataR(addr) {
        const sv = await sendData({ req: "saveUnActive", contract: addr }, false)
        let temp = {}
        let toBeChange = []
        for (let i = 0; i < Contributed.length; i++) {
            if (Contributed[i].addr != addr) {
                toBeChange.push(Contributed[i])
            } else {
                temp = Contributed[i]
            }
        }
        toBeChange.push(temp)
        setContributed(toBeChange);

    }
    async function handleOnDragEnd(result) {
        if (!result.destination) return;
        setIsDragging(false)
        let items = Array.from(Contributed);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        items = checkOrder(items)
        setContributed(items);

        // Handle PHP
        await sendDataR(items)
    }
    function handleOnDragStart() {
        setIsDragging(true)
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
                                    <ProfileMenu p={p} uUname={username} />
                                </div>
                            </div>
                        )}
                        {!isLoading ? (
                            connected ? (
                                <div className="row" style={{ placeContent: 'space-between' }}>

                                    <div className=" col-12">
                                        <div className="card-header px-0 pt-0 pb-0 text-uppercase">
                                            <h4 className="card-title">Spotlight</h4>

                                        </div>
                                        <div className=" top-creators-content">
                                            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
                                                <Droppable droppableId="card-saved-body">
                                                    {(provided) => (
                                                        <ul className="card-saved-body" {...provided.droppableProps} ref={provided.innerRef}>
                                                            {Contributed.map(({ addr, name, status, total, logo, filled, hc }, index) => {
                                                                if (name != "{pinned-not-pinned}") {
                                                                    return (
                                                                        <Draggable key={addr} draggableId={addr} index={index}>
                                                                            {(provided) => (
                                                                                <div className="row justify-content-between creator-widget active px-4 align-items-center" style={{ cursor: 'pointer' }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>


                                                                                    <div className="d-flex align-items-center save-imge col-4">
                                                                                        <div className="me-3"> <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196 15.021 0 14.55 0 14C0 13.45 0.196 12.979 0.588 12.587C0.979333 12.1957 1.45 12 2 12C2.55 12 3.021 12.1957 3.413 12.587C3.80433 12.979 4 13.45 4 14C4 14.55 3.80433 15.021 3.413 15.413C3.021 15.8043 2.55 16 2 16ZM8 16C7.45 16 6.97933 15.8043 6.588 15.413C6.196 15.021 6 14.55 6 14C6 13.45 6.196 12.979 6.588 12.587C6.97933 12.1957 7.45 12 8 12C8.55 12 9.021 12.1957 9.413 12.587C9.80433 12.979 10 13.45 10 14C10 14.55 9.80433 15.021 9.413 15.413C9.021 15.8043 8.55 16 8 16ZM2 10C1.45 10 0.979333 9.804 0.588 9.412C0.196 9.02067 0 8.55 0 8C0 7.45 0.196 6.979 0.588 6.587C0.979333 6.19567 1.45 6 2 6C2.55 6 3.021 6.19567 3.413 6.587C3.80433 6.979 4 7.45 4 8C4 8.55 3.80433 9.02067 3.413 9.412C3.021 9.804 2.55 10 2 10ZM8 10C7.45 10 6.97933 9.804 6.588 9.412C6.196 9.02067 6 8.55 6 8C6 7.45 6.196 6.979 6.588 6.587C6.97933 6.19567 7.45 6 8 6C8.55 6 9.021 6.19567 9.413 6.587C9.80433 6.979 10 7.45 10 8C10 8.55 9.80433 9.02067 9.413 9.412C9.021 9.804 8.55 10 8 10ZM2 4C1.45 4 0.979333 3.804 0.588 3.412C0.196 3.02067 0 2.55 0 2C0 1.45 0.196 0.979333 0.588 0.588C0.979333 0.196 1.45 0 2 0C2.55 0 3.021 0.196 3.413 0.588C3.80433 0.979333 4 1.45 4 2C4 2.55 3.80433 3.02067 3.413 3.412C3.021 3.804 2.55 4 2 4ZM8 4C7.45 4 6.97933 3.804 6.588 3.412C6.196 3.02067 6 2.55 6 2C6 1.45 6.196 0.979333 6.588 0.588C6.97933 0.196 7.45 0 8 0C8.55 0 9.021 0.196 9.413 0.588C9.80433 0.979333 10 1.45 10 2C10 2.55 9.80433 3.02067 9.413 3.412C9.021 3.804 8.55 4 8 4Z" fill="#C3D3F3" />
                                                                                        </svg></div>
                                                                                        <div className="token-img me-2"><span><img src={logo} onError={({ currentTarget }) => {
                                                                                            currentTarget.onerror = null;
                                                                                            currentTarget.src = "/images/profile/unknown.png";
                                                                                        }} /></span></div>
                                                                                        <div className="latest-contribution d-flex flex-column">
                                                                                            <span className="mb-0 text-grey bold">{name}</span>
                                                                                            {status == 0 && (<span className="text-white">Upcoming</span>)}
                                                                                            {status == 1 && (<span className="text-white">Inprogress</span>)}
                                                                                            {status == 2 && (<span className="text-white">Ended</span>)}
                                                                                            {status == 3 && (<span className="text-white">Success</span>)}
                                                                                            {status == 4 && (<span className="text-white">Canceled</span>)}

                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-3 col-xxl-5 d-flex align-items-center content-item-favorites justify-content-between text-center">
                                                                                        <div className="border-between"></div>
                                                                                        <span className="bold">{(filled / 1e18).toLocaleString()} / {(hc / 1e18).toLocaleString()} <span className="text-white">{handleChain('symbol')}</span></span>
                                                                                        <div className="border-between"></div>
                                                                                        <span className="bold">{total} <span className="text-white">{handleChain('symbol')}</span></span>

                                                                                    </div>
                                                                                    {index < 3 ? (
                                                                                        <div className="col-12 col-xxl-3 col-md-5 d-flex column-row gap-3 justify-content-end favorited-button">
                                                                                            <Link href={"pool/" + addr + "?chain=" + paramChain}>
                                                                                                <div className="button view text-uppercase c-pointer center-svg">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 23 17" fill="none" className="me-1">
                                                                                                        <path d="M8.66808 8.5C8.66808 9.2252 8.95616 9.9207 9.46896 10.4335C9.98175 10.9463 10.6773 11.2344 11.4025 11.2344C12.1277 11.2344 12.8232 10.9463 13.3359 10.4335C13.8487 9.9207 14.1368 9.2252 14.1368 8.5C14.1368 7.7748 13.8487 7.0793 13.3359 6.5665C12.8232 6.05371 12.1277 5.76562 11.4025 5.76562C10.6773 5.76562 9.98175 6.05371 9.46896 6.5665C8.95616 7.0793 8.66808 7.7748 8.66808 8.5ZM22.003 7.87012C19.6886 2.99463 16.1901 0.541016 11.5001 0.541016C6.80773 0.541016 3.31163 2.99463 0.997181 7.87256C0.904347 8.06913 0.856201 8.28383 0.856201 8.50122C0.856201 8.71861 0.904347 8.93331 0.997181 9.12988C3.31163 14.0054 6.81017 16.459 11.5001 16.459C16.1925 16.459 19.6886 14.0054 22.003 9.12744C22.191 8.73193 22.191 8.27295 22.003 7.87012ZM11.4025 12.7969C9.02941 12.7969 7.10558 10.873 7.10558 8.5C7.10558 6.12695 9.02941 4.20312 11.4025 4.20312C13.7755 4.20312 15.6993 6.12695 15.6993 8.5C15.6993 10.873 13.7755 12.7969 11.4025 12.7969Z" fill="white" /></svg>
                                                                                                    {status == 1 ? (
                                                                                                        "Contribute"
                                                                                                    ) : ("View Presale")}
                                                                                                </div>
                                                                                            </Link>

                                                                                            <div className="button view closes text-uppercase c-pointer center-svg" onClick={() => removeDataR(addr)}>
                                                                                                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M10.5007 0.583984C4.7569 0.583984 0.0839844 5.2569 0.0839844 11.0007C0.0839844 16.7444 4.7569 21.4173 10.5007 21.4173C16.2444 21.4173 20.9173 16.7444 20.9173 11.0007C20.9173 5.2569 16.2444 0.583984 10.5007 0.583984ZM14.8829 13.91L13.41 15.3829L10.5007 12.4736L7.59128 15.3829L6.11836 13.91L9.02774 11.0007L6.11836 8.09128L7.59128 6.61836L10.5007 9.52774L13.41 6.61836L14.8829 8.09128L11.9736 11.0007L14.8829 13.91Z" fill="white" />
                                                                                                </svg>
                                                                                            </div>

                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className="col-12 col-xxl-3 col-md-5 d-flex column-row justify-content-end favorited-button">
                                                                                            <Link href={"pool/" + addr + "?chain=" + paramChain}>
                                                                                                <div className="button view text-uppercase c-pointer center-svg">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 23 17" fill="none" className="me-1">
                                                                                                        <path d="M8.66808 8.5C8.66808 9.2252 8.95616 9.9207 9.46896 10.4335C9.98175 10.9463 10.6773 11.2344 11.4025 11.2344C12.1277 11.2344 12.8232 10.9463 13.3359 10.4335C13.8487 9.9207 14.1368 9.2252 14.1368 8.5C14.1368 7.7748 13.8487 7.0793 13.3359 6.5665C12.8232 6.05371 12.1277 5.76562 11.4025 5.76562C10.6773 5.76562 9.98175 6.05371 9.46896 6.5665C8.95616 7.0793 8.66808 7.7748 8.66808 8.5ZM22.003 7.87012C19.6886 2.99463 16.1901 0.541016 11.5001 0.541016C6.80773 0.541016 3.31163 2.99463 0.997181 7.87256C0.904347 8.06913 0.856201 8.28383 0.856201 8.50122C0.856201 8.71861 0.904347 8.93331 0.997181 9.12988C3.31163 14.0054 6.81017 16.459 11.5001 16.459C16.1925 16.459 19.6886 14.0054 22.003 9.12744C22.191 8.73193 22.191 8.27295 22.003 7.87012ZM11.4025 12.7969C9.02941 12.7969 7.10558 10.873 7.10558 8.5C7.10558 6.12695 9.02941 4.20312 11.4025 4.20312C13.7755 4.20312 15.6993 6.12695 15.6993 8.5C15.6993 10.873 13.7755 12.7969 11.4025 12.7969Z" fill="white" /></svg>
                                                                                                    {status == 1 ? (
                                                                                                        "Contribute"
                                                                                                    ) : ("View Presale")}
                                                                                                </div>
                                                                                            </Link>


                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    );
                                                                } else {
                                                                    if (index == 2) {
                                                                        return (
                                                                            <>
                                                                                <Draggable key={addr} draggableId={addr} index={index} isDragDisabled={true} >
                                                                                    {(provided) => (
                                                                                        <div className="d-flex justify-content-between creator-widget active  align-items-center hidden-saved " style={{ cursor: 'pointer' }} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                                            <div className="d-flex align-items-center">
                                                                                                <div className="token-img vis-n"><span><img src="/images/profile/unknown.png" /></span></div>
                                                                                                <div className="latest-contribution">
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="text-end">
                                                                                                <h5 className="text-primary"> </h5>
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </Draggable>
                                                                                <div className="border-bottom-grey2 py-4" style={isDragging ? { transform: "translate(0, 150px)" } : {}}></div>
                                                                            </>
                                                                        )
                                                                    }
                                                                }
                                                            })}
                                                            {provided.placeholder}
                                                        </ul>
                                                    )}
                                                </Droppable>
                                            </DragDropContext>
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
                                <div className="row" style={{ height: '100px' }}>
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
export default Favorites;
