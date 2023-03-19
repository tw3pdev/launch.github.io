import Link from "next/link";
import Auditors from "../components/slider/Auditors";
import { useRouter } from "next/router";
import LayoutAdmin from "../components/layout/LayoutAdmin";
import { Button, Button2, HomeCard } from "../component/Comps";
import lang from "/component/lang.json"
const Index = ({ p }) => {
  const router = useRouter();
  const paramChain = router.query.chain;
  const pLang = p.lang
  return (
    <>
      <LayoutAdmin pageclassName={"admin"} p={p}>
        <div className="intro1 section-padding">
          <div className="container-1">
            <div className="row justify-content-between align-items-center">
              <div className="col-xl-6 col-lg-6 col-12">
                <div className="intro-content my-5">
                  <h1 className="mb-3">{lang[pLang].home.header[0]}<br />{lang[pLang].home.header[1]}<br />{lang[pLang].home.header[2]}</h1>
                  <p>{lang[pLang].home.header[3]}</p>
                  <div className="intro-btn mt-5">
                    <Link href={"/pools?chain=" + paramChain}>
                      <a><Button className="mt-2">{lang[pLang].home.header[4]}</Button></a>
                    </Link>

                    <Link href={"/project?chain=" + paramChain}>
                      <a><Button className="mt-2">{lang[pLang].home.header[5]}</Button></a>
                    </Link>
                    {/* Whitepaper */}
                    <Link href="#">
                      <a><Button2 className="mt-2">{lang[pLang].home.header[6]}</Button2></a>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-xl-5 col-lg-6 col-12">
                <img className="floating-img" src="./favicon.svg" />
              </div>

            </div>
          </div>
        </div>

        {/* <div className="notable-drops section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-title text-center">
                  <h2>{lang[pLang].home.auditor[0]}</h2>
                </div>
              </div>
            </div>
            <div className="row" >
              <div className="col-12">
                <Auditors />
                <div className="intro-video-content text-center mt-5">
                  <a>
                    <Button style={{ width: "180px" }}>
                    {lang[pLang].home.auditor[1]}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="create-sell section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8">
                <div className="section-title text-center">
                  <h2>{lang[pLang].home.footer[0]}</h2>
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <HomeCard className="col-xl-6 col-lg-6 col-md-12 pd-m" text={{ title: lang[pLang].home.footer[1], desc: lang[pLang].home.footer[2], button: lang[pLang].home.footer[3] }} color="#0338D1" link={`/project/presale?chain=${paramChain}`} />
              <HomeCard className="col-xl-6 col-lg-6 col-md-12 pd-r" text={{ title: lang[pLang].home.footer[4], desc: lang[pLang].home.footer[5], button: lang[pLang].home.header[4] }} color="#DA2F20" link={`/pools?chain=${paramChain}`} />
            </div>
          </div>
        </div> */}
      </LayoutAdmin>
    </>
  );
};

export default Index;
