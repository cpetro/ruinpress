import React, { useState } from 'react';

export function Image(props) {

  const [loaded, setLoaded] = useState(false);

  return (
    <img
      className="w-full" 
      alt={ props.alt }
      src={ props.src}
      style={ loaded ? {} : { display: 'none' }}
      onLoad={() => setLoaded(true)}
    />
  );
};