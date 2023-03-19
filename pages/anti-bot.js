import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { useRouter } from "next/router";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import lang from "/component/lang.json"
import { styled } from '@mui/material/styles';
import { antibot, IERC20 } from "/components/web3/abi"
import { toast } from 'react-toastify';
function Home({ p }) {
  const {
    address,
    userProfile,
    BlurAddress,
    BlurBalance,
    chain,
    handleChain,
    connected,
    extractErrorCode,
    balance,
    rpcURL,
    thisWeb3,
    pContract,
  } = p;
  const router = useRouter();
  const paramChain = router.query.chain
  const [isLoading, setIsLoading] = useState(false);
  const [contract, setContract] = useState(" ");
  const [routers, setRouter] = useState("Pancakeswap");
  const [isContract, setIsContract] = useState(true);
  const [isAntibotContract, setIsAntibotContract] = useState(false);
  const [addresses, setAddresses] = useState()
  const [addressesError, setAddressesError] = useState()
  const [currentBlock, setCurrentBlock] = useState(0)

  const [isPopup, setIsPopup] = useState("")
  const [totalAlc, setTotalAlc] = useState()
  const [tOwner, settOwner] = useState("0x0000000000000000000000000000000000000000")
  const [pair, setPair] = useState("0x0000000000000000000000000000000000000000")
  const [ready, setReady] = useState(false)
  const [amountLimit, setAmountLimit] = useState(" ")
  const [amountPerBlock, setAmountPerBlock] = useState(" ")
  const [limitTradePerBlock, setLimitTradePerBlock] = useState(" ")
  const [blockToDisable, setBlockToDisable] = useState(" ")
  const [timeLimit, setTimeLimit] = useState(0)
  const [blockLeft, setBlockLeft] = useState(0)
  const [totalWhitelist, setTotalWhitelist] = useState([])
  const [totalBlacklist, setTotalBlacklist] = useState([])
  const [symbol, setSymbol] = useState()
  
  const address0 = "0x0000000000000000000000000000000000000000"
  function handleRouter() {
    let x = 0
    let result = ""

    swapRouter.map((item, i) => {
      if (item.chain == paramChain) {
        x = i
      }
    })
    for (let i = 0; i < swapRouter[x].router.length; i++) {
      if(swapRouter[x].router[i].name == routers) {
        result = swapRouter[x].router[i].address
      }
    }
    return result
  }

  const wbnb = {
    "BSC-tsnt" : "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"
  }
  async function execute() {
    setIsLoading(true)
    try{
      const web3 = thisWeb3
      const adrparam = [address,wbnb[paramChain],handleRouter(),address0]
      const uintparam = [0, blockToDisable, amountLimit, amountPerBlock,0,0,0,limitTradePerBlock]
      const antiBotContract = new web3.eth.Contract(antibot, pContract[chain].antibot);
      await antiBotContract.methods.setValues(contract,adrparam,uintparam).call({from:address})
      setIsLoading(false)
    }catch(e){
      setIsLoading(false);
      try{
        toast.error(extractErrorCode(e));
      }catch(_){
        try{
          toast.error(e.message);
        }catch(er){
          toast.error("Something Error!");
        }
      }
    }
  }

  async function handleList() {
    setIsLoading(true)
    let isWhitelist = true
    let isAdd = true
    if(isPopup.split(" ")[0] != "Add") {
      isAdd = false
    }
    if(isPopup.split(" ")[1] != "Whitelist") {
      isWhitelist = false
    }
      try{
        const web3 = thisWeb3
        const antiBotContract = new web3.eth.Contract(antibot, pContract[chain].antibot);
        if(isWhitelist){
            if(isAdd){
              await antiBotContract.methods.setWls(contract,totalAlc,true).call({from:address})
              await antiBotContract.methods.setWls(contract,totalAlc,true).send({from:address})
              checkContractValid(contract)
            }else{
              await antiBotContract.methods.setWls(contract,totalAlc,false).call({from:address})
              await antiBotContract.methods.setWls(contract,totalAlc,false).send({from:address})
              checkContractValid(contract)
            }
        }else{
          if(isAdd){
            await antiBotContract.methods.setBls(contract,totalAlc,true).call({from:address})
            await antiBotContract.methods.setBls(contract,totalAlc,true).send({from:address})
            checkContractValid(contract)
          }else{
            await antiBotContract.methods.setBls(contract,totalAlc,false).call({from:address})
            await antiBotContract.methods.setBls(contract,totalAlc,false).send({from:address})
            checkContractValid(contract)
          }
        }
        setIsLoading(false)
      }catch(e){
        setIsLoading(false);
        try{
          toast.error(extractErrorCode(e));
        }catch(_){
          try{
            toast.error(e.message);
          }catch(er){
            toast.error("Something Error!");
          }
        }
      }
  }

  async function init() {
    const web3 = new Web3(rpcURL)
    setCurrentBlock(await web3.eth.getBlockNumber())
  }

  useEffect(() => {
    if (!rpcURL) return
    init()
  }, [rpcURL, address]);




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

  async function checkContractValid(x) {
    setContract(x)
    const web3 = new Web3(thisWeb3)
    if (web3.utils.isAddress(x)) {
      const antiBotContract = new web3.eth.Contract(antibot, pContract[chain].antibot);
      const tokenContract = new web3.eth.Contract(IERC20, x);
      try {
        const ownerToken = await antiBotContract.methods.AP(x).call()
        const boolToken = await antiBotContract.methods.BP(x).call()
        const getWhitelist = await antiBotContract.methods.getWls(x,x,1,0).call()
        const getBlackist = await antiBotContract.methods.getBls(x,x,1,0).call()
        const symbol = await tokenContract.methods.symbol().call()
        setTotalWhitelist(getWhitelist[3])
        setTotalBlacklist(getBlackist[3])
        setSymbol(symbol)
        setReady(boolToken.ready)
        settOwner(ownerToken.tOwner)
        if (ownerToken.tOwner == address) {
          setIsAntibotContract(true)
        } else if (ownerToken.tOwner == address0) {
          setIsAntibotContract(false)
        } else {
          setIsAntibotContract(true)
        }
        setIsContract(true)
        return true

      } catch (e) {
        setIsAntibotContract(false)
        setIsContract(false)
        return false
      }

    } else {
      setIsAntibotContract(false)
      setIsContract(false)
      return false
    }
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
    let result = []
    swapRouter.map((item, i) => {
      if (item.chain == paramChain) {
        x = i
      }
    })
    for (let i = 0; i < swapRouter[x].router.length; i++) {
      result.push(<DropdownItem className={swapRouter[x].router[i].name == routers ? "item active" : "item"} onClick={() => setRouter(swapRouter[x].router[i].name)}>
        {swapRouter[x].router[i].name}
      </DropdownItem>)
    }
    return result
  }
  const [isAntibot, setisAntibot] = useState(false)

  if (!isAntibot) {
    return (
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
          <div className="col-12">
            <h4 className="card-title mb-2">Anti-Bot</h4>
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="col-12">
                      <label className="form-label">Contract Address<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                      <input
                        type="text"
                        id="name1"
                        autoComplete="nope"
                        className="px-3 py-2 normal-input rounded w-100 "
                        value={contract != " " ? contract : ""}
                        onChange={(e) =>
                          checkContractValid(e.target.value)
                        }
                      />
                      {
                        !isContract && contract != " " && contract != "" && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Contract not valid!
                          </div>
                        )
                      }

                      {
                        isContract && contract != " " && contract != "" && !isAntibotContract && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            This token is not implement WelaunchAntiBot contract
                          </div>
                        )
                      }
                      {
                        isContract && contract != " " && contract != "" && isAntibotContract && tOwner != address && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            You are not owner of token!
                          </div>
                        )
                      }
                      {contract != " " && contract == "" && (
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block' }}
                        >
                          {lang[p.lang].Params[1]} {lang[p.lang].Params[5]}
                        </div>
                      )}

                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center pt-5">
                  <button type="submit" className="btn x-btn mr-2 w-50" disabled={tOwner != address || !isContract || !isAntibotContract ? true : false} onClick={() => setisAntibot(true)}
                  >Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    )
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
            <h4 className="card-title mb-2">Anti-Bot</h4>
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label className="form-label">Router<span className="ms-1 asterisk">0.1 {handleChain('symbol')}</span></label>
                    <UncontrolledDropdown className="option" >
                      <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                        <div className="d-flex justify-content-between" >
                          <div className="option">
                            {routers}
                          </div>
                          <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className="w-100 rounded presale-dropdown">
                        {routerAddress()}

                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>



                </div>

                <div className="row">
                  <div className="col-12 ">
                    <label className="form-label">Pair<span className="asterisk">*</span> <span className="info">
                    <WeToolTip title={"Your token pair"} arrow>
                        <i className="ri-information-fill"></i>
                      </WeToolTip>
                      </span></label>
                    <UncontrolledDropdown className="option" >
                      <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                        <div className="d-flex justify-content-between" >
                          <div className="option">
                            BNB
                          </div>
                          <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className="w-100 rounded presale-dropdown">
                        <DropdownItem className="item active">BNB</DropdownItem>

                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
                <div className="row">


                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">Amount Limit Per Trade<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                    <input
                      type="number"
                      id="name1"
                      autoComplete="nope"
                      className="px-3 py-2 normal-input rounded w-100 "
                      value={amountLimit == " " ? "" : amountLimit}
                      onChange={(e) => e.target.value >= 0 ? setAmountLimit(e.target.value) : setAmountLimit(0)}
                    />

                    {amountLimit != " " && amountLimit == ""  && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Amount limit per trade cannot be blank
                      </div>
                    )}

                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">Amount to Be Added Per Block<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                    <input
                      type="text"
                      id="symbol1"
                      autoComplete="nope"
                      className="px-3 py-2 normal-input rounded w-100 "
                      value={amountPerBlock == " " ? "" : amountPerBlock}
                      onChange={(e) => e.target.value >= 0 ? setAmountPerBlock(e.target.value) : setAmountPerBlock(0)}
                    />
                    {amountPerBlock != " " && amountPerBlock == "" && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Amount to Be Added Per Block cannot be blank
                      </div>
                    )}

                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">Time Limit Per Trade <span className="asterisk">* <span className="info">
                      <WeToolTip title={"By Second"} arrow>
                        <i className="ri-information-fill"></i>
                      </WeToolTip>
                    </span></span></label>
                    <input
                      type="text"
                      id="symbol1"
                      autoComplete="nope"
                      className="px-3 py-2 normal-input rounded w-100 "
                      value={limitTradePerBlock == " " ? "" : limitTradePerBlock}
                      onChange={(e) => e.target.value >= 0 ? setLimitTradePerBlock(e.target.value) : setLimitTradePerBlock(0)}
                    />
                    {limitTradePerBlock != " " && limitTradePerBlock == "" && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Time Limit Per Trade cannot be blank
                      </div>
                    )}

                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">Block Number to Disable Anti-Bot <span className="asterisk">* <span className="info">
                      <WeToolTip title={"Listing is Block #1"} arrow>
                        <i className="ri-information-fill"></i>
                      </WeToolTip>
                    </span></span></label>
                    <input
                      type="text"
                      id="symbol1"
                      autoComplete="nope"
                      className="px-3 py-2 normal-input rounded w-100 "
                      value={blockToDisable == " " ? "" : blockToDisable}
                      onChange={(e) => e.target.value >= 0 ? setBlockToDisable(e.target.value) : setBlockToDisable(0)}
                    />
                    {blockToDisable != " " && blockToDisable == "" && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Block Number to Disable Anti-Bot cannot be blank
                      </div>
                    )}

                  </div>
                </div>
                <div className="row mt-4">
                  <div className="d-flex gap-2">
                    <button type="submit" disabled={isLoading ? true : false} className="btn x-btn mr-2 w-100" onClick={() => setisAntibot(false)}
                    >Back</button>
                    <button type="submit" disabled={isLoading ? true : false} className="btn x-btn mr-2 w-100" onClick={() => execute()}
                    >{isLoading && (<span className="spinner-border text-white load loading" />)}Save</button>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="card-title mb-2">Whitelist</h4>
            <div className="card border-0">
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
                          value={totalWhitelist}
                        />
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="d-flex gap-2">
                    <button type="submit"  className="btn x-btn mr-2 w-100" onClick={() => setIsPopup("Add Whitelist") }
                    >Add Whitelist</button>
                    <button type="submit" className="btn x-btn mr-2 w-100" onClick={() => setIsPopup("Delete Whitelist") }
                    >Delete Whitelist</button>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="card-title mb-2">Blacklist</h4>
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label className="form-label">Blacklist List<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                    <div className="row">
                      <div className="col-12">
                        <textarea
                          type="text"
                          style={{ padding: "20px", color: "#fff", height: '150px' }}
                          className="w-100 px-3 py-2 normal-input rounded"
                          value={totalBlacklist}
                          readOnly
                        />
                       
                      </div>

                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="d-flex gap-2">
                  <button type="submit"  className="btn x-btn mr-2 w-100" onClick={() => setIsPopup("Add Blacklist") }
                    >Add Blacklist</button>
                    <button type="submit"  className="btn x-btn mr-2 w-100" onClick={() => setIsPopup("Delete Blacklist") }
                    >Delete Blacklist</button>
                  </div>
                </div>
              </div>
            </div>
            {isPopup && (
              <div className="ant-modal-root" style={{ display: "block" }}>
              <div className="ant-modal-mask"></div>
              <div className="ant-modal-wrap">
                <div className="ant-modal antd-modal-content-border-15"style={{ width: "520px", transformOrigin: "805.5px -47px" }} >
                  <div className="ant-modal-content">
                    <div className="ant-modal-body">
                      <div className="sc-bdfBQB kkYuxV">
                        <div className="row-between" style={{ justifyContent: "space-between" }}>
                          <p className="titlem">{isPopup}</p>
                          <p className="text-white c-pointer" style={{ marginBottom: 'unset'}} onClick={() => setIsPopup("") + setAddresses()}>X</p>
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
                    <button type="submit" disabled={isLoading || !totalAlc ? true : false} className="btn x-btn mr-2 w-50" onClick={() => handleList()}>
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
          </div>
          <div className="col-xxl-4 col-xl-4 col-lg-6">
            <h4 className="card-title mb-2 vis-n">Preview</h4>
            <div className="card items border-0">
              <div className="card-body">


                <div className="infos_i">

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Router</div>
                    <div className={`val right-presalerate `} >
                      <img src={
                        routers == "Bakeryswap" ? "/images/Fa/bakeryswap.svg" :
                          routers == "Biswap" ? "/images/Fa/biswap.png" :
                            routers == "Bakeryswap" ? "/images/Fa/bakeryswap.svg" :
                              routers == "BabyDogeswap" ? "/images/Fa/babydogeswap.png" : "/images/Fa/pancakeswap.png"
                      } alt="Router" className="pcs" />
                      {routers}
                    </div>
                  </div>
                  <>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Pair</div>
                      <div
                        className={`val right-presalerate`}>
                        {`${symbol}/BNB`}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Status</div>
                      <div
                        className={`val right-presalerate`}>
                        {!ready ? pair == address0 ? "Not Active" : "Waiting Liqudity" : "Active"}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Amount Limit</div>
                      <div
                        className={`val right-presalerate`}>
                        0
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Time Limit</div>
                      <div
                        className={`val right-presalerate`}>
                        0
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Blocks left to disable	</div>
                      <div
                        className={`val right-presalerate`}>
                        0
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Current Block</div>
                      <div
                        className={`val right-presalerate`}>
                        {currentBlock}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Total Whitelist</div>
                      <div
                        className={`val right-presalerate`}>
                        {(totalWhitelist).length}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Total Blacklist</div>
                      <div
                        className={`val right-presalerate`}>
                        {(totalBlacklist).length}
                      </div>
                    </div>
                  </>


                </div>
              </div>
            </div>

            <div className="card items">
              <div className="card-body">

                <div className="infos_i">
                  <div className="d-flex align-items-center  py-2">
                    Router and Pair can be edited only once!<br /><br />Amount to Be Added Per Block can be edited before add Liquidity!
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
