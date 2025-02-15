import { CustomButton } from "../../components/customBtn";
import CustomInputGroup from "../../components/customInputGroup";
import { useHandleChange } from "../../hooks/useHandleChange";
// import { validateEmail } from "../utilities/helper";
import { CustomTitle } from "../../components/customTitle";
import { useAppDispatch } from "../../reduxLibrary/hooks";
import { login } from "../../services/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "../../hooks/useAuthStatus";
import { useEffect } from "react";
import { useLoading } from "../../hooks/useLoading";
import { Spinner } from "flowbite-react";
import { ResponseText } from "../../components/responseElements";
import { useErrors } from "../../hooks/useErrors";

export default function Login() {
  const { isValid, isLoading_A } = useAuthStatus();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, setIsLoading } = useLoading();
  const { error, setError } = useErrors();

  const { formValue, handleFieldChange } = useHandleChange({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      login(
        {
          username: formValue.username as string,
          password: formValue.password as string,
        },
        navigate,
        setIsLoading,
        setError
      )
    );
  };

  useEffect(() => {
    if (isValid) {
      navigate("/admin/dashboard");
    }
  }, [isValid, navigate]);

  return !isValid && !isLoading_A ? (
    <div className="max-w-md w-full">
      <form className="flex max-w-md flex-col text-start">
        <CustomTitle size="lg" customStyle="!text-2xl">
          Login to <span className="text-primary">Incidents</span> admin
        </CustomTitle>
        <ResponseText response={error?.message} />

        <div>
          <CustomInputGroup
            id="username"
            placeholder=""
            type="username"
            labelText="username"
            labelId="username"
            onChange={handleFieldChange}
            /* isValid={
              validateEmail(formValue.username as string) || formValue.username === ""
            } */
          />
        </div>
        <div>
          <CustomInputGroup
            id="password"
            placeholder=""
            type="password"
            labelText="Password"
            labelId="password"
            onChange={handleFieldChange}
            required
          />
        </div>

        <CustomButton
          customStyle="w-100"
          type="submit"
          id="submit"
          disabled={false}
          handleClick={(e: any) => {
            handleSubmit(e);
          }}
        >
          {isLoading ? <Spinner color="success" size="sm" /> : "Login"}
        </CustomButton>
      </form>
    </div>
  ) : null;
}
