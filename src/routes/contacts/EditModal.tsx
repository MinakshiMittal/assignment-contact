import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { useAppDispatch } from "../../store/hooks";
import { editContact } from "../../store/slices/contactsSlice";
import { addContactDetailsInitialState } from "../../utils/constants";
import {
  validateContactForm,
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "../../utils/helper";
import { ContactDetails } from "../../utils/types";
import { dataChangeHandler } from "./helper";

type EditModalProps = {
  dataToBeEdited: ContactDetails;
  setEditModalVisible: (editModalVisible: boolean) => void;
};

export const EditModal = ({
  dataToBeEdited,
  setEditModalVisible,
}: EditModalProps) => {
  const [errors, setErrors] = useState({ ...addContactDetailsInitialState });
  const [updatedData, setUpdatedData] = useState({ ...dataToBeEdited });
  const [isEditable, setIsEditable] = useState(false);

  const { firstName, lastName, email, number } = dataToBeEdited;
  const dispatch = useAppDispatch();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dataChangeHandler(event, updatedData, setUpdatedData);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateContactForm(updatedData, setErrors);
    if (valid) {
      dispatch(editContact(updatedData));
      setEditModalVisible(false);
    }
  };

  const handleEmailOnBlur = () => {
    const error = validateEmail(email);
    setErrors({ ...errors, email: error });
  };

  const handleFirstNameOnBlur = () => {
    const error = validateName(firstName);
    setErrors({ ...errors, firstName: error });
  };

  const handleLastNameOnBlur = () => {
    const error = validateName(lastName);
    setErrors({ ...errors, lastName: error });
  };

  const handleNumberOnBlur = () => {
    const error = validatePhoneNumber(number);
    setErrors({ ...errors, number: error });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setEditModalVisible(false)}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Edit Contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-left text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <Input
              value={firstName}
              id="firstName"
              placeholder="Enter First Name"
              type="text"
              disabled={!isEditable}
              onChange={changeHandler}
              onBlur={handleFirstNameOnBlur}
              error={errors.firstName}
              className="mt-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-left text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <Input
              value={lastName}
              id="lastName"
              disabled={!isEditable}
              placeholder="Enter Last Name"
              type="text"
              onChange={changeHandler}
              onBlur={handleLastNameOnBlur}
              error={errors.lastName}
              className="mt-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-left text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              value={email}
              id="email"
              disabled={!isEditable}
              placeholder="Enter Email"
              type="email"
              onChange={changeHandler}
              onBlur={handleEmailOnBlur}
              error={errors.email}
              className="mt-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="number"
              className="text-left text-sm font-medium text-gray-700"
            >
              Phone No.
            </label>
            <Input
              value={number}
              id="number"
              disabled={!isEditable}
              placeholder="Enter Phone Number"
              type="number"
              onChange={changeHandler}
              onBlur={handleNumberOnBlur}
              error={errors.number}
              className="mt-1 border-gray-300 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => setEditModalVisible(false)}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            {isEditable && (
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Save
              </button>
            )}
            {!isEditable && (
              <button
                type="button"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={() => setIsEditable(true)}
              >
                Edit Contact
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
