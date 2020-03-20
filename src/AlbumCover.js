import React from 'react';

const AlbumCover = ({ track }) => {
  const src = track.album.images[0].url;
  const alt = 'Album cover for ' + track.album.name;
  return (<img src={src} alt={alt} style={{ width: 400, height: 400 }}/>);
}

export default AlbumCover;
