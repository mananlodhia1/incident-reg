import { useContext, useEffect, useRef, useState } from "react";
import { SUCCESS } from "../services/constants/status";
import { Toast } from "flowbite-react";
import { Check } from "./icons";
import { ResponseContext } from "../context/responseContext";

export const ResponseToast = () => {
  const { response, setResponse } = useContext(ResponseContext);
  const [showToast, setShowToast] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hideToast = () => {
    setShowToast(false);
    setResponse({});
  };
  
  //reset state once new response is retrieved
  useEffect(() => {
    setShowToast(true);
  }, [response.message]);

  useEffect(() => {
    if (showToast) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      // Set a new timer
      timerRef.current = setTimeout(() => {
        hideToast();
      }, 4000); // 3 seconds
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showToast]);

  const toast = (value: string) => {
    return (
      <>
        {showToast && (
          <Toast className="fixed top-4 right-4 z-50">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <Check />
            </div>
            <div className="ml-3 text-sm font-normal">{value}</div>
            <Toast.Toggle  onDismiss={hideToast} />
          </Toast>
        )}
      </>
    );
  };

  // Render component based on response status
  const renderResponse = () => {
    if (!response || !response.message) return null;

    switch (true) {
      case Object.values(SUCCESS).includes(response.status as number):
        return toast(response.message as string);

      default:
        return null;
    }
  };
  return renderResponse();
};

export const ResponseText = ({response}) => {
  return (
    <>
      {response && (
        <div className="mb-4">
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            <p>{response as string}</p>
          </div>
        </div>
      )}
    </>
  );
};
