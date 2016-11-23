import React from 'react';
import Spinner from 'components/Spinner';

import './PasteUrl.scss';

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
        onPaste={event => onPaste(event)}
        onKeyPress={event => onKeyPress(event, urlInput.value)}
        placeholder="Paste URL (YouTube, Facebook, Twitch, Instagram, ...etc)"
      />
      <Spinner visible={pending} size={24} />
    </div>
  );
};

PasteUrl.propTypes = {
  onPaste: React.PropTypes.func,
  onKeyPress: React.PropTypes.func,
  pending: React.PropTypes.bool
};

export default PasteUrl;
