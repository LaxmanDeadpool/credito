import { imageMockups } from "../data/Strings"
import { parallaxLayersData } from "../data/Strings"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import useOnScreen from "../hooks/useOnScreen"
import { a, useSpring } from "react-spring"
import FirstPage from "./FirstPage"
import FaqComp from "./FaqComp"
import ContactComp from "./ContactComp"

export default function ParallaxPreview({open}) {
    const pagesBeforeThis = 1;

    let len = parallaxLayersData.length
    const images = parallaxLayersData.map(i => i.image)
    const staticSectionRef=useRef();

    const changeIndex=index=>staticSectionRef.current.scrollIntoViewItem(index);

    // const contactFactor = 0;
    // const faqHfactor = 1
    const [contactFactor, setCF] = useState(.5);
    const [faqHfactor, setH] = useState(1);
    const contactCorrected = useRef(false);
    const faqCorrected = useRef(false);
    const [render, rerender] = useState(false);

    const setFaqH=h=>{
        setH(h);
        // faqHfactor = h
        // faqCorrected.current = true
        // // if(contactCorrected.current)
        // rerender(true)
    }
    const setContactH=h=>{
        setCF(h);
        // contactFactor=h
        // contactCorrected.current=true
        // if(faqCorrected.current)
        // rerender(true)
    }

    return <div className="fullPg"> 
{ 
(faqHfactor===1 || contactFactor===.5)?   <>  <Parallax pages={len + pagesBeforeThis + faqHfactor + contactFactor}>
<ParallaxLayer factor={2} offset={0} speed={.1}>
    <FirstPage open={open}/>
</ParallaxLayer>
<ParallaxLayer sticky={{ start: pagesBeforeThis, end: len + pagesBeforeThis -1 }}>
    <RederRightSection ref={staticSectionRef} images={images}/>
</ParallaxLayer> 
{parallaxLayersData.map((i, index) => <ParallaxLayer offset={index + pagesBeforeThis} speed={.5} key={index}>
    <RenderLeftSection noObserver changeIndex={()=>changeIndex(index)} index={index} item={i} />
</ParallaxLayer>)}

<ParallaxLayer factor={faqHfactor} offset={len + pagesBeforeThis}>
    <FaqComp setHeight={setFaqH}/>
</ParallaxLayer>

<ParallaxLayer factor={contactFactor} offset={len + pagesBeforeThis + faqHfactor}>
    <ContactComp setHgt={setContactH}/>
</ParallaxLayer>
</Parallax> </> : <>
<Parallax pages={len + pagesBeforeThis + faqHfactor + contactFactor}>
        <ParallaxLayer factor={2} offset={0} speed={.1}>
            <FirstPage noUseEffect open={open}/>
        </ParallaxLayer>
 <ParallaxLayer sticky={{ start: pagesBeforeThis, end: len + pagesBeforeThis -1 }}>
            <RederRightSection ref={staticSectionRef} images={images}/>
        </ParallaxLayer> 
        {parallaxLayersData.map((i, index) => <ParallaxLayer offset={index + pagesBeforeThis} speed={.5} key={index}>
            <RenderLeftSection changeIndex={()=>changeIndex(index)} index={index} item={i} />
        </ParallaxLayer>)}

<ParallaxLayer factor={faqHfactor} offset={len + pagesBeforeThis}>
            <FaqComp setHeight={()=>{}}/>
        </ParallaxLayer>
        
        <ParallaxLayer factor={contactFactor} offset={len + pagesBeforeThis + faqHfactor }>
            <ContactComp setHgt={()=>{}}/>
        </ParallaxLayer>
    </Parallax></>
}
</div>


}

const RenderLeftSection = ({ item, index, changeIndex, noObserver=false }) => {
    const itemRef = useRef();
    const [animStyle, setAnimStyle] = useSpring(() => ({ opacity: 0, }))
    const comeInView = value => {
        setAnimStyle.start({ opacity: value ? 1 : 0, delay: 100 })
        if(value)
        changeIndex();
    }
 
    useOnScreen(itemRef, comeInView, .6, noObserver)
    return <div ref={itemRef} className='f fc ac jc parallaxMovingSection'>
        <a.div style={animStyle} className='f fc'>
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
        </a.div>

    </div>
}

const RederRightSection=forwardRef(({images}, ref)=>{

    const [{scroll}, setScroll] = useSpring(()=>({scroll: 0}))
    let width = null;
    const scrollIntoViewItem=index=>{
            if(width===null)
                width = document.querySelector('.parallaxImage').offsetWidth + 50
            setScroll.start({
                scroll: width*index
            })
            // document.querySelectorAll('.parallaxImage')[index].scrollIntoView({behavior: 'auto'})
        
    }


    useImperativeHandle(ref, ()=>{
        return {scrollIntoViewItem}
    })

    return <div className="f fullPg ac jc parallaxStaticSection">
        <a.div scrollLeft={scroll} className="f parallaxImgCont">{images.map((i, j)=><img key={j} className="parallaxImage" src={i} />)}</a.div>
    </div>
})

