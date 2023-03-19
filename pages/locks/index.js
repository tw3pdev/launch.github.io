import Link from "next/link";
import LayoutAdmin from "../../components/layout/LayoutAdmin";
import React, { useState, useEffect, Component } from "react";
import ReactPaginate from "react-paginate";
import Web3 from "web3";
import { lockAbi } from "../../components/web3/lockabi";
import { IERC20, presaleLockerAbi } from "../../components/web3/abi";
import BigNumber from "../../components/web3/bignumber";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
function Home({ p }) {
    const [filter, setFilter] = useState("all");
    const {address, chain,rpcURL, pContract} = p
    const router = useRouter();

    const paramChain = router.query.chain
  const [offset, setOffset] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [orgtableData, orgsetTableData] = useState([]);
  const [perPage, setPerpage] = useState(10);
  const [currentpage, setCurrentpage] = useState(0);
  const [pageCount, setPagecount] = useState(0);
  const [lockList, setLockList] = useState([]);

  const [offset2, setOffset2] = useState(0);
  const [tableData2, setTableData2] = useState([]);
  const [orgtableData2, orgsetTableData2] = useState([]);
  const [perPage2, setPerpage2] = useState(10);
  const [currentpage2, setCurrentpage2] = useState(0);
  const [pageCount2, setPagecount2] = useState(0);
  const [lockList2, setLockList2] = useState([]);

  const [isLoading, setLoading] = useState(true);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    setCurrentpage(selectedPage);
    setOffset(offset);

    const data = orgtableData;
    const slice = data.slice(offset, offset + perPage);
    setPagecount(Math.ceil(data.length / perPage));
    setTableData(slice);
  };

  const handlePageClick2 = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage2;
    setCurrentpage2(selectedPage);
    setOffset2(offset);

    const data = orgtableData2;
    const slice = data.slice(offset, offset + perPage2);
    setPagecount2(Math.ceil(data.length / perPage2));
    setTableData2(slice);
  };
  const allLocks =  lockList
    .slice(offset, offset + perPage)
    .map((locks, i) => {
        let locked = new Date(locks.lockDate * 1e3)
        locked = locked.toUTCString()
        locked = locked.split(" ")
        let unlock = new Date(locks.unlockDate * 1e3)
        unlock = unlock.toUTCString()
        unlock = unlock.split(" ")

        let block = ""
        { chain == "0x61"
        ? block = "https://testnet.bscscan.com/address/"
        : chain == "0x38"
        ? block = "https://bscscan.com/address/"
        : chain == "0x1"
        ? block = "https://etherscan.net/address/"
        : chain == "0x42"
        ? block = "https://exchainrpc.okex.org"
        : block = "https://www.oklink.com/okexchain/address"}


            return (
                <tr key={i}>
                <td>
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                            <h6 className="mb-0">
                                {locks.symbol}
                            </h6>
                            <p className="mb-0">
                            {locks.name}
                            </p>
                        </div>
                    </div>
                </td>
                <td>{parseFloat(locks.humanAmount)} {locks.symbol}</td>
                <td>{locked[2]} {locked[1]} {locked[3]}</td>
                <td>
                  <Link href={`/locks/${locks.lockId}?chain=${paramChain}`}>
                  <div className="button view center-svg c-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 23 17" fill="none" className="me-1">
                              <path d="M8.66808 8.5C8.66808 9.2252 8.95616 9.9207 9.46896 10.4335C9.98175 10.9463 10.6773 11.2344 11.4025 11.2344C12.1277 11.2344 12.8232 10.9463 13.3359 10.4335C13.8487 9.9207 14.1368 9.2252 14.1368 8.5C14.1368 7.7748 13.8487 7.0793 13.3359 6.5665C12.8232 6.05371 12.1277 5.76562 11.4025 5.76562C10.6773 5.76562 9.98175 6.05371 9.46896 6.5665C8.95616 7.0793 8.66808 7.7748 8.66808 8.5ZM22.003 7.87012C19.6886 2.99463 16.1901 0.541016 11.5001 0.541016C6.80773 0.541016 3.31163 2.99463 0.997181 7.87256C0.904347 8.06913 0.856201 8.28383 0.856201 8.50122C0.856201 8.71861 0.904347 8.93331 0.997181 9.12988C3.31163 14.0054 6.81017 16.459 11.5001 16.459C16.1925 16.459 19.6886 14.0054 22.003 9.12744C22.191 8.73193 22.191 8.27295 22.003 7.87012ZM11.4025 12.7969C9.02941 12.7969 7.10558 10.873 7.10558 8.5C7.10558 6.12695 9.02941 4.20312 11.4025 4.20312C13.7755 4.20312 15.6993 6.12695 15.6993 8.5C15.6993 10.873 13.7755 12.7969 11.4025 12.7969Z" fill="white" /></svg>
                            View
                          </div>
                          </Link>
                </td>
            </tr>
              );
        })
        const yourLocks =  lockList2
    .slice(offset2, offset2 + perPage2)
    .map((locks, i) => {
        let locked = new Date(locks.lockDate * 1e3)
        locked = locked.toUTCString()
        locked = locked.split(" ")
        let unlock = new Date(locks.unlockDate * 1e3)
        unlock = unlock.toUTCString()
        unlock = unlock.split(" ")

        let block = ""
        { chain == "0x61"
        ? block = "https://testnet.bscscan.com/address/"
        : chain == "0x38"
        ? block = "https://bscscan.com/address/"
        : chain == "0x1"
        ? block = "https://etherscan.net/address/"
        : chain == "0x42"
        ? block = "https://www.oklink.com/okexchain/address"
        : block = "https://bscscan.com/address/"}

        
            return (
                <tr key={i}>
                <td>
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                            <h6 className="mb-0">
                                {locks.symbol}
                            </h6>
                            <p className="mb-0">
                            {locks.name}
                            </p>
                        </div>
                    </div>
                </td>
                <td>{parseFloat(locks.humanAmount)} {locks.symbol}</td>
                <td>{locked[2]} {locked[1]} {locked[3]}</td>
                <td>
                  <Link href={`/locks/${locks.lockId}?chain=${paramChain}`}>
                  <div className="button view center-svg c-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 23 17" fill="none" className="me-1">
                              <path d="M8.66808 8.5C8.66808 9.2252 8.95616 9.9207 9.46896 10.4335C9.98175 10.9463 10.6773 11.2344 11.4025 11.2344C12.1277 11.2344 12.8232 10.9463 13.3359 10.4335C13.8487 9.9207 14.1368 9.2252 14.1368 8.5C14.1368 7.7748 13.8487 7.0793 13.3359 6.5665C12.8232 6.05371 12.1277 5.76562 11.4025 5.76562C10.6773 5.76562 9.98175 6.05371 9.46896 6.5665C8.95616 7.0793 8.66808 7.7748 8.66808 8.5ZM22.003 7.87012C19.6886 2.99463 16.1901 0.541016 11.5001 0.541016C6.80773 0.541016 3.31163 2.99463 0.997181 7.87256C0.904347 8.06913 0.856201 8.28383 0.856201 8.50122C0.856201 8.71861 0.904347 8.93331 0.997181 9.12988C3.31163 14.0054 6.81017 16.459 11.5001 16.459C16.1925 16.459 19.6886 14.0054 22.003 9.12744C22.191 8.73193 22.191 8.27295 22.003 7.87012ZM11.4025 12.7969C9.02941 12.7969 7.10558 10.873 7.10558 8.5C7.10558 6.12695 9.02941 4.20312 11.4025 4.20312C13.7755 4.20312 15.6993 6.12695 15.6993 8.5C15.6993 10.873 13.7755 12.7969 11.4025 12.7969Z" fill="white" /></svg>
                            View
                          </div>
                          </Link>
                </td>
               
            </tr>
              );
        })

    async function getData() {
        let arraydata = [];
        try {
            const web3 = new Web3(rpcURL);
          const getContract = new web3.eth.Contract(presaleLockerAbi, pContract[chain]["presaleLocker"])
          const x = []
          const y = []
          for(let i = 0; i < 10000000000; i++) {
            try{
              const datas = await getContract.methods.TL(i).call()
              if(datas.lOwner == address) {
                y.push({lockId:datas.lockId, time: datas.lTime, token : datas.tAdr, amount : datas.amount, owner : datas.lOwner})
              }
              x.push({lockId:datas.lockId, time: datas.lTime, token : datas.tAdr, amount : datas.amount, owner : datas.lOwner})
            }catch(_) {
              i = 10000000000;
            }
          }

          var slice2 = y.slice(offset2, offset2 + perPage2);
          setPagecount2(Math.ceil(y.length / perPage2));
          orgsetTableData2(y);
          setTableData2(slice2);

        var slice = x.slice(offset, offset + perPage);
        setPagecount(Math.ceil(x.length / perPage));
        orgsetTableData(x);
        setTableData(slice);
              arraydata = x;
              let newData = arraydata;
              let totalElements = [];
              let totalElements2 = [];
              const res = () =>
                x
                  .reduce(async (memo, v, i) => {
                    let sttcontract = new web3.eth.Contract(IERC20, v.token);
                    let symbol = await sttcontract.methods.symbol().call();
                    let decimals = await sttcontract.methods.decimals().call();
                    let name = await sttcontract.methods.name().call();
                    let total = v.amount /10**decimals;
                    total = total.toLocaleString('fullwide', {useGrouping:false});
                    total = BigNumber(total).toString();
                    newData = arraydata.map((item) =>
                      Object.assign([], item, {
                        symbol: symbol,
                        decimal: decimals,
                        lockDate: v.time,
                        name: name,
                        amount: v.amount,
                        humanAmount: total,
                        lockId: v.lockId
                      })
                    );
                    if(v.owner == address) {
                      totalElements2.push(newData[i]);
                    }
                    totalElements.push(newData[i]);
                  }, [])
                  .then(function (data) {
                      setLoading(false)
                      setLockList2(totalElements2);
                    setLockList(totalElements);
                  });
              if(x.length) res();
           
        } catch (e) {
          setLoading(false)
        }
      }

    useEffect(() => {
        getData();
        handlePageClick;
      }, [pContract]);
  return (
    <>
      <LayoutAdmin
        headTitle="WeLaunch - Locks"
        pageTitle="Locks"
        pageTitleSub={"All Locked token on WeLock"}
        pageclassName={"admin"}
        parent={""}
        p={p}
      >
        <div className="row">
          <div className="col-xl-12">
          <div className="filter-nav mb-4 select_filter">
          <a className={filter == 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</a>
                                    <a className={filter == 'yourlock' ? 'active' : ''} onClick={() => setFilter('yourlock')}>Your Lock</a>
                                </div>
            <div className="bid-table">
              <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Token</th>
                            <th>Amount</th>
                            <th>Locked Time</th>
                    <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                            <td>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <h6 className="mb-0">
                                        <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                   width={'50%'}
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme>
                                        </h6>
                                        <p className="mb-0">
                                        <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme>
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td>  <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme></td>
                                                 <td>  <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme></td>
                                                 <td>  <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme></td>
                                                 <td>  <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme></td>
                                                 <td>  <SkeletonTheme
                                                   baseColor="#414141"
                                                   highlightColor="#252526"
                                                 >
                                                   <Skeleton />
                                                 </SkeletonTheme></td>
                        </tr>
                        ) : filter == 'all' ? allLocks : yourLocks}
                        <div>
              <div className="pages">
                <nav
                  className="pagination is-centered"
                  role="navigation"
                  aria-label="pagination"
                >
                 <ReactPaginate
                    previousLabel={""}
                    nextLabel={""}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={filter == 'all' ? pageCount : pageCount2}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={filter == 'all' ? handlePageClick : handlePageClick2}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    breakLinkClassName="pagination-link"
                    pageLinkClassName="pagination-link"
                    activeLinkClassName="active"
                  />
                </nav>
              </div>
            </div>

                    </tbody>
                </table>
                {!lockList.length && !isLoading ? (
                  <span className="text-center">No lock</span>
                ) : ""}
            </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
export default Home;
