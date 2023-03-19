import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useState, useEffect, useRef } from "react";
import Web3 from "web3";
import { useRouter } from "next/router";
import { Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import lang from "/component/lang.json"
import { IERC20, multiSenderAbi } from "/components/web3/abi";
import { toast } from 'react-toastify';

function Home({ p }) {
  const {
    address,
    userProfile,
    BlurAddress,
    BlurBalance,
    blockURL,
    chain,
    bn,
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
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState();
  const [contract, setContract] = useState("0x0000000000000000000000000000000000000000");
  const [symbol, setSymbol] = useState(" ");
  const [decimal, setDecimal] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [optionSelected, setOptionSelected] = useState(0);
  const [isContract, setIsContract] = useState(true);
  const [addresses, setAddresses] = useState()
  const [addresses2, setAddresses2] = useState([])
  const [sent2, setSent2] = useState([])
  const [addressesError, setAddressesError] = useState([])
  const [totalSent,setTotalSent] = useState()
  const [totalAlc,setTotalAlc] = useState()
  const [isApproved,setApproved] = useState(false)


  async function execute() {
    setIsLoading(true)
    try {

      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }




  useEffect(() => { }, [rpcURL, address]);






  async function checkContractValid(x) {
    setContract(x)
    setApproved(false)
    const web3 = new Web3(thisWeb3)
    if (web3.utils.isAddress(x)) {
      const TokenContract = new web3.eth.Contract(IERC20, x);
      try {
        const names = await TokenContract.methods.name().call()
        const decimal = await TokenContract.methods.decimals().call()
        const totalS = await TokenContract.methods.totalSupply().call()
        const symbol = await TokenContract.methods.symbol().call()
        const allowance = await TokenContract.methods.allowance(address, pContract[chain].tokenSender).call()
        if(allowance > +bn('115792089237316195423570985008687907853269984665640564039457584007913129639')) setApproved(true)
        setIsContract(true)
        setName(names)
        setDecimal(decimal)
        setTotalSupply(totalS / 10 ** decimal)
        setSymbol(symbol)
        return true

      } catch (e) {
        setIsContract(false)
        setApproved(false)
        setName("")
        setDecimal("")
        setTotalSupply("")
        setSymbol("")
        return false
      }

    } else {
      setIsContract(false)
      setName("")
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
    const addressSentVal = 0

    const toBeSent = []
    const toBeSent2 = []
    const toBeSentVal = 0
    values.map((address, idx) => {
      let isValid = false
      const f = address.split(" ")
      if(web3.utils.isAddress(f[0]) && f.length == 2 && !isNaN(Number(f[1])) && f[1] != "") {
        addressSent.push(f[0])
        toBeSent.push(Number(f[1]))
        toBeSent2.push(f[1])
        isValid = true
      }
      if(address == ""){
        isValid = true
      }

      addressesh[idx] = {
        address,
        isValid,
      };
    });
    toBeSent.map((x) => {
      toBeSentVal += x
    })
    addressSent.map((x) => {
      addressSentVal ++
    })
    setAddresses2(addressSent);
    setSent2(toBeSent2);
    setTotalAlc(addressSentVal)
    setTotalSent(toBeSentVal)
    Object.keys(addressesh).map((address) => {
      if (!addressesh[address].isValid) totalErr.push(+address + 1);
    });
    if (e) {
      setAddressesError(totalErr);
    } else {
      setAddressesError([]);
    }
  }

  const [tx, setTx] = useState("")

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    return array
  };

  async function handleCSV(x) {
   try{
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const text = event.target.result;
      try{
      const f = csvFileToArray(text)
      const x = []
      for(let i=0;i<f.length;i++){
        const text = (Object.keys(f[i]))[0]
        let res = text
        if(text.includes(";")){
          res = text.replace(";", " ")
        }
        x.push(res)
      }
      const final = x.join("\n")
      addressValidation(final)
      }catch(_){
        
      }
  };



   }catch(_){}

  }

  async function send() {
    if(addressesError.length == 0 && addresses.length == 0) return
    const web3 = thisWeb3
    const val = []
    let totalVal = 0
    const isETH = optionSelected == 0
    if(!isETH) {
      if(!isApproved) {
        const TokenContract = new web3.eth.Contract(IERC20, contract);
      TokenContract.methods.approve(pContract[chain].tokenSender, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from:address}).then (() => {
        toast("Success")
        setApproved(true)
      }).catch((e) => {
        try {
          toast.error(extractErrorCode(e));
        } catch (_) {
          try {
            toast.error(e.message);
          } catch (er) {
            toast.error("Something Error!");
          }
        }
      })
      return
      }
    }
    try{
      let dec = +bn(10).exponentiatedBy(18)
      if(optionSelected == 1) {
        dec = +bn(10).exponentiatedBy(decimal)
      }
      for(let i =0; i < sent2.length; i++) {
        val.push((+bn(sent2[i]).multipliedBy(dec)).toLocaleString('fullwide', {useGrouping:false}))
        totalVal += Number(val[i]) 
      }
      const sendContract = new web3.eth.Contract(multiSenderAbi, pContract[chain].tokenSender)
      sendContract.methods.SendMultiETH(contract, addresses2, val, isETH).call({from:address, value: isETH ? totalVal : 0}).then (() => {
        sendContract.methods.SendMultiETH(contract, addresses2, val, isETH).send({from:address, value: isETH ? totalVal : 0}).then ((result) => {
          toast("Success")
          setTx(result.transactionHash)
        }).catch((e) => {
          try {
            toast.error(extractErrorCode(e));
        } catch (_) {
            try {
                toast.error(e.message);
            } catch (er) {
                toast.error("Something Error!");
            }
        }
        })
      }).catch((e) => {
        try {
          toast.error(extractErrorCode(e));
      } catch (_) {
          try {
              toast.error(e.message);
          } catch (er) {
              toast.error("Something Error!");
          }
      }
      })
    }catch(e) {
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
            <h4 className="card-title mb-2">Multi Sender</h4>
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label className="form-label">Type<span className="ms-1 asterisk">0.1 {handleChain('symbol')}</span></label>
                    <UncontrolledDropdown className="option" >
                      <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                        <div className="d-flex justify-content-between" >
                          <div className="option">
                            {optionSelected == 0 && handleChain('symbol')}
                            {optionSelected == 1 && "Token"}
                          </div>
                          <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className="w-100 rounded presale-dropdown">
                        <DropdownItem className={optionSelected == 0 ? "item active" : "item"} onClick={() => setOptionSelected(0)}>
                          {handleChain('symbol')}
                        </DropdownItem>
                        <DropdownItem className={optionSelected == 1 ? "item active" : "item"} onClick={() => setOptionSelected(1)}>
                          Token
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
                <div className="row mt-3">

                  {optionSelected == 1 && (
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
                      {contract != " " && contract == "" && (
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block' }}
                        >
                          {lang[p.lang].Params[1]} {lang[p.lang].Params[5]}
                        </div>
                      )}

                    </div>
                  )}
                  <div className="col-12">
                    <label className="form-label">Allocations<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                    <textarea
                      type="text"
                      style={{ padding: "20px", color: "#fff", height: '150px' }}
                      className="w-100 px-3 py-2 normal-input rounded"
                      placeholder={
                        "Format : Address (space) Value\nExample:\n0x0000000000000000000000000000000000000001 1\n0x0000000000000000000000000000000000000001 3"
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

                    {addresses && addresses != "" && addressesError? (
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
                  <div className="col-12">
                    <label>
                  <input name="a" hidden type="file" onChange={(e) => handleCSV(e)} accept={".csv,.txt"}/>
                  <div className="btn x-btn mr-2 w-100" >Or upload csv / txt</div>
                    </label>

                  </div>
                  <div className="d-flex justify-content-center pt-5">
                  <button type="submit" className="btn x-btn mr-2 w-50" onClick={() => send()}
                  >{optionSelected == "0x0000000000000000000000000000000000000000" ? "Send" : isApproved ? "Send" : "Approve"}</button>
                  </div>
                  {tx ? 
                  (<div className="mt-3 text-center">
                  <a href={`${blockURL}tx/${tx}`} target="_blank">view TX</a>
                </div>) : 
                ""}
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
                    <div>Type</div>
                    <div
                      className={`val right-presalerate`}>
                      {optionSelected == 0 && handleChain('symbol')}
                      {optionSelected == 1 && "Token"}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Total Sent</div>
                    <div
                      className={`val right-presalerate`}>
                      {totalSent ? `${(totalSent).toFixed(2)} ${optionSelected == 0 ? handleChain('symbol') : symbol}` : "-"}
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                    <div>Total Allocation</div>
                    <div
                      className={`val right-presalerate`}>
                      {totalAlc ? `${totalAlc}` : "-"}
                    </div>
                  </div>
                  {optionSelected == 1 && (
                    <>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Name</div>
                        <div
                          className={`val right-presalerate`}>
                          {name ? name : "-"}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Symbol</div>
                        <div
                          className={`val right-presalerate`}>
                          {symbol ? symbol : "-"}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Decimal</div>
                        <div
                          className={`val right-presalerate`}>
                          {decimal ? decimal : "-"}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between border-bottom_grey border-dark-100 py-2">
                        <div>Total Supply</div>
                        <div
                          className={`val right-presalerate`}>
                          {totalSupply ? `${(totalSupply).toLocaleString()} ${symbol}` : "-"}
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
