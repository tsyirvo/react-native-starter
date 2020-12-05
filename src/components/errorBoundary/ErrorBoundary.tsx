import React, { Component, ErrorInfo, ReactElement } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Flex, Title, Text, Button } from '$shared/primitives';
import SafeView from '$shared/SafeView';

type ErrorBoundaryProps = WithTranslation & {
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
    const { children, t } = this.props;

    if (hasError) {
      return (
        <SafeView>
          <Flex
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
            width="80%"
          >
            <Title mb="large">{t('errorBoundary.title')}</Title>

            <Text textAlign="center">{t('errorBoundary.description')}</Text>

            <Button
              mt="large"
              alignItems="center"
              onPress={this.handleApplicationReset}
            >
              <Text textAlign="center">{t('errorBoundary.cta')}</Text>
            </Button>
          </Flex>
        </SafeView>
      );
    }

    return children;
  }
}

export default withTranslation()(ErrorBoundary);
