export function getRanking(scoresList, score) {
  const scoresLowerThanUser = scoresList.filter((el) => el < score).length;
  const scoresLength = scoresList.length;
  const ranking = (scoresLowerThanUser / scoresLength) * 100;
  const roundedRanking = Math.ceil(ranking * 100) / 100;
  return roundedRanking;
}
