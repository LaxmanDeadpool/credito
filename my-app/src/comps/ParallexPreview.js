import { imageMockups } from "../data/Strings"
import { parallaxLayersData } from "../data/Strings"
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import useOnScreen from "../hooks/useOnScreen"
import { a, useSpring } from "react-spring"
import FirstPage from "./FirstPage"
import FaqComp from "./FaqComp"

export default function ParallaxPreview() {
    const pagesBeforeThis = 1;
    const pagesAfterThis = 1;
    let len = parallaxLayersData.length
    const images = parallaxLayersData.map(i => i.image)
    const staticSectionRef=useRef();

    const changeIndex=index=>staticSectionRef.current.scrollIntoViewItem(index);

    return <div className="fullPg">
        <Parallax pages={len + pagesBeforeThis + pagesBeforeThis}>
            <ParallaxLayer offset={0} speed={.1}>
                <FirstPage/>
            </ParallaxLayer>
            <ParallaxLayer sticky={{ start: pagesBeforeThis, end: len + pagesBeforeThis -1 }}>
                <RederRightSection ref={staticSectionRef} images={images}/>
                {/* <div className="ac jc f parallaxStaticSection">
                    <PI key={'A'} img={images} style={sis} />
                </div> */}
            </ParallaxLayer>

            {parallaxLayersData.map((i, index) => <ParallaxLayer offset={index + pagesBeforeThis} speed={.5} key={index}>
                <RenderLeftSection changeIndex={()=>changeIndex(index)} index={index} item={i} />
            </ParallaxLayer>)}

            <ParallaxLayer offset={len + pagesBeforeThis}>
                <FaqComp/>
            </ParallaxLayer>
        </Parallax>
    </div>
}

const RenderLeftSection = ({ item, index, changeIndex }) => {
    const itemRef = useRef();
    const [animStyle, setAnimStyle] = useSpring(() => ({ opacity: 0, }))
    const comeInView = value => {
        setAnimStyle.start({ opacity: value ? 1 : 0, delay: 100 })
        if(value)
        changeIndex();
    }
    useOnScreen(itemRef, comeInView, .6)
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

const PI = ({ style, index }) => {
    const ref = useRef();
    const fun = val => console.log(`element ${index} is ovserved as ${val}`)
    useOnScreen(ref, fun, .2)
    return <div ref={ref} style={style} />
}

const mis = {
    width: 100,
    height: 100,

    background: 'tomato',
}

const sis = {
    marginRight: 100,
    width: 100,
    height: 100,
    background: 'yellow',
    // marginRight: 500
}