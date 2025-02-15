import React from "react";
import { useAppDispatch } from "../../reduxLibrary/hooks";
import { useLoading } from "../../hooks/useLoading";
import { Spinner } from "flowbite-react";
import { deleteItem } from "../../services/actions/actions";
import { CustomButton } from "../../components/customBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { ResponseText } from "../../components/responseElements";
import { useErrors } from "../../hooks/useErrors";

interface DeleteIncidentProps {
  closeModal: () => void;
  id: string;
  name: string;
  media: object;

}
export const DeleteIncident: React.FC<DeleteIncidentProps> = ({
  closeModal,
  id,
  name,
  media
}) => {
  const dispatch = useAppDispatch();
  const { isLoading, setIsLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const { error, setError } = useErrors();
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteItem(id, media, setIsLoading, setError)).then(
      ({ status }) => {
        console.log(status);

        if (status === 200) {
          closeModal();
          if (location.pathname !== "/admin/dashboard") {
            navigate("/admin/dashboard");
          }
        }
      }
    );
  };
  return (
<>
<ResponseText response={error?.message} />
<form onSubmit={handleDelete}>
  <div className="px-1">
    you sure you want to delete <b>{name}</b>? This action will remove all
    associated files.
  </div>
  <div className="pt-10 flex gap-2 justify-start">
    <CustomButton
      btnStyle="secondary"
      type="button"
      id="close"
      disabled={isLoading}
      handleClick={() => {
        closeModal();
      }}
    >
      Cancel
    </CustomButton>
    <CustomButton type="submit" id="submit" disabled={false}>
      {isLoading ? <Spinner color="success" size="sm" /> : "Delete"}
    </CustomButton>
  </div>
</form>
</>
  );
};
