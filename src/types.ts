export type Route = 'home' | 'about' | 'locations' | 'services' | 'photos' | 'contact' | 'book';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  experience: string;
  image: string;
  instagram: string;
  rating: number;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  category: 'cuts' | 'shaves' | 'styling' | 'packages';
}

export interface LocationBranch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  image: string;
  mapEmbedUrl: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'haircut' | 'shave' | 'styling' | 'workspace' | 'details';
  span: string; // Tailwind grid span for Pinterest masonry variation
}
