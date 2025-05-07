const CDRAGON_BASE_URL = 'https://raw.communitydragon.org/latest';

/**
 * Fetch a resource from the given URL
 * @param url The URL to fetch
 * @returns The response URL
 */
async function fetchResource(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch resource: ${response.statusText}`);
  }

  return response.url;
}

/**
 * Get the URL for a summoner icon
 * @param iconId The icon ID
 * @returns Promise with the icon URL
 */
export async function getSummonerIconUrl(iconId: number): Promise<string> {
  try {
    return await fetchResource(
      `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${iconId}.jpg`
    );
  } catch (error) {
    if (iconId !== 0) {
      try {
        return await fetchResource(
          `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg`
        );
      } catch (fallbackError) {
        console.error('Failed to fetch default icon:', fallbackError);
        throw new Error('Failed to fetch both requested and default summoner icons');
      }
    }
    throw error;
  }
}

/**
 * Get the URL for a champion icon
 * @param championId The champion ID
 * @returns Promise with the icon URL
 */
export async function getChampionIconUrl(championId: number): Promise<string> {
  try {
    return await fetchResource(
      `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`
    );
  } catch (error) {
    console.error(`Failed to fetch champion icon for ID ${championId}:`, error);
    throw error;
  }
}

/**
 * Get the URL for an item icon
 * @param itemId The item ID
 * @returns Promise with the icon URL
 */
export async function getItemIconUrl(itemId: number): Promise<string> {
  try {
    const response = await fetch(
      `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/items.json`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch items data: ${response.statusText}`);
    }

    const itemsData = await response.json();

    const item = itemsData.find((i: { id: number; iconPath?: string }) => i.id === itemId);

    if (!item || !item.iconPath) {
      throw new Error(`Item with ID ${itemId} not found or missing iconPath`);
    }

    const correctedPath = item.iconPath
      .replace('/lol-game-data/assets/ASSETS/', '/game/assets/')
      .toLowerCase();

    return `${CDRAGON_BASE_URL}${correctedPath}`;
  } catch (error) {
    console.error(`Failed to get item icon for ID ${itemId}:`, error);
    throw new Error(`Failed to get item icon for ID ${itemId}`);
  }
}
