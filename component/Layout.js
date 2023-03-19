import { useState, cloneElement, lazy } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = (p)=>{
    return (
        <>
        <div className="page">
                { cloneElement(p.children, { p }) }
                <ToastContainer 
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
            </div>
        </>
    )
    }

    export default Layout