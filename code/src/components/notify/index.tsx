// Use Dep
import { useSelector, useDispatch, Alert } from "../../utils/dep";

import "./index.less";

const Notify = () => {
  const notify = useSelector((state) => state.notify);

  const { content, type, visible } = notify;

  if (!visible) return null;

  return (
    <Alert severity={type} className="notify">
      {content}
    </Alert>
  );
};

export default Notify;
