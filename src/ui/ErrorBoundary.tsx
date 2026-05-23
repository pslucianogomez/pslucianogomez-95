import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

const DefaultFallback = (
  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#b91c1c' }}>
    ⚠ content error — reload the page
  </div>
);

// Contains a content crash to a single window so it can't take down the whole
// app (which would otherwise loop re-renders and throttle navigation).
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? DefaultFallback;
    }
    return this.props.children;
  }
}
