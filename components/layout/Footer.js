import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="footer hidden-d">
                <div className="container-1">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="copyright">
                                <p>
                                    Welaunch © 2022 
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="footer-social">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="bi bi-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="bi bi-youtube"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        Powered by Binance Smart Chain
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;