import getBaseUrl from 'utils/getBaseUrl';
export async function getWords() {
  const baseUrl = getBaseUrl();
  const rawWords = await fetch(`${baseUrl}/words`);
  const wordsJson = await rawWords.json();
  return wordsJson;
}
