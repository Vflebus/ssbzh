import './App.scss';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

function App() {

  // const gsap = window.gsap;
  // const Power0 = window.Power0;
  const sea = useRef();
  const waves = useRef();
  const diveAnimation = useRef();

  const [diving, setDiving] = useState(false);

  useEffect(() => {
    if (diving) {
      diveAnimation.current = gsap.timeline({ defaults: { duration: 1.5, ease: "none" } });
      diveAnimation.current.to(sea.current, {
        bottom: 0,
      });
      diveAnimation.current.to(waves.current, {
        bottom: "100vh",
      }, "<")
    }
  });

  const diveIn = () => {
    setDiving(true);
  };

  return (
    <div className="app">
      <button className='diveButton' onClick={diveIn}>Dive in !</button>
      <div className="sea" ref={sea}>
        <div class="bubble bubble--1"></div>
        <div class="bubble bubble--2"></div>
        <div class="bubble bubble--3"></div>
        <div class="bubble bubble--4"></div>
        <div class="bubble bubble--5"></div>
        <div class="bubble bubble--6"></div>
        <div class="bubble bubble--7"></div>
        <div class="bubble bubble--8"></div>
        <div class="bubble bubble--9"></div>
        <div class="bubble bubble--10"></div>
        <div class="bubble bubble--11"></div>
        <div class="bubble bubble--12"></div>
      </div>
      <svg className="waves" ref={waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(31, 64, 73, 0.7" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(31, 64, 73, 0.5)" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(31, 64, 73, 0.3)" />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#50a4b9" />
        </g>
      </svg>
    </div>
  );
}

export default App;
