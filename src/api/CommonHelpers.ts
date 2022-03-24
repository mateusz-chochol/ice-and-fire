import GeneralApiResponse from "types/api/GeneralApiResponse";

export const fetchWithJson = async (url: string): Promise<GeneralApiResponse> => {
  const serverResponse = await fetch(url);
  const json = await serverResponse.json();

  return { headers: serverResponse.headers, json };
};
