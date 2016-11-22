import React from 'react';
import './PasteUrl.scss';
import Spinner from 'components/Spinner';

const PasteUrl = ({
  onPaste,
  onKeyPress,
  pending
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
      <Spinner customClass="blue" visible={pending} size="24"/>
    </div>
  );
};

export default PasteUrl;
