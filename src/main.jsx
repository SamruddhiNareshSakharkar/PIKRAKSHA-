import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("PIKRAKSHA runtime error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-6 text-slate-800 font-sans">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center text-2xl font-black">
              🌱
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">PIKRAKSHA (पीकरक्षा)</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              An unexpected display glitch occurred while rendering. Click below to reset to fresh demo state.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 font-mono text-left overflow-auto max-h-24">
              {String(this.state.error?.message || "Render error")}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 rounded-xl bg-[#0d2218] hover:bg-forest-900 text-white font-bold text-xs shadow-md transition"
            >
              🔄 Reset State & Reload PIKRAKSHA
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
