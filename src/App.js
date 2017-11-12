import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const apiToken = 'BQBeEs8MqaKQLZXeVw8Av7BNRKvmimJ6jAS0fXQKL4Gs8pI_WX_N6UiAjVQ9isxJIS1M5fNHxqP8ZXIOGmbzuIlWoKWekEwsWQsvpTUH4F17tu9awJeKa3QpuNB5P7fRqX_K8rwUwwwI_m1qredSHZtF05aIPaE';

class App extends Component {

  constructor() {
    super();
    this.state = {
      tracks: [],
    };
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
        this.setState({
          tracks: data.items,
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
        <main className="App-intro">
          Chargement...
        </main>
      </div>);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to your Blindtest</h1>
        </header>
        <main className="App-intro">
          Premier son chargé : {this.state.tracks[0].track.name}
        </main>
      </div>
    );
  }
}

export default App;
