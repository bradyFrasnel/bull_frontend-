import { u as useCookie } from './cookie-BQ1yN6Gj.mjs';

const useApi = () => {
  const authToken = useCookie("authToken");
  const baseUrl = "https://api.lp-asur.ga";
  const apiFetch = async (url, options = {}) => {
    try {
      return await $fetch(url, {
        baseURL: baseUrl,
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
          "Authorization": authToken.value ? `Bearer ${authToken.value}` : void 0
        },
        onResponseError({ response }) {
          if (response.status === 403) {
            console.error("Acc\xE8s refus\xE9 : V\xE9rifiez vos droits d'acc\xE8s.");
          }
          if (response.status === 401) {
            console.error("Session expir\xE9e ou non authentifi\xE9e.");
          }
        }
      });
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };
  return {
    apiFetch
  };
};

export { useApi as u };
//# sourceMappingURL=useApi-C5ZVQEPH.mjs.map
