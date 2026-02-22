import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-red-400">Something went wrong</h1>
              <p className="text-gray-300 text-lg mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
