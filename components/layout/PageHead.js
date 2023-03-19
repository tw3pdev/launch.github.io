import Head from "next/head";
function PageHead({ headTitle }) {
    return (
        <>
            <Head>
                <title>
                    {headTitle ? headTitle : "WeLaunch - Safest Launchpad on Blockchain"}
                </title>
                <link rel="icon" href="/favicon.svg" />
            </Head>
        </>
    );
}
export default PageHead;
