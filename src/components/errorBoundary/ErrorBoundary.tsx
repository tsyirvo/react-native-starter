import { Component, ErrorInfo, ReactElement } from 'react';

import { Box, Text } from '$components/shared/primitives';
import SafeView from '$components/shared/SafeView';
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
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            width="80%"
          >
            <Text mb="global_32">{i18n.t('errorBoundary.title')}</Text>

            <Text textAlign="center">
              {i18n.t('errorBoundary.description')}
            </Text>

            {/* <Button
              mt="large"
              alignItems="center"
              onPress={this.handleApplicationReset}
            >
              <Text textAlign="center">{i18n.t('errorBoundary.cta')}</Text>
            </Button> */}
          </Box>
        </SafeView>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
