import React, { Component, ErrorInfo } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';

import { InfoCardFailure } from 'src/common';
import { errorBoundaryStyles } from './error-boundary.styles';

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = WithStylesProps<typeof errorBoundaryStyles>;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
  }

  private handleReloadPage = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className={this.props.classes.errorBoundary}>
          <InfoCardFailure
            onClick={this.handleReloadPage}
            buttonTitle="Reload"
            title="Oh-oh, something went wrong. Please reload page"
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
