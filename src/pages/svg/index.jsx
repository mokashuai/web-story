import React, { useState } from 'react'

export default function Index({}){

  return (<div className=''>
    <svg id="svgCircleTutorial" height="250" xmlns="http://www.w3.org/2000/svg">
     <circle id="myCircle" cx="55" cy="55" r="50" fill="#219E3E" stroke="#17301D" strokeWidth="2" />
    </svg>

    <svg id="svgLineTutorial" style={{borderStyle:"solid",borderWidth:"2px"}} height="200px" width="200px" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="20" x2="100" y2="200" style={{stroke:'Green', strokeWidth:2}}/>
      <text x="0" y="20" font-size="14">SVG 华东地区手机12个月的数据 柱状图</text>
    </svg>

    <svg id="svgRectangleTutorial" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect id="myRectangle" width="300" height="100" stroke="#17301D" strokeWidth="2"  fill="blue" fillOpacity="0.5" strokeOpacity="0.5"/>
    </svg>

    <svg id="svgPolygonTutorial" height="200" xmlns="http://www.w3.org/2000/svg">
      <polygon id="myPolygon" points="10,10 75,150 150,60" style={{fill:"blue",stroke:"black",strokeWidth:3}}/>
      <path d="M6 36 L0 3 L60 40 Z" style={{stroke: 'black', strokeWidth: 1}} />
      <path d="M1 20 L20 1 L40 20 Z" style={{stroke: 'black', strokeWidth: 1}} />
    </svg>
  </div>)
}
