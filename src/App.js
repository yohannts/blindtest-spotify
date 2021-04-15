/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';

const apiToken = 'BQDvNv0m2Xy7bS6NvmPhe06z0Xs2z4ntN59tbDqDw0NJaBWDOGYjJlYabGRoHMeAcyHdEVMPkxImq7l75GL-Jxzv_VxTAbBIpLVYbWh_kH54HZTP3rDgJg_lLK4LV91gyiMmT7_tmYeGOCpeenbE-Ro_U2d5QJa3pDGKZPgWcoXBvRRa';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [tracks, setTracks] = useState();
  const [currentTrack, setCurrentTrack] = useState()
  const [timeoutId, setTimeoutId] = useState();

  React.useEffect(() => 
  fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
     Authorization: 'Bearer ' + apiToken,
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      setTracks(data.items);
      const trackIndex = getRandomNumber(data.items.length);
      setCurrentTrack(data.items[trackIndex].track);
      setSongsLoaded(true);
    }), []);

  React.useEffect(() => {
    setTimeoutId(setTimeout(() => getNewTrack(), 500));
  }, [track1]);

  function checkAnswer(Id1, Id2) {
    if (Id1 === Id2) {
      clearTimeout(timeoutId);
      swal('Bravo', 'Bien Joué a toi', 'success').then(() => getNewTrack());
    } else {
      swal('Pas de Pot', 'Perdu', 'error');
    }
  }

  const getNewTrack = () => {
    if (!tracks) {
      return;
    }
    const randomIndex = getRandomNumber(tracks.length);
    setCurrentTrack(tracks[randomIndex].track);
  };
  
  const AlbumCover = ({ track }) =>  {
    const src = track.album.images[0].url;
    return (
        <img src={src} style={{ width: 400, height: 400 }} />
    );
  }

  if (!songsLoaded) {
    return (
      <div className="App">
        <img src={loading} className="App-logo" alt="logo"/>
      </div>
    );
  }

  const index1 = getRandomNumber(tracks.length);
  const index2 = getRandomNumber(tracks.length);

  const track0 = currentTrack;
  const track1 = tracks[index1].track;
  const track2 = tracks[index2].track;

  const tableTrack = [track0, track1, track2];
  const tableTracks = shuffleArray(tableTrack);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <AlbumCover track={track0} />
        <p>Voici le Giga BlindTest avec DJ Nemen/Kristof, on a {tracks.length} tracks de plaisir pour vous !<br/>La première est {track0.name} </p>
        <Sound url={ track0.preview_url } playStatus={Sound.status.PLAYING}/>
      </div>
      

      <div className="App-buttons">
      {tableTracks.map( track =>(
        <Button onClick={() => checkAnswer(currentTrack.id, track.id)}>{track.name}</Button>
      ) ) }

      </div>
    </div>
  );
};
export default App;
