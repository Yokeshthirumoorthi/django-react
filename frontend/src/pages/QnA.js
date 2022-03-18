import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/outline";
import * as Server from "../server";
import AddNewModal from "../views/AddNewModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header({ createNewQnA }) {
  const [openAddNewModal, setOpenAddNewModal] = useState(false);
  return (
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
  );
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

function CriticalBadge({ isCritical }) {
  return (
    <span
      className={classNames(
        isCritical ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800",
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      )}
    >
      {isCritical ? "Critical" : "Not Critical"}
    </span>
  );
}

function QnAItem({ item }) {
  return (
    <Disclosure as="div" className="pt-6">
      {({ open }) => (
        <>
          <dt className="text-lg">
            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
              <span className="font-medium text-gray-900">
                {item.question}
                <CriticalBadge isCritical={item.critical} />
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
  );
}

export const applySearch = (data, searchTerm) => {
  if (searchTerm == "") return data;
  return data.filter(
    (item) => item.question.match(searchTerm) || item.answer.match(searchTerm)
  );
};

function QnAContent({ data }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <QuickSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {applySearch(data, searchTerm).map((item) => (
        <QnAItem key={item.id} item={item} />
      ))}
    </>
  );
}

function EmptyQnAContent() {
  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No question answer
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new question answer.
      </p>
    </div>
  );
}

export default function QnA({ userAuthToken }) {
  const [data, setData] = useState([]);
  const createNewQnA = async (question, answer, critical) => {
    if (question == "" || answer == "") return;

    const data = { question, answer, critical };
    const createDataResponse = await Server.addNewQa(userAuthToken, data);

    if (createDataResponse) {
      const refreshedData = await Server.fetchAllQa(userAuthToken);
      setData(refreshedData);
    }
  };

  useEffect(() => {
    Server.fetchAllQa(userAuthToken).then(setData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
        <Header createNewQnA={createNewQnA} />
      </div>
      <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {data.length == 0 && <EmptyQnAContent />}
          {data.length > 0 && <QnAContent data={data} />}
        </dl>
      </div>
    </div>
  );
}
