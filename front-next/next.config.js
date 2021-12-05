const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  compress: true,
  webpack: (config, { webpack }) => {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        // tree shaking
      ],
    };
  },
}

module.exports = withPlugins([
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
      },
    },
  ],
  withBundleAnalyzer,
], nextConfig);
