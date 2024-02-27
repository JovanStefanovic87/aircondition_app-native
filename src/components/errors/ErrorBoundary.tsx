import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Text } from 'react-native';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Error caught in ErrorBoundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <Text>Error: Something went wrong.</Text>;
        }
        return this.props.children;
    }
}

export default React.memo(ErrorBoundary);
