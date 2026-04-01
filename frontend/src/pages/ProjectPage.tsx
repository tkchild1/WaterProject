import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProjectList from "../components/ProjectList";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";

function ProjectsPage() {

    const[selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container">
        <div className="welcome-band row bg-light p-4 mb-4">
            <CartSummary />
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

export default ProjectsPage;