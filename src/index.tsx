import ReactDOM from 'react-dom/client'
import './css/bootstrap.min.css' // The bootstrap design: https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css
import reportWebVitals from './reportWebVitals'
import GameComponent from './components/gameComponent'

// ========================================

const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement )

root.render(<GameComponent />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
