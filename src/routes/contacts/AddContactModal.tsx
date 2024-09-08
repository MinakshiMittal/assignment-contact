import { XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { useAppDispatch } from "../../store/hooks";
import { addContact } from "../../store/slices/contactsSlice";
import { addContactDetailsInitialState } from "../../utils/constants";
import {
  validateContactForm,
  validateEmail,
  validateName,
  validatePhoneNumber,
} from "../../utils/helper";
import { ContactDetails } from "../../utils/types";
import { addContactChangeHandler } from "./helper";

type AddContactModalProps = {
  setAddContactModalVisible: (addContactModalVisible: boolean) => void;
};

export const AddContactModal = ({
  setAddContactModalVisible,
}: AddContactModalProps) => {
  const [addContactDetails, setAddContactDetails] = useState<ContactDetails>(
    addContactDetailsInitialState
  );

  const [errors, setErrors] = useState(addContactDetails);
  const { firstName, lastName, email, number } = addContactDetails;
  const dispatch = useAppDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    addContactChangeHandler(event, addContactDetails, setAddContactDetails);

  const handleEmailOnBlur = () => {
    const error = validateEmail(email);
    setErrors({ ...errors, email: error });
  };

  const handleNameOnBlur = () => {
    const error = validateName(firstName);
    setErrors({ ...errors, firstName: error });
  };

  const handleNumberOnBlur = () => {
    const error = validatePhoneNumber(number);
    setErrors({ ...errors, number: error });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateContactForm(addContactDetails, setErrors);
    if (valid) {
      dispatch(addContact(addContactDetails));
      setAddContactModalVisible(false);
      setAddContactDetails(addContactDetailsInitialState);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setAddContactModalVisible(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
            Add Contact
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={firstName}
              label="First Name"
              id="firstName"
              placeholder="Enter First Name"
              type="text"
              onChange={handleChange}
              onBlur={handleNameOnBlur}
              error={errors.firstName}
              className="border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-left text-md text-gray-700"
            />
            <Input
              value={lastName}
              label="Last Name"
              id="lastName"
              placeholder="Enter Last Name"
              type="text"
              onChange={handleChange}
              onBlur={handleNameOnBlur}
              error={errors.lastName}
              className="border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-left text-md text-gray-700"
            />
            <Input
              value={email}
              label="Email"
              id="email"
              placeholder="Enter Email"
              type="email"
              onChange={handleChange}
              onBlur={handleEmailOnBlur}
              error={errors.email}
              className="border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-left text-md text-gray-700"
            />
            <Input
              value={number}
              id="number"
              label="Phone No."
              placeholder="Enter Phone Number"
              type="number"
              onChange={handleChange}
              onBlur={handleNumberOnBlur}
              error={errors.number}
              className="border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-left text-md text-gray-700"
            />

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setAddContactModalVisible(false)}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
