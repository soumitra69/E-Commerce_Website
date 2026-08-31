import { useState } from "react";
import { Search, X } from "lucide-react";

function SearchPage() {

    const [search, setSearch] = useState("");

    return (
        <div className="min-h-screen bg-[#F1ECE1]">

            {/* Search Screen */}

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Heading */}

                <h1 className="font-display text-4xl mb-10">
                    Search
                </h1>

                {/* Search Box */}

                <div className="flex items-center border-b border-black pb-4">

                    <Search size={24} />

                    <input
                        type="text"
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 ml-4 bg-transparent outline-none text-xl"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                        >
                            <X size={22} />
                        </button>
                    )}

                </div>


                {/* Live Search Text */}

                {search && (
                    <div className="mt-10">

                        <p className="font-mono text-sm uppercase">
                            Searching for: "{search}"
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}

export default SearchPage;