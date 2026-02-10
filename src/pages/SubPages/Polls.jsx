import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Communication from "../Communication";
import { getPolls, getSearchPolls } from "../../api";
import { PiPlusCircleBold } from "react-icons/pi";

function Polls() {
  const themeColor = "rgb(3 19 37)"
  const [pollsData, setPollsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
        setIsSearching(trimmedSearch.length >= 0);

        // Logic: If there is a search term (>= 2 chars), call Search API. Otherwise, call Get All API.
        if (trimmedSearch.length >= 0) {
          response = await getSearchPolls(trimmedSearch);
        } else if (trimmedSearch.length === 0) {
          response = await getPolls();
        } else {
          // Do nothing for 1 character
          setPollsData([]);
          setLoading(false);
          return;
        }

        const data = Array.isArray(response.data) ? response.data : [];

        const poll = data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        setPollsData(poll);
      } catch (err) {
        console.error("Failed to fetch polls data:", err);
        setPollsData([]);
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

  return (
    <div className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <Communication />
        <div className="flex justify-between md:flex-row flex-col my-2 gap-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search polls by title..."
              className="border p-2 pr-20 w-full border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         
          </div>
          <Link
            to={`/admin/create-polls`}
            style={{ background: themeColor }}
            className="font-semibold text-white px-4 py-1 flex gap-2 items-center rounded-md whitespace-nowrap"
          >
            <PiPlusCircleBold size={20} /> Create
          </Link>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-500 my-4">Loading...</p>}

        <div className="md:grid grid-cols-2">
          {!loading && pollsData.length > 0 ? (
            pollsData.map((poll) => {
              // Calculate total votes for the current poll
              const totalVotes = poll.poll_options.reduce(
                (sum, option) => sum + option.votes,
                0
              );

              // Calculate remaining days (end_date - start_date)
              const startDate = new Date(poll.start_date);
              const endDate = new Date(poll.end_date);
              const currentDate = new Date();
              const timeDiff = endDate - currentDate; // Time difference in milliseconds
              const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days

              return (
                <div key={poll.id} className="flex w-full p-2">
                  {" "}
                  {/* Correctly added key here */}
                  <div className="max-w-2xl w-full">
                    <div className="bg-white shadow-custom-all-sides rounded-lg p-6 h-full">
                      <h2 className="text-xl font-semibold mb-4">
                        {poll.title}
                      </h2>
                      <div className="flex justify-between my-3">
                        <span className="text-gray-500 text-sm">
                          1/20 responded
                        </span>
                        <span className="text-gray-500 text-sm">
                          {poll.visibility}
                        </span>
                      </div>

                      {/* Loop through poll options */}
                      <div className="space-y-4 border-t border-b border-gray-200 py-4">
                        {poll.poll_options.map((option) => (
                          <div
                            key={option.id}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                          >
                            <span>{option.content}</span>
                            <span className="text-blue-600 font-semibold">
                              {option.votes} votes
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Display total votes and days left */}
                      <div className="mt-6 text-gray-500 text-sm">
                        <p>
                          {totalVotes} votes •{" "}
                          {daysLeft > 0 ? `${daysLeft}d left` : "Poll closed"}
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

export default Polls;
