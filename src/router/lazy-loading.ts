import { ComponentType } from 'react';

export const lazyLoading = <
  T extends () => Promise<{ default: ComponentType<unknown> }>
>(
  cb: T
): Promise<{ default: ComponentType<unknown> }> => {
  const pageHasAlreadyBeenForceRefreshed = JSON.parse(
    window.localStorage.getItem('page-has-been-force-refreshed') || 'false'
  );

  return new Promise((resolve) => {
    cb()
      .then((r) => {
        window.localStorage.setItem('page-has-been-force-refreshed', 'false');

        resolve(r);
      })
      .catch((error) => {
        if (!pageHasAlreadyBeenForceRefreshed) {
          window.localStorage.setItem('page-has-been-force-refreshed', 'true');
          return window.location.reload();
        }

        throw error;
      });
  });
};
