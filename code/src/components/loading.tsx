// Use Dep
import {
  Backdrop,
  CircularProgress,
  useEffect,
  useSelector,
  useDispatch,
} from "../utils/dep";

const Loading = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading);

  const closeloading = () => {
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={closeloading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Loading;
