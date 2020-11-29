import React, { Component, ErrorInfo, ReactElement } from 'react';

import { Flex, Box, Title, Text } from '$shared/primitives';
import Button from '$shared/Button';
import SafeView from '$shared/SafeView';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
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
          <Flex
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            width="80%"
          >
            <Title mb="large">Error</Title>

            <Text textAlign="center">
              An unknown error occured. If the error persist, contact an
              administrator.
            </Text>

            <Button onPress={this.handleApplicationReset}>
              <Box
                bg="grey"
                py="small"
                px="medium"
                mt="large"
                alignItems="center"
                borderRadius="medium"
              >
                <Text textAlign="center">Relaunch the app</Text>
              </Box>
            </Button>
          </Flex>
        </SafeView>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
