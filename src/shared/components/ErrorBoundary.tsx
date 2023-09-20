import { Component, ErrorInfo, ReactElement } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

import { ErrorMonitoring } from '$core/monitoring';
import { Box, Button, Text } from '$shared/ui/primitives';
import { SafeView } from '$shared/ui/SafeView';

type ErrorBoundaryProps = {
  children: ReactElement;
} & WithTranslation;

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
    console.log('Send error for reporting', errorInfo);

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
            <Text mb="global_8" variant="large">
              {t('errorBoundary.title', { ns: 'miscScreens' })}
            </Text>

            <Text textAlign="center" variant="medium">
              {t('errorBoundary.description', { ns: 'miscScreens' })}
            </Text>

            <Box mt="global_32">
              <Button
                alignItems="center"
                label={t('errorBoundary.cta', { ns: 'miscScreens' })}
                onPress={this.handleApplicationReset}
              />
            </Box>
          </Box>
        </SafeView>
      );
    }

    return children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
