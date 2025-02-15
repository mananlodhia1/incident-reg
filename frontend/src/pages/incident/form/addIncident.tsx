import { useHandleChange } from "../../../hooks/useHandleChange";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../reduxLibrary/hooks";
import { addItem } from "../../../services/actions/actions";
import { useLoading } from "../../../hooks/useLoading";
import { Spinner } from "flowbite-react";
import CustomInputGroup from "../../../components/customInputGroup";
import CustomSelect from "../../../components/customSelect";
import { CustomButton } from "../../../components/customBtn";
import { ResponseText } from "../../../components/responseElements";
import { useErrors } from "../../../hooks/useErrors";
import { Severity } from "../severityTypes";
import CustomDatePicker from "../../../components/customDatePicker";
import { resolutionDateHandler } from "../../../utilities/helper";

interface AddIncidentProps {
  closeModal: () => void;
}
export const AddIncident: React.FC<AddIncidentProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const { isLoading, setIsLoading } = useLoading();
  const { error, setError } = useErrors();
  const { formValue, setFormValue, handleFieldChange } = useHandleChange({
    name: "",
    description: "",
    severity: "",
    location: "",
    contact: localStorage.email,
    reporterName: localStorage.username,
    resolutionDate: "",
  });

  useEffect(() => {
    setFormValue({
      ...formValue,
      resolutionDate: resolutionDateHandler(formValue.severity as string),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue.severity]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addItem(
        {
          name: formValue.name,
          description: formValue.description,
          createdAt: new Date().toISOString(),
          severity: formValue.severity,
          location: formValue.location,
          contact: formValue.contact,
          reporterName: formValue.reporterName,
          resolutionDate: formValue.resolutionDate,
        },
        setIsLoading,
        setError
      )
    ).then(({ status }) => {
      if (status === 201) {
        closeModal();
      }
    });
  };

  return (
    <>
      <ResponseText response={error?.message} />
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <CustomInputGroup
              id="name"
              placeholder=""
              type="text"
              labelText="Incident title"
              labelId="name"
              onChange={handleFieldChange}
            />
          </div>
          <div className="col-span-2">
            <CustomSelect
              id="severity"
              labelId="severity"
              labelText="Severity"
              options={Severity().map((severity) => {
                return { title: severity, value: severity };
              })}
              onChange={handleFieldChange}
            />
          </div>

          <div className="col-span-4">
            <CustomInputGroup
              id="description"
              placeholder=""
              type="text"
              labelText="Description"
              labelId="description"
              onChange={handleFieldChange}
            />
          </div>

          <div className="col-span-4">
            <CustomInputGroup
              id="location"
              placeholder=""
              type="text"
              labelText="Location"
              labelId="location"
              onChange={handleFieldChange}
            />
          </div>

          <div className="col-span-4">
            <CustomInputGroup
              id="contact"
              placeholder=""
              type="text"
              labelText="Contact"
              labelId="contact"
              value={formValue.contact as string}
              disabled
            />
          </div>

          <div className="col-span-4">
            <CustomInputGroup
              id="reporterName"
              placeholder=""
              type="text"
              labelText="Reporter"
              labelId="reporterName"
              value={formValue.reporterName as string}
              disabled
            />
          </div>

          <div className="col-span-4">
            <CustomDatePicker
              id="resolutionDate"
              value={formValue.resolutionDate as string}
            />
          </div>

          <div className="col-span-4">
            <CustomButton type="submit" id="submit" disabled={false}>
              {isLoading ? <Spinner color="success" size="sm" /> : "Submit"}
            </CustomButton>
          </div>
        </div>
      </form>
    </>
  );
};
