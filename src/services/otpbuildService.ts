import axios from 'axios';
import type { Summoner } from '@/types';

// Set base URL for API requests
axios.defaults.baseURL = '/api';

/**
 * Get a summoner by Riot ID (game name and tag line)
 * @param gameName The game name of the summoner
 * @param tagLine The tag line of the summoner
 * @returns Promise with the summoner data
 */
export async function getSummonerByRiotId(gameName: string, tagLine: string): Promise<Summoner> {
  const response = await axios.get<Summoner>(
    `/Summoners/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  );
  return response.data;
}

/**
 * Get a summoner by PUUID
 * @param puuid The PUUID of the summoner
 * @returns Promise with the summoner data
 */
export async function getSummonerByPuuid(puuid: string): Promise<Summoner> {
  const response = await axios.get<Summoner>(
    `/Summoners/by-puuid/${encodeURIComponent(puuid)}`
  );
  return response.data;
}

/**
 * Search for summoners matching a given query.
 * @param query - The search string to find summoners.
 * @returns A promise containing a list of summoners matching the query.
 */
export async function searchSummonerByQuery(query: string): Promise<Summoner[]> {
  const response = await axios.get<Summoner[]>(
    `/Summoners/search?query=${encodeURIComponent(query)}`
  );
  return response.data;
}
