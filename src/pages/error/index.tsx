import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: undefined };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error("React error boundary caught:", error, info);
	}

	handleReload = () => {
		this.setState({ hasError: false, error: undefined });
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
					<div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-gray-100">
						<div className="flex justify-center mb-4">
							<div className="bg-red-100 text-red-600 p-3 rounded-full">
								<AlertCircle className="w-8 h-8" />
							</div>
						</div>

						<h1 className="text-xl font-semibold text-gray-800 mb-2">
							Oops! Terjadi Kesalahan
						</h1>
						<p className="text-gray-600 text-sm mb-6 leading-relaxed">
							Sepertinya ada sesuatu yang tidak beres. Silakan coba muat ulang
							halaman atau kembali lagi nanti.
						</p>

						<button
							onClick={this.handleReload}
							className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all shadow-sm"
						>
							<RefreshCw className="w-4 h-4 animate-spin-slow" />
							Muat Ulang Halaman
						</button>

						{/* Optional: detail teknis */}
						{this.state.error && (
							<details className="mt-6 bg-gray-50 text-left p-4 rounded-lg text-sm text-gray-600 border border-gray-200">
								<summary className="cursor-pointer text-gray-500 hover:text-gray-700 font-medium">
									Detail teknis
								</summary>
								<pre className="mt-2 text-xs text-gray-500 whitespace-pre-wrap">
									{this.state.error?.message}
								</pre>
							</details>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
