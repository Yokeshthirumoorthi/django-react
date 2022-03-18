import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

function TextArea({ label, placeholder, value, onValueChange }) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-b sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="about"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 mb-2 sm:mt-0 sm:col-span-2">
        <textarea
          id="about"
          name="about"
          placeholder={placeholder}
          rows={3}
          className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function CriticalMarkerChkBox({ critical, setCritical }) {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          checked={critical}
          onChange={(e) => setCritical(e.target.checked)}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="comments" className="font-medium text-gray-700">
          Critical
        </label>
        <p id="comments-description" className="text-gray-500">
          Mark this as critical if this is an important question.
        </p>
      </div>
    </div>
  );
}

function AddNewQAForm({ setOpen, saveToServer }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [critical, setCritical] = useState(false);

  const resetValues = () => {
    setQuestion("");
    setAnswer("");
    setCritical(false);
  };

  const handleSave = () => {
    if (question == "" || answer == "") {
      setErrorMsg("Question and Answer cannot be empty");
      return;
    }

    saveToServer(question, answer, critical);
    setOpen(false);
    resetValues();
  };

  return (
    <>
      <div className="mt-2">
        <CriticalMarkerChkBox critical={critical} setCritical={setCritical} />
        <TextArea
          label={"Question"}
          placeholder={"Write your question here"}
          value={question}
          onValueChange={(value) => {
            setErrorMsg("");
            setQuestion(value);
          }}
        />
        <TextArea
          label={"Answer"}
          placeholder={"Write your answer here"}
          value={answer}
          onValueChange={(value) => {
            setErrorMsg("");
            setAnswer(value);
          }}
        />
      </div>
      {errorMsg != "" && (
        <p className="mt-2 text-center text-sm text-red-600">{errorMsg}</p>
      )}
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default function AddNewModal({ open, setOpen, saveToServer }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Add New Question And Answer
                  </Dialog.Title>
                </div>
                <AddNewQAForm setOpen={setOpen} saveToServer={saveToServer} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
