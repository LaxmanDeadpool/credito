import { faqSection } from "../data/Strings"
import Faq from "react-faq-component";
import arrowIcon from '../icons/arrowRight.svg'
export default function FaqComp(){

    return <div className="f fc faqCont">
        {faqSection.map((i, index)=><FaqsComp item={i} key={index} />)}
    </div>
}

const FaqsComp=({item})=>{
    console.log(item, 'called here')

    return <div>
        <Faq
                data={item}
                styles={styles}
                config={config}
            />
    </div>
}

const styles = {
    bgColor: 'none',
    titleTextColor: "var(--creditoBrightColor)",
    // rowTitleColor: "",
    rowContentColor: '#fffa',
    arrowColor: "red",
    titleTextSize: '1.5em',
rowTitleTextSize: '1.2em',
rowContentTextSize: '1em',
// rowContentPaddingTop: '10px',
rowContentPaddingBottom: '10px',

// rowContentPaddingRight: '150px',

};

const config = {
    animate: true,
    arrowIcon: <img style={{transform: `rotate(90deg)`, width: 10}} src={arrowIcon}/>,
    tabFocus: true
};