import React from 'react'
import { getTracks } from './get_tracks'
import hash from './hash'
import { authEndpoint, clientId, redirectUri, scopes } from './config'
import Tracks from './Tracks'


export default class Artist extends React.Component {
  state = {
    artist: '',
    token: null,
    tracks: null
  }

  componentDidMount () {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }

  handleSubmit = (event) => {
    const { artist, token } = this.state
    event.preventDefault()
    getTracks(artist, token).then((tracks) => {
      this.setState({
        tracks: tracks
      })
    })
  }

  handleChange = (event) => {
    this.setState({
       artist: event.target.value
     })
   }

  render() {
    return (
      <React.Fragment>
        {!this.state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && !this.state.tracks && (
          <form onSubmit={this.handleSubmit}> 
            <input 
              type='text'
              id='artist'
              placeholder='Michel Sardou'
              onChange={this.handleChange}>
            </input> 
            <button
              type='submit'>
              Submit
            </button>
          </form>
          )}
        {this.state.token && this.state.tracks &&(
          <Tracks tracks={this.state.tracks}/>
        )}
      </React.Fragment>
    )
  }

}