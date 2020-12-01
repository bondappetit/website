import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const dateUtils = {
  countdown: (date: string) => dayjs().to(dayjs(date)),

  format: (date: string, format = 'YYYY-MM-DD') => dayjs(date).format(format),

  formatUnix: (timestamp: number, format = 'hh:mm:ss') => {
    const date = dayjs.unix(timestamp);

    return date.format(format);
  }
};
