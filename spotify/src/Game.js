import React from 'react'
import { getAlbumsData } from './api'
import hash from './hash'
import { authEndpoint, clientId, redirectUri, scopes } from './config'
import Counter from './Counter.js'
import Playing from './Playing.js'
import Play from './Play.js'
import Result from './Result.js'
import Restart from './Restart.js'


export default class Game extends React.Component {
  state = {
    token: null,
    albums: null,
    album: null,
    points: 0,
    end: false
  }

  componentDidMount () {
    // Set token
    const _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    getAlbumsData(this.state.token)
    .then((albums) => {
      this.setState({
        albums: albums,
        album: albums[Math.floor(Math.random() * albums.length)]
      })
    })
  }

  handleReset = () => {
    this.setState({
      albums: null,
      album: null,
      points: 0,
      end: false
    })
  }

  handleWin = (event) => {
    if (event.target.value.toLowerCase() === this.state.album.artist.toLowerCase()) {
      event.target.value = ''; 
      this.setState((state) => ({
        points: state.points + 1,
        album: this.state.albums[Math.floor(Math.random() * this.state.albums.length)]
      }))
    }
  }

  handleNext = (event) => {
    event.target.value = '';
    this.setState((state) => ({
      points: state.points - 1,
      album: this.state.albums[Math.floor(Math.random() * this.state.albums.length)]
    }));
  }

  handleEnd = (timer) => {
    this.setState({end: true})
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.token && (
          <a className='btn btn-green'
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.token && !this.state.album && !this.state.end && (
            <Play handleSubmit={this.handleSubmit}/>
          )}
        {this.state.token && this.state.album && !this.state.end && (
          <React.Fragment>
            <Counter handleEnd={this.handleEnd}/>
            <Playing cover={this.state.album.cover} handleWin={this.handleWin} points={this.state.points} handleNext={this.handleNext}/>
            <Restart handleReset={this.handleReset}/>
          </React.Fragment>
        )}
        {this.state.end && (
          <React.Fragment>
            <Result points={this.state.points}/>
            <Restart handleReset={this.handleReset}/>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

}