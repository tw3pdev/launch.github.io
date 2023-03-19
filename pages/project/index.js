
import LayoutAdmin from "/components/layout/LayoutAdmin";
import Link from "next/link";
import { useRouter } from "next/router";
function SettingsSecurity({p}) {
    const router = useRouter();
    const  paramChain  = router.query.chain
    return (
        <>
            <LayoutAdmin
                headTitle="WeLaunch - Create Project"
                pageTitle="Create Project"
                pageTitleSub={"Create your own Presale, Token, or Locks"}
                pageclassName={"admin"}
                p={p}
            >

                <div className="row">
                    <div className="col-xxl-12">
                        <div className="card">
                            <div className="card-body">
                                    <Link href={"/project/pool?chain="+paramChain}>
                                <div className="verify-content">
                                    <div className="d-flex align-items-center">
                                        <span className="me-3 icon-circle bg-primary text-white">
                                            <i className="ri-rocket-fill"></i>
                                        </span>
                                        <div >
                                            <p className="mb-0"><strong>Create Pool</strong></p>
                                            <small>Create your own Presale</small>
                                        </div>
                                    </div>
                                    </div>
                                    </Link>
                                <hr className="dropdown-divider my-4" />
                                    <Link href={"/project/lock?chain="+paramChain}>
                                <div className="verify-content">
                                    <div className="d-flex align-items-center">
                                        <span className="me-3 icon-circle bg-primary text-white">
                                            <i className="ri-lock-2-fill"></i>
                                        </span>
                                        <div >
                                            <p className="mb-0"><strong>Lock Token</strong></p>
                                            <small>Lock your own token</small>
                                        </div>
                                    </div>
                                </div>
                                    </Link>
                                <hr className="dropdown-divider my-4" />
                                <div className="verify-content" style={{opacity:'0.5',cursor:'default'}}>
                                    <div className="d-flex align-items-center">
                                        <span className="me-3 icon-circle bg-primary text-white">
                                            <i className="ri-bit-coin-fill"></i>
                                        </span>
                                        <div>
                                            <p className="mb-0"><strong>Create Token</strong></p>
                                            <small>Create your own Token</small>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xxl-12">
                        <div className="card">
                            <div className="card-body">
                                    <Link href={"/project/audit?chain="+paramChain}>
                                <div className="verify-content ">
                                    <div className="d-flex align-items-center">
                                        <span className="me-3 icon-circle bg-primary text-white">
                                            <i className="ri-code-box-line"></i>
                                        </span>
                                        <div >
                                            <p className="mb-0"><strong>Register Audit</strong></p>
                                            <small>Audit your own Presale</small>
                                        </div>
                                    </div>
                                    </div>
                                    </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutAdmin>
        </>
    );
}
export default SettingsSecurity;
