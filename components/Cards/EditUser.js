import { Dialog, Transition } from "@headlessui/react";
import { React, useState, useEffect, Fragment } from "react";

const EditUser = ({ userId, setResponseUser }) => {
  const USER_API_BASE_URL = "http://localhost:8080/api/v1/user";

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(USER_API_BASE_URL + "/" + userId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const _user = await response.json();
        setUser(_user);
        setIsOpen(true);
      } catch (error) {
        console.log(error);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, [event.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const response = await fetch(USER_API_BASE_URL + "/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _user = await response.json();
    setResponseUser(_user);
    reset(e);
  };

  return (
    <div className="min-h-screen absolute top-1/2 right-1/4">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" m onClose={closeModal}>
          <div className="px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block  p-5  max-w-md text-left absolute top-0 right-1/3 mt-36 transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Update User
                </Dialog.Title>
                <div className="flex max-w-md max-auto">
                  <div className="py-2">
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Email
                      </label>
                      <input
                        type="text"
                        name="emailId"
                        value={user.emailId}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4">
                      <label className="block text-gray-600 text-sm font-normal">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={user.role}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2"
                      ></input>
                    </div>
                    <div className="h-14 my-4 space-x-4 pt-4">
                      <button
                        onClick={updateUser}
                        className=" bg-emerald-400 hover:bg-emerald-600 rounded text-white font-semibold   py-2 px-6"
                      >
                        Update
                      </button>
                      <button
                        onClick={reset}
                        className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EditUser;
