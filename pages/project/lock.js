import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useState, useEffect, PureComponent } from "react";
import Web3 from "web3";
import { IERC20, presaleLockerAbi } from "/components/web3/abi";
import Router from 'next/router'
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { toast } from 'react-toastify';

import Counter2 from "/component/Counter2"
import CounterProgress from "/component/CounterProgress"
function Home({ p }) {
  const {
    address,
    userProfile,
    BlurAddress,
    blockURL,
    BlurBalance,
    extractErrorCode,
    chain,
    connected,
    balance,
    bn,
    rpcURL,
    thisWeb3,
    pContract,
  } = p;
  const router = useRouter();
  const paramChain = router.query.chain
  const [symbol, setSymbol] = useState(null);
  const [amount, setAmount] = useState(null);

  const [contract, setContract] = useState(null);
  const [maxBalance, setMaxBalance] = useState(null);
  const [approve, setapprove] = useState(false);

  const [Isamount, setIsAmount] = useState(false);
  const [Iscontract, setIsContract] = useState(false);
  const [name, setName] = useState(" ");
  const [decimal, setDecimal] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [choose, setChoose] = useState(0);
  const [unlockDate, setUnlockDate] = useState(new Date());
  const [dayoryear, setDayorYear] = useState("day");
  const [unixDate, setUnix] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startTimeUnix, setStartTimeUnix] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [isVesting, setIsVesting] = useState(false);
  const [firstUnlock, setFirstUnlock] = useState(null);
  const [vestingDay, setVestingDay] = useState(null);
  const [vestingUnlock, setVestingUnlock] = useState(0);
  const [vestingUnlockOption, setVestingUnlockOption] = useState([])
  const count = (e) => {
    setFirstUnlock(e)
    if (isVesting) {
      try {
        const x = []
        for (let i = 100 - e; i > 0; i--) {
          const vCount = (100 - +e) / i;
          if (Number.isInteger(vCount)) {
            x.push({ data: i })
          }
        }
        setVestingUnlock(x[0].data)
        setVestingUnlockOption(x);
      } catch (_) { }
    }
  }
  function max() {
    setAmount(maxBalance);
    setIsAmount(true);
  }

  function startDatefunction(e) {
    setStartTime(e);
    const now = new Date(e);
    var userTimezoneOffset = now.getTimezoneOffset() * 60000;
    const nowUTC = new Date(now.getTime() - userTimezoneOffset);
    let target = new Date(Number(nowUTC));
    target = new Date(
      target.getUTCFullYear(),
      target.getUTCMonth(),
      target.getUTCDate(),
      target.getUTCHours(),
      target.getUTCMinutes(),
      target.getUTCSeconds()
    );
    setStartTimeUnix(Math.round(nowUTC.getTime() / 1000));
    const difference = nowUTC.getTime() - +(new Date());
    if (difference < 0) {
      setDateError(true);
    } else {
      setDateError(false);
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
function unlockAt(x) {
  const dates = getUTC(x).toString()
  const res = ""
  res += dates.split(" ")[1] + " "
  res += dates.split(" ")[2] + " "
  res += dates.split(" ")[3] + " "
  res += dates.split(" ")[4] + " "

  return res
}

  const preview = () => {
    let logs = []
    const nows = + (getUTC(+(new Date()) / 1000)) / 1000
    if(isVesting) {
      const firstLock = +bn(amount).multipliedBy(+bn(firstUnlock).div(100))
      let leftAmount = +bn(amount).minus(firstLock)
      let lastVesting = startTimeUnix
      const vesting = 100 - firstUnlock
      const events = [{
        amount:firstLock,
        time: lastVesting,
    }]
    const nLock = +bn(bn(amount)).multipliedBy(+bn(vestingUnlock).div(100))
    for (let i = vesting; i > 0; i -= vestingUnlock) {
      const lastVestings = Math.floor(lastVesting + vestingDay)
        const VestingEvents = {
            amount: nLock,
            time: lastVestings,
        }
      lastVesting = Math.floor(lastVesting + vestingDay)
        events.push(VestingEvents)
      
    }
    logs = events
    }else {
      logs = [{
        amount,
        time : startTimeUnix
      }]
    }
    return (
      <div className="col-xxl-8 col-xl-8 col-lg-8">
      <h4 className="card-title mb-2 text-uppercase">Preview</h4>
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
                                      <span className="my-2"><CounterProgress start={nows * 1000} current={0} end={data.time * 1000} status={data.status} /></span>
                                      <span className=""><Counter2 start={nows * 1000} end={data.time * 1000} /></span>
                                      <span className={`${i + 1 < logs.length ? "mb-2" : ""}`}>Unlock at {unlockAt(data.time)}</span>
                                  </div>
                                  <div className="d-flex ms-auto align-items-center">
                                  <div className="badge-status insurance">
                                              Locked
                                          </div>

                                  </div>
                              </div>
                          )
                      })}
                  </div>

              </div>

          </div>
      </div>
  </div>
    )
  }

  async function checkContract(e) {
    setapprove(false)
    if (e.length == 0) {
      setSymbol(null);
      setContract("");
      setName("")
            setSymbol("")
            setDecimal("")
            setTotalSupply("")
            setIsContract(false)
    } else {
      const web3 = new Web3(rpcURL);
      try {
        let sttcontract = new web3.eth.Contract(IERC20, e);
        let symbol = await sttcontract.methods.symbol().call();
        let name = await sttcontract.methods.name().call();
        let decimals = await sttcontract.methods.decimals().call();
        let totalSupply = await sttcontract.methods.totalSupply().call();
        const div = 10 ** decimals
            setName(name)
            setSymbol(symbol)
            setDecimal(decimals)
            setTotalSupply(+bn(totalSupply).div(div))
        setIsContract(true);
        setContract(e);


      } catch (e) {
        setSymbol(null);
      }
      try {
        let sttcontract = new web3.eth.Contract(IERC20, e);
        let decimal = await sttcontract.methods.decimals().call();
        let tokenbalance = await sttcontract.methods.balanceOf(address).call();
        let max = tokenbalance / 10 ** decimal;

        setMaxBalance(max.toString());
        var ifapproved = await sttcontract.methods
          .allowance(address, pContract[chain]["presaleLocker"])
          .call();
        if (ifapproved > 115792089237316195423570985008687907853269984665640564039457584007913) {
          setapprove(true);
        } else {
          setapprove(false);
        }
      } catch (e) {
        setContract("");
        setIsContract(false);
      }
    }
  }
  function goAmount(x) {
    if (x <= maxBalance) {
      setAmount(x);
      setIsAmount(true);
    } else {
      setAmount(x);
      setIsAmount(false);
    }
  }
  async function execute() {
    setIsLoading(true)
    try {
      const web3 = new Web3(thisWeb3);
      const connectedChain = web3.utils.numberToHex(await web3.eth.getChainId())
      if(connectedChain != chain) {
        setIsLoading(false)
        toast.error("Wrong Chain!");
        return
      }
      if (approve) {
        let sttcontract = new web3.eth.Contract(presaleLockerAbi, pContract[chain]["presaleLocker"]);
        let stcont = new web3.eth.Contract(IERC20, contract);
        let decimal = await stcont.methods.decimals().call();
        let total = bn(amount).multipliedBy(10 ** decimal);
        let args = [contract, address, total, startTimeUnix, 10000, 0, 0]
        if(isVesting) {
          args = [contract, address, total, startTimeUnix, firstUnlock * 100, Math.floor(vestingDay), vestingUnlock * 100]
        }
        sttcontract.methods
          .createLock(...args)
          .call({ from: address })
          .then(function () {
            sttcontract.methods
              .createLock(...args)
              .send({ from: address })
              .then(function () {
                Router.push('/locks?chain=' + paramChain)
                setIsLoading(false)
              })

              .catch((e) => {
                setIsLoading(false)

                try {
                  toast.error(extractErrorCode(e));
                } catch (_) {
                  toast.error(e.message);
                }
              });
          })

          .catch((e) => {
            try {
              toast.error(extractErrorCode(e));
            } catch (_) {
              toast.error(e.message);
            }
            setIsLoading(false)
          });
      } else {
        let sttcontract = new web3.eth.Contract(IERC20, contract);
        sttcontract.methods
          .approve(
            pContract[chain]["presaleLocker"],
            "115792089237316195423570985008687907853269984665640564039457584007913129639935"
          )
          .send({ from: address })
          .then(function () {
            setIsLoading(false)
            setapprove(true);
          })
          .catch((e) => {
            try {
              toast.error(extractErrorCode(e));
            } catch (_) {
              toast.error(e.message);
            }
            setIsLoading(false)
          });
      }
    } catch (e) {
      try {
        toast.error(extractErrorCode(e));
      } catch (_) {
        toast.error(e.message);
      }
      setIsLoading(false)
    }
  }
  const contractRef = useRef(null);
  useEffect(() => { }, [rpcURL, address]);
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
            <h4 className="card-title mb-2 text-uppercase">Create new Locks</h4>
            <div className="card detail_card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <label className="form-label">Token or Pair Address<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                    <input
                      type="text"
                      id="name1"
                      autoComplete="nope"
                      // onMouseEnter={(e) => handleHover(e, true)}
                      // onMouseLeave={(e) => handleHover(e, false)}
                      ref={contractRef}
                      className="px-3 py-2 normal-input rounded w-100 "
                      // style={setHover == "Name" ? { border: '2px solid #252A46' } : {}}
                      onChange={(e) =>
                        checkContract(e.target.value)
                      }
                    />

                    {contract != null && !Iscontract ? (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Contract Invalid
                      </div>
                    ) : ""}

                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Amount<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span>
                    </label>
                    <div className="row g-0">
                      <div className="col-10">
                        <input
                          id="minBuy"
                          // onMouseEnter={(e) => handleHover(e, true)}
                          // onMouseLeave={(e) => handleHover(e, false)}
                          // style={setHover == "Minimum Buy" ? { border: '2px solid #252A46' } : {}}
                          // ref={minBuyRef}
                          type="number"
                          className="px-3 h-100 w-100 rounded-start presale-input border-end-0"
                          value={amount == 0 ? "" : amount}
                          onChange={(e) => goAmount(Number(e.target.value))}
                        />
                      </div>
                      <div className="col-2">
                        <input
                          type="text"
                          className="px-2 py-2 w-100 text-end rounded-end presale-input presale-input-label border-start-0 c-pointer"
                          readOnly={true}
                          onClick={() => max()}
                          // style={setHover == "Minimum Buy" ? { border: '2px solid #252A46' } : {}}
                          value={"MAX"}
                        />
                      </div>
                      {amount != null && !Isamount ? (
                        <div
                          className="invalid-feedback"
                          style={{ display: 'block' }}
                        >
                          Your max Amount is {maxBalance} {symbol}
                        </div>
                      ) : ""}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      {isVesting ? "First" : ""} Unlock Date<span className="asterisk">*</span>
                    </label>
                    <div className="row g-0">
                      <div className="col-10">
                        <DatePicker
                          selected={startTime}
                          showTimeSelect
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="px-3 py-2 w-100 rounded-start border-end-0 presale-input presale-date"
                          minDate={getDateNow()}
                          onChange={(e) => startDatefunction(e.getTime())}
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
                    {dateError ? (
                      <div
                        className="invalid-feedback"
                        style={{ display: 'block' }}
                      >
                        Unlock time must be on future
                      </div>
                    ) : ""}


                  </div>


                  <div className="col-12 col-md-6">
                    <label className="form-label">Use Vesting</label>
                    <UncontrolledDropdown className="option"
                    // ref={routerRef}
                    >
                      <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                        <div className="d-flex justify-content-between">
                          <div className="option">{isVesting ? "Yes" : "No"}</div>
                          <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                        </div>
                      </DropdownToggle>
                      <DropdownMenu className="w-100 rounded presale-dropdown">
                        <DropdownItem className={!isVesting ? "item active" : "item"} onClick={() => setIsVesting(false)}>
                          No
                        </DropdownItem>
                        <DropdownItem className={isVesting ? "item active" : "item"} onClick={() => setIsVesting(true)}>
                          Yes
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>

                  {isVesting ? (
                    <>
                      <div className="col-12 col-md-6">
                        <label className="form-label">First unlock (%)<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                        <input
                          type="number"
                          id="name1"
                          autoComplete="nope"
                          // onMouseEnter={(e) => handleHover(e, true)}
                          // onMouseLeave={(e) => handleHover(e, false)}
                          ref={contractRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          // style={setHover == "Name" ? { border: '2px solid #252A46' } : {}}
                          onChange={(e) =>
                            count(e.target.value)
                          }
                        />

                        {firstUnlock > 99 ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Can't be over 99%!
                          </div>
                        ) : ""}
                        {firstUnlock != null && !firstUnlock ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        ) : ""}

                      </div>

                      <div className="col-12 col-md-6">
                        <label className="form-label">Vesting period (days)<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                        <input
                          type="number"
                          id="name1"
                          autoComplete="nope"
                          // onMouseEnter={(e) => handleHover(e, true)}
                          // onMouseLeave={(e) => handleHover(e, false)}
                          ref={contractRef}
                          className="px-3 py-2 normal-input rounded w-100 "
                          // style={setHover == "Name" ? { border: '2px solid #252A46' } : {}}
                          onChange={(e) =>
                            setVestingDay(e.target.value * 86400)
                          }
                        />

                        {vestingDay != null && !vestingDay ? (
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            Cannot be empty!
                          </div>
                        ) : ""}

                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label">Vesting unlock (%)<span className="asterisk">*</span> <span className="info"><i className="ri-information-fill"></i></span></label>
                        <UncontrolledDropdown className="option"
                        // ref={routerRef}
                        >
                          <DropdownToggle className="px-3 w-100 presale-select rounded" tag="label">
                            <div className="d-flex justify-content-between">
                              <div className="option">{`${vestingUnlock}%`}</div>
                              <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                            </div>
                          </DropdownToggle>
                          <DropdownMenu className="w-100 rounded presale-dropdown">
                            {vestingUnlockOption.map((data) => {
                              return (

                                <DropdownItem className={data.data == vestingUnlock ? "item active" : "item"} onClick={() => setVestingUnlock(data.data)}>
                                  {data.data}%
                                </DropdownItem>

                              )
                            })}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </>
                  ) : ""}
                </div>

                <div className="mt-3">
                  <button type="submit" className="btn x-btn mr-2"
                    onClick={() => execute()}
                    disabled={ isVesting ?
                      Iscontract && Isamount && startTimeUnix && !dateError && amount && vestingDay && firstUnlock > 0 && firstUnlock <= 99
                        ? false
                        : true : Iscontract && Isamount && startTimeUnix && !dateError && amount ? false : true
                    }
                  >
                    {isLoading ? (<div className="spinner-border text-white" style={{ width: '1rem', height: '1rem', marginRight: '5px', border: '0.15em solid currentColor', borderRightColor: 'transparent' }}></div>) : ""}
                    {approve ? "Lock" : "Approve"}
                  </button>
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
                                        <a href={`${blockURL}address/${contract}`} target="_blank">
                                        <div
                                            className={`val right-presalerate`}>
                                            {contract != " " && contract ? contract.substring(0, 6) + "..." + contract.substring(contract.length - 4) : "-"}
                                        </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {Iscontract && Isamount && startTimeUnix && !dateError && amount ? 
                    (preview()) : ""}
        </div>
      </LayoutAdmin>
    </>
  );
}
export default Home;
