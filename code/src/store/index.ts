// Use Redux
import { createStore } from "redux";

// Use Reducer
import { rootReducer } from "./reducer";

// Use Action
import { setLoading, setNotify } from "./action";

// 创建 Redux store
const store = createStore(rootReducer);

export default store;

export { setLoading, setNotify };
