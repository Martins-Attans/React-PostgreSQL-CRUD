import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TutorialService from "../services/tutorial.service";
 
function Tutorial() {
    const { id } = useParams();
    const navigate = useNavigate();
 
    const [currentTutorial, setCurrentTutorial] = useState({
        id: null,
        title: "",
        description: "",
        published: false,
    });
    const [message, setMessage] = useState("");
 
    const getTutorial = (id) => {
        TutorialService.get(id)
            .then((response) => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
 
    useEffect(() => {
        if (id) getTutorial(id);
    }, [id]);
 
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...currentTutorial, [name]: value });
    };
 
    const updatePublished = (status) => {
        const data = {
            ...currentTutorial,
            published: status,
        };
 
        TutorialService.update(currentTutorial.id, data)
            .then((response) => {
                setCurrentTutorial({ ...currentTutorial, published: status });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
 
    const updateTutorial = () => {
        TutorialService.update(currentTutorial.id, currentTutorial)
            .then((response) => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    };
 
    const deleteTutorial = () => {
        TutorialService.remove(currentTutorial.id)
            .then((response) => {
                console.log(response.data);
                navigate("/tutorials");
            })
            .catch((e) => {
                console.log(e);
            });
    };
 
    return (
        <div>
            {currentTutorial ? (
                <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
                    <h4 className="font-bold text-xl mb-2">Edit Tutorial</h4>
                    <div className="mb-2">
                        <label className="block font-medium" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            id="title"
                            name="title"
                            value={currentTutorial.title}
                            onChange={handleInputChange}
                        />
                    </div>
 
                    <div className="mb-2">
                        <label className="block font-medium" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full px-2 py-1"
                            id="description"
                            name="description"
                            value={currentTutorial.description}
                            onChange={handleInputChange}
                        />
                    </div>
 
                    <div className="mb-2">
                        <strong>Status:</strong>{" "}
                        {currentTutorial.published ? "Published" : "Pending"}
                    </div>
 
                    <div className="space-x-2 mt-2">
                        {currentTutorial.published ? (
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => updatePublished(false)}
                            >
                                Unpublish
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                onClick={() => updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}
 
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={deleteTutorial}
                        >
                            Delete
                        </button>
 
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={updateTutorial}
                        >
                            Update
                        </button>
                    </div>
 
                    {message && <p className="text-green-600 mt-2">{message}</p>}
                </div>
            ) : (
                <div>
                    <p>Loading tutorial...</p>
                </div>
            )}
        </div>
    );
}
 
export default Tutorial;