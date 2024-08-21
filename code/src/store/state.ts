const initialState = {
  // loading状态
  loading: false,

  // notify状态
  notify: {
    content: "",
    /**
     *    type类型：
     *    success - 成功
     *    info    -  提示
     *    warning - 警告
     *    error   -  错误
     */
    type: "",

    visible: false,
  },
};

export { initialState };
