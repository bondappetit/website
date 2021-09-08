import clsx from 'clsx';
import React from 'react';

import { Link, Plate, Typography } from 'src/common';
import { ReactComponent as TwitterFilledIcon } from 'src/assets/icons/twitter-filled.svg';
import { TEAM } from '../constants';
import { useMainTeamStyles } from './main-team.styles';

export type MainTeamProps = {
  className?: string;
};

export const MainTeam: React.VFC<MainTeamProps> = (props) => {
  const classes = useMainTeamStyles();

  return (
    <div className={clsx(classes.root, props.className)}>
      <Typography variant="h2" className={classes.title}>
        Team
      </Typography>
      <ul className={classes.list}>
        {TEAM.map((teamMember) => (
          <li key={teamMember.name}>
            <Plate withoutBorder color="grey" className={classes.teamMember}>
              <div className={classes.teamMemberHeader}>
                <img
                  alt={teamMember.name}
                  src={teamMember.photo}
                  className={classes.teamMemberPhoto}
                />
                <div>
                  <Typography variant="h5" weight="bold">
                    {teamMember.name}
                  </Typography>
                  <Typography variant="h5" className={classes.teamMemberRole}>
                    {teamMember.role}
                    {teamMember.twitter && (
                      <Link
                        href={teamMember.twitter}
                        target="_blank"
                        className={classes.teamMemberTwitter}
                      >
                        <TwitterFilledIcon />
                      </Link>
                    )}
                  </Typography>
                </div>
              </div>
              <Typography variant="body1" className={classes.teamMemberText}>
                {teamMember.text}
              </Typography>
            </Plate>
          </li>
        ))}
      </ul>
    </div>
  );
};
