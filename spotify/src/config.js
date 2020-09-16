const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "176a8a490c1640438983dd07875fec7c";
const redirectUri = "https://cover-quizz.herokuapp.com/callback";
const scopes = [
  'user-top-read',
];

export { authEndpoint, clientId, redirectUri, scopes }