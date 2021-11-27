import React, { Component, ErrorInfo, ReactElement } from 'react';

import i18n from '$i18n/config';
import { Button, Flex, Text, Title } from '$shared/primitives';
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
            <Title mb="large">{i18n.t('errorBoundary.title')}</Title>

            <Text textAlign="center">
              {i18n.t('errorBoundary.description')}
            </Text>

            <Button
              mt="large"
              alignItems="center"
              onPress={this.handleApplicationReset}
            >
              <Text textAlign="center">{i18n.t('errorBoundary.cta')}</Text>
            </Button>
          </Flex>
        </SafeView>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
