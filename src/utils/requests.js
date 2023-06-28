import axios from 'axios';

export const fetch_challonge = async (tournoi) => {
    console.log('fetching')
    const { data } = await axios.get(`/api/fetch-tournament-data/${tournoi}`)
    console.log("request data: ", data);
    return data
}