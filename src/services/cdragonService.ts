const CDRAGON_BASE_URL = 'https://raw.communitydragon.org/latest'

/**
 * Get the URL for a summoner icon
 * @param iconId The icon ID
 * @returns Promise with the icon URL
 */
export async function getSummonerIconUrl(iconId?: number): Promise<string> {
  const basePath = `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/`
  return iconId ? `${basePath}${iconId}.jpg` : `${basePath}29.jpg`
}

/**
 * Get the URL for a champion icon
 * @param championId The champion ID
 * @returns Promise with the icon URL
 */
export async function getChampionIconUrl(championId: number): Promise<string> {
  return `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${championId}.png`;
}

/**
 * Get the URL for an item icon
 * @param itemId The item ID
 * @returns Promise with the icon URL
 */
export async function getItemIconUrl(itemId: number): Promise<string> {
  const response = await fetch(
    `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default/v1/items.json`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch items data: ${response.statusText}`)
  }

  const itemsData = await response.json()

  const item = itemsData.find((i: { id: number; iconPath?: string }) => i.id === itemId)

  if (!item || !item.iconPath) {
    throw new Error(`Item with ID ${itemId} not found or missing iconPath`)
  }

  const correctedPath = item.iconPath
    .replace('/lol-game-data/assets/ASSETS/', '/game/assets/')
    .toLowerCase()

  return `${CDRAGON_BASE_URL}${correctedPath}`
}
