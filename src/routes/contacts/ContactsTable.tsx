import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  contactsListSelector,
  deleteContact,
} from "../../store/slices/contactsSlice";
import { ContactDetails } from "../../utils/types";
import { EditModal } from "./EditModal";

export const ContactsTable = () => {
  const contactsList = useAppSelector(contactsListSelector);
  const dispatch = useAppDispatch();
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleDelete = (contact: ContactDetails) => {
    dispatch(deleteContact(contact?.id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-center hidden md:table">
        <thead className="bg-gray-100 rounded h-12 px-2">
          <tr>
            <th className="text-left rounded-l-2xl pl-6">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Phone Number</th>
            <th className="text-center rounded-r-2xl">Actions</th>
          </tr>
        </thead>
        <tbody className="font-medium text-lg">
          {contactsList?.contacts?.map((contact) => (
            <>
              <tr className="h-12" key={contact?.id}>
                <td className="p-4 pl-6">
                  <div className="flex items-center">
                    <div>{`${contact?.firstName} ${contact?.lastName}`}</div>
                  </div>
                </td>
                <td className="text-left">{contact?.email}</td>
                <td className="text-left">{contact?.number}</td>
                <td>
                  <div className="flex items-center justify-center text-purple">
                    <div className="text-purple shadow-default h-8 flex items-center justify-center rounded-xl cursor-pointer gap-6 pl-6">
                      <EyeIcon
                        className="w-5 h-5 text-purple-900"
                        onClick={() => setEditModalVisible(true)}
                      />
                      <TrashIcon
                        className="w-5 h-5 text-red-900 cursor-pointer"
                        onClick={() => handleDelete(contact)}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <div className="w-full">
                {editModalVisible && (
                  <EditModal
                    setEditModalVisible={setEditModalVisible}
                    dataToBeEdited={contact}
                  />
                )}
              </div>
            </>
          ))}
        </tbody>
      </table>

      <div className="block md:hidden">
        {contactsList?.contacts?.map((contact) => (
          <div
            key={contact?.id}
            className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">
                  {`${contact?.firstName} ${contact?.lastName}`}
                </p>
                <p className="text-sm text-gray-500">{contact?.email}</p>
                <p className="text-sm text-gray-500">{contact?.number}</p>
              </div>
              <div className="flex items-center space-x-4">
                <EyeIcon
                  className="w-6 h-6 text-purple-900 cursor-pointer"
                  onClick={() => setEditModalVisible(true)}
                />
                <TrashIcon
                  className="w-6 h-6 text-red-900 cursor-pointer"
                  onClick={() => handleDelete(contact)}
                />
              </div>
            </div>
            <div className="w-full">
              {editModalVisible && (
                <EditModal
                  setEditModalVisible={setEditModalVisible}
                  dataToBeEdited={contact}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
