import Link from "next/link";
import { useRouter } from "next/router";
function PageTitle({ pageTitle, pageTitleSub, parent, child }) {
  const routerr = useRouter();
  const paramChain = routerr.query.chain;
  return (
    <>
      <div className="page-title" style={{ paddingTop: "80px" }}>
        <div className="container-1">
          <div className="row align-items-center justify-content-between">
            <div className="col-6">
              <div className="page-title-content">
                <h3>{pageTitle}</h3>
                <p className="mb-2">{pageTitleSub}</p>
              </div>
            </div>
            {parent ? (
              <div className="col-auto">
                <div className="breadcrumbs">
                  <Link href={"pools?chain=" + paramChain}>
                    <a>{parent} </a>
                  </Link>
                  <span>
                    <i className="ri-arrow-right-s-line"></i>
                  </span>
                  <a >{child}</a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default PageTitle;
