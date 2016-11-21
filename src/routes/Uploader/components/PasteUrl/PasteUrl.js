import React from 'react'
import './PasteUrl.scss'

const PasteUrl = ({
  onPaste,
  onKeyPress
}) => {
  let urlInput;
  return (
    <div className="paste-url-container">
      <input
        type="text"
        className="paste-url"
        ref={(input) => {
          urlInput = input;
        }}
        onPaste={(event) => onPaste(event)}
        onKeyPress={(event) => onKeyPress(event, urlInput.value)}
        placeholder="Paste URL (YouTube, Facebook, Twitch, Instagram, ...etc)" />
    </div>
  );
}

export default PasteUrl
