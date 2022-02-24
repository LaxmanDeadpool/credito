import {useEffect, useRef} from 'react'
import { firstPgStrings } from "../data/Strings"

 const FirstPage = (props) => {
    const {introPage} = firstPgStrings;
    const headerRef = useRef();
    const subHeadingRef=useRef();
    useEffect(()=>{
            headerRef.current.classList.add('firstPgHeadingFinal');
        setTimeout(() => {
            headerRef.current.classList.add('firstPgHeadingFulOpacity')
        }, 800);
        setTimeout(() => {
            subHeadingRef.current.classList.add('firstPgHeadingFulOpacity')
        }, 1500);
    })
    
    return <div style={{paddingLeft: '1em', paddingRight: '1em'}} className="f fullPg ac jc fc">
        <h1 ref={headerRef} className='firstPgHeading' dangerouslySetInnerHTML={introPage.heading}/>
        <h3 className='firstPgSubheading' ref={subHeadingRef} dangerouslySetInnerHTML={introPage.subHeading} />
    </div> 
}

export default FirstPage