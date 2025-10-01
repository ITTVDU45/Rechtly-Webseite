"use client";
import React from 'react';
import './ErrorBoundary.css';

type State = {
  hasError: boolean;
  error: any;
  errorInfo: any;
};

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error, errorInfo });
    // TODO: send to error tracking service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof window !== 'undefined') window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2>Entschuldigung, es ist ein Fehler aufgetreten</h2>
            <p>Wir haben Ihr Formular automatisch gespeichert. Sie können es später fortsetzen.</p>
            <button onClick={this.handleRetry} className="retry-button">Seite neu laden</button>
            <button onClick={() => (typeof window !== 'undefined' ? window.history.back() : null)} className="back-button">Zurück zur vorherigen Seite</button>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}


