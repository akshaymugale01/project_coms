import { useEffect, useState } from "react";
import { getPolls, getSearchPolls, postPollVote } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";
import EmployeeCommunication from "./EmployeeCommunication";
import Navbar from "../../../components/Navbar";

function EmployeePolls() {
  const [pollsData, setPollsData] = useState([]); // Master data
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for better UX
  const [isSearching, setIsSearching] = useState(false); // Track if actively searching

  const userId = getItemInLocalStorage("UserId");

  // 1. Debounce Effect: Updates debouncedSearch only after user stops typing for 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Fetch Effect: Runs whenever debouncedSearch changes
  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        let response;
        const trimmedSearch = debouncedSearch.trim();

        // Set searching state
        setIsSearching(trimmedSearch.length >= 2);

        // Logic: If there is a search term (>= 2 chars), call Search API. Otherwise, call Get All API.
        if (trimmedSearch.length >= 2) {
          response = await getSearchPolls(trimmedSearch);
        } else {
          response = await getPolls();
        }

        // Safety check: Ensure response.data exists and is an array
        const data = Array.isArray(response.data) ? response.data : [];

        const sortedPolls = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setPollsData(sortedPolls);
      } catch (err) {
        console.error("Failed to fetch polls:", err);
        setPollsData([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, [debouncedSearch]);

  const handleClearSearch = () => {
    setSearchTerm("");
    setDebouncedSearch("");
  };

  const handleOptionSelect = async (pollId, optionId) => {
    if (selectedOptions[pollId]) {
      alert("You have already voted for this poll.");
      return;
    }

    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [pollId]: optionId, // Store the selected option for each poll
    }));

    // Submit the vote to the backend
    try {
      const voteData = {
        poll_vote: {
          poll_option_id: optionId, // The ID of the selected option
        },
      };

      const vote = await postPollVote(pollId, voteData); // Submit the vote
      console.log("vote resp", vote);
      console.log(`Vote submitted for poll ${pollId} with option ${optionId}`);
    } catch (err) {
      console.error("Failed to submit vote:", err);
      alert("Already voted in this poll");
      
      // Rollback selection on error
      setSelectedOptions((prev) => {
        const newState = { ...prev };
        delete newState[pollId];
        return newState;
      });
    }
  };

  return (
    <div className="flex ">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <EmployeeCommunication />
        
        {/* Search Section */}
        <div className="flex justify-between md:flex-row flex-col w-full mb-4">
          <div className="relative w-full mx-2">
            <input
              type="text"
              placeholder="Search polls by title..."
              className="border p-2 pr-20 w-full border-border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Search Info */}
        {isSearching && !loading && (
          <p className="text-sm text-gray-600 mx-2 mb-2">
            {pollsData.length > 0 
              ? `Found ${pollsData.length} poll${pollsData.length !== 1 ? 's' : ''} matching "${debouncedSearch.trim()}"`
              : `No polls found matching "${debouncedSearch.trim()}"`
            }
          </p>
        )}

        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Polls Grid */}
        <div className="md:grid grid-cols-2 gap-4">
          {!loading && pollsData.length > 0 ? (
            pollsData.map((poll) => {
              // Ensure poll_options exists before reducing
              const totalVotes = (poll.poll_options || []).reduce(
                (sum, option) => sum + (option.votes || 0),
                0
              );

              const endDate = new Date(poll.end_date);
              const currentDate = new Date();
              const daysLeft = Math.ceil(
                (endDate - currentDate) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div key={poll.id} className="flex justify-start w-full p-2 ">
                  <div className="max-w-2xl w-full py-2 ">
                    <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-gray-200 h-full flex flex-col">
                      <h2 className="text-xl font-semibold mb-4">
                        {poll.title}
                      </h2>
                      <div className="flex justify-between my-3">
                        <span className="text-gray-500 text-sm">
                          {totalVotes} votes
                        </span>
                        <span className="text-gray-500 text-sm">
                          {poll.visibility}
                        </span>
                      </div>
                      
                      <div className="space-y-4 border-t border-b border-gray-200 py-4 flex-grow">
                        {poll.poll_options && poll.poll_options.map((option) => (
                          <div
                            key={option.id}
                            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                              selectedOptions[poll.id] === option.id
                                ? "bg-blue-100 border border-blue-200"
                                : "bg-gray-50 hover:bg-gray-100"
                            }`}
                            onClick={() =>
                              handleOptionSelect(poll.id, option.id)
                            }
                          >
                            <input
                              type="radio"
                              name={`pollOption-${poll.id}`}
                              checked={selectedOptions[poll.id] === option.id}
                              onChange={() =>
                                handleOptionSelect(poll.id, option.id)
                              }
                              className="mr-2 accent-blue-600"
                            />
                            <span>{option.content}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-gray-500 text-sm">
                        <p>
                          {totalVotes} votes • {daysLeft} days left
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            !loading && (
              <p className="text-center text-gray-500 w-full col-span-2">
                {isSearching 
                  ? "No polls match your search. Try different keywords."
                  : "No polls available"
                }
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeePolls;