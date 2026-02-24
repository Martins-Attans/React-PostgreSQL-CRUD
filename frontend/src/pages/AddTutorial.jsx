import { useState } from "react";
import TutorialService from "../services/tutorial.service";


console.log("AddTutorial component loading...");
 
function AddTutorial() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);
 
    const saveTutorial = () => {
        // client-side validation to avoid sending empty title/description
        if (!title || title.trim() === "") {
            alert("Title is required");
            return;
        }
        if (!description || description.trim() === "") {
            alert("Description is required");
            return;
        }

        const data = { title, description };
        TutorialService.create(data)
            .then((response) => {
                console.log(response.data);
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
                if (e.response && e.response.data && e.response.data.message) {
                    alert(e.response.data.message);
                }
            });
    };
 
    const newTutorial = () => {
        setTitle("");
        setDescription("");
        setSubmitted(false);
    };
 
    return (
        <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
            {submitted ? (
                <div>
                    <h4 className="font-bold text-green-600 mb-4">
                        Tutorial submitted successfully!
                    </h4>
                    <div className="flex flex-col items-start">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={newTutorial}
                        >
                            Add Another
                        </button>

                        <a href="/" className="text-blue-500 hover:underline mt-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.707 1.293a1 1 0 00-1.414 0L2 8.586V17a1 1 0 001 1h4a1 1 0 001-1v-3h2v3a1 1 0 001 1h4a1 1 0 001-1V8.586l-7.293-7.293z" />
                            </svg>
                            Home
                        </a>
                    </div>
                </div>
            ) : (
                <div>
                    <h4 className="font-bold text-xl mb-2">Add Tutorial</h4>
 
                    <div className="mb-2">
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            required
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
 
                    <div className="mb-2">
                        <label className="block mb-1 font-medium">Description</label>
                        <input
                            type="text"
                            required
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
 
                    <button
                        className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                        onClick={saveTutorial}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
 
export default AddTutorial;