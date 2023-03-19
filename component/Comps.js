import React, { useState } from "react";
import Link from "next/link";

function Button({ children, className, style }) {
    return (
        <button className={`btn x-btn ${className}`} style={style}>{children}</button>
    )
}

function Button2({ children, className }) {
    return (
        <button className={`btn outline-white ${className}`}>{children}</button>
    )
}

function Button3({ children, className }) {
    return (
        <button className={`btn outline-grey ${className}`}>{children}</button>
    )
}

function HomeCard({className, text, color, link }) {
    return (
        <div className={className}>
            <div className="create-sell-content" style={{ background: color }}>
                <div className="content-sell-text">
                    <p>{text.title}</p>
                </div>
                <p className="text-white">
                    {text.desc}
                </p>
                <div className="text-d">
                    <Link href={link}>
                        <a className="btn x-btn1">{text.button}</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { Button, Button2, Button3, HomeCard }