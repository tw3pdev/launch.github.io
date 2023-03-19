import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useState, useEffect } from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Card from "/components/elements/cardPresale";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/router";
import { Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { presaleSetting, Tools, presaleAdmin, IERC20 } from "/components/web3/abi";
import Web3 from "web3";
import { detailsAbi } from "/components/web3/detailsAbi";
import { presaleView } from "/components/web3/presaleView";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { presaleFactory } from "../../components/web3/abi";

export default function EditPresale({ p }) {
    const router = useRouter();
    const { id } = router.query;
    const paramChain = router.query.chain;
    const {
        address,
        extractErrorCode,
        chain,
        connected,
        rpcURL,
        pContract,
        thisWeb3
    } = p;

    const [logoURL, setLogoURL] = useState("")
    const [name, setName] = useState("")
    const [website, setWebsite] = useState("")
    const [isEndorse, setEndorse] = useState(false)
    const [telegram, setTelegram] = useState("")
    const [twitter, setTwitter] = useState("");
    const [discord, setDiscord] = useState("");
    const [medium, setMedium] = useState("");
    const [reddit, setReddit] = useState("");
    const [banner, setBanner] = useState("");
    const [headerImage, setHeaderImage] = useState("");
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [description, setDesc] = useState("");
    const [endorsePercent, setEndorsePercent] = useState(50)
    const [premiumColor2, setPremiumColor2] = useState("hsl(191deg 98% 59%)");
    const [canvasColor, setCanvasColor] = useState("#036AE3");
    const [premiumColor, setPremiumColor] = useState("hsl(212deg 97% 45%)");

    const [softCapValue, setSoftCapValue] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [hardCapValue, setHardCapValue] = useState(0);
    const [liqRate, setLiqRate] = useState(0);
    const [lockup, setLockup] = useState(0);
    const [isPremium, setIsPremium] = useState(false);
    const [isPremiums, setIsPremiums] = useState(false);

    const [wlTime, setWlTime] = useState(0)
    const [minSpend, setMinSpend] = useState(0)
    const [maxSpend, setMaxSpend] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isCanceled, setCanceled] = useState(false)
    const [presaleType, setPresaleType] = useState("Public")
    const [presaleTypes, setPresaleTypes] = useState("Public")
    const [presaleMode, setPresaleMode] = useState(0)

    async function init() {
        const web3 = new Web3(rpcURL);
        if (connected) {
            if (web3.utils.isAddress(id)) {
                try {
                    const PresaleData = new web3.eth.Contract(presaleFactory, pContract[chain]["chPresale"]);
                    const presaleViewContract = new web3.eth.Contract(presaleView, pContract[chain]["cData"]);
                    try {
                        const presaleAdmins = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
                        const addressWhitelist = await presaleAdmins.methods.getWls(id, address, 0, 0).call()
                        setTotalWhitelist(addressWhitelist[3])
                    } catch (_) { }
                    const [stringData, viewData] = await Promise.all([
                        await PresaleData.methods.SP(id).call(),
                        await presaleViewContract.methods.getPresaleFactory(id).call()
                    ]);
                    const token = viewData[0].tAdr
                    const TokenContract = new web3.eth.Contract(IERC20, token);
                    const owner = viewData[0].pOwner;
                    const softCap = viewData[1].sc
                    const hardCap = viewData[1].hc
                    const startTime = viewData[1].sTime * 1000
                    const endTime = viewData[1].eTime * 1000
                    const Lockup = viewData[1].lockDur
                    const liqRate = viewData[2].liqRate / 100
                    const name = await TokenContract.methods.name().call()
                    const wlTime = viewData[1].wlTime
                    const minSpend = viewData[1].minSpend
                    const maxSpend = viewData[1].maxSpend
                    const mode = viewData[1].mode

                    const success = viewData[3].finished
                    const canceled = viewData[3].canceled
                    const canvas = (stringData.color).split("|")[0]
                    const pColor = (stringData.color).split("|")[1]
                    const pColor2 = (stringData.color).split("|")[2]
                    if (viewData.isEp) {
                        setHeaderImage(stringData.premiumBanner)
                        setIsPremium(true)
                        setIsPremiums(true)
                        setCanvasColor(canvas)
                        setPremiumColor(pColor)
                        setPremiumColor2(pColor2)
                    }
                    if ((owner).toUpperCase() == (address).toUpperCase()) {
                        setIsSuccess(success)
                        setCanceled(canceled)
                        setWebsite(stringData.website)
                        setTelegram(stringData.telegram)
                        setTwitter(stringData.twitter)
                        setDiscord(stringData.discord)
                        setMedium(stringData.medium)
                        setReddit(stringData.reddit)
                        setLogoURL(stringData.logo)
                        setBanner(stringData.banner)
                        setDesc(stringData.detail)

                        setSoftCapValue(softCap)
                        setHardCapValue(hardCap)
                        setStartTime(startTime)
                        setEndTime(endTime)
                        setLockup(Lockup / 86400)
                        setLiqRate(liqRate)
                        setName(name)
                        setWlTime(wlTime)
                        setMinSpend(minSpend)
                        setMaxSpend(maxSpend)
                        setPresaleMode(mode)
                    } else {
                        router.push(`/pool/${id}/?chain=${paramChain}`)
                    }
                    if (wlTime == 0) {
                        setPresaleType("Public")
                        setPresaleTypes("Public")
                    } else if (wlTime >= endTime) {
                        setPresaleType("Private")
                        setPresaleTypes("Private")
                    } else if (wlTime != 0) {
                        setPresaleType("Private")
                        setPresaleTypes("Semi Public")
                    }
                } catch (e) {
                    // router.push(`/?chain=${paramChain}`)
                }
            } else {
                router.push(`/?chain=${paramChain}`)
            }
        } else {
            router.push(`/?chain=${paramChain}`)
        }
    }
    useEffect(() => {
        if (!router.isReady) return;
        init();
    }, [address]);
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

    function validURL(r) {
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
            "",
            `${canvasColor}|${premiumColor}|${premiumColor2}`,
            headerImage
        ];
    }

    async function handleWL(x) {
        const web3 = new Web3(thisWeb3);
        const presaleTools = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
        let isAdd = true
        if (x == "Delete Whitelist") {
            isAdd = false
        }
        try {
            await presaleTools.methods.setPresaleWls(id, totalAlc, isAdd).call({ from: address })
            await presaleTools.methods.setPresaleWls(id, totalAlc, isAdd).send({ from: address })
            toast("Success!")
            init()
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

    async function finishEdit() {
        const web3 = new Web3(thisWeb3);
        const PresaleContract = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
        try {
            let value = 0
            if (!isPremium && isPremiums) {
                const priceContract = new web3.eth.Contract(
                    presaleAdmin,
                    pContract[chain]["ctPresale"]
                );
                const feePrice = await priceContract.methods.GUINTS().call()
                value = +feePrice.ETH_EP_FEE
            }
            let timeTime = 0
            if (presaleTypes == "Private") {
                timeTime = endTime
            } else if (presaleTypes == "Semi Public") {
                timeTime = publicTime / 1000
            }
            await PresaleContract.methods
                .setPresaleValues(id, timeTime, minSpend, maxSpend, getSocial())
                .call({ from: address, value })
                .then(async function () {
                    await PresaleContract.methods
                        .setPresaleValues(id, timeTime, minSpend, maxSpend, getSocial())
                        .send({ from: address, value })
                        .then(async function () {
                            toast("Success!")
                            init()
                        })
                })
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
                            init()
                        })
                })
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
    async function cancelPresale() {
        const web3 = new Web3(thisWeb3);
        const presaleTools = new web3.eth.Contract(presaleAdmin, pContract[chain]["ctPresale"]);
        try {
            await presaleTools.methods.cancelPresale(id, false).call({ from: address })
            await presaleTools.methods.cancelPresale(id, false).send({ from: address })
            toast("Success!")
            init()
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

    async function addressValidation(e) {
        const web3 = new Web3();
        setAddresses(e)
        let addressesh = {};
        let totalErr = [];
        const values = e.split("\n");

        const addressSent = []

        values.map((address, idx) => {
            let isValid = false
            if (web3.utils.isAddress(address)) {
                addressSent.push(address)
                isValid = true
            }
            if (address == "") {
                isValid = true
            }

            addressesh[idx] = {
                address,
                isValid,
            };
        });
        setTotalAlc(addressSent)
        Object.keys(addressesh).map((address) => {
            if (!addressesh[address].isValid) totalErr.push(+address + 1);
        });
        if (e) {
            setAddressesError(totalErr);
        } else {
            setAddressesError([]);
        }
    }

    const [selected, setSelected] = useState("Presale")
    const [totalWhitelist, setTotalWhitelist] = useState([])
    const [isPopup, setIsPopup] = useState("")
    const [addresses, setAddresses] = useState()
    const [addressesError, setAddressesError] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [totalAlc, setTotalAlc] = useState()
    const [publicTime, setPublicTime] = useState(0)


    return (
        <>
            <LayoutAdmin
                headTitle="WeLaunch - Edit Presale"
                pageTitle=""
                pageTitleSub={""}
                pageclassName={"admin"}
                parent={"Edit Project"}
                child={"Edit Pool"}
                p={p}
            >
                <div className="upload-item section-padding" style={{ paddingTop: '25px' }}>
                    <div className="container-1">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body pt-0 pt-1 pb-0">
                                    <div className="d-flex gap-4 profile-menu">
                                        <div className="d-flex flex-column c-pointer">
                                            <span onClick={() => setSelected("Presale")} className={selected == "Presale" ? " bold active" : " bold"}>Presale</span>
                                            {selected == "Presale" && (
                                                <span className="actives"></span>
                                            )}
                                        </div>
                                        <div onClick={() => setSelected("Whitelist")} className="d-flex flex-column c-pointer" >
                                            <span className={selected == "Whitelist" ? " bold active" : " bold"}>Whitelist</span>
                                            {selected == "Whitelist" && (
                                                <span className="actives"></span>
                                            )}
                                        </div>

                                        <div onClick={() => setSelected("Finalize")} className="d-flex flex-column c-pointer" >
                                            <span className={selected == "Finalize" ? " bold active" : " bold"}>Finalize</span>
                                            {selected == "Finalize" && (
                                                <span className="actives"></span>
                                            )}
                                        </div>

                                        <div onClick={() => setSelected("Finalize")} className="col-2 c-pointer ms-auto">
                                            <button
                                                onClick={() =>
                                                    router.push(`/pool/${id}/?chain=${paramChain}`)
                                                }
                                                className="btn btn-outline w-100 btn-back second-gray"
                                            >
                                                Back
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {selected == "Presale" ? (
                            /* PRESALE EDIT */
                            <>
                                <div className="row justify-content-center">
                                    <div className="col-xxl-8 col-xl-8 col-lg-8">
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
                                                                            {isEndorse ? <img src="/images/items/endorse-charge.svg" /> : <img src="/images/items/endorse-charge-non-active.svg" />}
                                                                        </div>
                                                                        <div className="col-xl-9 col-12">
                                                                            <p className={isEndorse ? "mb-0 active" : "mb-0"}>Endorsement System</p>
                                                                            <p>The percentage you want to give to people bringing funds by recommending your presale with their special, unique link. Available only to TWEP Super Fans (wallets with least 50k TWEP).</p>
                                                                            <div className="row">
                                                                                <div className="row g-0 align-items-center">
                                                                                    {isEndorse ? <div className="big-radio-not-filled text-white me-3 c-pointer" 
                                                                                    // onClick={() => setEndorse(!isEndorse)}
                                                                                        ><img className="filled-check" src="/images/Fa/yes.svg" /> </div> : <div className="big-radio-not-filled not-filled text-white me-3 c-pointer" 
                                                                                        // onClick={() => setEndorse(!isEndorse)}
                                                                                        ></div>}
                                                                                    <div className="row g-0" style={{ width: '120px' }}>
                                                                                        <div className="col-7">
                                                                                            <input
                                                                                                type="number"
                                                                                                className="w-100 px-3 py-2 presale-input disable-b-hover rounded-start border-end-0"
                                                                                                value={endorsePercent}
                                                                                                disabled={true}
                                                                                                onChange={(e) => setEndorsePercent(e.target.value)}
                                                                                            />

                                                                                        </div>
                                                                                        <div className="col-5">
                                                                                            <a target="_blank" rel="noopener noreferrer" href={website} style={website ? {} : { pointerEvents: 'none' }}>
                                                                                                <input
                                                                                                    type="text"
                                                                                                    className={`px-3 py-2 w-100 text-center rounded-end  presale-input presale-input-label p-chain presale-input-image border-start-0`}
                                                                                                    readOnly={true}
                                                                                                    disabled={true}
                                                                                                    value="%"
                                                                                                />
                                                                                            </a>
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
                                            <h4 className="card-title mt-5 mb-2">WELAUNCH PREMIUM</h4>

                                            <div className="card-body">
                                                <div className="row">
                                                    {!isPremium && (
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">
                                                                EXTRA EXPOSURE PACK<span className="asterisk">*0.5 BNB</span> <span className="info"><i className="ri-information-fill"></i></span>
                                                            </label>
                                                            <div onClick={() => setIsPremiums(!isPremiums)} className="px-3 py-2 w-100 rounded presale-input presale-insurance c-pointer d-flex" style={isPremium ? { color: "#00B2FF" } : {}}>
                                                                {isPremiums ? (
                                                                    <img className="filled-check me-1 mb-0" style={{ width: '15px' }} src="/images/Fa/yes.svg" />
                                                                ) : (
                                                                    <span className="empty-check me-1"></span>
                                                                )}
                                                                <span>{isPremiums ? "On" : "Off"}</span>

                                                            </div>
                                                        </div>
                                                    )}
                                                    {isPremiums ? (
                                                        <>
                                                            <div className="col-12 mb-3">
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
                                                        </>
                                                    ) : ""}


                                                </div>


                                            </div>


                                        </div>
                                        <div className="card detail_card mb-0">
                                            <div className="card-body">
                                                <div className="row">

                                                    <div className="col-12">
                                                        <button
                                                            type="submit"
                                                            onClick={() => finishEdit()}
                                                            disabled={false}
                                                            className="btn x-btn mr-2 w-100"
                                                        >
                                                            Save Changes
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Card p={p} Datas={{ safe: { kyc: 'https://kyc.com', audit: 'https://audit.com' }, isFavorited: false, Filled: (softCapValue / 1e18), logoURL, startTime, endTime, name, presaleType: presaleMode, softCap: (softCapValue / 1e18), hardCap: (hardCapValue / 1e18), liqRate, lockup, contract: id, headerImage, premiumColor, isPremium, premiumColor2, canvasColor, edit: true }} />
                                </div>

                            </>
                        ) : selected == "Whitelist" ? (
                            /* WHITELIST EDIT */
                            <>
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="card detail_card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <label className="form-label">
                                                            Presale Type
                                                            <span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                                                        </label>
                                                        <UncontrolledDropdown className="option" >
                                                            <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                                                                <div className="d-flex justify-content-between" >
                                                                    <div className="option">{presaleTypes}</div>
                                                                    <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                                                                </div>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="w-100 rounded presale-dropdown" >
                                                                <DropdownItem className={presaleTypes == "Public" ? "item active" : "item"} onClick={() => setPresaleTypes("Public")} >
                                                                    Public
                                                                </DropdownItem>
                                                                <DropdownItem className={presaleTypes == "Private" ? "item active" : "item"} onClick={() => setPresaleTypes("Private")} >
                                                                    Private
                                                                </DropdownItem>
                                                                <DropdownItem className={presaleTypes == "Semi Public" ? "item active" : "item"} onClick={() => setPresaleTypes("Semi Public")}>
                                                                    Semi Public
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </div>


                                                {presaleTypes == "Semi Public" && (
                                                    <div className="row">
                                                        <div className="col-12 col-md-6">
                                                            <label className="form-label">
                                                                Public Time<span className="asterisk">*</span>
                                                            </label>
                                                            <div className="row g-0">
                                                                <div className="col-10">
                                                                    <DatePicker
                                                                        selected={publicTime}
                                                                        showTimeSelect
                                                                        dateFormat="MMMM d, yyyy h:mm aa"
                                                                        className="px-3 py-2 w-100 rounded-start border-end-0 presale-input presale-date"
                                                                        minDate={getDateNow()}
                                                                        onChange={(e) => setPublicTime(e.getTime())}
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
                                                            {publicTime > endTime && (
                                                                <div
                                                                    className="invalid-feedback"
                                                                    style={{ display: "block" }}
                                                                >
                                                                    Public Time must be under End Time
                                                                </div>
                                                            )}
                                                        </div>


                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {isPopup && (
                                            <div className="ant-modal-root" style={{ display: "block" }}>
                                                <div className="ant-modal-mask"></div>
                                                <div className="ant-modal-wrap">
                                                    <div className="ant-modal antd-modal-content-border-15" style={{ width: "520px", transformOrigin: "805.5px -47px" }} >
                                                        <div className="ant-modal-content">
                                                            <div className="ant-modal-body">
                                                                <div className="sc-bdfBQB kkYuxV">
                                                                    <div className="row-between" style={{ justifyContent: "space-between" }}>
                                                                        <p className="titlem">{isPopup}</p>
                                                                        <p className="text-white c-pointer" style={{ marginBottom: 'unset' }} onClick={() => setIsPopup("") + setAddresses()}>X</p>
                                                                    </div>
                                                                    <div className="container-modal">
                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <textarea
                                                                                    type="text"
                                                                                    style={{ padding: "20px", color: "#fff", height: '150px' }}
                                                                                    className="w-100 px-3 py-2 normal-input rounded"
                                                                                    placeholder={
                                                                                        "Format : Address \nExample:\n0x0000000000000000000000000000000000000001\n0x0000000000000000000000000000000000000001\n0x0000000000000000000000000000000000000001"
                                                                                    }
                                                                                    value={addresses}
                                                                                    onChange={(e) =>
                                                                                        addressValidation(e.target.value)}
                                                                                />
                                                                                {addresses && addresses == "" && (
                                                                                    <div
                                                                                        className="invalid-feedback"
                                                                                        style={{ display: 'block' }}
                                                                                    >
                                                                                        Recipients allocation is required
                                                                                    </div>
                                                                                )}

                                                                                {addresses && addresses != "" && addressesError ? (
                                                                                    <div
                                                                                        className="invalid-feedback"
                                                                                        style={{ display: "block" }}
                                                                                    >

                                                                                        {addressesError.length && addressesError[0] != ""
                                                                                            ? "Address invalid on line " +
                                                                                            addressesError.join(", ")
                                                                                            : ""}
                                                                                    </div>
                                                                                ) : ""}
                                                                            </div>

                                                                        </div>
                                                                        <div className="row mt-4">
                                                                            <div className="d-flex justify-content-end">
                                                                                <button type="submit" disabled={isLoading || !totalAlc ? true : false} className="btn x-btn mr-2 w-50" onClick={() => handleWL(isPopup)}>
                                                                                    {isLoading && (<span className="spinner-border text-white load loading" />)}
                                                                                    Save</button>
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
                                        {presaleTypes != presaleType && (
                                            <div className="card detail_card">
                                                <div className="card-body">
                                                    <div className="row">

                                                        <div className="col-12">
                                                            <button
                                                                type="submit"
                                                                onClick={() => finishEdit()}
                                                                disabled={presaleTypes == "Semi Public" && publicTime > endTime}
                                                                className="btn x-btn mr-2 w-100"
                                                            >
                                                                Save Changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {wlTime > 0 && presaleTypes != "Public" && (
                                            <div className="card detail_card mb-0">
                                                <div className="card-body">
                                                    <div className="row">

                                                        <div className="col-12">
                                                            <label className="form-label">Whitelist List<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <textarea
                                                                        type="text"
                                                                        style={{ padding: "20px", color: "#fff", height: '150px' }}
                                                                        className="w-100 px-3 py-2 normal-input rounded"
                                                                        readOnly
                                                                        value={totalWhitelist.join("\n")}
                                                                    />
                                                                </div>

                                                            </div>
                                                            <div className="d-flex gap-3 mt-3">
                                                                <button type="submit" className="btn x-btn mr-2 w-100" onClick={() => setIsPopup("Add Whitelist")}
                                                                >Add Whitelist</button>
                                                                <button type="submit" className="btn x-btn mr-2 w-100" onClick={() => setIsPopup("Delete Whitelist")}
                                                                >Delete Whitelist</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </>
                        ) : (
                            <>
                                <div className="card detail_card">
                                    <div className="card-body">
                                        <div className="row">

                                            <div className="d-flex gap-2">
                                                <button
                                                    type="submit"
                                                    onClick={() => finalize()}
                                                    className="btn x-btn mr-2 w-100"
                                                    disabled={isCanceled}
                                                >
                                                    Finalize
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={() => cancelPresale()}
                                                    disabled={isCanceled || isSuccess}
                                                    className={(isCanceled || isSuccess) ? "btn x-btn mr-2 w-100 red disabled" : "btn x-btn mr-2 w-100 red"}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </>
                        )}
                    </div></div>
            </LayoutAdmin>
        </>
    )
}