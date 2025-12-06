// images
import {GLOBAL_ICON, GLOBAL_IMAGES} from '../assets/images/global-images';

const ALL_SERVICES = [
  {
    label: 'All',
    value: 'All',
    isSelected: false,
  },
  {
    label: 'Homelessness',
    value: 'Homelessness',
    isSelected: false,
  },
  {
    label: 'Financial Assistance',
    value: 'Financial Assistance',
    isSelected: false,
  },
  {
    label: 'Emergency Services',
    value: 'Emergency Services',
    isSelected: false,
  },
  {
    label: 'Community Resources',
    value: 'Community Resources',
    isSelected: false,
  },
  {
    label: 'Partners',
    value: 'Partners',
    isSelected: false,
  },
];

const ALL_LANGUAGE = [
  {
    label: 'English',
    value: 'en',
    isSelected: true,
  },
  {
    label: 'Spanish',
    value: 'es',
    isSelected: false,
  },
  {
    label: 'Creole',
    value: 'cr',
    isSelected: false,
  },
];

let LISTING_WEB = [
  {
    title: 'Harry Chapin Mobile Food Pantry',
    btnTitle: 'VISIT TO WEBSITE',
    icon: GLOBAL_ICON.globe,
    link: 'https://communitycooperative.com/',
  },
  {
    title: 'Community Cooperative Mobile Food Pantry',
    btnTitle: 'VISIT TO WEBSITE',
    icon: GLOBAL_ICON.globe,
    link: 'https://communitycooperative.com/',
  },
  {
    title: 'St. Matthews House',
    btnTitle: 'VISIT TO WEBSITE',
    icon: GLOBAL_ICON.globe,
    link: 'https://communitycooperative.com/',
  },
];

let LISTING_MAP = [
  {
    title: 'Alva United Methodist Pantry',
    miles: '2 mi',
    cover: 'https://picsum.photos/700',
    address: '2231 McGregor Blvd., Ft. Myers 33901',
    information:
      '1st and 3rd Wed 9:00 am – noon – require proof of Alva residency',
    call: '(239) 283-5123',
  },
  {
    title: 'First Assembly of God',
    miles: '3 mi',
    cover: 'https://picsum.photos/700',
    address: '4701 Summerlin Road., Fort Myers FL 33919',
    information:
      'Food bank for food boxes on Tuesdays, Wednesdays, and Fridays 9:00 a.m. – Noon',
    call: '(239) 283-5124',
  },
  {
    title: 'Broadway Community Church',
    miles: '4 mi',
    cover: 'https://picsum.photos/700',
    address: '3309 S. Broadway Ave., Fort Myers 33901',
    information: 'Tuesday 9:30-Noon, 1st and 3rd Wednesday 9:30-Noon',
    call: '(239) 283-5124',
  },
];

const SERVICES = [
  {
    title: 'Homelessness',
    icon: GLOBAL_ICON.homeLess,
    isActive: true,
    service: [
      {
        icon: GLOBAL_ICON.shelter,
        title: 'Shelters',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.outreachLocation,
        title: 'Outreach Locations',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.weather,
        title: 'Severe Weather Outreach',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.foodPantries,
        title: 'Food Pantries',
        type: 'map',
        data: LISTING_MAP,
      },
      {
        icon: GLOBAL_ICON.mobilePantries,
        title: 'Mobile Pantries',
        type: 'web',
        data: LISTING_WEB,
      },
    ],
  },
  {
    title: 'Financial Assistance',
    icon: GLOBAL_ICON.finanacial,
    isActive: true,
    service: [
      {
        icon: GLOBAL_ICON.rental,
        title: 'Rental',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.homeRepair,
        title: 'Home Repair Assistance',
        type: 'map',
        data: LISTING_MAP,
      },
      {
        icon: GLOBAL_ICON.bills,
        title: 'Bills',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.downPayment,
        title: 'Down Payment Assistance',
        type: 'map',
        data: LISTING_MAP,
      },
      {
        icon: GLOBAL_ICON.veteran,
        title: 'Veteran Services',
        type: 'map',
        data: LISTING_MAP,
      },
      {
        icon: GLOBAL_ICON.creamation,
        title: 'Cremation Services',
        type: 'web',
        data: LISTING_WEB,
      },
    ],
  },
  {
    title: 'Emergency Services',
    icon: GLOBAL_ICON.emergancy,
    isActive: true,
    service: [
      {
        icon: GLOBAL_ICON.ambulance,
        title: 'Ambulance',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.police,
        title: 'Sheriff / Police',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.firedep,
        title: 'Fire Departments',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.publicSafety,
        title: 'Public Safety',
        type: 'map',
        data: LISTING_MAP,
      },
      {
        icon: GLOBAL_ICON.suicide,
        title: 'Suicide Prevention',
        type: 'web',
        data: LISTING_WEB,
      },
    ],
  },
  {
    title: 'Community Resources',
    icon: GLOBAL_ICON.community,
    isActive: true,
    service: [
      {
        icon: GLOBAL_ICON.foodResources,
        title: 'Food Resources',
        type: 'web',
        data: LISTING_WEB,
      },
    ],
  },
  {
    title: 'Partners',
    icon: GLOBAL_ICON.partners,
    isActive: true,
    service: [
      {
        icon: GLOBAL_ICON.funding,
        title: 'Funding Opportunities',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.meeting,
        title: 'Meetings',
        type: 'web',
        data: LISTING_WEB,
      },
      {
        icon: GLOBAL_ICON.training,
        title: 'Training',
        type: 'map',
        data: LISTING_MAP,
      },
      {
        icon: GLOBAL_ICON.boyReading,
        title: 'Learn More',
        type: 'web',
        data: LISTING_WEB,
      },
    ],
  },
];

