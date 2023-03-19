import { useEffect, useState } from "react";
import Header from "./Header";
import PageHead from "./PageHead";
import PageTitle from "./PageTitle";
import Sidebar from "./sidebar";
import Link from "next/link";
import Bottom from "./Bottom";
import Footer from "./Footer";
import { useRouter } from "next/router";

const LayoutAdmin = ({
    headTitle,
    children,
    pageTitle,
    pageTitleSub,
    pageClass,
    parent,
    child,
    p
}) => {
    const router = useRouter();
    const  paramChain  = router.query.chain
    const path = router.pathname
    const [height, setHeight] = useState();
    const [mobile, setMobile] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if(window.innerWidth <= 575){
              setMobile(true)
            }
          }
        setHeight(window.screen.height);
    }, []);
    return (
        <>
            <PageHead headTitle={headTitle} />
            <div id="main-wrapper" className={`${pageClass ? pageClass : ""} d-flex`}>
                <Sidebar p={p}/>

                <div className="content-body" style={{ minHeight: height && height - 122, width: '100%' }}>
                <Header p={p} />
                    <div className="container-1 pd-1">
                        {pageTitle && (
                            <PageTitle
                                pageTitle={pageTitle}
                                pageTitleSub={pageTitleSub}
                                child={child}
                            />
                        )}
                        {children}
                    </div>
                </div>
            </div>
            <Bottom />
        <Footer />
        </>
    );
};

export default LayoutAdmin;
