import logo from './logo.svg';

import Navbar from './comps/NavBar';

import PopUpComp from './comps/PopUpComp';

import ParallaxPreview from './comps/ParallexPreview';
import './App.css';
import { useEffect, useState, useRef } from 'react';


function App() {

const [showPopUp, setShowPopUp] = useState(false);
const isMobileDevice=useRef();

const navRef=useRef();
const pRef=useRef();


useEffect(()=>{
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobile = regexp.test(details);
  isMobileDevice.current = isMobile
}, [])

const btnPress=(operation)=>{

  if(!isMobileDevice.current){
    setShowPopUp(operation);
  }
}

const scrollTo=(index)=>{
  pRef.current.moveTo(index)
}

const navMoveTo=(index)=>{
  navRef.current.onClick(index);
}

  return <>

 

  <ParallaxPreview navMoveTo={navMoveTo} ref={pRef} open={()=>btnPress(true)}/>

  <Navbar scrollTo={scrollTo} ref={navRef} showPopUp={()=>btnPress(true)}/>
  <div style={{height: '4.5em', left: '2em', top: 0}} className='f ac fixPos'>
  <img className='fixPos f logo ac jc' src={logo}/>
  <p className='relPos' style={{left: 'clamp(50px, 3.8vw, 4vw)', fontSize: 18}}>Credito</p>
  </div>

 {showPopUp && <PopUpComp close={()=>btnPress(false)}/>}
  </>;
}

export default App;