const EVENTS = [
  {
    title: 'Lorem Ipsum is simply dummy text',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
  {
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
  {
    title: 'Lorem Ipsum is simply dummy text',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
];

const BANNER = [
  {
    description: 'Lorem Ipsum is simply dummy text of the printing.',
    image: GLOBAL_IMAGES.banner1,
    link: '',
  },
  {
    description: 'Lorem Ipsum is simply dummy text of the printing.',
    image: GLOBAL_IMAGES.banner1,
    link: '',
  },
  {
    description: 'Lorem Ipsum is simply dummy text of the printing.',
    image: GLOBAL_IMAGES.banner1,
    link: '',
  },
];
const MOBILE_PANTRIES = [
  {
    title: 'Harry Chapin Mobile Food Pantry',
    btnTitle: 'VISIT TO WEBSITE',
    icon: GLOBAL_ICON.globe,
    link: 'https://communitycooperative.com/',
  },
  {
    title: 'Community Cooperative Mobile Food Pantry',
    btnTitle: 'VISIT TO WEBSITE',
    icon: GLOBAL_ICON.globe,
    link: 'https://communitycooperative.com/',
  },
  {
    title: 'St. Matthews House',
    btnTitle: 'VISIT TO WEBSITE',
    icon: GLOBAL_ICON.globe,
    link: 'https://communitycooperative.com/',
  },
];
const LISTING = [
  {
    title: 'Alva United Methodist Pantry',
    miles: '2 mi',
    cover: 'https://picsum.photos/700',
    address: '2231 McGregor Blvd., Ft. Myers 33901',
    information:
      '1st and 3rd Wed 9:00 am – noon – require proof of Alva residency',
    call: '(239) 283-5123',
  },
  {
    title: 'First Assembly of God',
    miles: '3 mi',
    cover: 'https://picsum.photos/700',
    address: '4701 Summerlin Road., Fort Myers FL 33919',
    information:
      'Food bank for food boxes on Tuesdays, Wednesdays, and Fridays 9:00 a.m. – Noon',
    call: '(239) 283-5123',
  },
  {
    title: 'Broadway Community Church',
    miles: '4 mi',
    cover: 'https://picsum.photos/700',
    address: '3309 S. Broadway Ave., Fort Myers 33901',
    information: 'Tuesday 9:30-Noon, 1st and 3rd Wednesday 9:30-Noon',
    call: '(239) 283-5123',
  },
];
const NOTIFICATION = [
  {
    title: 'Lorem Ipsum is simply dummy text',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isRead: false,
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
  {
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isRead: false,
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
  {
    title: 'Lorem Ipsum is simply dummy text',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isRead: true,
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
  {
    title: 'Lorem Ipsum is simply dummy text',
    date: 'April 15, 2022',
    time: '10 am - 12:30 pm',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    isRead: true,
    longDescription: [
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
    ],
  },
];

const ADS_BANNER = {
  title: 'Lee County Transit Mobile App',
  description: 'Purchase bus fare & plan trips',
  btnText: 'DOWNLOAD NOW',
  link: {
    ios: 'https://apps.apple.com/us/app/lee-county-transit-mobile-app/id1534358012',
    android:
      'https://play.google.com/store/apps/details?id=com.genfare.mobile2.ltran',
  },
};

export {
  ALL_SERVICES,
  ALL_LANGUAGE,
  SERVICES,
  EVENTS,
  BANNER,
  MOBILE_PANTRIES,
  LISTING,
  NOTIFICATION,
  ADS_BANNER,
};
