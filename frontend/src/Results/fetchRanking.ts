import getBaseUrl from 'utils/getBaseUrl';

export async function fetchRanking(score: number) {
  const baseUrl = getBaseUrl();
  const rawRes = await fetch(`${baseUrl}/rank`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ score: score }),
  });
  const rankJson = await rawRes.json();
  const rank = rankJson.ranking;
  return rank;
}
