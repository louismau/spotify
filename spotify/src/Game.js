import React from 'react'
import { getAlbumsData } from './api'
import hash from './hash'
import { authEndpoint, clientId, redirectUri, scopes } from './config'
import Counter from './Counter.js'


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
            <button
              className='btn btn-green'
              onClick={this.handleSubmit}>
              Play
            </button>
          )}
        {this.state.token && this.state.album && !this.state.end && (
          <React.Fragment>
            <Counter handleEnd={this.handleEnd}/>
            <img src={this.state.album.cover} width='300' />
            <input 
              className='input'
              type='text' 
              placeholder='Your guess' 
              onChange={this.handleWin}></input>
            <p>Score: {this.state.points} </p>
            <button className='btn' onClick={this.handleNext}>
              Next
            </button>
            <button className='btn' onClick={this.handleReset}>
              Restart
            </button>
          </React.Fragment>
        )}
        {this.state.end && (
          <React.Fragment>
            <p>Congrats, your score is {this.state.points}</p>
            <button className='btn' onClick={this.handleReset}>
                Restart
            </button>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

}