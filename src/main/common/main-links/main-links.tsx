import React from 'react';

import { Typography, Link } from 'src/common';
import { ReactComponent as BlogIcon } from 'src/assets/icons/blog.svg';
import { ReactComponent as DiscordIcon } from 'src/assets/icons/discord.svg';
import { ReactComponent as GithubIcon } from 'src/assets/icons/github.svg';
import { ReactComponent as TelegramIcon } from 'src/assets/icons/telegram.svg';
import { ReactComponent as TwitterIcon } from 'src/assets/icons/twitter.svg';
import { useMainLinksStyles } from './main-links.styles';

export type MainLinksProps = {
  className?: string;
};

const SOCIAL_LINKS = [
  {
    title: 'Blog',
    href: '',
    icon: BlogIcon
  },
  {
    title: 'Github',
    href: 'https://github.com/bondappetit/bondappetit-protocol',
    icon: GithubIcon
  },
  {
    title: 'Twitter',
    href: '',
    icon: TwitterIcon
  },
  {
    title: 'Telegram',
    href: '',
    icon: TelegramIcon
  },
  {
    title: 'Discord',
    href: '',
    icon: DiscordIcon
  }
];

export const MainLinks: React.FC<MainLinksProps> = () => {
  const classes = useMainLinksStyles();

  return (
    <div className={classes.root}>
      {SOCIAL_LINKS.map((link) => (
        <Link
          href={link.href}
          key={link.title}
          target="_blank"
          className={classes.link}
        >
          <link.icon className={classes.linkIcon} />
          <Typography
            variant="h4"
            component="span"
            className={classes.linkTitle}
          >
            {link.title}
          </Typography>
        </Link>
      ))}
    </div>
  );
};
