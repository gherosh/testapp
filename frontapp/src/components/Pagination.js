import React from "react";

const Pagination = ({
    totalItems,
    changePage,
    currentPage,
}) => {
    return (
        <div className="p-6 my-2 max-w-2xl mx-auto rounded-xl flex items-center space-x-4">
            <div>
                <p className="text-sm text-gray-700">
                    Showing
                    <span className="font-medium"> {currentPage * 10 - 10} </span>
                    to
                    <span className="font-medium"> {currentPage * 10} </span>
                    of
                    <span className="font-medium"> {totalItems} </span>
                    results
                </p>
            </div>

            <div>
                <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination">
                    <a onClick={(e) => { e.preventDefault(); changePage(currentPage-1); }} href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span>Previous</span>
                    </a>

                    <a onClick={(e) => { e.preventDefault(); changePage(currentPage+1); }} href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span>Next</span>
                    </a>
                </nav>
            </div>
        </div>
    );
}

export default Pagination
