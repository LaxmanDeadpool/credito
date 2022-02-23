import logo from './logo.svg';
import FirstPage from './comps/FirstPage';
import Navbar from './comps/NavBar';
import SecondPage from './comps/SecondPage';
import PopUpComp from './comps/PopUpComp';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import './App.css';
import { useState } from 'react';

function App() {

const [showPopUp, setShowPopUp] = useState(false);


  return <>

  <Parallax pages={2} style={{ top: '0', left: '0' }}>
  <ParallaxLayer
    offset={0}
    speed={0.01}
    // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
  <FirstPage/>
  </ParallaxLayer>

  <ParallaxLayer
    offset={.9999}
    speed={.5}
    // style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   color: 'white',
    // }}
    >
  <SecondPage/>
  </ParallaxLayer>
  </Parallax>
  <Navbar showPopUp={()=>setShowPopUp(true)}/>
  <img className='fixPos logo' src={logo}/>
 {showPopUp && <PopUpComp close={()=>setShowPopUp(false)}/>}
  </>;
}

export default App;
