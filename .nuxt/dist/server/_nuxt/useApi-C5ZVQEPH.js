import { u as useCookie } from "./cookie-BQ1yN6Gj.js";
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
            console.error("Accès refusé : Vérifiez vos droits d'accès.");
          }
          if (response.status === 401) {
            console.error("Session expirée ou non authentifiée.");
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
export {
  useApi as u
};
//# sourceMappingURL=useApi-C5ZVQEPH.js.map
