import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { RootState } from "..";
import { ContactDetails } from "../../utils/types";

type ContactListsInitialState = {
  contacts: ContactDetails[];
};

const initialState: ContactListsInitialState = {
  contacts: [],
};

const contactsListSlice = createSlice({
  name: "contactsList",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<ContactDetails>) => {
      state.contacts = [...state.contacts, { ...action.payload, id: v4() }];
    },
    editContact: (state, action: PayloadAction<ContactDetails>) => {
      state.contacts = state.contacts?.map((contact) =>
        contact?.id === action.payload?.id ? action.payload : contact
      );
    },
    deleteContact: (state, action: PayloadAction<string | undefined>) => {
      console.log(action.payload, "s");
      state.contacts = state.contacts?.filter(
        (contact) => contact?.id !== action.payload
      );
    },
  },
});

export const { addContact, editContact, deleteContact } =
  contactsListSlice.actions;
export const contactsListSelector = (state: RootState) => state.contactsList;
export default contactsListSlice.reducer;
