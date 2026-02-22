import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true, 
      error 
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { retryCount } = this.state;
      const maxRetries = 3;

      return (
        <div className="min-h-screen bg-gray-900 text-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                  <svg 
                    className="w-8 h-8 text-red-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-red-400">
                  Something went wrong
                </h1>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-300 text-lg mb-4">
                  {this.state.error?.message || 'An unexpected error occurred'}
                </p>
                
                {retryCount > 0 && (
                  <p className="text-gray-400 text-sm">
                    Retry attempt: {retryCount}/{maxRetries}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {retryCount < maxRetries ? (
                  <button
                    onClick={this.handleRetry}
                    className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    Try Again
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">
                    Maximum retry attempts reached
                  </span>
                )}
                
                <button
                  onClick={this.handleReload}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Reload Page
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-gray-400 hover:text-gray-300 transition-colors">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg overflow-x-auto">
                    <pre className="text-red-400 text-sm whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                    {this.state.errorInfo && (
                      <pre className="text-yellow-400 text-sm whitespace-pre-wrap mt-4">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
