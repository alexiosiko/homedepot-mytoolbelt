/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
		  {
			protocol: "https",
			hostname: "images.homedepot.ca",
			pathname: "/productimages/**",
		  },
		],
	  },
	async headers() {
	  return [
		{
		  source: "/api/:path*",
		  headers: [
			{ key: "Access-Control-Allow-Origin", value: "*" },
			{ key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE" },
			{ key: "Access-Control-Allow-Headers", value: "Content-Type" },
		  ],
		},
	  ];
	},
  };
  module.exports = nextConfig;
  