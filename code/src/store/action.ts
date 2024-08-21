const setLoading = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

const setNotify = (notify) => ({
  type: "SET_NOTIFY",
  payload: notify,
});

export { setLoading, setNotify };
