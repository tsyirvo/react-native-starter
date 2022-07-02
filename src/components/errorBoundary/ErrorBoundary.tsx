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
            alignItems="center"
            alignSelf="center"
            flex={1}
            justifyContent="center"
            width="80%"
          >
            <Text mb="global_8" variant="large">
              {i18n.t('errorBoundary.title')}
            </Text>

            <Text textAlign="center" variant="medium">
              {i18n.t('errorBoundary.description')}
            </Text>

            <Box mt="global_32">
              <Button
                alignItems="center"
                label={i18n.t('errorBoundary.cta')}
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

export default ErrorBoundary;
