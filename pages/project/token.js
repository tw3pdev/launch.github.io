import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { tokenFactoryAbi } from "/components/web3/abi"
import { useRouter } from "next/router";
import { Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import lang from "/component/lang.json"
import { toast } from 'react-toastify';

function Home({ p }) {
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
  const paramChain = router.query.chain
  const [marketingAddress, setMarketingAddress] = useState(null);
  const [marketingPercent, setMarketingPercent] = useState(" ");
  const [createFee, setCreateFee] = useState(10000000000000000);
  const [generateYield, setGenerateYield] = useState(" ");
  const [generateLiq, setGenerateLiq] = useState(" ");

  const [rewardToken, setRewardToken] = useState(null);
  const [tokenDividen, setTokenDividen] = useState(" ");

  const [tokenRewardFee, setTokenRewardFee] = useState(" ");
  const [autoAddLiq, setAutoAddLiq] = useState(" ");

  const [liqFee, setLiqFee] = useState(" ");
  const [buyBackFee, setBuyBackFee] = useState(" ");
  const [reflectionFee, setReflectionFee] = useState(" ");
  const [feeDenominator, setFeeDenominator] = useState(" ");


  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(" ");
  const [symbol, setSymbol] = useState(" ");
  const [decimal, setDecimal] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [tokenType, setTokenType] = useState(0);


  const [routers, setRouters] = useState("Pancakeswap");
  const [tx, setTx] = useState("")

  function routerAddress() {
    let x = 0
    let result = []
    swapRouter.map((item, i) => {
      if (item.chain == paramChain) {
        x = i
      }
    })
    for (let i = 0; i < swapRouter[x].router.length; i++) {
      result.push(<DropdownItem className={swapRouter[x].router[i].name == routers ? "item active" : "item"} onClick={() => setRouters(swapRouter[x].router[i].name)}>
        {swapRouter[x].router[i].name}
      </DropdownItem>)
    }
    return result
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
  const address0 = "0x0000000000000000000000000000000000000000"
  async function execute(e) {
    if(decimal < 2) return
    e.target.classList.add("disabled");
    setIsLoading(true)
    try {
      const web3 = thisWeb3
      const connectedChain = web3.utils.numberToHex(await web3.eth.getChainId())
      if(connectedChain != chain) {
        e.target.classList.remove("disabled");
        setIsLoading(false)
        toast.error("Wrong Chain!");
        return
      }
      const tokenContract = new web3.eth.Contract(tokenFactoryAbi, pContract[chain].tokenFactory)
      let param 
      let value = 0

      if(tokenType == 0) {
        param = [1,name,symbol,[address],[decimal,totalSupply],[]]
        value = await tokenContract.methods._makeFees(1).call()
      }else if(tokenType == 1) {
        param = [2,name,symbol,[address,handleRouter(),marketingAddress, address0],[9,10000000,+bn(generateYield).multipliedBy(100),+bn(generateLiq).multipliedBy(100),+bn(marketingPercent).multipliedBy(100)],[]]
        value = await tokenContract.methods._makeFees(2).call()
      }else if(tokenType == 2) {
        param = [3,name,symbol,[address,rewardToken,handleRouter(),marketingAddress, address0, address0],[decimal,+bn(totalSupply).multipliedBy(10 ** decimal),+bn(tokenRewardFee).multipliedBy(1),+bn(autoAddLiq).multipliedBy(1),+bn(marketingPercent).multipliedBy(1), +bn(tokenDividen).multipliedBy(1)],[]]
        value = await tokenContract.methods._makeFees(3).call()
      }else if(tokenType == 3) {
        param = [4,name,symbol,[address,rewardToken,handleRouter(), marketingAddress],[decimal,totalSupply,liqFee,buyBackFee,reflectionFee, marketingPercent, feeDenominator],[]]
        value = await tokenContract.methods._makeFees(4).call()
      }
      tokenContract.methods.makeToken(...param).call({from:address, value}).then(() => {
        tokenContract.methods.makeToken(...param).send({from:address, value}).then((result) => {
          setIsLoading(false)
          e.target.classList.remove("disabled");
          setTx(result.transactionHash)
          toast("Success");
        }).catch((x) => {
          setIsLoading(false)
          e.target.classList.remove("disabled");
          try{
            toast.error(extractErrorCode(x));
          }catch(_) {
            toast.error(x.message);
          }
        })
      }).catch((x) => {
        setIsLoading(false)
        e.target.classList.remove("disabled");
        try{
          toast.error(extractErrorCode(x));
        }catch(_) {
          toast.error(x.message);
        }
      })
    } catch (x) {
      e.target.classList.remove("disabled");
      setIsLoading(false)
    }
  }

  function checkContract(e) {
    const web3 = new Web3()
    return web3.utils.isAddress(e)
  }

  function numValidation(e) {
    if (e >= 0.01 && e <= 100) {
      return true
    } else {
      return false
    }
  }
  useEffect(() => { }, [rpcURL, address]);

  const nameRef = useRef(null);
  const symbolRef = useRef(null);
  const decimalRef = useRef(null);
  const totalSupplyRef = useRef(null);
  const routerRef = useRef(null);
  const generateYieldRef = useRef(null);
  const generateLiqRef = useRef(null);
  const marketingAddressRef = useRef(null);
  const marketingPercentRef = useRef(null);

  const rewardTokenRef = useRef(null);
  const minDividendRef = useRef(null);
  const rewardFeeRef = useRef(null);
  const addLiqRef = useRef(null);

  const liqFeeRef = useRef(null);
  const buyBackFeeRef = useRef(null);
  const ReflectionFeeRef = useRef(null);
  const feeDenominatorRef = useRef(null);




  const tokenTypeRef = useRef(null);
  const [oneActive, setOneActive] = useState("");
  const [setHover, setHovered] = useState("");

  const handleRef = (e) => {
    if (e.current.state) {
      e.current.toggle("isOpen", true)
    } else {
      e.current.focus();
    }
  };

  async function handleHover(e, x) {
    if (x) {
      setOneActive(e.target.id);
    } else {
      setOneActive("");
    }
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
            <h4 className="card-title mb-2">{lang[p.lang].Token[0]}</h4>
            <div className="card detail_card">
                      <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label className="form-label">{lang[p.lang].Token[1]}<span className="ms-1 asterisk">0.1 {handleChain('symbol')}</span></label>
                    <UncontrolledDropdown className="option" ref={tokenTypeRef} >
                      <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                        <div className="d-flex justify-content-between" >
                          <div className="option">
                            {tokenType == 0 && lang[p.lang].Token[2]}
                            {tokenType == 1 && lang[p.lang].Token[3]}
                            {tokenType == 2 && lang[p.lang].Token[4]}
                            {tokenType == 3 && lang[p.lang].Token[5]}
                          </div>
                          <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className="w-100 rounded presale-dropdown">
                        <DropdownItem className={tokenType == 0 ? "item active" : "item"} onClick={() => setTokenType(0)}>
                        {lang[p.lang].Token[2]}
                        </DropdownItem>
                        <DropdownItem className={tokenType == 1 ? "item active" : "item"} onClick={() => setTokenType(1)}>
                        {lang[p.lang].Token[3]}
                        </DropdownItem>
                        <DropdownItem className={tokenType == 2 ? "item active" : "item"} onClick={() => setTokenType(2)}>
                        {lang[p.lang].Token[4]}
                        </DropdownItem>
                        <DropdownItem className={tokenType == 3 ? "item active" : "item"} onClick={() => setTokenType(3)}>
                        {lang[p.lang].Token[5]}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
                <div className="row">

                <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">{lang[p.lang].Params[1]}<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                    <input
                      type="text"
                      id="name1"
                      autoComplete="nope"
                      onMouseEnter={(e) => handleHover(e, true)}
                      onMouseLeave={(e) => handleHover(e, false)}
                      ref={nameRef}
                      className="px-3 py-2 normal-input rounded w-100 "
                      style={setHover == "Name" ? { border: '2px solid #252A46' } : {}}
                      value={name != " " ? name : ""}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />

                    {name != " " && name == "" && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {lang[p.lang].Params[1]} {lang[p.lang].Params[5]}
                      </div>
                    )}

                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">{lang[p.lang].Params[2]}<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                    <input
                      type="text"
                      id="symbol1"
                      autoComplete="nope"
                      onMouseEnter={(e) => handleHover(e, true)}
                      onMouseLeave={(e) => handleHover(e, false)}
                      ref={symbolRef}
                      className="px-3 py-2 normal-input rounded w-100 "
                      style={setHover == "Symbol" ? { border: '2px solid #252A46' } : {}}
                      value={symbol == " " ? "" : symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                    {symbol != " " && symbol == "" && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {lang[p.lang].Params[2]} {lang[p.lang].Params[5]}
                      </div>
                    )}

                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">{lang[p.lang].Params[3]}<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                    <input
                      type="number"
                      id="decimal1"
                      autoComplete="nope"
                      onMouseEnter={(e) => handleHover(e, true)}
                      onMouseLeave={(e) => handleHover(e, false)}
                      ref={decimalRef}
                      className="px-3 py-2 normal-input rounded w-100 "
                      disabled={tokenType == 1 ? true : false}
                      style={setHover == "Decimal" ? { border: '2px solid #252A46' } : {}}
                      value={tokenType != 1 ? decimal == " " ? "" : decimal : 9}
                      onChange={(e) => setDecimal(Number(e.target.value))}
                    />
                    {decimal != null && decimal == 0 && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                       {lang[p.lang].Params[3]} {lang[p.lang].Params[5]}
                      </div>
                    )}

                    {decimal != 0 && decimal != null && decimal < 2 && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                       {lang[p.lang].Params[6]} 2  {lang[p.lang].Params[3]}
                      </div>
                    )}

                    {decimal != 0 && decimal != null && decimal > 64 && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {lang[p.lang].Params[7]} 64 {lang[p.lang].Params[3]}
                      </div>
                    )}

                  </div>

                  <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                    <label className="form-label">{lang[p.lang].Params[4]}<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                    <input
                      type="number"
                      id="totalSupply1"
                      autoComplete="nope"
                      onMouseEnter={(e) => handleHover(e, true)}
                      onMouseLeave={(e) => handleHover(e, false)}
                      ref={totalSupplyRef}
                      disabled={tokenType == 1 ? true : false}
                      className="px-3 py-2 normal-input rounded w-100 "
                      style={setHover == "totalSupply" ? { border: '2px solid #252A46' } : {}}
                      value={tokenType != 1 ? totalSupply == " " ? "" : totalSupply : 10000000}
                      onChange={(e) => setTotalSupply(e.target.value)}
                    />
                    {totalSupply != " " && totalSupply == "" && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {lang[p.lang].Params[4]} {lang[p.lang].Params[5]}
                      </div>
                    )}

                    {totalSupply > 10000000000000000000000000000000 && (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        {lang[p.lang].Params[4]} {lang[p.lang].Params[8]}
                      </div>
                    )}

                  </div>

                  {tokenType != 0 && (
                    <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                      <label className="form-label">Router<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                      <UncontrolledDropdown className="option" ref={routerRef} >
                        <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                          <div className="d-flex justify-content-between">
                          {routers}
                            <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                          </div>
                        </DropdownToggle>
                        <DropdownMenu className="w-100 rounded presale-dropdown">
                                                      {routerAddress()}

                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  )}
                  {tokenType == 1 && (
                    <>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Fee to generate yield (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="Yield1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={generateYieldRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "generateYield" ? { border: '2px solid #252A46' } : {}}
                          value={generateYield}
                          onChange={(e) => e.target.value ? setGenerateYield(Number(e.target.value)) : setGenerateYield("")}
                        />
                        {generateYield != " " && generateYield == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {generateYield != 0 && generateYield < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {generateYield != 0 && generateYield > 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 100%
                          </div>
                        )}

                      </div>

                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Fee to generate liquidity (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="Liq1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={generateLiqRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "generateLiq" ? { border: '2px solid #252A46' } : {}}
                          value={generateLiq}
                          onChange={(e) => e.target.value ? setGenerateLiq(Number(e.target.value)) : setGenerateLiq("")}
                        />
                        {generateLiq != " " && generateLiq == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {generateLiq != 0 && generateLiq < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {generateLiq != 0 && generateLiq > 25 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 25%
                          </div>
                        )}


                      </div>

                    </>
                  )}
                  {tokenType == 2 || tokenType == 3 ? (
                    <>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Reward token<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="text"
                          id="MarketingAddress1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={marketingAddressRef}
                          className="px-3 py-2 normal-input rounded w-100  isAddress"
                          style={setHover == "marketingAddress" ? { border: '2px solid #252A46' } : {}}
                          value={rewardToken}
                          onChange={(e) => e.target.value ? setRewardToken(e.target.value) : setRewardToken("")}
                        />
                        {rewardToken != null && rewardToken == "" && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {rewardToken != null && rewardToken != "" && !checkContract(rewardToken) && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Address Invalid
                          </div>
                        )}

                      </div>
                    </>
                  ) : ""}

                  {tokenType == 2 && (
                    <>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Minimum token balance for dividends<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="minDividend1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={minDividendRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "minDividend" ? { border: '2px solid #252A46' } : {}}
                          value={tokenDividen}
                          onChange={(e) => e.target.value ? setTokenDividen(Number(e.target.value)) : setTokenDividen("")}
                        />
                        {tokenDividen != " " && tokenDividen == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {tokenDividen != 0 && tokenDividen < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {tokenDividen != 0 && tokenDividen > totalSupply * 0.1 / 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 0.1% from Total Supply
                          </div>
                        )}


                      </div>


                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Token Reward Fee (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="rewardFee1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={rewardFeeRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "rewardFee" ? { border: '2px solid #252A46' } : {}}
                          value={tokenRewardFee}
                          onChange={(e) => e.target.value ? setTokenRewardFee(Number(e.target.value)) : setTokenRewardFee("")}
                        />
                        {tokenRewardFee != " " && tokenRewardFee == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {tokenRewardFee != 0 && tokenRewardFee < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {tokenRewardFee != 0 && tokenRewardFee > 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 100%
                          </div>
                        )}


                      </div>

                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Auto add liquidity (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="addLiq1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={addLiqRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "addLiq" ? { border: '2px solid #252A46' } : {}}
                          value={autoAddLiq}
                          onChange={(e) => e.target.value ? setAutoAddLiq(Number(e.target.value)) : setAutoAddLiq("")}
                        />
                        {autoAddLiq != " " && autoAddLiq == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {autoAddLiq != 0 && autoAddLiq < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {autoAddLiq != 0 && autoAddLiq > 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 100%
                          </div>
                        )}


                      </div>

                    </>
                  )}

                  {tokenType == 3 && (
                    <>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Liquidity Fee (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="liqFee1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={liqFeeRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "liqFee" ? { border: '2px solid #252A46' } : {}}
                          value={liqFee}
                          onChange={(e) => e.target.value ? setLiqFee(Number(e.target.value)) : setLiqFee("")}
                        />
                        {liqFee != " " && liqFee == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {liqFee != 0 && liqFee < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {liqFee != 0 && liqFee > 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 100% from Total Supply
                          </div>
                        )}


                      </div>


                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Buyback Fee (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="buyBackFee1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={buyBackFeeRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "buyBackFee" ? { border: '2px solid #252A46' } : {}}
                          value={buyBackFee}
                          onChange={(e) => e.target.value ? setBuyBackFee(Number(e.target.value)) : setBuyBackFee("")}
                        />
                        {buyBackFee != " " && buyBackFee == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {buyBackFee != 0 && buyBackFee < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {buyBackFee != 0 && buyBackFee > 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 100%
                          </div>
                        )}


                      </div>

                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Reflection Fee (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="reflecFee1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={ReflectionFeeRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "reflecFee" ? { border: '2px solid #252A46' } : {}}
                          value={reflectionFee}
                          onChange={(e) => e.target.value ? setReflectionFee(Number(e.target.value)) : setReflectionFee("")}
                        />
                        {reflectionFee != " " && reflectionFee == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}

                        {reflectionFee != 0 && reflectionFee < 0.01 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Minimum 0.01%
                          </div>
                        )}

                        {reflectionFee != 0 && reflectionFee > 100 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 100%
                          </div>
                        )}


                      </div>
                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Fee Denominator<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="feeDenominator1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={feeDenominatorRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "feeDenominator" ? { border: '2px solid #252A46' } : {}}
                          value={feeDenominator}
                          onChange={(e) => e.target.value ? setFeeDenominator(Number(e.target.value)) : setFeeDenominator("")}
                        />
                        {feeDenominator != " " && feeDenominator == 0 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        )}



                      </div>

                    </>
                  )}

                  {tokenType != 0 && (
                    <>
                        <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                          <label className="form-label">Marketing Address<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                          <input
                            type="text"
                            id="rewardToken1"
                            autoComplete="nope"
                            onMouseEnter={(e) => handleHover(e, true)}
                            onMouseLeave={(e) => handleHover(e, false)}
                            ref={rewardTokenRef}
                            className="px-3 py-2 normal-input rounded w-100  isAddress"
                            style={setHover == "rewardToken" ? { border: '2px solid #252A46' } : {}}
                            value={marketingAddress}
                            onChange={(e) => e.target.value ? setMarketingAddress(e.target.value) : setMarketingAddress("")}
                          />
                          {marketingAddress != null && marketingAddress == "" && (
                            <div
                              className="invalid-feedback"
                              style={{ display: 'block' }}
                            >
                              Cannot be empty!
                            </div>
                          )}

                          {marketingAddress != null && marketingAddress != "" && !checkContract(marketingAddress) && (
                            <div
                              className="invalid-feedback"
                              style={{ display: 'block' }}
                            >
                              Address Invalid
                            </div>
                          )}
                        </div>
                      

                      <div className="col-xxl-6 col-xl-6 col-lg-6 mb-3 ">
                        <label className="form-label">Marketing percent (%)<span className="asterisk">* <span className="info"><i className="ri-information-fill"></i></span></span></label>
                        <input
                          type="number"
                          id="marketingPercent1"
                          autoComplete="nope"
                          onMouseEnter={(e) => handleHover(e, true)}
                          onMouseLeave={(e) => handleHover(e, false)}
                          ref={marketingPercentRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          style={setHover == "marketingPercent" ? { border: '2px solid #252A46' } : {}}
                          value={marketingPercent}
                          onChange={(e) => e.target.value ? setMarketingPercent(Number(e.target.value)) : setMarketingPercent("")}
                        />

                        {marketingPercent != 0 && marketingPercent < 1 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {marketingPercent < 1 ? "Minimum 1%" : "Cannot be empty!"}
                          </div>
                        )}

                        {marketingPercent != 0 && marketingPercent > 25 && (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Maximum 25%
                          </div>
                        )}


                      </div>
                    </>
                  )}



                </div>
                <div className="mt-3">
                  {tokenType == 3 && (liqFee + buyBackFee + reflectionFee + marketingPercent) > 25 && (
                    <p className="invalid-feedback" style={{ display: 'block' }}>Liquidity Fee + Buyback Fee + Reflection Fee + Marketing Fee must be less than 25%                            </p>
                  )}
                  {tokenType == 2 && (autoAddLiq + tokenRewardFee + marketingPercent) > 25 && (
                    <p className="invalid-feedback" style={{ display: 'block' }}>Liquidity Fee + Token Reward Fee + Marketing Fee must be less than 25%                            </p>
                  )}
                  <button type="submit" className="btn x-btn mr-2 w-100"
                    onClick={(e) => execute(e)}
                    disabled={(name && symbol && decimal && totalSupply) && tokenType == 0 ? false : tokenType == 1 ? (numValidation(generateYield) && numValidation(generateLiq) && checkContract(marketingAddress) && marketingPercent <= 25) ? false : true : tokenType == 2 ? (checkContract(rewardToken) && tokenDividen < totalSupply * 0.1 / 100 && numValidation(tokenRewardFee) && numValidation(autoAddLiq) && checkContract(marketingAddress) && marketingPercent <= 25) ? false : true : tokenType == 3 ? (checkContract(rewardToken) && numValidation(liqFee) && numValidation(buyBackFee) && numValidation(reflectionFee) && marketingPercent <= 25 && (liqFee + buyBackFee + reflectionFee + marketingPercent) <= 25) ? false : true : true}
                  >
                    {isLoading ? (<div className="spinner-border text-white" style={{ width: '1rem', height: '1rem', marginRight: '5px', border: '0.15em solid currentColor', borderRightColor: 'transparent' }}></div>) : ""}
                    <span style={{ whiteSpace: 'nowrap' }}>Create Token</span>
                  </button>
                </div>
                {tx ? (
                  <div className="mt-3 text-center">
                  <a href={`${blockURL}tx/${tx}`} target="_blank">view TX</a>
                </div>
                ) : ""}
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-xl-4 col-lg-6">
            <h4 className="card-title mb-2 vis-n">Preview</h4>
            <div className="card items border-0">
              <div className="card-body">


                <div className="infos_i">

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Token Type</div>
                    <div
                      className={`val right-presalerate`} onClick={() => handleRef(tokenTypeRef)}>
                      {tokenType == 0 && "Standard"}
                      {tokenType == 1 && "Liquidity Generator"}
                      {tokenType == 2 && "Buyback"}
                      {tokenType == 3 && "Baby Buyback"}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Name</div>
                    <div
                      onMouseEnter={(e) => setHovered("Name")}
                      onMouseLeave={(e) => setHovered("")}
                      className={`val right-presalerate ${oneActive == "name1" ? "active" : ""}`} onClick={() => handleRef(nameRef)}>
                      {name != " " && name ? name : "-"}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Symbol</div>
                    <div
                      onMouseEnter={(e) => setHovered("Symbol")}
                      onMouseLeave={(e) => setHovered("")}
                      className={`val right-presalerate ${oneActive == "symbol1" ? "active" : ""}`} onClick={() => handleRef(symbolRef)}>
                      {symbol != " " && symbol ? symbol : "-"}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Decimal</div>
                    <div
                      onMouseEnter={(e) => setHovered("Decimal")}
                      onMouseLeave={(e) => setHovered("")}
                      className={`val right-presalerate ${oneActive == "decimal1" ? "active" : ""}`} onClick={() => handleRef(decimalRef)}>
                      {decimal != " " && decimal ? decimal : "-"}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Total Supply</div>
                    <div
                      onMouseEnter={(e) => setHovered("totalSupply")}
                      onMouseLeave={(e) => setHovered("")}
                      className={`val right-presalerate ${oneActive == "totalSupply1" ? "active" : ""}`} onClick={() => handleRef(totalSupplyRef)}>
                      {totalSupply != " " && totalSupply ? (+totalSupply).toLocaleString() : "-"}
                    </div>
                  </div>

                  {tokenType == 1 && (
                    <>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Generate yield</div>
                        <div
                          onMouseEnter={(e) => setHovered("generateYield")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "Yield1" ? "active" : ""}`} onClick={() => handleRef(generateYieldRef)}>
                          {generateYield != " " && generateYield ? `${generateYield}%` : "-"}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Generate liquidity</div>
                        <div
                          onMouseEnter={(e) => setHovered("generateLiq")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "Liq1" ? "active" : ""}`} onClick={() => handleRef(generateLiqRef)}>
                          {generateLiq != " " && generateLiq ? `${generateLiq}%` : "-"}
                        </div>
                      </div>
                    </>
                  )}

                  {tokenType == 2 && (
                    <>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div className="">
                          <div>Minimum token balance for dividends</div>
                          <div
                            onMouseEnter={(e) => setHovered("minDividend")}
                            onMouseLeave={(e) => setHovered("")}
                            className={`val right-presalerate ${oneActive == "minDividend1" ? "active" : ""}`} onClick={() => handleRef(minDividendRef)}>
                            {tokenDividen != " " && tokenDividen ? `${(tokenDividen).toLocaleString()}` : "-"}
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Token Reward Fee</div>
                        <div
                          onMouseEnter={(e) => setHovered("rewardFee")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "rewardFee1" ? "active" : ""}`} onClick={() => handleRef(rewardFeeRef)}>
                          {tokenRewardFee != " " && tokenRewardFee ? `${tokenRewardFee}%` : "-"}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Auto add liquidity</div>
                        <div
                          onMouseEnter={(e) => setHovered("addLiq")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "addLiq1" ? "active" : ""}`} onClick={() => handleRef(addLiqRef)}>
                          {autoAddLiq != " " && autoAddLiq ? `${autoAddLiq}%` : "-"}
                        </div>
                      </div>
                    </>
                  )}

                  {tokenType == 3 && (
                    <>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Liquidity Fee</div>
                        <div
                          onMouseEnter={(e) => setHovered("liqFee")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "liqFee1" ? "active" : ""}`} onClick={() => handleRef(liqFeeRef)}>
                          {liqFee != " " && liqFee ? `${liqFee}%` : "-"}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Buyback Fee</div>
                        <div
                          onMouseEnter={(e) => setHovered("buyBackFee")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "buyBackFee1" ? "active" : ""}`} onClick={() => handleRef(buyBackFeeRef)}>
                          {buyBackFee != " " && buyBackFee ? `${buyBackFee}%` : "-"}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Reflection Fee</div>
                        <div
                          onMouseEnter={(e) => setHovered("reflecFee")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "reflecFee1" ? "active" : ""}`} onClick={() => handleRef(ReflectionFeeRef)}>
                          {reflectionFee != " " && reflectionFee ? `${reflectionFee}%` : "-"}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Fee Denominator</div>
                        <div
                          onMouseEnter={(e) => setHovered("feeDenominator")}
                          onMouseLeave={(e) => setHovered("")}
                          className={`val right-presalerate ${oneActive == "feeDenominator1" ? "active" : ""}`} onClick={() => handleRef(feeDenominatorRef)}>
                          {feeDenominator != " " && feeDenominator ? `${feeDenominator}` : "-"}
                        </div>
                      </div>
                    </>
                  )}

                  {tokenType != 0 && (
                    <>
                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Router</div>
                      <div className={`val right-presalerate `} onClick={() => handleRef(routerRef)}>
                              <img src="/images/Fa/pancakeswap.png" alt="Pancakeswap" className="pcs" />
                              {routers}
                            </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                      <div>Marketing Percent</div>
                      <div
                        onMouseEnter={(e) => setHovered("marketingPercent")}
                        onMouseLeave={(e) => setHovered("")}
                        className={`val right-presalerate ${oneActive == "marketingPercent1" ? "active" : ""}`} onClick={() => handleRef(marketingPercentRef)}>
                        {marketingPercent != " " && marketingPercent ? `${marketingPercent}%` : "-"}
                      </div>
                    </div>
                    </>
                  )}

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
