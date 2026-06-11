import { TeamMember, Service, LocationBranch, PhotoItem } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'marcus',
    name: 'Marcus "Vito" Vance',
    role: 'Founder & Master Craftsman',
    bio: 'With over 18 years behind the chair, Marcus has sculpted styles for international icons. He specializes in razor-sharp traditional grooming blended with progressive, modern textures.',
    specialty: 'Classic Scissor Cuts & Hot Towel Shaves',
    experience: '18 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186324/Image-1-ef321fb2-1920w_tzbaj1.webp',
    instagram: '@marcus_vance_cuts',
    rating: 5.0
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Savant Barber & Stylist',
    bio: 'Elena views barbering as an architectural art form. Known for her impeccable eye for symmetry and head form matching, she delivers tailored modern silouhettes with effortless flow.',
    specialty: 'Savant Textured Fades & Beard Architecture',
    experience: '12 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186324/1B8DE165-4F3D-4AAF-A3FD-F5E024B82F9F-1920w_f9cq3k.webp',
    instagram: '@elena_rostova_barber',
    rating: 4.9
  },
  {
    id: 'dominic',
    name: 'Dominic "Dom" Mercer',
    role: 'Craftsman Barber',
    bio: 'Dom is a purist when it comes to the shave. Dedicated to preserving the classical Italian hot-towel discipline, he offers a level of skin nourishment and relaxation that is unmatched.',
    specialty: 'Straight-Razor Shaving & Classic Shaves',
    experience: '8 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0035-1920w_ljaz4c.webp',
    instagram: '@dom_mercer_shaves',
    rating: 4.9
  },
  {
    id: 'julian',
    name: 'Julian Reyes',
    role: 'Craftsman Barber & Groomer',
    bio: 'Julian blends clean mid-century executive cuts with low-maintenance contemporary hair design. His clients praise his meticulous attention to natural cowlicks, crowns, and personal lifestyle adaptation.',
    specialty: 'Executive Contours & Beard Sculpting',
    experience: '7 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0047-1920w_fmo8ym.webp',
    instagram: '@reyes_crafts',
    rating: 4.8
  },
  {
    id: 'samantha',
    name: 'Samantha "Sam" Knight',
    role: 'Savant Barber & Fade Specialist',
    bio: 'Sam is an authority in high-contrast skin fades, razor lines, and intricate hair art. She is a powerhouse of skill and takes pride in custom detailing that perfectly elevates a client’s profile.',
    specialty: 'High-Contrast Skin Fades & Hair Tattooing',
    experience: '10 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0038-1920w_xds6ck.webp',
    instagram: '@sam_knight_sharp',
    rating: 5.0
  },
  {
    id: 'liam',
    name: 'Liam Sterling',
    role: 'Journeyman Barber',
    bio: 'Liam brings raw enthusiasm and a sharp aesthetic focus to Swagger & Blade. Trained rigorously under Marcus, his execution of the classic crop and tapered contours is pristine.',
    specialty: 'Modern Crop Cuts & Taper Fades',
    experience: '4 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0085-1920w_ec3yvu.webp',
    instagram: '@liam_sterling_cuts',
    rating: 4.7
  },
  {
    id: 'cassius',
    name: 'Cassius "Cash" Cole',
    role: 'Journeyman Barber & Shave Specialist',
    bio: 'Cassius combines street style with meticulous barbering standards. A specialist in sculpting thick, coarse, curly, and afro-textured hair, his crisp lineups and beard treatments are legendary.',
    specialty: 'Afro-Textured Coils & Razor Edge Lineups',
    experience: '5 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0049-1920w_jort38.webp',
    instagram: '@cash_cuts_co',
    rating: 4.8
  },
  {
    id: 'theo',
    name: 'Theo Henderson',
    role: 'Apprentice Barber',
    bio: 'Theo is a rising star in the Grooming industry. Graduating top of his class and currently finishing a customized residency program at Swagger & Blade, his hand is remarkably steady and his eye is keen.',
    specialty: 'Classic Scissor Cuts & Sharp Pompadours',
    experience: '2 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0117-1920w_gndzje.webp',
    instagram: '@theo_henderson_cuts',
    rating: 4.6
  },
  {
    id: 'adrian',
    name: 'Adrian Hayes',
    role: 'Apprentice Barber',
    bio: 'Passionate, hungry, and exceptionally detail-oriented. Adrian handles our classic crew cuts, low-tapers, and hot towel skin preps under live supervision, ensuring flawless high-standard trims.',
    specialty: 'Active Tapers & Traditional Hot Lather Prep',
    experience: '2 Years',
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0097-1920w_tvnecv.webp',
    instagram: '@adrian_hayes_blade',
    rating: 4.7
  }
];

