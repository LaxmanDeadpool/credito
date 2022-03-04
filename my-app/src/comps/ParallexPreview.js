import { imageMockups } from "../data/Strings"
import { parallaxLayersData } from "../data/Strings"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import useOnScreen from "../hooks/useOnScreen"
import { a, useSpring } from "react-spring"
import FirstPage from "./FirstPage"
import FaqComp from "./FaqComp"
import ContactComp from "./ContactComp"

const ParallaxPreview = forwardRef(({ open, navMoveTo }, forwardedRef) => {
    const pagesBeforeThis = 1;

    let len = parallaxLayersData.length
    const images = parallaxLayersData.map(i => i.image)
    const staticSectionRef = useRef();

    const changeIndex = index => staticSectionRef.current.scrollIntoViewItem(index);

    const [contactFactor, setCF] = useState(.5);
    const [faqHfactor, setH] = useState(1);

    const prallaxRf = useRef();

    const setFaqH = h => {
        setH(h);
    }
    const setContactH = h => {
        setCF(h);
    }

    const moveTo = (index) => {
        prallaxRf.current.scrollTo(index)
    }

    useImperativeHandle(forwardedRef, () => ({
        moveTo
    }))

    const navMove=index=>{
        console.log('called', index)
        navMove(index);
    }

    return <div className="fullPg">
        {
            (faqHfactor === 1 || contactFactor === .5) ? <>  <Parallax pages={len + pagesBeforeThis + faqHfactor + contactFactor}>
                <ParallaxLayer factor={2} offset={0} speed={.1}>
                    <FirstPage open={open} />
                </ParallaxLayer>
                <ParallaxLayer sticky={{ start: pagesBeforeThis, end: len + pagesBeforeThis - 1 }}>
                    <RederRightSection ref={staticSectionRef} images={images} />
                </ParallaxLayer>
                {parallaxLayersData.map((i, index) => <ParallaxLayer offset={index + pagesBeforeThis} speed={.5} key={index}>
                    <RenderLeftSection noObserver changeIndex={() => changeIndex(index)} index={index} item={i} />
                </ParallaxLayer>)}

                <ParallaxLayer factor={faqHfactor} offset={len + pagesBeforeThis}>
                    <FaqComp setHeight={setFaqH} />
                </ParallaxLayer>

                <ParallaxLayer factor={contactFactor} offset={len + pagesBeforeThis + faqHfactor}>
                    <ContactComp setHgt={setContactH} />
                </ParallaxLayer>
            </Parallax> </> : <>
                <Parallax ref={prallaxRf} pages={len + pagesBeforeThis + faqHfactor + contactFactor}>
                    <ParallaxLayer factor={2} offset={0} speed={.1}>
                        <FirstPage navMove={()=>{}} noUseEffect open={open} />
                    </ParallaxLayer>

                    <ParallaxLayer sticky={{ start: pagesBeforeThis, end: len + pagesBeforeThis - 1 }}>
                        <RederRightSection navMove={navMove} ref={staticSectionRef} images={images} />
                    </ParallaxLayer>

                    {parallaxLayersData.map((i, index) => <ParallaxLayer offset={index + pagesBeforeThis} speed={.5} key={index}>
                        <RenderLeftSection changeIndex={() => changeIndex(index)} index={index} item={i} />
                    </ParallaxLayer>)}

                    <ParallaxLayer factor={faqHfactor} offset={len + pagesBeforeThis}>
                        <FaqComp navMove={(i)=>console.log('ac', i)} setHeight={() => { }} />
                    </ParallaxLayer>

                    <ParallaxLayer factor={contactFactor} offset={len + pagesBeforeThis + faqHfactor}>
                        <ContactComp navMove={(i)=>console.log('ac', i)} setHgt={() => { }} />
                    </ParallaxLayer>
                </Parallax></>
        }
    </div>

})

export default ParallaxPreview

const RenderLeftSection = ({ item, index, changeIndex, noObserver = false }) => {
    const itemRef = useRef();
    const [animStyle, setAnimStyle] = useSpring(() => ({ opacity: 0, }))
    const comeInView = value => {
        setAnimStyle.start({ opacity: value ? 1 : 0, delay: 100 })
        if (value)
            changeIndex();
    }


    return <div ref={itemRef} className='f fc ac jc parallaxMovingSection'>
        <a.div style={animStyle} className='f fc'>
            <h2>{item.title}</h2>
            <p>{item.subtitle}</p>
        </a.div>

    </div>
}

const RederRightSection = forwardRef(({ images, navMove }, ref) => {

    const [{ scroll }, setScroll] = useSpring(() => ({ scroll: 0 }))
    let width = null;
    const scrollIntoViewItem = index => {
        if (width === null)
            width = document.querySelector('.parallaxImage').offsetWidth + 50
        setScroll.start({
            scroll: width * index
        })
       

    }

    const pgRf = useRef();

    const comeInView=(isTrue)=>{
        if(isTrue)
        navMove(1);
    }

    useOnScreen(pgRf, comeInView, .8)


    useImperativeHandle(ref, () => {
        return { scrollIntoViewItem }
    })

    return <div ref={pgRf} className="f fullPg ac jc parallaxStaticSection">
        <a.div scrollLeft={scroll} className="f parallaxImgCont">{images.map((i, j) => <img key={j} className="parallaxImage" src={i} />)}</a.div>
    </div>
})

