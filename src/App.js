/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sound from 'react-sound';
import { Button } from 'react-bootstrap';

const apiToken = 'BQBP5T8Gt100cZen_cpFoJ1usk9f4Bgk5iQ3H_KFp5HmL4JQjTWNRU10t5Axj2Nd7wdXes0J6WGc9A1BJo0MZkyCEIjr6VstoIBRB01swe9nBiutmAPwjC9QEbtHTA_7lcc5AAp-ZwUmmyYVgIRXjnNBM3eRQ5c';

class TrackImage extends Component {
  render() {
    const src = this.props.track.album.images[1].url;
    const alt = 'Album cover for ' + this.props.track.album.name;
    return (<img src={src} alt={alt} />);
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      tracks: [],
      currentTrackIndex: null,
      currentTrackId: null,
    };
  }

  /* Return a random number between 0 included and x excluded */
  static getRandomNumber(x) {
    return Math.floor(Math.random() * x);
  }

  guessTrack(trackId) {
    if (trackId === this.state.currentTrackId) {
      swal('Bravo !', 'Tu as gagné', 'success').then(this.initState.bind(this));
    } else {
      swal ('Essaye encore', 'Ce n est pas la bonne réponse', 'error');
    }
  }

  initState() {
    const tracks = this.state.tracks;
    const trackIndex = App.getRandomNumber(tracks.length);

    this.setState({
      currentTrackIndex: trackIndex,
      currentTrackId: tracks[trackIndex].track.id,
    });
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me/tracks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
      .then(response => response.json())
      .then((data) => {
        const trackIndex = App.getRandomNumber(data.items.length);

        this.setState({
          tracks: data.items,
          currentTrackIndex: trackIndex,
          currentTrackId: data.items[trackIndex].track.id,
        });
      });
  }

  render() {
    if (!this.state.tracks || this.state.tracks.length === 0) {
      return (<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to your Blindtest</h1>
        </header>
        <main className="App-images">
          Chargement...
        </main>
      </div>);
    }

    const currentTrackIndex = this.state.currentTrackIndex;
    const nextTrackIndex = App.getRandomNumber(this.state.tracks.length);
    const next2TrackIndex = App.getRandomNumber(this.state.tracks.length);

    const currentTrack = this.state.tracks[currentTrackIndex];
    const nextTrack = this.state.tracks[nextTrackIndex];
    const next2Track = this.state.tracks[next2TrackIndex];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to your Blindtest</h1>
        </header>
        <div className="App-images">
          <Sound url={currentTrack.track.preview_url} playStatus={Sound.status.PLAYING}/>
          <TrackImage track={currentTrack.track}/>
        </div>
        <div className="App-buttons">
          <Button onClick={() => this.guessTrack(currentTrack.track.id)}>{currentTrack.track.name}</Button>
          <Button onClick={() => this.guessTrack(nextTrack.track.id)}>{nextTrack.track.name}</Button>
          <Button onClick={() => this.guessTrack(next2Track.track.id)}>{next2Track.track.name}</Button>
        </div>
      </div>
    );
  }
}

export default App;
