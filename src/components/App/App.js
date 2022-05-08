import './App.scss';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {

  // const gsap = window.gsap;
  // const Power0 = window.Power0;
  const sea = useRef();
  const waves = useRef();
  const diveAnimation = useRef();

  const [diving, setDiving] = useState(false);

  useEffect(() => {
    diveAnimation.current = gsap.timeline({ defaults: { duration: 1.5, ease: "power1.out" } });
    if (diving) {
      diveAnimation.current.to(sea.current, {
        bottom: 0,
      });
      diveAnimation.current.to(waves.current, {
        bottom: "100vh",
      }, "<")
    } else {
      diveAnimation.current.to(sea.current, {
        bottom: "-90vh",
      });
      diveAnimation.current.to(waves.current, {
        bottom: "10vh",
      }, "<")
    }
  });

  const diveIn = () => {
    setDiving(true);
  };
  const diveOut = () => {
    setDiving(false);
  }

  const [tournament, setTournament] = useState();

  const api = axios.create({
    baseURL: 'https://api.challonge.com/v1/'
  });
  const fetch_challonge = async (tournoi) => {
    const participantsData = await api.get(`/tournaments/${tournoi}/participants.json?api_key=HgoEi7lekbPyhvOqFeSki4yurW7dpN5LF4Wqk0hb`);
    const allParticipants = participantsData.data;
    const matchsData = await api.get(`/tournaments/${tournoi}/matches.json?api_key=HgoEi7lekbPyhvOqFeSki4yurW7dpN5LF4Wqk0hb`);
    const allMatchs = matchsData.data;

    const participants = allParticipants.map(participant => {
      const matchsData = allMatchs.filter(match => {
        return (match.match.player1_id == participant.participant.id || match.match.player2_id == participant.participant.id);
      })
      const matchs = matchsData.map(match => {
        const newMatch = {
          round: match.match.round > 0 ? `Winner round ${Math.abs(match.match.round)}` : `Loser round ${Math.abs(match.match.round)}`,
          player1: allParticipants.filter(participant => participant.participant.id == match.match.player1_id)[0].participant.display_name,
          player2: allParticipants.filter(participant => participant.participant.id == match.match.player2_id)[0].participant.display_name,
          winner: allParticipants.filter(participant => participant.participant.id == match.match.winner_id)[0].participant.display_name,
          score: match.match.scores_csv
        };
        return newMatch
      })
      return {
        nom: participant.participant.display_name,
        seed: participant.participant.seed,
        classement_final: participant.participant.final_rank ? participant.participant.final_rank : "Tournoi non complété",
        matchs: matchs
      };
    });
    setTournament(participants);
  }

  useEffect(() => {
    fetch_challonge('CPUS4W9');
  })

  return (
    <div className="app">
      <button className='diveButton' onClick={diveIn}>Dive in !</button>
      <div className="sea" ref={sea}>
        <button className='diveButton' onClick={diveOut}>Dive out !</button>
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
