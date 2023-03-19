import React, { useState, useEffect, Component } from "react";
import { Progress } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Card from "/components/elements/cardPresale";

export default function Overview({ p,x }) {
  const {
    connected,
    favorited,
    bn
  } = p;
  const [premiumColor2, setPremiumColor2] = useState("hsl(191deg 98% 59%)");
  const [canvasColor, setCanvasColor] = useState("#036AE3");
  const [premiumColor, setPremiumColor] = useState("hsl(212deg 97% 45%)");
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    checkSave()
  })

  async function checkSave() {
    if(connected) {
      for (let i = 0; i < favorited.length; i++) {
        if (favorited[i].addr == x.token.presaleAddress) {
          setIsFavorited(true);
        }
      }
    }
  }

  return (
    <Card p={p} Datas={{external:x.external, saleId:x.saleId, status:x.status, safe:x.safe, isFavorited,Filled:+bn(x.num.filled).div(10 ** 18), logoURL:x.token.logo,pools:true, startTime:x.num.start * 1000, endTime:x.num.end * 1000, name:x.token.name, presaleType:x.mode, softCap:+bn(x.num.softCap).div(10 ** 18), hardCap:+bn(x.num.hardCap).div(10 ** 18), liqRate:x.num.liq/100, lockup:x.num.lockDur / 86400, contract: x.token.presaleAddress, headerImage:x.headerImage, premiumColor:x.premiumColor,isPremium:x.isPremium, premiumColor2:x.premiumColor2, canvasColor:x.canvasColor,insurance:x.insurance,currency:x.currency }} />
  )
}
