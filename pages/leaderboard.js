import Link from "next/link";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import React, { useState, useEffect, Component } from "react";
import Web3 from "web3";
import axios from "axios"
import { useRouter } from "next/router";
import { Progress, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";


import "react-loading-skeleton/dist/skeleton.css";
function Home({ p }) {
  const { address, chain, rpcURL, handleChain, bn } = p
  const router = useRouter();
  const paramChain = router.query.chain;
  const [weekSelected, setWeekSelected] = useState(0)
  const [leaderboardData, setLeaderboardData] = useState([])
  const [presaleSelected, setPresaleSelected] = useState("All Presale")
  const [isLoading, setLoading] = useState(true);

  const [weekData, setWeekData] = useState([])


  const getWeekNumber = function (date) {
    const day = new Date(date);
    var dayNum = day.getUTCDay() || 7;
    day.setUTCDate(day.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
    const year = day.getUTCFullYear()
    return `Week ${Math.ceil((((day - yearStart) / 86400000) + 1) / 7)}/${year}`
  };

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const getMonth = function (date) {
    const day = new Date(date);
    const months = day.getUTCMonth()
    return month[months]
  };


  const dummy = [
    {
      name: "MetaNazi",
      symbol: "NAZI"
    },
    {
      name: "XXDXX",
      symbol: "YAYA"
    }
  ]

  async function getL(date) {
    const data = await axios.request({
      method: 'POST',
      url: 'https://welaunch.app/pinksale/leaderboard',
      data: { date },
    })
    const oldRes = data.data[0].docs
    return oldRes
  }

  async function init() {
    let now = +(new Date())
    const weeks = []
    for (let i = now; i > now - 8467200000; i -= 604800000) {
      weeks.push({ name: getWeekNumber(i), time: i })
    }
    setWeekData(weeks)

    const oldRes = await getL(now)
    const res = []
    for (let i = 0; i < oldRes.length; i++) {
      if (oldRes[i].currency_symbol == "BNB")
        res[i] = {
          pool: oldRes[i].pool_address,
          kyc: null,
          audit: null,
          insurance: null,
          totalRaised: Math.floor(+bn(oldRes[i].total_raised).div(+bn(10).exponentiatedBy(18))),
          totalContributor: "-",
          img: JSON.parse(oldRes[i].pool_detail).a,
          name: oldRes[i].token_name,
          symbol: oldRes[i].token_symbol,

        }
    }
    setLeaderboardData(res)
    setLoading(false)
  }

  async function handleClick(e) {
    setLoading(true)
    setWeekSelected(e)
    const oldRes = await getL(weekData[e].time)
    const res = []
    for (let i = 0; i < oldRes.length; i++) {
      if (oldRes[i].currency_symbol == "BNB")
        res[i] = {
          pool: oldRes[i].pool_address,
          kyc: null,
          audit: null,
          insurance: null,
          totalRaised: Math.floor(+bn(oldRes[i].total_raised).div(+bn(10).exponentiatedBy(18))),
          totalContributor: "-",
          img: JSON.parse(oldRes[i].pool_detail).a,
          name: oldRes[i].token_name,
          symbol: oldRes[i].token_symbol,
        }
    }
    setLeaderboardData(res)
    setLoading(false)
  }
  useEffect(() => {
    init()
  }, [rpcURL, address]);
  return (
    <>
      <LayoutAdmin
        headTitle=""
        pageTitle=""
        pageTitleSub={"All Locked token on WeLaunch"}
        pageclassName={"admin"}
        parent={""}
        p={p}
      >

        <div className="row justify-content-center" style={{ paddingTop: '180px' }}>
          <div className="bgbg-bg">
            <div className="sec-bbgbg d-flex">
              <div className="second bg-1 bold"
              >
                <img src={leaderboardData[1] ? leaderboardData[1].img : "/images/unknown.png"} className="img" />
                <div className="square"><div className="bold text-white">2</div></div>
                <div className="text-center ">
                  <div>
                    {leaderboardData[1] ? leaderboardData[1].symbol : "-"}
                  </div>
                  <div className="text-white">
                    {leaderboardData[1] ? `${leaderboardData[1].totalRaised} ${handleChain('symbol')}` : "Unkown"}
                  </div>
                </div>
              </div>
              <div className="first bg-1 bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="51" viewBox="0 0 29 35" fill="none" className="crown">
                  <path d="M27.8004 5.15824C27.5255 4.94514 27.1916 4.80808 26.8369 4.76271C26.4821 4.71734 26.1208 4.76548 25.794 4.90165L19.7148 7.41178L16.1826 1.49902C16.0138 1.22297 15.7691 0.993397 15.4737 0.83369C15.1782 0.673982 14.8424 0.589844 14.5006 0.589844C14.1587 0.589844 13.8229 0.673982 13.5275 0.83369C13.232 0.993397 12.9874 1.22297 12.8186 1.49902L9.28635 7.41178L3.20711 4.90165C2.87972 4.76569 2.51791 4.71748 2.16256 4.76247C1.80722 4.80747 1.47252 4.94387 1.19629 5.15626C0.920064 5.36866 0.713332 5.64857 0.599465 5.96435C0.485598 6.28014 0.469136 6.6192 0.55194 6.94322L3.60358 19.0253C3.66193 19.2593 3.77082 19.4797 3.92364 19.6734C4.07646 19.8671 4.27004 20.0299 4.49264 20.1521C4.79401 20.3196 5.13859 20.4083 5.48983 20.4087C5.66057 20.4084 5.83043 20.3859 5.99443 20.3418C11.5568 18.9137 17.4323 18.9137 22.9947 20.3418C23.5026 20.4658 24.0427 20.3975 24.4965 20.1521C24.7205 20.0315 24.9151 19.8691 25.0681 19.6752C25.2211 19.4813 25.3292 19.26 25.3855 19.0253L28.4492 6.94322C28.5311 6.61912 28.5137 6.28021 28.3991 5.96478C28.2844 5.64936 28.0771 5.36999 27.8004 5.15824Z" fill="#FFAA00" />
                </svg>
                <div className="first-circle">
                  <img src={leaderboardData[0] ? leaderboardData[0].img : "/images/unknown.png"} className="img" />
                  <div className="square"><div className="bold text-black">1</div></div>
                </div>
                <div className="text-center mt-5 py-4">
                  <div>
                    {leaderboardData[0] ? leaderboardData[0].symbol : "-"}
                  </div>
                  <div className="text-winner">
                    {leaderboardData[0] ? `${leaderboardData[0].totalRaised} ${handleChain('symbol')}` : "Unknown"}
                  </div>
                </div>
              </div>
              <div className="third bg-1 bold">
                <img src={leaderboardData[2] ? leaderboardData[2].img : "/images/unknown.png"} className="img" />
                <div className="square"><div className="bold text-white">3</div></div>
                <div className="text-center">
                  <div>
                    {leaderboardData[2] ? leaderboardData[2].symbol : "-"}
                  </div>
                  <div className="text-white">
                    {leaderboardData[2] ? `${leaderboardData[2].totalRaised} ${handleChain('symbol')}` : "Unkown"}
                  </div>
                </div>
              </div>
            </div>
            <span className="lead-bigger bold text-white text-uppercase">best-performing presales of {weekData[0] ? getMonth(weekData[weekSelected].time) : ""}</span>

          </div>
        </div>
        <div className="row">
          <label className="form-label">
            Launchpad
          </label>
          <div className="col-6 col-md-3">
            <UncontrolledDropdown className="option">
              <DropdownToggle className="px-3 w-100 presale-select rounded c-pointer" tag="label">
                <div className="d-flex justify-content-between" >
                  <div className="option">{presaleSelected}</div>
                  <div className="dropdown-arrow pe-2"><i className="ri-arrow-drop-down-fill"></i></div>
                </div>
              </DropdownToggle>
              <DropdownMenu className="w-100 rounded presale-dropdown">
                <DropdownItem disabled className={presaleSelected == "Welaunch" ? "item active" : "item"} onClick={() => setPresaleSelected("Welaunch")}>
                  Welaunch
                </DropdownItem>
                <DropdownItem className={presaleSelected == "All Presale" ? "item active" : "item"} onClick={() => setPresaleSelected("All Presale")}>
                  All Presale
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <div className="col-xl-12 pt-4 hidden-mobile">
          <div className="scroll-horizontal rounded " >
            <div className="container rounded">
              <div className="row">
                <div className="navigation">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="trendingRow w-100">
                      <ul className="navbar-nav trend-trending scroll-x lead-lead" style={{ marginLeft: 'unset' }}>
                        {weekData.map((item, i) => (
                          <li key={i} onClick={() => handleClick(i)} className={weekSelected == i ? `monthes text-uppercase py-3 active` : `monthes text-uppercase py-3`}>
                            <span>{item.name}</span>
                          </li>

                        ))}
                      </ul>
                      <div className="setting py-2"><i className="ri-more-fill"></i></div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="hidden-d text-white bold pt-5 col-12 px-4">
            October Week 3 <i className="ri-arrow-down-s-line"></i>
          </div>
        </div>
        <div className="row py-4 hidden-mobile">
          {isLoading ? (
            <div className="row" style={{ height: '100px' }}>
              <div className="loader">Loading...</div>
            </div>
          ) : (

            <div className="card">
              <div className="card-body px-4">
                <div className="col-xl-12">
                  {leaderboardData.map((data, i) => {
                    const f = i + 1
                    return (
                      <div className="d-flex lead-1 justify-content-between" key={i}>

                        <div className="d-flex gap-5 align-items-center x-gap">
                          <div className="counter">
                            <div className="box-box">{f == 1 ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 29 35" fill="none">
                                <path d="M27.8004 5.15824C27.5255 4.94514 27.1916 4.80808 26.8369 4.76271C26.4821 4.71734 26.1208 4.76548 25.794 4.90165L19.7148 7.41178L16.1826 1.49902C16.0138 1.22297 15.7691 0.993397 15.4737 0.83369C15.1782 0.673982 14.8424 0.589844 14.5006 0.589844C14.1587 0.589844 13.8229 0.673982 13.5275 0.83369C13.232 0.993397 12.9874 1.22297 12.8186 1.49902L9.28635 7.41178L3.20711 4.90165C2.87972 4.76569 2.51791 4.71748 2.16256 4.76247C1.80722 4.80747 1.47252 4.94387 1.19629 5.15626C0.920064 5.36866 0.713332 5.64857 0.599465 5.96435C0.485598 6.28014 0.469136 6.6192 0.55194 6.94322L3.60358 19.0253C3.66193 19.2593 3.77082 19.4797 3.92364 19.6734C4.07646 19.8671 4.27004 20.0299 4.49264 20.1521C4.79401 20.3196 5.13859 20.4083 5.48983 20.4087C5.66057 20.4084 5.83043 20.3859 5.99443 20.3418C11.5568 18.9137 17.4323 18.9137 22.9947 20.3418C23.5026 20.4658 24.0427 20.3975 24.4965 20.1521C24.7205 20.0315 24.9151 19.8691 25.0681 19.6752C25.2211 19.4813 25.3292 19.26 25.3855 19.0253L28.4492 6.94322C28.5311 6.61912 28.5137 6.28021 28.3991 5.96478C28.2844 5.64936 28.0771 5.36999 27.8004 5.15824Z" fill="#FFAA00" />
                              </svg>
                            ) : (f)}</div>
                          </div>
                          <div className="token">
                            <div className="d-flex"> <div className="token-img">
                              <img src={data.img} />
                            </div>
                              <div className="px-2 d-flex bold flex-column">
                                <span>
                                  {data.name} • {data.symbol}
                                </span>
                                <div className="d-flex gap-2">


                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fill bold text-white">
                          {data.totalRaised} BNB
                        </div>
                        <div className="contributor bold text-white">
                          {data.totalContributor} Contributor
                        </div>
                        <Link href={`/pool/pinksale/${data.pool}?chain=BSC`}>
                          <div className="button view center-svg c-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 23 17" fill="none" className="me-1">
                              <path d="M8.66808 8.5C8.66808 9.2252 8.95616 9.9207 9.46896 10.4335C9.98175 10.9463 10.6773 11.2344 11.4025 11.2344C12.1277 11.2344 12.8232 10.9463 13.3359 10.4335C13.8487 9.9207 14.1368 9.2252 14.1368 8.5C14.1368 7.7748 13.8487 7.0793 13.3359 6.5665C12.8232 6.05371 12.1277 5.76562 11.4025 5.76562C10.6773 5.76562 9.98175 6.05371 9.46896 6.5665C8.95616 7.0793 8.66808 7.7748 8.66808 8.5ZM22.003 7.87012C19.6886 2.99463 16.1901 0.541016 11.5001 0.541016C6.80773 0.541016 3.31163 2.99463 0.997181 7.87256C0.904347 8.06913 0.856201 8.28383 0.856201 8.50122C0.856201 8.71861 0.904347 8.93331 0.997181 9.12988C3.31163 14.0054 6.81017 16.459 11.5001 16.459C16.1925 16.459 19.6886 14.0054 22.003 9.12744C22.191 8.73193 22.191 8.27295 22.003 7.87012ZM11.4025 12.7969C9.02941 12.7969 7.10558 10.873 7.10558 8.5C7.10558 6.12695 9.02941 4.20312 11.4025 4.20312C13.7755 4.20312 15.6993 6.12695 15.6993 8.5C15.6993 10.873 13.7755 12.7969 11.4025 12.7969Z" fill="white" /></svg>
                            View
                          </div>
                        </Link>
                      </div>
                    )
                  })}


                </div>
              </div>
            </div>
          )}
        </div>

        {leaderboardData.map((data, i) => {
          const f = i + 1
          return (
            <div className="row hidden-d l-mobile">
              <Link href={`/pool/pinksale/${data.pool}?chain=BSC`}>
              <div className="card">
                <div className="card-body px-3 py-3">
                  <div className="col-xl-12">
                    <>
                      <div className="d-flex lead-2 gap-3" key={i}>
                        <div className="counter align-self-center">
                          <div className="box-box">{f == 1 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" viewBox="0 0 29 25" fill="none">
                              <path d="M27.8004 5.15824C27.5255 4.94514 27.1916 4.80808 26.8369 4.76271C26.4821 4.71734 26.1208 4.76548 25.794 4.90165L19.7148 7.41178L16.1826 1.49902C16.0138 1.22297 15.7691 0.993397 15.4737 0.83369C15.1782 0.673982 14.8424 0.589844 14.5006 0.589844C14.1587 0.589844 13.8229 0.673982 13.5275 0.83369C13.232 0.993397 12.9874 1.22297 12.8186 1.49902L9.28635 7.41178L3.20711 4.90165C2.87972 4.76569 2.51791 4.71748 2.16256 4.76247C1.80722 4.80747 1.47252 4.94387 1.19629 5.15626C0.920064 5.36866 0.713332 5.64857 0.599465 5.96435C0.485598 6.28014 0.469136 6.6192 0.55194 6.94322L3.60358 19.0253C3.66193 19.2593 3.77082 19.4797 3.92364 19.6734C4.07646 19.8671 4.27004 20.0299 4.49264 20.1521C4.79401 20.3196 5.13859 20.4083 5.48983 20.4087C5.66057 20.4084 5.83043 20.3859 5.99443 20.3418C11.5568 18.9137 17.4323 18.9137 22.9947 20.3418C23.5026 20.4658 24.0427 20.3975 24.4965 20.1521C24.7205 20.0315 24.9151 19.8691 25.0681 19.6752C25.2211 19.4813 25.3292 19.26 25.3855 19.0253L28.4492 6.94322C28.5311 6.61912 28.5137 6.28021 28.3991 5.96478C28.2844 5.64936 28.0771 5.36999 27.8004 5.15824Z" fill="#FFAA00" />
                            </svg>
                          ) : (f)}</div>
                        </div>
                        <div className="token">
                          <div className="d-flex"> <div className="token-img">
                          <img src={data.img} />
                          </div>
                            <div className="px-2 d-flex bold flex-column">
                              <span>
                                {data.name}<br /> <span className="font-weight-normal">{data.symbol}</span>
                              </span>

                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex py-2 gap-2">
                        <div className="fill bold">
                        {data.totalRaised} <span className="text-white">BNB</span>
                        </div>
                        <div className="">•</div>
                        <div className="contributor bold text-white">
                        {data.totalContributor} <span className="text-white">Contributor</span>
                        </div>

                      </div>
                      <div className="d-flex gap-2">
                      </div>
                    </>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          )
        })}


      </LayoutAdmin>
    </>
  );
}
export default Home;
