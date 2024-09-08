import { XMarkIcon } from "@heroicons/react/24/solid";
import { ContactDetails } from "../../utils/types";

type ViewProfileModalProps = {
  setViewContactModalVisible: (viewContactModalVisible: boolean) => void;
  details: ContactDetails;
};

export const ViewContactModal = ({
  setViewContactModalVisible,
  details,
}: ViewProfileModalProps) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div
          className="close-container"
          onClick={() => setViewContactModalVisible(false)}
        >
          <XMarkIcon className="w-5 h-5 cursor-pointer" />
        </div>
        <h1 className="font-semibold text-light-black text-3xl mt-20">
          {details?.firstName}
        </h1>
        <h1 className="font-semibold text-light-black text-3xl mt-20">
          {details?.lastName}
        </h1>
        <h2 className="text-gray-500 text-lg font-medium">
          +91 {details?.number}
        </h2>
        <div>
          <hr />
        </div>
        <div className="flex-center m-10">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-normal text-light-black">Email</p>
              <p className="font-medium text-light-black">{details?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
