

import dynamic from "next/dynamic";


const WeLaunchCharts = dynamic(()=> import ('./chart'), {ssr:false})
const data = [
  {
    "id": "stylus",
    "label": "stylus",
    "value": 323,
    "color": "hsl(59, 70%, 50%)"
  },
  {
    "id": "css",
    "label": "css",
    "value": 223,
    "color": "hsl(263, 70%, 50%)"
  },
  {
    "id": "javascript",
    "label": "javascript",
    "value": 503,
    "color": "hsl(64, 70%, 50%)"
  },
  {
    "id": "rust",
    "label": "rust",
    "value": 564,
    "color": "hsl(244, 70%, 50%)"
  },
  {
    "id": "hack",
    "label": "hack",
    "value": 465,
    "color": "hsl(194, 70%, 50%)"
  }
]
const Chart = () => {
  return (
    <div >
     
     <svg xmlns="http://www.w3.org/2000/svg" width="76" height="94" viewBox="0 0 76 94" fill="none" className="svg-shadow">
<path d="M24.8097 42.6689L19.136 37.0307L37.6117 18.6678L56.0996 37.0368L50.4258 42.678L37.6117 29.9442L24.8097 42.6689ZM74.9213 57.1767L38.4843 93.3854C38.3703 93.5008 38.2343 93.5925 38.0842 93.6551C37.9341 93.7178 37.7729 93.75 37.6101 93.75C37.4474 93.75 37.2862 93.7178 37.1361 93.6551C36.986 93.5925 36.85 93.5008 36.7359 93.3854L0.298998 57.1767C0.107532 56.9862 0 56.7279 0 56.4586C0 56.1894 0.107532 55.9311 0.298998 55.7406L9.6808 46.4358L0.97263 37.7823C0.85597 37.6689 0.76328 37.5336 0.7 37.3841C0.63672 37.2347 0.60413 37.0742 0.60413 36.9121C0.60413 36.7499 0.63672 36.5894 0.7 36.44C0.76328 36.2906 0.85597 36.1552 0.97263 36.0418L36.243 0.980302C36.4228 0.798512 36.6372 0.654134 36.8738 0.555574C37.1104 0.457014 37.3643 0.40625 37.6208 0.40625C37.8774 0.40625 38.1313 0.457014 38.3679 0.555574C38.6044 0.654134 38.8189 0.798512 38.9987 0.980302L74.416 36.1909C74.5113 36.2853 74.5869 36.3975 74.6385 36.521C74.69 36.6445 74.7166 36.7768 74.7166 36.9105C74.7166 37.0442 74.69 37.1766 74.6385 37.3001C74.5869 37.4236 74.5113 37.5357 74.416 37.6301L65.5548 46.4358L74.9213 55.7436C75.1118 55.934 75.2187 56.1916 75.2187 56.4602C75.2187 56.7287 75.1118 56.9863 74.9213 57.1767ZM15.3423 40.7946L17.6418 43.0888L36.7329 62.0573C36.8469 62.1727 36.9829 62.2644 37.133 62.3271C37.2831 62.3897 37.4443 62.4219 37.6071 62.4219C37.7699 62.4219 37.931 62.3897 38.0811 62.3271C38.2312 62.2644 38.3672 62.1727 38.4812 62.0573L62.9124 37.7792C63.029 37.6659 63.1217 37.5305 63.185 37.3811C63.2483 37.2316 63.2809 37.0711 63.2809 36.909C63.2809 36.7469 63.2483 36.5864 63.185 36.4369C63.1217 36.2875 63.029 36.1521 62.9124 36.0388L38.4812 11.7638C38.3672 11.6483 38.2312 11.5566 38.0811 11.494C37.931 11.4314 37.7699 11.3991 37.6071 11.3991C37.4443 11.3991 37.2831 11.4314 37.133 11.494C36.9829 11.5566 36.8469 11.6483 36.7329 11.7638L12.3018 36.0388C12.1851 36.1521 12.0924 36.2875 12.0291 36.4369C11.9659 36.5864 11.9333 36.7469 11.9333 36.909C11.9333 37.0711 11.9659 37.2316 12.0291 37.3811C12.0924 37.5305 12.1851 37.6659 12.3018 37.7792L15.3423 40.7946ZM63.4145 55.5884L59.8964 52.074L38.3527 73.4828C38.2577 73.5774 38.1448 73.6526 38.0205 73.7038C37.8963 73.7551 37.763 73.7814 37.6285 73.7814C37.494 73.7814 37.3607 73.7551 37.2365 73.7038C37.1122 73.6526 36.9994 73.5774 36.9044 73.4828L15.3576 52.074L11.821 55.5884C11.7044 55.7018 11.6117 55.8371 11.5484 55.9866C11.4851 56.136 11.4525 56.2965 11.4525 56.4586C11.4525 56.6208 11.4851 56.7813 11.5484 56.9307C11.6117 57.0801 11.7044 57.2155 11.821 57.3288L36.9044 82.255C36.9994 82.3497 37.1122 82.4248 37.2365 82.476C37.3607 82.5273 37.494 82.5537 37.6285 82.5537C37.763 82.5537 37.8963 82.5273 38.0205 82.476C38.1448 82.4248 38.2577 82.3497 38.3527 82.255L63.4176 57.3288C63.5342 57.2155 63.6269 57.0801 63.6902 56.9307C63.7535 56.7813 63.7861 56.6208 63.7861 56.4586C63.7861 56.2965 63.7535 56.136 63.6902 55.9866C63.6269 55.8371 63.5342 55.7018 63.4176 55.5884H63.4145ZM28.5974 46.4358L34.2742 52.074L37.6117 48.7544L40.9614 52.0832L46.6382 46.4358L37.6117 37.4658L28.5974 46.4358Z" fill="url(#paint0_linear_38_95)"/>
<defs>
<linearGradient id="paint0_linear_38_95" x1="37.6094" y1="-14.0202" x2="37.6094" y2="107.691" gradientUnits="userSpaceOnUse">
<stop stop-color="#0338D1"/>
<stop offset="0.354167" stop-color="#1CFCFC"/>
<stop offset="0.885417" stop-color="#0338D1"/>
</linearGradient>
</defs>
</svg>
 </div>
  );
};
export default Chart;