import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Button, Link, Typography } from 'src/common';
import { ReactComponent as BlogIcon } from 'src/assets/icons/blog.svg';
import { ReactComponent as DiscordIcon } from 'src/assets/icons/discord.svg';
import { ReactComponent as TelegramIcon } from 'src/assets/icons/telegram.svg';
import { ReactComponent as TwitterIcon } from 'src/assets/icons/twitter.svg';
import { ReactComponent as UsaIcon } from 'src/assets/icons/usa.svg';
import { ReactComponent as RusIcon } from 'src/assets/icons/rus.svg';
import { URLS } from 'src/router/urls';
import litepaper from 'src/assets/pdf/bondappetit_litepaper.pdf';
import { useLayoutFooterStyles } from './layout-footer.styles';

export type LayoutFooterProps = {
  onSubscribe?: () => void;
  onApply?: () => void;
};

const LINKS = [
  {
    title: 'Protocol',
    list: [
      {
        title: 'USDap',
        url: URLS.stablecoin,
        icons: []
      },
      {
        title: 'BAG',
        url: URLS.bag,
        icons: []
      },
      {
        title: 'Rewards',
        url: URLS.rewards.list,
        icons: []
      },
      {
        title: 'Collateral',
        url: URLS.collateral.list,
        icons: []
      },
      {
        title: 'Governance',
        url: URLS.voting.info,
        icons: []
      }
    ]
  },
  {
    title: 'Resources',
    list: [
      {
        title: 'Whitepaper',
        url: URLS.whitepaper,
        icons: []
      },
      {
        title: 'Litepaper',
        url: litepaper,
        icons: []
      },
      {
        title: 'Github',
        url: 'https://github.com/bondappetit',
        icons: []
      },
      {
        title: 'Docs',
        url: URLS.docs.list,
        icons: []
      },
      {
        title: 'Contracts',
        url: URLS.contract,
        icons: []
      }
    ]
  },
  {
    title: 'Socials',
    list: [
      {
        title: 'Medium',
        url: 'https://bondappetit.medium.com/',
        icons: [BlogIcon]
      },
      {
        title: 'Discord',
        url: 'https://discord.com/invite/DvYurR4AS6',
        icons: [DiscordIcon]
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/DefiBonds',
        icons: [TwitterIcon]
      },
      {
        title: 'News channel',
        url: 'https://t.me/BondAppetit',
        icons: [TelegramIcon, UsaIcon]
      },
      {
        title: 'Community chat',
        url: 'https://t.me/BondAppetitEn',
        icons: [TelegramIcon, UsaIcon]
      },
      {
        title: 'News channel',
        url: 'https://t.me/BondAppetitRuNews',
        icons: [TelegramIcon, RusIcon]
      },
      {
        title: 'Community chat',
        url: 'https://t.me/BondAppetitRu',
        icons: [TelegramIcon, RusIcon]
      }
    ]
  },
  {
    title: 'Listed on',
    list: [
      {
        title: 'Coingecko',
        url: 'https://www.coingecko.com/en/coins/bondappetit-gov-token',
        icons: []
      },
      {
        title: 'CoinMarketCap',
        url: 'https://coinmarketcap.com/currencies/bondappetit-governance-token/',
        icons: []
      }
    ]
  }
] as const;

const ACTIONS = [
  {
    title: 'Subscribtion',
    body: 'Be the first one to know about protocols updates and new features',
    button: 'Subscribe'
  }
  // {
  //   title: 'Ambassadors',
  //   body: 'Participate in the protocols future, become an ambassador',
  //   button: 'Apply'
  // }
] as const;

export const LayoutFooter: React.FC<LayoutFooterProps> = (props) => {
  const classes = useLayoutFooterStyles();

  const actions = {
    Subscribe: props.onSubscribe,
    Apply: props.onApply
  };

  return (
    <footer className={classes.root}>
      <div className={classes.grid}>
        {LINKS.map((linkItem) => (
          <div key={linkItem.title}>
            <Typography
              variant="body1"
              weight="semibold"
              className={classes.mb8}
            >
              {linkItem.title}
            </Typography>
            <ul className={classes.list}>
              {linkItem.list.map((link, index) => {
                const external =
                  link.url.startsWith('http') || link.url.endsWith('pdf');

                const linkProps = {
                  component: external ? undefined : ReactRouterLink,
                  to: external ? undefined : link.url,
                  href: external ? link.url : undefined,
                  target: external ? '_blank' : undefined,
                  className: classes.link
                };

                return (
                  <li key={String(index)} className={classes.mb8}>
                    <Link {...linkProps}>
                      {link.icons.map((Icon, iconInd) => (
                        <Icon key={String(iconInd)} className={classes.icon} />
                      ))}
                      <Typography variant="body1" component="span">
                        {link.title}
                      </Typography>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {ACTIONS.map((action) => (
          <div key={action.title}>
            <Typography
              variant="body1"
              weight="semibold"
              className={classes.mb8}
            >
              {action.title}
            </Typography>
            <Typography variant="body1" className={classes.mb8}>
              {action.body}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={actions[action.button]}
            >
              {action.button}
            </Button>
          </div>
        ))}
      </div>
      <Typography variant="body1" className={classes.copyright}>
        © {new Date().getFullYear()} BondAppetit
      </Typography>
    </footer>
  );
};
