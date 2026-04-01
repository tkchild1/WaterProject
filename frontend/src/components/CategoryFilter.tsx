import { useEffect, useState } from "react";
import './CategoryFilter.css';


function CategoryFilter({ selectedCategories, onCheckBoxChange }: { selectedCategories: string[]; onCheckBoxChange: (categories: string[]) => void }) {

    const[categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`https://waterproject-backend-dscdcmagh6hhfrhk.francecentral-01.azurewebsites.net/api/Water/GetProjectTypes`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    },  []);
    
    function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
        const updatedCategories = selectedCategories.includes(target.value)
            ? selectedCategories.filter(c => c !== target.value)
            : [...selectedCategories, target.value];
        onCheckBoxChange(updatedCategories);
    }
    return (
        <>
            <div className="category-filter">
                <h5>Project Types</h5>
                <div className="category-list">
                    {categories.map((category, index) => (
                        <div key={index} className="category-item">
                            <input type="checkbox" id={`category-${index}`} name={`category-${index}`} value={category} onChange={handleCheckboxChange} />
                            <label htmlFor={`category-${index}`}>{category}</label>
                        </div>
                    ))}

                </div>
            </div>
        </>

    );
}

export default CategoryFilter;