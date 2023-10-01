import type { ErrorInfo, ReactElement } from 'react';
import { Component } from 'react';
import type { WithTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

import { ErrorMonitoring } from '$core/monitoring';
import { Box, Text } from '$shared/uiKit/primitives';
import { SafeView } from '$shared/uiKit/SafeView';

import { Button } from '../uiKit/button';

interface ErrorBoundaryProps extends WithTranslation {
  children: ReactElement;
}

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundaryComponent extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    ErrorMonitoring.breadcrumbs({
      type: 'error',
      level: 'error',
      data: {
        componentStack: errorInfo,
      },
    });

    ErrorMonitoring.exception(error);
  }

  handleApplicationReset = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    const { hasError } = this.state;
    const { children, t } = this.props;

    if (hasError) {
      return (
        <SafeView>
          <Box
            alignItems="center"
            alignSelf="center"
            flex={1}
            justifyContent="center"
            width="80%"
          >
            <Text mb="spacing_8" variant="large">
              {t('errorBoundary.title', { ns: 'miscScreens' })}
            </Text>

            <Text textAlign="center" variant="medium">
              {t('errorBoundary.description', { ns: 'miscScreens' })}
            </Text>

            <Box mt="spacing_32">
              <Button.Text onPress={this.handleApplicationReset}>
                {t('errorBoundary.cta', { ns: 'miscScreens' })}
              </Button.Text>
            </Box>
          </Box>
        </SafeView>
      );
    }

    return children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
