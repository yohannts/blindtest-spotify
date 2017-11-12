/*global swal*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sound from 'react-sound';
import { Button } from 'react-bootstrap';

const apiToken = 'BQDlhXMZgnH5tuNlCX120UXoZOd81RPaeSCg9YHtlMkiH92KmLm2Ll4dIzbkCGG1urqlcaC0EtWpQNlfqLqQt858-l-_pqGICR5WUizAOtJ0U5_LMoK7Rt2VXf33BTEuJxeOdBIjW2JcRi6j9iPMv6QUsOqQv6A';

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
      swal('Bravo !', 'Tu as gagné', 'success');
    } else {
      swal ('Essaye encore', 'Ce n est pas la bonne', 'error');
    }
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
