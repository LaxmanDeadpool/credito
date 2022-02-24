import { popUpStrings } from "../data/Strings";
import AnimInput from "./AnimInput";
import arrowIcon from '../icons/arrowRight.svg'
import playStore from '../icons/playStore.svg'
import appStore from '../icons/appStore.svg'
import qr from '../icons/qrCode.svg'
import crossIcon from '../icons/crossIcon.svg'
import {a, useSpring, config} from 'react-spring';
import { useEffect } from "react";

export default function PopUpComp({close}) {
  const { mainString, placeHolderNo, qrCodeText } = popUpStrings;
    const [style, setStyle] = useSpring(()=>({
      scale: 0,
      opacity: 0,
      config: config.wobbly
    }))
  useEffect(()=>{
    console.log('acalfjal')
    setStyle.start({
      opacity: 1,
      scale: 1
    })
  }, [])
  return (
    <div style={{zIndex: 1000}} className="jc fixPos allPopUpBg f">
    <a.div style={style} className="f popUpCont ac jc absPos">
      <div style={{gap: '1em'}} className="f fc">
        <h2 dangerouslySetInnerHTML={mainString} />
        <div className="f phoneNoCont ac jc">
          <AnimInput placeholder={placeHolderNo} />
          <div className="f arrowIcon jc ac">
            <img style={{height: "1em"}} src={arrowIcon} />
          </div>
        </div>
        <div className="f storeIcons ac">
            <img style={{width: '1.25em', cursor: 'pointer'}} src={playStore}/>
            <img style={{width: '1.25em', cursor: 'pointer'}} src={appStore}/>
        </div>
      </div>

      <div style={{gap: '1em',width: '9em'}} className="f fc">
          <img style={{width: '9em'}} src={qr}/>
          <p className="grey" dangerouslySetInnerHTML={qrCodeText}/>
      </div>

      <img onClick={close} src={crossIcon} className='f ac jc crossIcon absPos' />
    </a.div>
    </div>
  );
}
