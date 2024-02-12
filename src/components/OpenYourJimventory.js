import React from 'react';
import JimventoryLogo from '../image/JimventoryLogo.png';
export default function OpenYourJimventory() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontSize: 24,
          height: 40,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        open your,
      </div>
      <img style={{ width: '168px' }} src={JimventoryLogo}></img>
    </div>
  );
}
