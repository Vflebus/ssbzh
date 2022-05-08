/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import './App.scss';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import Player from '../Player';

function App() {

  const sea = useRef();
  const waves = useRef();
  const diveAnimation = useRef();
  const diveInButton = useRef();
  const diveOutButton = useRef();
  const tournamentName = useRef();

  const [diving, setDiving] = useState(false);

  useEffect(() => {
    diveAnimation.current = gsap.timeline({ defaults: { duration: 1.5, ease: "power1.out" } });
    if (diving) {
      diveAnimation.current.to(diveInButton.current, {
        opacity: 0
      });
      diveAnimation.current.to(sea.current, {
        top: 0,
      }, "<");
      diveAnimation.current.to(waves.current, {
        bottom: "100vh",
      }, "<");
      diveAnimation.current.to(diveOutButton.current, {
        opacity: 1
      });
    } else {
      diveAnimation.current.to(sea.current, {
        top: () => window.screen.width > 768 ? "90vh" : "80vh",
      });
      diveAnimation.current.to(waves.current, {
        bottom: () => window.screen.width > 768 ? "10vh" : "20vh",
      }, "<");
      diveAnimation.current.to(diveOutButton.current, {
        opacity: 0
      }, "<");
      diveAnimation.current.to(diveInButton.current, {
        opacity: 1
      });
    }
  });

  const diveIn = () => {
    setDiving(true);
  };
  const diveOut = () => {
    setDiving(false);
  }

  const [tournament, setTournament] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const api = axios.create({
      baseURL: 'https://challonge-fetch.herokuapp.com/'
    });
    const fetchLocal = async () => {
      const { data } = await api.get('/');
      console.log(data);
      setTournament(data);
      setLoading(false);
    }
    fetchLocal();
  }, [])


  return (
    <div className="app">
      <h2 className='tournamentName' ref={tournamentName}>Saison {tournament.season} <br/>Semaine {tournament.week}</h2>
      <button className='diveButton diveIn' onClick={diveIn} ref={diveInButton}>Dive in !</button>
      <div className="sea" ref={sea}>
        <button className='diveButton' onClick={diveOut} ref={diveOutButton}>Dive out !</button>
        <div>
          <div className="bubble bubble--1"></div>
          <div className="bubble bubble--2"></div>
          <div className="bubble bubble--3"></div>
          <div className="bubble bubble--4"></div>
          <div className="bubble bubble--5"></div>
          <div className="bubble bubble--6"></div>
          <div className="bubble bubble--7"></div>
          <div className="bubble bubble--8"></div>
          <div className="bubble bubble--9"></div>
          <div className="bubble bubble--10"></div>
          <div className="bubble bubble--11"></div>
          <div className="bubble bubble--12"></div>
        </div>
        {!loading && (
          <Player name={tournament.participants[0].nom} seed={tournament.participants[0].seed} matchs={tournament.participants[0].matchs} finalRank={tournament.participants[0].classement_final} />
        )}
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
