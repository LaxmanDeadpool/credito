import logo from './logo.svg';
import FirstPage from './comps/FirstPage';
import Navbar from './comps/NavBar';
import SecondPage from './comps/SecondPage';
import PopUpComp from './comps/PopUpComp';
import FaqComp from './comps/FaqComp';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import ParallaxPreview from './comps/ParallexPreview';
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {

const [showPopUp, setShowPopUp] = useState(false);
const isMobileDevice=useRef();

useEffect(()=>{
  let details = navigator.userAgent;
  let regexp = /android|iphone|kindle|ipad/i;
  let isMobile = regexp.test(details);
  isMobileDevice.current = isMobile
}, [])

const btnPress=(operation)=>{
  console.log(isMobileDevice.current)
  if(!isMobileDevice.current){
    setShowPopUp(operation);
  }
}

  return <>

  {/* <Parallax pages={2} style={{ top: '0', left: '0' }}> */}
  {/* <ParallaxLayer
    offset={0}
    speed={0.01}
    // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    > */}


  {/* <FirstPage/> */}



  {/* </ParallaxLayer> */}

  {/* <ParallaxLayer
    offset={.9999}
    speed={.5}
    // style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   color: 'white',
    // }}
    > */}


  {/* <SecondPage/> */}


  {/* </ParallaxLayer>
  </Parallax> */}


  {/* <FaqComp/> */}
  <ParallaxPreview/>
  <Navbar showPopUp={()=>btnPress(true)}/>
  <div style={{height: '4.5em', left: '2em', top: 0}} className='f ac fixPos'>
  <img className='fixPos f logo ac jc' src={logo}/>
  </div>

 {showPopUp && <PopUpComp close={()=>btnPress(false)}/>}
  </>;
}

export default App;
