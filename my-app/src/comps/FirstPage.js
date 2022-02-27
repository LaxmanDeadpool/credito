import {useEffect, useRef} from 'react'
import { firstPgStrings } from "../data/Strings"
import appStore from '../appStorePlayStoreStickers/appStoreS.svg'
import playStore from '../appStorePlayStoreStickers/playStoreS.svg'
import qrCodeIcon from '../icons/qrCodeIcon.svg'

 const FirstPage = ({open,  noUseEffect }) => {
    const {introPage} = firstPgStrings;
    const headerRef = useRef();
    const stickerRef = useRef();
    const subHeadingRef=useRef();
    const appStoreRef=useRef();
    const playStoreRef=useRef();
    const qrRef = useRef();

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      
        if (/android/i.test(userAgent)) {
            return "Android";
        }
      
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
      
        return "unknown";
      }

    useEffect(()=>{
        let os = getMobileOperatingSystem();
        if(os==='Android'){
            appStoreRef.current.style.display = "none"
            qrRef.current.style.display = "none"
        }
        if(os==='ios'){
            playStoreRef.current.style.display = "none"
            qrRef.current.style.display = "none"
        }

            headerRef.current?.classList.add('firstPgHeadingFinal');
        setTimeout(() => {
            headerRef.current?.classList.add('firstPgHeadingFulOpacity')
        }, 800);
        setTimeout(() => {
            subHeadingRef.current?.classList.add('firstPgHeadingFulOpacity')
            stickerRef.current?.classList.add('fullOpacity')
        }, 1000);
    }, [])
    
    return <div style={{paddingLeft: '1em', paddingRight: '1em'}} className="f fullPg ac jc fc">
        <h1 ref={headerRef} className='firstPgHeading' dangerouslySetInnerHTML={introPage.heading}/>
        <h3 className='firstPgSubheading' ref={subHeadingRef} dangerouslySetInnerHTML={introPage.subHeading} />
        <div ref={stickerRef} style={{gap: '1em', marginTop: '3em'}} className='f ac storeStickerCont '>
            <img ref={appStoreRef} className='stickerImage' src={appStore}/>
            <img ref={playStoreRef} className='stickerImage' src={playStore}/>
            <img ref={qrRef} onClick={open} className='stickerImage' style={{ height: '2.5em', marginLeft: '1em'}} src={qrCodeIcon}/>
        </div>
    </div> 
}

export default FirstPage
