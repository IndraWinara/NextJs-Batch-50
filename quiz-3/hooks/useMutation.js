import { useCallback, useState } from "react";

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });

  const mutate = useCallback(
    async ({ url = "", method = "POST", payload = {} } = {}) => {
      try {
        setData((prevData) => ({
          ...prevData,
          isLoading: true,
          isError: false,
        }));

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        setData((prevData) => ({
          ...prevData,
          data: result,
          isLoading: false,
        }))

        return result;
      } catch (error) {
        setData((prevData) => ({
          ...prevData,
          isError: true,
          isLoading: false,
        }));
        return error;
      }
    },
    [] // Add any dependencies here, e.g., data
  );

  return { ...data, mutate };
};
