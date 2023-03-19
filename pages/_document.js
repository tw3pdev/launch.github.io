import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import Loader from "../components/loader";
class Render extends Document {
    render() {
        return (
            <Html> 
                <Head/>
                <head>
                </head>
                <body>
                <div id={'globalLoader'}>
                     <Loader/>
                </div>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default Render