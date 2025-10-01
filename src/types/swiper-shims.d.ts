declare module 'swiper/react' {
  import { ComponentType, PropsWithChildren } from 'react';
  export const Swiper: ComponentType<PropsWithChildren<Record<string, unknown>>>;
  export const SwiperSlide: ComponentType<PropsWithChildren<Record<string, unknown>>>;
}

declare module 'swiper/modules' {
  export const Pagination: Record<string, unknown>;
  export const Navigation: Record<string, unknown>;
  export const Autoplay: Record<string, unknown>;
}


