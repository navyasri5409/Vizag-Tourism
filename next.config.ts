
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'www.adotrip.com' },
      { protocol: 'https', hostname: 'im.hunt.in' },
      { protocol: 'https', hostname: 'media.tripinvites.com' },
      { protocol: 'https', hostname: 'yometro.com' },
      { protocol: 'https', hostname: 'holyshrines.in' },
      { protocol: 'https', hostname: 'assets.telegraphindia.com' },
      { protocol: 'https', hostname: 'cimages1.touristlink.com' },
      { protocol: 'https', hostname: 'www.yovizag.com' },
      { protocol: 'https', hostname: 'www.theindiatourism.com' },
      { protocol: 'https', hostname: 'imgeng.jagran.com' },
      { protocol: 'https', hostname: 'www.google.com' },
      { protocol: 'http', hostname: 'www.google.com' },
      { protocol: 'https', hostname: 'telugu.samayam.com' },
      { protocol: 'https', hostname: 'media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'indiano.travel' },
      { protocol: 'https', hostname: 'www.holidify.com' },
      { protocol: 'https', hostname: 'th-i.thgim.com' },
      { protocol: 'https', hostname: 'www.hotelbeachside.com' },
      { protocol: 'https', hostname: 'd3sftlgbtusmnv.cloudfront.net' },
      { protocol: 'https', hostname: 'templeyatri.in' },
      { protocol: 'https', hostname: 'www.pngkit.com' },
      { protocol: 'https', hostname: 'famoustemplesofindia.com' },
      { protocol: 'https', hostname: 'www.shutterstock.com' },
      { protocol: 'https', hostname: 'vizagtourism.org.in' },
      { protocol: 'https', hostname: 'img.traveltriangle.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'im.whatshot.in' },
      { protocol: 'https', hostname: 'andhra.mallsmarket.com' },
      { protocol: 'https', hostname: 'vizagfishingharbour.in' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'www.indiatravel.app' },
    ],
  },
};

export default nextConfig;
