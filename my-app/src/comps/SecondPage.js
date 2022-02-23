import { imageMockups } from "../data/Strings";
import { a, useSprings } from "react-spring";
import { useEffect, useRef } from "react";
export default function SecondPage() {
  const data = [...imageMockups, ...imageMockups];
  const isApiCalled = useRef(false);
  const [springs, api] = useSprings(
    data.length,
    i=>({
        x: -80,
        opacity: 0,
      }))


  const animate = () => {
    window.removeEventListener("scroll", animate);
    window.removeEventListener("touchmove", animate);

setTimeout(() => {
    
    api.start((i) => ({
      to: { x: 0, opacity: 1 },
      config: {duration: 300},
      delay: i * 150, 
    }));
}, 300);

  };

  useEffect(() => {
    window.addEventListener("wheel", animate);
    window.addEventListener('touchmove', animate)
  }, []);

  return (
    <div className="f imagesCont">
      {springs.map((animation, index) => (
        <a.img
            key={index}
          style={{ zIndex: 10 - index, ...animation }}
          className="mockUpImage"
          src={data[index]}
        />
      ))}

      {/* {[...imageMockups, ...imageMockups].map((item, index)=>{ return <RenderImage key={index} img={item} index={index}/>
        })} */}
    </div>
  );
}

const RenderImage = ({ img, index }) => {
  return (
    <a.img style={{ zIndex: 10 - index }} className="mockUpImage" src={img} />
  );
};
