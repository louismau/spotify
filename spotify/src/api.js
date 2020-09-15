const getUserFavorites = (token) => {
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5&offset=${Math.floor((Math.random() * 100) / 2)}`
  return fetch(url, { headers: {'Authorization': 'Bearer ' + token }})
    .then(response => response.json())
    .then((data) => {
      return data.items.map(artist => artist.id)
    });
}

const getRelatedArtists = (artist, token) => {
  const url = `https://api.spotify.com/v1/artists/${artist}/related-artists`
  return fetch(url, { headers: {'Authorization': 'Bearer ' + token }})
    .then(response => response.json())
    .then((related) => {
      return related.artists.map(artist => artist.id);
    })
}

const getAlbums = (artist, token) => {
  const url = `https://api.spotify.com/v1/artists/${artist}/albums?include_groups=album&market=FR`
  return fetch(url, { headers: {'Authorization': 'Bearer ' + token }})
    .then(response => response.json())
    .then((albums) => {
      return albums.items.map((album) => ({cover: album.images[0].url || null,
                                            name: album.name,
                                          artist: album.artists[0].name
      })
      );
    })
}

const getAllArtists = (token) => {
  return getUserFavorites(token).then((artists) => {
    return Promise.all(artists.map(artist => getRelatedArtists(artist, token)))
      .then((values) => {
        return Array.from(new Set(values.join().split(',')))
      })
    })
  }

const getAlbumsData = (token) => {
  return getAllArtists(token).then((artists) => {
    return Promise.all(artists.map(artist => getAlbums(artist, token)))
       .then(values => {
         return values.flat(2)
       })
  })
}

export { getAlbumsData }