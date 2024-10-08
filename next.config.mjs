/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",  // อนุญาตโปรโตคอล https
          hostname: "**",     // ใช้ wildcard เพื่ออนุญาตทุก hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  