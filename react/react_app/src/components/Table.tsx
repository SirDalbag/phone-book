import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Table() {
  const [phoneBook, setPhoneBook] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/persons/").then((response) => {
      setPhoneBook(response.data.data);
    });
  }, []);

  // @ts-ignore
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/person/delete/${id}/`);
      // @ts-ignore
      setPhoneBook(phoneBook.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 border-b-2">
          <tr>
            <th className="px-6 py-3 text-lg">Name</th>
            <th className="px-6 py-3 text-lg">Phone Number</th>
            <th className="px-6 py-3">
              <Link to="/add/">
                <div className="font-medium text-base text-green-600 text-center border-2 border-green-600 rounded-lg px-2 py-1 hover:bg-green-600 hover:text-white">
                  ADD
                </div>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {phoneBook.map((item) => (
            <tr
              key={
                // @ts-ignore
                item.id
              }
              className="border-b"
            >
              <th className="px-6 py-4 font-medium text-base text-gray-900 whitespace-nowrap">
                {
                  // @ts-ignore
                  item.name
                }
              </th>
              <td className="px-6 py-4 text-base text-center">
                {
                  // @ts-ignore
                  item.phone_number
                }
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-6">
                  <Link
                    to={`/edit/${
                      // @ts-ignore
                      item.id
                    }`}
                  >
                    <div className="font-medium text-base text-blue-600 border-2 border-blue-600 rounded-lg px-3 py-1 hover:bg-blue-600 hover:text-white">
                      EDIT
                    </div>
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(
                        // @ts-ignore
                        item.id
                      )
                    }
                    className="font-medium text-base text-red-600 border-2 border-red-600 rounded-lg px-3 py-1 hover:bg-red-600 hover:text-white"
                  >
                    DELETE
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
