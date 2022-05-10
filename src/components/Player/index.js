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
                <table className="results">
                    {matchs.map(match => {
                        return (
                            <tr key={match.id} className={match.hasWon ? "match win" : "match lose"}>
                                <td>
                                    <p className="p1">{match.player1}</p>
                                </td>
                                <td className="score">
                                    <p>{match.score}</p>
                                </td>
                                <td className="p2">
                                    <p>{match.player2}</p>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

export default Player;