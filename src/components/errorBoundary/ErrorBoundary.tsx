import { Component, ErrorInfo, ReactElement } from 'react';

import { Box, Button, Text } from '$components/ui/primitives';
import SafeView from '$components/ui/SafeView';
import i18n from '$i18n/config';

type ErrorBoundaryProps = {
  children: ReactElement;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_: Error, errorInfo: ErrorInfo) {
    console.log('Send error for reporting', errorInfo);
  }

  handleApplicationReset = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <SafeView>
          <Box
            flex={1}
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            width="80%"
          >
            <Text variant="large" mb="global_8">
              {i18n.t('errorBoundary.title')}
            </Text>

            <Text variant="medium" textAlign="center">
              {i18n.t('errorBoundary.description')}
            </Text>

            <Box mt="global_32">
              <Button
                alignItems="center"
                onPress={this.handleApplicationReset}
                label={i18n.t('errorBoundary.cta')}
              />
            </Box>
          </Box>
        </SafeView>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
