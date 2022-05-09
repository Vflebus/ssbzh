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
  const playerSelector = useRef();

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
      diveAnimation.current.to(tournamentName.current, {
        y: "10vh",
      }, "<");
      diveAnimation.current.to(diveOutButton.current, {
        opacity: 1
      });
      diveAnimation.current.to(playerSelector.current, {
        opacity: 1
      }, "<");
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
      diveAnimation.current.to(playerSelector.current, {
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
  const [selectorValue, setSelectorValue] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState(0);

  // useEffect(() => {
  //   const api = axios.create({
  //     baseURL: 'https://challonge-fetch.herokuapp.com/'
  //   });
  //   const fetchLocal = async () => {
  //     const { data } = await api.get('/');
  //     console.log(data);
  //     setTournament(data);
  //     setLoading(false);
  //     // selectorValue(data.participants[0].nom)
  //   }
  //   fetchLocal();
  // }, [])
  const loadTournament = async (season, week) => {
    console.log('diving !');
    const url = `CPUS${season}W${week}`;
    const url2 = '';
    const api = axios.create({
      baseURL: 'https://challonge-fetch.herokuapp.com/'
    });
    const { data } = await api.get(`/${url2}`);
    console.log(data);
    setTournament(data);
    setLoading(false);
    setDiving(true);
  }



  return (
    <div className="app">
      <div className="tournamentName"  ref={tournamentName}>
        {/* <h2>Saison {tournament.season} <br />Semaine {tournament.week}</h2> */}
        <div className="tournamentSelector">
          <h2>Saison</h2>
          <input type="number" min="0" className='h2Input' />
          {/* <div className="cursor"></div> */}
        </div>
        <div className="tournamentSelector">
          <h2>Semaine</h2>
          <input type="number" min="0" className='h2Input' onFocus={e => e.target.value=""} onChange={e => console.log(e.target.value)}/>
        </div>
      </div>
      <button className='diveButton diveIn' onClick={() => { loadTournament(2, 3) }} ref={diveInButton}>Dive in !</button>
      <div className="sea" ref={sea}>
        <div className="seaNav">
          <button className='diveButton' onClick={diveOut} ref={diveOutButton}>Dive out !</button>
          {!loading &&
            (
              <>
                {/* <input list="playerSelector" className="playerSelector" ref={playerSelector} value={selectorValue} onChange={e => setSelectorValue(e.target.value)}/> */}
                <select id='playerSelector' className="playerSelector" ref={playerSelector} onChange={e => setSelectedPlayer(e.target.value)}>
                  {
                    tournament.participants.map(participant => {
                      return (
                        <option value={tournament.participants.indexOf(participant)} key={tournament.participants.indexOf(participant)}>{participant.nom}</option>
                      )
                    })
                  }
                </select>
              </>
            )}
        </div>
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
          <Player name={tournament.participants[selectedPlayer].nom} seed={tournament.participants[selectedPlayer].seed} matchs={tournament.participants[selectedPlayer].matchs} finalRank={tournament.participants[selectedPlayer].classement_final} />
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
