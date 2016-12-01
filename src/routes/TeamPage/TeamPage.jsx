/* eslint-disable react/jsx-boolean-value */

import React from 'react';
import { teamMembers } from './data';
import './TeamPage.scss';

const TeamMember = ({
  name,
  accountName,
  bio,
  gfyId
}) => (
  <div className="team-member">
    <div className="column">
      <a className="name" href={accountName}>{name}</a>
      <p className="bio">{bio}</p>
    </div>
    <div className="column">
      <div
        className="gfyitem"
        data-id={gfyId}
        data-max-height={400}
        data-responsive={true}
      ></div>
    </div>
  </div>
);

TeamMember.propTypes = {
  name: React.PropTypes.string,
  accountName: React.PropTypes.string,
  bio: React.PropTypes.string,
  gfyId: React.PropTypes.string
};


class TeamPage extends React.Component {
  componentDidMount() {
    if (window.gfyCollection) window.gfyCollection.init();
  }

  render() {
    return (
      <div className="team-container">
        <h2 className="title">Gfycat Team</h2>
        {
          teamMembers.map((member, index) => (
            <TeamMember {...member} key={index} />
          ))
        }
      </div>
    );
  }
}

export default TeamPage;
