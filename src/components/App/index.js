/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import './App.scss';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import logo from '../../images/logo_ssbzh.png'
import logo_transparent from '../../images/logo_breizh.png'

import Player from '../Player';

function App() {

  const sea = useRef();
  const waves = useRef();
  const diveAnimation = useRef();
  const diveInButton = useRef();
  const diveOutButton = useRef();
  const tournamentName = useRef();
  const playerSelector = useRef();
  const surface = useRef();

  const [diving, setDiving] = useState(false);
  const [tournament, setTournament] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState(0);
  const [week, setWeek] = useState();
  const [season, setSeason] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(tournament);
    if(tournament){
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
        diveAnimation.current.to(surface.current, {
          transform: "translateY(-40vh)"
        }, "<");
        diveAnimation.current.to(diveOutButton.current, {
          opacity: 1
        });
        diveAnimation.current.to(playerSelector.current, {
          opacity: 1
        }, "<");
      } else {
        diveAnimation.current.to(sea.current, {
          top: "90vh",
        });
        diveAnimation.current.to(waves.current, {
          bottom: "10vh",
        }, "<");
        diveAnimation.current.to(surface.current, {
          transform: "translateY(0)"
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
    }
  });

  const diveIn = () => {
    setDiving(true);
  };
  const diveOut = () => {
    setDiving(false);
  }


  const loadTournament = async (season, week) => {
    console.log('diving !');
    const url = `CPUS${season}W${week}`;
    const api = axios.create({
      baseURL: 'https://challonge-fetch.herokuapp.com/'
    });
    try {
      console.log('loading...')
      const { data } = await api.get(`/${url}`);
      console.log(data);
      if (data.length == 0) {
        setError(true);
        setTournament("");
        return;
      }
      await setTournament(data);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setTournament("");
    }
  }

  useEffect(() => {
    if (season && week) {
      loadTournament(season, week);
    } else {
      console.log(`no search`);
    }
  }, [season, week]);


  return (
    <div className="app">
      <div className="surface" ref={surface}>
        <div className="tournamentName" ref={tournamentName} onSubmit={(e) => { loadTournament(season, week) }}>
          <div className="tournamentSelector">
            <h2>Saison</h2>
            <input type="number" min="1" className='h2Input' value={season} onFocus={() => setSeason("")} onChange={e => setSeason(e.target.value)} placeholder="X" />
          </div>
          <div className="tournamentSelector">
            <h2>Semaine</h2>
            <input type="number" min="1" className='h2Input' value={week} onFocus={() => setWeek("")} onChange={e => setWeek(e.target.value)} placeholder="X" />
          </div>
        </div>
        {error && (
          <p className="errorMessage">Désolé !<br />Ce tournoi n'est pas accessible depuis ce site. Il a été mal renseigné sur Challonge, ou bien a été enregistré sur une URL inconnue.</p>
        )}
        {tournament && tournament.participants.length > 0 && (
          <>
            <div className="top3Container">
              <h3>Top 3</h3>
              {tournament.participants.filter(participant => Number(participant.classement_final) < 4).sort((a, b) => {
                return a.classement_final - b.classement_final
              }).map(participant => {
                return (
                  <div key={participant.id} className={participant.img ? "top3" : "top3 noImg"}>
                    {participant.img && (
                      <img src={participant.img} alt="" />
                    )}
                    <p>{participant.nom}</p>
                  </div>
                )
              }
              )}
              <p>{tournament.participants.length} participants</p>
            </div>
            <button className='diveButton' onClick={diveIn}>Voir le tournoi</button>
          </>
        )
        }
        {!tournament && season && week && !error && (
          <p className="loadingText">Loading...</p>
        )}
        <img src={logo} className="logoBreizh" alt="" />
      </div>
      <svg className="waves" ref={waves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(31, 64, 73, 0.7" stroke="rgba(255, 255, 255, 0.7" strokeWidth=".4" />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(31, 64, 73, 0.5)" stroke="rgba(255, 255, 255, 0.5" strokeWidth=".4" />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(31, 64, 73, 0.3)" stroke="rgba(255, 255, 255, 0.3" strokeWidth=".4" />
          <use xlinkHref="#gentle-wave" x="48" y="9" fill="#50a4b9" stroke='white' strokeWidth=".4" />
        </g>
      </svg>
      <div className="sea" ref={sea}>
        <div className="seaNav">
          <button className='diveButton' onClick={diveOut} ref={diveOutButton}>Retour aux tournois</button>
          {tournament && tournament.participants.length > 0 && !error &&
            (
              <>
                {/* <input list="playerSelector" className="playerSelector" ref={playerSelector} value={selectorValue} onChange={e => setSelectorValue(e.target.value)}/> */}
                <select id='playerSelector' className="playerSelector" ref={playerSelector} value={selectedPlayer} onChange={e => setSelectedPlayer(e.target.value)}>
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
        {tournament && tournament.participants.length > 0 && (
          <Player name={tournament.participants[selectedPlayer].nom} seed={tournament.participants[selectedPlayer].seed} matchs={tournament.participants[selectedPlayer].matchs} finalRank={tournament.participants[selectedPlayer].classement_final} />
        )}
      </div>
    </div>
  );
}

export default App;
