import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Form = ({
  buttonText = "",
  nameValue = "",
  phoneNumberValue = "",
  url = "",
  method = "",
}) => {
  const [name, setName] = useState(nameValue);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setName(nameValue);
  }, [nameValue]);

  useEffect(() => {
    setPhoneNumber(phoneNumberValue);
  }, [phoneNumberValue]);

  // @ts-ignore
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // @ts-ignore
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const resetForm = () => {
    setName("");
    setPhoneNumber("");
  };

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const response = await axios[method](`http://127.0.0.1:8000/${url}`, {
        name: name,
        phone_number: phoneNumber,
      });
      resetForm();
      setSuccessMessage("Success!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-6">
          <h2 className="text-base text-center border-b font-semibold leading-7 text-gray-900">
            Phone Book
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col justify-center gap-3">
        <button
          type="submit"
          className="font-medium text-base text-green-600 text-center border-2 border-green-600 rounded-lg px-2 py-1 hover:bg-green-600 hover:text-white"
        >
          {buttonText}
        </button>
        <Link to="/">
          <div className="font-medium text-base text-red-600 text-center border-2 border-red-600 rounded-lg px-3 py-1 hover:bg-red-600 hover:text-white">
            Cancel
          </div>
        </Link>
        {successMessage && (
          <div className="font-medium text-base text-green-600 text-center border-t-2 mt-2 pt-2">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="font-medium text-base text-red-600 text-center border-t-2 mt-2 pt-2">
            {errorMessage}
          </div>
        )}
      </div>
    </form>
  );
};