export const SERVICES: Service[] = [
  {
    id: 'apprentice_cut',
    name: 'Apprentice Haircut',
    price: 40,
    duration: '45 Mins',
    description: 'A detailed haircut performed by one of our handselected residency apprentices. Includes warm lather neck shave, shampoo, and styling. Fully supervised for pristine quality.',
    category: 'cuts'
  },
  {
    id: 'journeyman_cut',
    name: 'Journeyman Haircut',
    price: 50,
    duration: '40 Mins',
    description: 'Crafted haircut for active, modern clients. Includes thorough scalp analysis, straight razor neck cleanup, soothing massage wash, and custom-styled finish.',
    category: 'cuts'
  },
  {
    id: 'craftsman_cut',
    name: 'Craftsman Haircut',
    price: 60,
    duration: '45 Mins',
    description: 'Our signature cut. Custom tailored styling by a senior Craftsman barber. Tailored to your head form, lifestyle, and facial structure. Complete with wash and hot towel neck shave.',
    category: 'cuts'
  },
  {
    id: 'savant_cut',
    name: 'Savant Haircut',
    price: 80,
    duration: '50 Mins',
    description: 'The highest tier of precision styling. Executed by our elite Savant Barbers or Founder Marcus. Includes fully-tailored structural haircut, conditioning scalp dynamic treatment, facial skin refresh, and customized styling.',
    category: 'cuts'
  },
  {
    id: 'beard_trim',
    name: 'Beard Trim',
    price: 35,
    duration: '30 Mins',
    description: 'Keep your foliage in check. Sculpture lining, volume de-bulking, premium conditioning beard oils, finished with clean straight razor defining across the cheeks and neck.',
    category: 'shaves'
  },
  {
    id: 'face_shave',
    name: 'Face Shave',
    price: 50,
    duration: '45 Mins',
    description: 'Classic straight razor shaving experience. Features multiple pre-shave essential oils, ultra-thick hot lather, double hot towels, cold stone conditioning, and calming post-shave balm.',
    category: 'shaves'
  },
  {
    id: 'bald_head_shave',
    name: 'Bald Head Shave',
    price: 50,
    duration: '45 Mins',
    description: 'Pristine straight-edge head shave. Hot towel therapy, pre-shave oils, warm dense lather, soothing massage, double razor passes, and oil-balancing hydrating face-head block.',
    category: 'shaves'
  },
  {
    id: 'shape_up',
    name: 'Shape Up & Style',
    price: 45,
    duration: '25 Mins',
    description: 'Line preservation service. Neck, sideburns, and forehead edges crisped up with straight razor detail. Complete with blowout, dry-styling prep, and premium hold pomade.',
    category: 'styling'
  },
  {
    id: 'vip_combo',
    name: 'Haircut + VIP Shave with Mask',
    price: 100,
    duration: '85 Mins',
    description: 'The ultimate gentleman’s ritual. Signature Craftsman-level haircut together with a luxurious face shaving experience, accompanied by a dynamic charcoal pore-exfoliating mud mask and refreshing under-eye recovery patch.',
    category: 'packages'
  }
];

export const LOCATIONS: LocationBranch[] = [
  {
    id: 'arts_district',
    name: 'Metropolitan Arts District',
    address: '842 Carraway Ave, Suite 102',
    city: 'Los Angeles, CA 90013',
    phone: '(213) 555-0184',
    hours: {
      weekdays: '9:00 AM — 8:00 PM',
      saturday: '8:00 AM — 7:00 PM',
      sunday: '10:00 AM — 5:00 PM'
    },
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0117-1920w_gndzje.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.908064506371!2d-118.2372554!3d34.0462529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c63c7dd5d45d%3A0x6bda6749bd0075d4!2sArts%20District%2C%20Los%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1718000000000!5m2!1sen!2sus'
  },
  {
    id: 'soho_district',
    name: 'Soho Flagship Store',
    address: '298 Mercer Street',
    city: 'New York, NY 10012',
    phone: '(212) 555-0129',
    hours: {
      weekdays: '10:00 AM — 9:00 PM',
      saturday: '9:00 AM — 8:00 PM',
      sunday: '11:00 AM — 6:00 PM'
    },
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0089-1920w_bbijwv.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.279768228945!2d-73.9984639!3d40.7259837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598e096fcf0d%3A0xcdcdbf29141f237!2sMercer%20St%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1718000000001!5m2!1sen!2sus'
  },
  {
    id: 'beverly_hills',
    name: 'Beverly Hills Atelier',
    address: '9420 Wilshire Blvd, Pavilion C',
    city: 'Beverly Hills, CA 90212',
    phone: '(310) 555-0193',
    hours: {
      weekdays: '9:00 AM — 7:00 PM',
      saturday: '8:00 AM — 6:00 PM',
      sunday: 'Closed'
    },
    image: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0127-1920w_dqnhsy.webp',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.109849502941!2d-118.3986423!3d34.0667086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bbf4efb9a671%3A0xbcc0e137691dfeb9!2s9420%20Wilshire%20Blvd%2C%20Beverly%20Hills%2C%20CA%2090212!5e0!3m2!1sen!2sus!4v1718000000002!5m2!1sen!2sus'
  }
];

