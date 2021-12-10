/** @type {import('next').NextConfig} */
const moduleConfig = {
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    config.resolve.alias = {
      ...config.resolve.alias,
      Components: path.resolve(__dirname, "components"),
      Helpers: path.resolve(__dirname, "helpers"),
      Pages: path.resolve(__dirname, "pages"),
      Styles: path.resolve(__dirname, "styles"),
    };

    return config;
  },
};
module.exports = {
  reactStrictMode: true,
  moduleConfig,
};
