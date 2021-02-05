import React from 'react';

import { Typography, Link } from 'src/common';
import { ReactComponent as BlogIcon } from 'src/assets/icons/blog.svg';
import { ReactComponent as DiscordIcon } from 'src/assets/icons/discord.svg';
import { ReactComponent as GithubIcon } from 'src/assets/icons/github.svg';
import { ReactComponent as TelegramIcon } from 'src/assets/icons/telegram.svg';
import { ReactComponent as TwitterIcon } from 'src/assets/icons/twitter.svg';
import { useLayoutLinksStyles } from './layout-links.styles';

export type LayoutLinksProps = {
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
    href: 'https://github.com/bondappetit',
    icon: GithubIcon
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/DefiBonds',
    icon: TwitterIcon
  },
  {
    title: 'Telegram',
    href: 'https://t.me/BondAppetitEn',
    icon: TelegramIcon
  },
  {
    title: 'Discord',
    href: 'https://discord.gg/xRbgjwkz',
    icon: DiscordIcon
  }
];

export const LayoutLinks: React.FC<LayoutLinksProps> = () => {
  const classes = useLayoutLinksStyles();

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
