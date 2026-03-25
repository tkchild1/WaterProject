import { useState } from 'react';
import './App.css'
import CategoryFilter from './CategoryFilter'
import ProjectList from './ProjectList'
import WelcomeBand from './WelcomeBand'

function App() {

  const[selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container">
      <div className="welcome-band row bg-light p-4 mb-4">
        <WelcomeBand />
      </div>
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter selectedCategories={selectedCategories} onCheckBoxChange={setSelectedCategories} />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />

        </div>

      </div>

    </div>
  )
}

export default App
