import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rechtly - Rechtliche Beratung & KI-Telefonie',
    short_name: 'Rechtly',
    description: 'Professionelle rechtliche Beratung mit moderner KI-Telefonie. Büßgeld, Verkehrsunfall, KFZ-Gutachten und mehr.',
    start_url: '/blogundratgeber',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
