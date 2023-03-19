import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import Web3 from 'web3'
import LayoutAdmin from "../../components/layout/LayoutAdmin"
import Game from "/components/elements/game"

export default function ShortLink({ p }) {
    const router = useRouter()
    const { id } = router.query
    const { sendData } = p
    const [isUnk, setUnk] = useState(false)
    async function init() {
        const shortlink = await sendData({ req: "getShortlinkName", name: id }, false)
        if(shortlink.link) {
          let reff = ""
          if(router.query.ref) reff = router.query.ref
            router.push(`/pool/${shortlink.link}/?chain=${shortlink.chain}&ref=${reff}`)
        }else {
            setUnk(true)
        }
    }
    useEffect(() => {
        if (!router.isReady) return
        const web3 = new Web3()
        if (web3.utils.isAddress(id)) {
          let reff = ""
          if(router.query.ref) reff = router.query.ref
            router.push(`/pool/${id}/?chain=BSC&ref=${reff}`)
        } else {
            init()
        }
    }, [])
    return (
        <>
          <LayoutAdmin
        headTitle={
          "Welaunch Shortlink"
        }
        pageTitle=""
        pageTitleSub={""}
        pageclassName={"front"}
        parent={""}
        p={p}
      >
        {isUnk ? (
 <div className="col-12">
 <div className="card">
   <div className="card-body">
     <p className="text-center mb-0">It looks like you're lost.<br />You can play game here or back to <Link href={`/?chain=BSC`}>Home</Link></p>
   </div>
   <Game />
 </div>
</div>
        ) : (
            <div className="loader">Loading...</div>

        )}
      </LayoutAdmin>
        </>
    )
}