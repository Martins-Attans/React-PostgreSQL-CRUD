import { useState, useEffect } from "react";
import tutorialService from "../services/tutorial.service";
import { Link } from "react-router-dom";

function TutorialsList() {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchError, setSearchError] = useState("");  // NEW

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const onChangeSearchTitle = (e) => {
        setSearchTitle(e.target.value);
        // Clear error when user starts typing
        if (searchError) setSearchError("");
    };

    const retrieveTutorials = () => {
        tutorialService.getAll()
            .then((response) => {
                // ensure each tutorial has an `id` field (backend returns `id` instead of `_id`)
                const list = response.data.map((t) => ({
                    ...t,
                    id: t.id || t._id || null,
                }));
                setTutorials(list);
                console.log(list);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        // if the object lacks `id` but has `_id`, normalize it
        const normalized = {
            ...tutorial,
            id: tutorial.id || tutorial._id || null,
        };
        setCurrentTutorial(normalized);
        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        console.log("removeAllTutorials invoked, tutorials.length=", tutorials.length);

        // always ask for confirmation regardless of list state
        if (!window.confirm("This will delete every tutorial (if any). Continue?")) {
            return; // user cancelled
        }

        if (tutorials.length === 0) {
            // nothing to do, but let user know
            alert("There are no tutorials to remove.");
            return;
        }

        tutorialService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

   const findByTitle = () => {
    // Check if search field is empty
    if (!searchTitle.trim()) {
        setSearchError("Please enter a title to search!");
        return;
    }
    
    // Clear previous error
    setSearchError("");
    
    tutorialService.findByTitle(searchTitle)
        .then((response) => {
            const results = response.data;
            setTutorials(results);
            setCurrentTutorial(null);
            setCurrentIndex(-1);
            
            // Show message when no results
            if (results.length === 0) {
                if (tutorials.length === 0) {
                    // nothing exists at all yet
                    setSearchError("No tutorials added yet");
                } else {
                    setSearchError(`No tutorials found with title "${searchTitle}"`);
                }
            }
            
            console.log(results);
        })
        .catch((e) => {
            console.log(e);
            setSearchError("Error searching for tutorials");
        });
};

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT COLUMN: SEARCH + LIST */}
            <div className="flex-1">
                <div className="flex mb-4 gap-2">
    <input
        type="text"
        className="border border-gray-300 rounded-l px-2 py-1 w-full"
        placeholder="Search by title"
        value={searchTitle}
        onChange={onChangeSearchTitle}
    />
    <button
        className="bg-blue-500 text-white px-4 py-1 rounded-r"
        onClick={findByTitle}
    >
        Search
    </button>
    
    {/* Clear button - shows only when searching */}
    {searchTitle && (
        <button
            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
            onClick={() => {
                setSearchTitle("");
                setSearchError("");
                retrieveTutorials();
            }}
        >
            Clear
        </button>
    )}
</div>
                {/* ERROR MESSAGE - NEW */}
                {searchError && (
                    <p className="text-red-600 text-sm mb-2">{searchError}</p>
                )}

                <h4 className="font-bold text-lg mb-2">Tutorials List</h4>
                <p className="text-sm mb-2">Loaded {tutorials.length} tutorials</p>
                <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
                    {tutorials &&
                        tutorials.map((tutorial, index) => {
                            const match =
                                searchTitle &&
                                tutorial.title
                                    .toLowerCase()
                                    .includes(searchTitle.toLowerCase());

                            return (
                                <li
                                    className={
                                        "px-4 py-2 cursor-pointer " +
                                        (index === currentIndex
                                            ? "bg-blue-100"
                                            : match
                                            ? "bg-yellow-50"
                                            : "")
                                    }
                                    onClick={() => setActiveTutorial(tutorial, index)}
                                    key={tutorial.id}
                                >
                                    {tutorial.title}
                                </li>
                            );
                        })}
                </ul>

                <button
                    className="bg-red-500 text-white px-3 py-1 rounded mt-4"
                    onClick={removeAllTutorials}
                >
                    Remove All
                </button>
            </div>

            {/* RIGHT COLUMN: DETAILS */}
            <div className="flex-1">
                {currentTutorial ? (
                    <div className="p-4 bg-white rounded shadow">
                        <h4 className="font-bold text-xl mb-2">Tutorial</h4>
                        <div className="mb-2">
                            <strong>Title: </strong>
                            {currentTutorial.title}
                        </div>
                        <div className="mb-2">
                            <strong>Description: </strong>
                            {currentTutorial.description}
                        </div>
                        <div className="mb-2">
                            <strong>Status: </strong>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={`/tutorials/${currentTutorial.id}`}
                            className="inline-block bg-yellow-400 text-black px-3 py-1 rounded"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TutorialsList;