const dev_env = {
  BASE_URL: "",
};

const prod_env = {
  BASE_URL: "",
};

const config = process.env.REACT_APP_ENV === "dev" ? dev_env : prod_env;

export default {
  ...config,
};
