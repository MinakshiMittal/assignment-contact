import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { contactsListSelector } from "../../store/slices/contactsSlice";
import { AddContactModal } from "./AddContactModal";
import { ContactsTable } from "./ContactsTable";

export const Contacts = () => {
  const contactsList = useAppSelector(contactsListSelector);
  const [addContactModalVisible, setAddContactModalVisible] = useState(false);

  return (
    <div className=" w-full flex flex-col">
      <div className="flex flex-col bg-white font-semibold text-light-black p-2">
        <div className="flex items-center justify-end mb-4">
          <button
            className="text-white font-medium text-sm bg-purple-900 flex items-center gap-1 rounded-md p-2"
            onClick={() => setAddContactModalVisible(true)}
          >
            <UserPlusIcon className="w-4 h-4 cursor-pointer text-white" />
            Add New
          </button>
        </div>
        <ContactsTable />
        {!contactsList.contacts.length && (
          <div className="flex flex-col justify-center items-center w-full h-inherit mt-10">
            <h1>No contacts to show</h1>
          </div>
        )}
      </div>
      {addContactModalVisible && (
        <AddContactModal
          setAddContactModalVisible={setAddContactModalVisible}
        />
      )}
    </div>
  );
};