export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186324/Image-1-ef321fb2-1920w_tzbaj1.webp',
    title: 'Textured Savant Scissor Cut',
    category: 'haircut',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p2',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186324/1B8DE165-4F3D-4AAF-A3FD-F5E024B82F9F-1920w_f9cq3k.webp',
    title: 'Precision Taper Profile',
    category: 'haircut',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'p3',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0035-1920w_ljaz4c.webp',
    title: 'Straight-Edge Crafting',
    category: 'shave',
    span: 'col-span-2 row-span-1'
  },
  {
    id: 'p4',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0047-1920w_fmo8ym.webp',
    title: 'Classic Side-Part Sculpt',
    category: 'styling',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p5',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0038-1920w_xds6ck.webp',
    title: 'Signature Beard Trimming',
    category: 'shave',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p6',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0085-1920w_ec3yvu.webp',
    title: 'High-Contrast Skin Fade',
    category: 'haircut',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'p7',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186325/IMG_0049-1920w_jort38.webp',
    title: 'Swagger Styling Pomade Application',
    category: 'styling',
    span: 'col-span-2 row-span-1'
  },
  {
    id: 'p8',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0117-1920w_gndzje.webp',
    title: 'Arts District Workspace',
    category: 'workspace',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p9',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186326/IMG_0097-1920w_tvnecv.webp',
    title: 'Razor Line Definition',
    category: 'shave',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p10',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0089-1920w_bbijwv.webp',
    title: 'Soho Flagship Parlour Station',
    category: 'workspace',
    span: 'col-span-2 row-span-1'
  },
  {
    id: 'p11',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0127-1920w_dqnhsy.webp',
    title: 'Custom Razor Selection',
    category: 'details',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p12',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_1183-1920w_hoelnx.webp',
    title: 'Traditional Neck Shave Shave Prep',
    category: 'shave',
    span: 'col-span-1 row-span-2'
  },
  {
    id: 'p13',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_8133-1920w_dht7w0.webp',
    title: 'Classic Pompadour Finish',
    category: 'styling',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p14',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_7889-1920w_dii8jb.webp',
    title: 'Premium Hair Balm Texture',
    category: 'details',
    span: 'col-span-2 row-span-1'
  },
  {
    id: 'p15',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_8147-1920w_e09jka.webp',
    title: 'Luxury Leather Barber Throne',
    category: 'workspace',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p16',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186327/IMG_0129-1920w_qrzkfz.webp',
    title: 'Hot Towel Therapy Ritual',
    category: 'shave',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'p17',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186328/View-recent-photos-1920w_mgv9j7.webp',
    title: 'Classic Taper Blowout',
    category: 'styling',
    span: 'col-span-2 row-span-1'
  },
  {
    id: 'p18',
    url: 'https://res.cloudinary.com/dju25z9v3/image/upload/v1781186328/Screenshot-2022-12-13-at-7.43.07-PM-1920w_ybqaen.webp',
    title: 'Luxury Grooming Artifacts',
    category: 'details',
    span: 'col-span-1 row-span-1'
  }
];

export const INSTAGRAM_PREVIEW = [
  { id: 'ig1', url: GALLERY_PHOTOS[0].url, likes: '439', comments: '28' },
  { id: 'ig2', url: GALLERY_PHOTOS[2].url, likes: '1.2k', comments: '52' },
  { id: 'ig3', url: GALLERY_PHOTOS[4].url, likes: '312', comments: '14' },
  { id: 'ig4', url: GALLERY_PHOTOS[6].url, likes: '892', comments: '44' },
  { id: 'ig5', url: GALLERY_PHOTOS[9].url, likes: '1.5k', comments: '89' },
  { id: 'ig6', url: GALLERY_PHOTOS[11].url, likes: '652', comments: '31' },
];
