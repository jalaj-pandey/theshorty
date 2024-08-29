import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UrlData } from "../../interface/UrlData.ts";
import { serverUrl } from "../../helpers/Constant.ts";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';


interface IDataTableProps {
  data: UrlData[];
  updateReloadState: () => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
  const { data, updateReloadState } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableData = () => {
    return currentData.map((item) => {
      return (
        <tr
          key={item._id}
          className="border-b text-white bg-teal-700 hover:bg-teal-600"
        >
          <td className="px-4 py-3 break-words text-xs md:text-base">
            <Link to={item.fullUrl} target="_blank" rel="noreferrer noopener">
              {item.fullUrl}
            </Link>
          </td>
          <td className="px-4 py-3 break-words text-xs md:text-base">
            <Link
              to={`${serverUrl}/shortUrl/${item.shortUrl}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {item.shortUrl}
            </Link>
          </td>
          <td className="px-4 py-3 text-xs md:text-base">
            {item.clicks}
          </td>
          <td className="px-4 py-3 text-xs md:text-base">
            <div className="flex space-x-2">
              <button
                className="p-2 text-blue-500 hover:text-blue-700"
                onClick={() => copyToClipboard(item.shortUrl)}
                aria-label="Copy URL"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </button>
              <button
                className="p-2 text-red-500 hover:text-red-700"
                onClick={() => deleteUrl(item._id)}
                aria-label="Delete URL"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      toast.success("URL copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy URL");
      console.log(error);
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      const res = await axios.delete(`${serverUrl}/shortUrl/${id}`);
      toast.success("Deleted Successfully");
      console.log(res);
      updateReloadState();
    } catch (error) {
      toast.error("Error deleting URL:");
    }
  };

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => handleClick(i)}
          className={`cursor-pointer px-3 py-1 mx-1 rounded-lg ${
            currentPage === i ? "bg-yellow-300 text-black" : "bg-white text-gray-700"
          }`}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container mx-auto pt-4 pb-10 px-4">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="z-50"
      />
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full text-sm text-left text-slate-800 border-collapse md:text-base">
          <thead className="text-md uppercase text-gray-50 bg-slate-800">
            <tr>
              <th scope="col" className="px-4 py-3 w-full md:w-1/4">
                Full URL
              </th>
              <th scope="col" className="px-4 py-3 w-full md:w-1/4">
                Short URL
              </th>
              <th scope="col" className="px-4 py-3 md:table-cell">
                Clicks
              </th>
              <th scope="col" className="px-4 py-3 w-full md:w-1/4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4 space-x-2">{renderPageNumbers()}</ul>
    </div>
  );
};

export default DataTable;
