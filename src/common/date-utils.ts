import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const dateUtils = {
  countdown: (date: string) => dayjs().to(dayjs(date))
};
