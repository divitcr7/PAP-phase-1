export interface Testimonial {
  id: number;
  quote: string;
  avatarSrc: string;
  avatarAlt: string;
  name: string;
  position: string;
  stars: number;
  avatarSize: number;
}

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    quote:
      "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    avatarSrc: "/images/avatar/avt-png1.png",
    avatarAlt: "avatar 1",
    name: "Courtney Henry",
    position: "CEO Account Name",
    stars: 5,
    avatarSize: 34,
  },
  {
    id: 2,
    quote:
      "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    avatarSrc: "/images/avatar/avt-png2.png",
    avatarAlt: "avatar 2",
    name: "Esther Howard",
    position: "CEO Account Name",
    stars: 5,
    avatarSize: 60,
  },
  {
    id: 3,
    quote:
      "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    avatarSrc: "/images/avatar/avt-png4.png",
    avatarAlt: "avatar 3",
    name: "Annette Black",
    position: "CEO Account Name",
    stars: 5,
    avatarSize: 34,
  },
  {
    id: 4,
    quote:
      "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
    avatarSrc: "/images/avatar/avt-png6.png",
    avatarAlt: "avatar 4",
    name: "Bessie Cooper",
    position: "CEO Account Name",
    stars: 5,
    avatarSize: 34,
  },
];

export interface SimpleTestimonial {
  stars: number;
  text: string;
  wowDelay: string;
  wowDuration: string;
  animated: boolean;
}

export const testimonials: SimpleTestimonial[] = [
  {
    stars: 5,
    text: `"My experience with property management services has exceeded expectations. 
            They efficiently manage properties with a professional and attentive approach 
            in every situation. I feel reassured that any issue will be resolved promptly 
            and effectively."`,
    wowDelay: "0s",
    wowDuration: "1000ms",
    animated: false,
  },
  {
    stars: 5,
    text: `"My experience with property management services has exceeded expectations. 
            They efficiently manage properties with a professional and attentive approach 
            in every situation. I feel reassured that any issue will be resolved promptly 
            and effectively."`,
    wowDelay: "0s",
    wowDuration: "1000ms",
    animated: false,
  },
  {
    stars: 5,
    text: `"My experience with property management services has exceeded expectations. 
            They efficiently manage properties with a professional and attentive approach 
            in every situation. I feel reassured that any issue will be resolved promptly 
            and effectively."`,
    wowDelay: ".2s",
    wowDuration: "2000ms",
    animated: true,
  },
];