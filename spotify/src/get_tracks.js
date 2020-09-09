const endpoint = 'https://api.spotify.com/v1/search'

const findArtist = (artist, token) => {
  const url = `${endpoint}?q=${artist.replace(/\s/g, '%20')}&type=artist`
  return fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + token }})
    .then(response => response.json())
    .then((data) => {
      return data.artists.items[0].id
    })
}

const getTracks = (artist, token) => {
  return findArtist(artist, token).then(data => {
    const artistId = data
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=FR`
    return fetch(url, {
            headers: {
            'Authorization': 'Bearer ' + token }
          })
      .then(response => response.json())
      .then((data) => {
        return data.tracks
        })
  });
}

export { getTracks }