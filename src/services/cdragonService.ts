export async function getSummonerIconUrl(iconId: number): Promise<string> {
  const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profileicon/${iconId}.png`);
  if (!response.ok) {
    throw new Error(`Failed to fetch icon: ${response.statusText}`);
  }
  return response.url;
}

export async function getChampionIconUrl(championid: number): Promise<string> {
  const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championid}.png`);
  if (!response.ok) {
    throw new Error(`Failed to fetch champion icon: ${response.statusText}`);
  }
  return response.url;
}

export async function getItemIconUrl(itemId: number): Promise<string> {
  const response = await fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items/${itemId}.png`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item icon: ${response.statusText}`);
  }
  return response.url;
}
