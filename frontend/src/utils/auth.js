export const getAdmin = () => {
  return JSON.parse(
    localStorage.getItem("admin")
  );
};

export const getToken = () => {
  return localStorage.getItem("token");
};