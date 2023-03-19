import Router from 'next/router'
import React, { useEffect } from "react";
import LayoutAdmin from "/components/layout/LayoutAdmin";
import { useRouter } from "next/router";
export default function Home({p}){
    const router = useRouter();
        const  paramChain  = router.query.chain
        const push = "pools?chain="+paramChain
    useEffect(() => {
        if(!paramChain) return
        Router.push(push)
      },[router]);
    return(
        <>
        <LayoutAdmin
                headTitle="WeLaunch - "
                pageTitleSub={"Pool"}
                pageclassName={"admin"}
                parent={"Home"}
                child={"Pools"}
                p={p}
            ></LayoutAdmin>
        </>
    )
}
