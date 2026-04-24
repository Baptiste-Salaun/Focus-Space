import { Children } from 'react';
import ModuleLayout from './components/ModuleLayout.jsx';
import Pomodoro from './components/modules/Pomodoro.jsx';
import './styles/global.css';

function App() {
  return (
    <div>
      <h1>Focus Space</h1>
      <ModuleLayout
        id="1" 
        emoji="🕑"
        title="Pomodoro Timer"
      >
        <Pomodoro/>
      </ModuleLayout>
    </div>
  )
}

export default App;