/* eslint-disable react/jsx-boolean-value */

import React from 'react';
import teamMembers from './data';
import style from './TeamPage.scss';

const TeamMember = ({
  name,
  accountName,
  bio,
  gfyId
}) => (
  <div className={style.teamMember}>
    <div className={style.column}>
      <a className={style.name} href={accountName}>{name}</a>
      <p className={style.bio}>{bio}</p>
    </div>
    <div className={style.column}>
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
    console.log(window);
    if (window.gfyCollection) window.gfyCollection.init();
  }

  render() {
    return (
      <div className={style.teamContainer}>
        <h2 className={style.title}>Gfycat Team</h2>
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
