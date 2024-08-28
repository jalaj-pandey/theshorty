import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UrlData } from "../../interface/UrlData";
import { serverUrl } from "../../helpers/Constant";
import axios from "axios";

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
          className="border-b text-white bg-gray-600 hover:bg-white hover:text-gray-800"
        >
          <td className="px-6 py-3 break-words">
            <Link to={item.fullUrl} target="_blank" rel="noreferrer noopener">
              {item.fullUrl}
            </Link>
          </td>
          <td className="px-6 py-3 break-words">
            <Link
              to={`${serverUrl}/shortUrl/${item.shortUrl}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {item.shortUrl}
            </Link>
          </td>
          <td className="px-6 py-3">{item.clicks}</td>

          <td className="px-6 py-3">
            <div className="flex content-center">
              <div className="cursor-pointer px-2" onClick={() => copyToClipboard(item.shortUrl)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </div>
              <div className="cursor-pointer px-2" onClick={() => deleteUrl(item._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      alert("URL copied to clipboard");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUrl = async (id: string) => {
    const res = await axios.delete(`${serverUrl}/shortUrl/${id}`);
    console.log(res);
    updateReloadState();
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
          className={`cursor-pointer inline-block px-3 py-1 mx-1 rounded-lg ${
            currentPage === i ? "bg-gray-700 text-white" : "bg-white text-gray-700"
          }`}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="container mx-auto pt-2 pb-10">
      <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
        <table className="w-full table-fixed text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-md uppercase text-gray-50 bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 w-6/12">
                FullUrl
              </th>
              <th scope="col" className="px-6 py-3 w-3/12">
                ShortUrl
              </th>
              <th scope="col" className="px-6 py-3">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 ">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4">{renderPageNumbers()}</ul>
    </div>
  );
};

export default DataTable;
