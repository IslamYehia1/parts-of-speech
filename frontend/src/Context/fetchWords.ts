export async function getWords() {
  const rawWords = await fetch('http://localhost:4000/words');
  const wordsJson = await rawWords.json();
  return wordsJson;
}
