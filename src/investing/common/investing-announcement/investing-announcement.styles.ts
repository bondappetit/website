import { createUseStyles } from 'react-jss';

export const useInvestingAnnouncementStyles = createUseStyles(
  {
    announcement: {
      maxWidth: 1004,
      width: '100%',
      padding: 32,
      textAlign: 'center'
    },

    title: {
      marginBottom: 16
    }
  },
  {
    name: 'InvestingAnnouncement'
  }
);
