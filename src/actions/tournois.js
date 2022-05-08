export const FETCH_TOURNAMENT = "FETCH_TOURNAMENT";
export const fetchTournament = (tournamentId) => ({
    type: FETCH_TOURNAMENT,
    tournamentId
})

export const SAVE_TOURNAMENT = "SAVE_TOURNAMENT";
export const saveTournament = (data) => ({
    type: SAVE_TOURNAMENT,
    data
})