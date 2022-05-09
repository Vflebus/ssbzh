import "./Player.scss"

const Player = ({ name, seed, finalRank, matchs }) => {
    return (
        <div className="playerCard">
            <div className="playerInfos">
                <h2>{name}</h2>
                <p>Seed: {seed}</p>
                <p>Placement: {finalRank}</p>
            </div>
            <div className="matchsList">
                {matchs.map(match => {
                    return (
                        <div key={match.id} className="match">
                            <img src={match.player1Img} className="playerImg" alt="" /> 
                            <p>{match.player1}</p>
                            <p>{match.score}</p>
                            <p>{match.player2}</p>
                            <img src={match.player2Img} className="playerImg" alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Player;