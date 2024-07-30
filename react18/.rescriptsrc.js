module.exports = {
  webpack: (config) => {
    config.devtool = false;
    return config;
  },
  devServer: (config) => {
    config.open = false;
    config.port = "9000";
    config.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    config.historyApiFallback = true;
    config.hot = true;
    config.liveReload = false;
    return config;
  },
};
