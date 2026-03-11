import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public static getDerivedStateFromError(_error: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 text-center">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-black text-gray-950 mb-4">Something went wrong.</h1>
                        <p className="text-gray-600 mb-8 font-medium">We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
