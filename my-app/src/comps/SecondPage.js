import { imageMockups } from "../data/Strings";
import { a, useSprings } from "react-spring";
import { useEffect, useRef } from "react";
export default function SecondPage() {
  const data = imageMockups;

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
    <div className="f imagesCont fullPg ac">
      {springs.map((animation, index) => (
        <a.img
            key={index}
          style={{ zIndex: data.length + 5 - index, ...animation }}
          className="mockUpImage"
          src={data[index]}
        />
      ))}

    </div>
  );
}

