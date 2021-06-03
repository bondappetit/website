import React, { Component, ErrorInfo } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

import { InfoCardFailure, EthereumNetworkError } from 'src/common';
import { errorBoundaryStyles } from './error-boundary.styles';
import { Sentry } from './sentry';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error;
};

type ErrorBoundaryProps = WithStylesProps<typeof errorBoundaryStyles>;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state = {
    hasError: false,
    error: new Error()
  };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
    Sentry.log(error, errorInfo as unknown as Record<string, unknown>);
  }

  private handleReloadPage = () => {
    window.location.reload();
  };

  public render() {
    const { error, hasError } = this.state;

    if (hasError) {
      return (
        <div className={this.props.classes.errorBoundary}>
          <InfoCardFailure
            onClick={this.handleReloadPage}
            buttonTitle="Reload"
            className={this.props.classes.content}
            title={
              error instanceof EthereumNetworkError ? (
                <>
                  Current ethereum network is not supported
                  <br /> switch to another network and reload page
                </>
              ) : (
                <>
                  Oh-oh, something went wrong.
                  <br />
                  Please reload page
                </>
              )
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryStyled = withStyles(errorBoundaryStyles, {
  injectTheme: true
})(ErrorBoundary);

export { ErrorBoundaryStyled as ErrorBoundary };
