import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import { fetchAllQa, addNewQa } from "../server";
import AddNewModal from "../views/AddNewModal";

// const sampleData = [
//   {
//     id: 1,
//     question: "What's the best thing about Switzerland?",
//     answer:
//       "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
//   },
//   {
//     id: 2,
//     question: "What do you call someone with no body and no nose?",
//     answer:
//       "Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
//   },
//   {
//     id: 3,
//     question: "Why do you never see elephants hiding behind a tree?",
//     answer:
//       "Because they are so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function QuickSearch({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <div className="mt-1 relative flex items-center">
        <input
          type="text"
          placeholder="Enter a term to lookup on Questions"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
            <SearchIcon className={"h-6 w-6"} aria-hidden="true" />
          </kbd>
        </div>
      </div>
    </div>
  );
}

export default function QnA({ userAuthToken }) {
  const [openAddNewModal, setOpenAddNewModal] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const applySearch = (data, searchTerm) => {
    if (searchTerm == "") return data;
    const result = data.filter((item) => item.question.match(searchTerm));
    return result;
  };

  const createNewQnA = (question, answer) => {
    if (question == "" || answer == "") return;
    const data = { question, answer };
    addNewQa(userAuthToken, data).then((resp) => {
      console.log(resp);
      resp && fetchAllQa(userAuthToken).then(setData);
    });
  };

  useEffect(() => {
    fetchAllQa(userAuthToken).then(setData);
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            <div className="flex items-center mt-2 justify-between">
              <div className="max-w-xl">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Questions And Answers
                </h2>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={(_) => setOpenAddNewModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Add New
                </button>
                <AddNewModal
                  open={openAddNewModal}
                  setOpen={setOpenAddNewModal}
                  saveToServer={createNewQnA}
                />
              </div>
            </div>
            <QuickSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            {applySearch(data, searchTerm).map((item) => (
              <Disclosure as="div" key={item.id} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                        <span className="font-medium text-gray-900">
                          {item.question}
                        </span>
                        <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{item.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
