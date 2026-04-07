export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  city: string;
  region: string;
  country: string;
  category: string;
  requiredParticipants: number;
  joinedParticipants: number;
  points: number;
  latitude: number;
  longitude: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  age: number;
  country: string;
  city: string;
  rating: number;
  balance: number;
  rank: string;
  totalPoints: number;
  completedEvents: number;
  avatar: string;
  status: 'active' | 'blocked';
  joinedDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedDate?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  mutualFriends: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// ----- СОБЫТИЯ (Иркутская область и Байкал) -----
export const mockEvents: Event[] = [
  {
  id: '1',
  title: 'Большая байкальская тропа: субботник',
  description: 'Уборка и обустройство экологической тропы на берегу озера Байкал. Участвуйте в сохранении природы!',
  image: '/events/Baikal trail cleanup volunteers.jpg',
  date: '2026-06-10',
  city: 'Листвянка',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Экология',
  requiredParticipants: 40,
  joinedParticipants: 28,
  points: 180,
  latitude: 51.8489,
  longitude: 104.8691,
  status: 'upcoming',
},
{
  id: '2',
  title: 'Байкальский цифровой форум',
  description: 'Конференция по IT и цифровым технологиям в Иркутске. Выступления экспертов, мастер-классы, нетворкинг.',
  image: '/events/tech conference.jpg',
  date: '2026-07-15',
  city: 'Иркутск',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Технологии',
  requiredParticipants: 150,
  joinedParticipants: 112,
  points: 300,
  latitude: 52.2864,
  longitude: 104.2807,
  status: 'upcoming',
},
{
  id: '3',
  title: 'Иркутский марафон "Байкальская миля"',
  description: 'Полумарафон и забеги на дистанции 5, 10 и 21 км по набережной Ангары.',
  image: '/events/half marathon.jpg',
  date: '2026-08-05',
  city: 'Иркутск',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Спорт',
  requiredParticipants: 300,
  joinedParticipants: 245,
  points: 250,
  latitude: 52.2864,
  longitude: 104.2807,
  status: 'upcoming',
},
{
  id: '4',
  title: 'Выставка "Байкал – живая душа"',
  description: 'Художественная выставка работ местных художников, посвящённая озеру Байкал и его обитателям.',
  image: '/events/art exhibition paintings.jpg',
  date: '2026-06-20',
  city: 'Иркутск',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Искусство',
  requiredParticipants: 80,
  joinedParticipants: 64,
  points: 120,
  latitude: 52.2864,
  longitude: 104.2807,
  status: 'upcoming',
},
{
  id: '5',
  title: 'Байкальский музыкальный фестиваль',
  description: 'Двухдневный опен-эйр на берегу Байкала с участием рок, фолк и электронных групп.',
  image: '/events/outdoor music festival.jpg',
  date: '2026-07-25',
  city: 'Большое Голоустное',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Музыка',
  requiredParticipants: 800,
  joinedParticipants: 612,
  points: 500,
  latitude: 52.0537,
  longitude: 105.4042,
  status: 'upcoming',
},
{
  id: '6',
  title: 'Нетворкинг для предпринимателей Прибайкалья',
  description: 'Встреча бизнес-сообщества Иркутской области: обмен опытом, поиск партнёров и инвесторов.',
  image: '/events/business networking event.jpg',
  date: '2026-06-28',
  city: 'Ангарск',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Бизнес',
  requiredParticipants: 60,
  joinedParticipants: 48,
  points: 150,
  latitude: 52.5448,
  longitude: 103.8885,
  status: 'upcoming',
},
{
  id: '7',
  title: 'Гастрофест "Вкус Байкала"',
  description: 'Дегустация блюд сибирской и бурятской кухни, мастер-классы от шеф-поваров, ярмарка местных продуктов.',
  image: '/events/food festival.jpg',
  date: '2026-08-15',
  city: 'Шелехов',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Еда',
  requiredParticipants: 120,
  joinedParticipants: 97,
  points: 200,
  latitude: 52.2064,
  longitude: 104.0974,
  status: 'upcoming',
},
{
  id: '8',
  title: 'Благотворительный забег "Дети Байкала"',
  description: 'Сбор средств на поддержку детских домов Иркутской области. Участвуйте всей семьёй!',
  image: '/events/fundraising run children.jpg',
  date: '2026-07-03',
  city: 'Иркутск',
  region: 'Иркутская область',
  country: 'Россия',
  category: 'Благотворительность',
  requiredParticipants: 200,
  joinedParticipants: 154,
  points: 220,
  latitude: 52.2864,
  longitude: 104.2807,
  status: 'upcoming',
}
];

// ----- ПОЛЬЗОВАТЕЛИ (русские имена, локации Иркутской области) -----
export const mockUsers: User[] = [
  {
  id: '1',
  fullName: 'Иван Смирнов',
  username: 'ivan.smirnov',
  email: 'ivan@example.com',
  age: 28,
  country: 'Россия',
  city: 'Иркутск',
  rating: 4.8,
  balance: 1250,
  rank: 'Gold',
  totalPoints: 3600,
  completedEvents: 24,
  avatar: '/images/photo_3.jpg',
  status: 'active',
  joinedDate: '2025-01-15',
},
{
  id: '2',
  fullName: 'Анна Кузнецова',
  username: 'anna.kuznetsova',
  email: 'anna@example.com',
  age: 32,
  country: 'Россия',
  city: 'Ангарск',
  rating: 4.9,
  balance: 2100,
  rank: 'Platinum',
  totalPoints: 5200,
  completedEvents: 38,
  avatar: '/images/photo_1.jpg',
  status: 'active',
  joinedDate: '2024-08-20',
},
{
  id: '3',
  fullName: 'Михаил Иванов',
  username: 'mikhail.ivanov',
  email: 'mikhail@example.com',
  age: 25,
  country: 'Россия',
  city: 'Иркутск',
  rating: 4.5,
  balance: 850,
  rank: 'Silver',
  totalPoints: 1800,
  completedEvents: 12,
  avatar: '/images/photo_4.jpg',
  status: 'active',
  joinedDate: '2025-11-10',
},
{
  id: '4',
  fullName: 'Елена Петрова',
  username: 'elena.petrova',
  email: 'elena@example.com',
  age: 29,
  country: 'Россия',
  city: 'Шелехов',
  rating: 4.7,
  balance: 1450,
  rank: 'Gold',
  totalPoints: 3100,
  completedEvents: 21,
  avatar: '/images/photo_2.jpg',
  status: 'active',
  joinedDate: '2025-03-05',
},
{
  id: '5',
  fullName: 'Дмитрий Соколов',
  username: 'dmitry.sokolov',
  email: 'dmitry@example.com',
  age: 35,
  country: 'Россия',
  city: 'Листвянка',
  rating: 3.8,
  balance: 320,
  rank: 'Bronze',
  totalPoints: 850,
  completedEvents: 6,
  avatar: '/images/photo_5.jpg',
  status: 'blocked',
  joinedDate: '2025-12-01',
},

{
  id: '6',
  fullName: 'Ольга Новикова',
  username: 'olga.novikova',
  email: 'olga@example.com',
  age: 27,
  country: 'Россия',
  city: 'Иркутск',
  rating: 4.6,
  balance: 980,
  rank: 'Silver',
  totalPoints: 2100,
  completedEvents: 15,
  avatar: '/images/photo_6.jpg',
  status: 'active',
  joinedDate: '2025-06-20',
},
{
  id: '7',
  fullName: 'Павел Морозов',
  username: 'pavel.morozov',
  email: 'pavel@example.com',
  age: 31,
  country: 'Россия',
  city: 'Ангарск',
  rating: 4.4,
  balance: 740,
  rank: 'Bronze',
  totalPoints: 1200,
  completedEvents: 9,
  avatar: '/images/photo_7.jpg',
  status: 'active',
  joinedDate: '2025-08-14',
},
{
  id: '9',
  fullName: 'Андрей Козлов',
  username: 'andrey.kozlov',
  email: 'andrey@example.com',
  age: 33,
  country: 'Россия',
  city: 'Листвянка',
  rating: 4.2,
  balance: 560,
  rank: 'Bronze',
  totalPoints: 950,
  completedEvents: 7,
  avatar: '/images/photo_8.jpg',
  status: 'active',
  joinedDate: '2025-09-22',
},
{
  id: '10',
  fullName: 'Мария Соколова',
  username: 'maria.sokolova',
  email: 'maria@example.com',
  age: 24,
  country: 'Россия',
  city: 'Иркутск',
  rating: 4.7,
  balance: 1100,
  rank: 'Silver',
  totalPoints: 2700,
  completedEvents: 18,
  avatar: '/images/photo_10.jpg',
  status: 'active',
  joinedDate: '2025-07-30',
},
{
  id: '11',
  fullName: 'Николай Петров',
  username: 'nikolay.petrov',
  email: 'nikolay@example.com',
  age: 29,
  country: 'Россия',
  city: 'Байкальск',
  rating: 4.3,
  balance: 620,
  rank: 'Bronze',
  totalPoints: 1300,
  completedEvents: 10,
  avatar: '/images/photo_9.jpg',
  status: 'blocked',
  joinedDate: '2025-10-10',
},
{
  id: '12',
  fullName: 'Екатерина Васильева',
  username: 'ekaterina.vasilyeva',
  email: 'ekaterina@example.com',
  age: 30,
  country: 'Россия',
  city: 'Ангарск',
  rating: 4.8,
  balance: 1650,
  rank: 'Gold',
  totalPoints: 3900,
  completedEvents: 26,
  avatar: '/images/photo_11.jpg',
  status: 'active',
  joinedDate: '2025-02-18',
},
{
  id: '13',
  fullName: 'Сергей Михайлов',
  username: 'sergey.mikhailov',
  email: 'sergey@example.com',
  age: 34,
  country: 'Россия',
  city: 'Слюдянка',
  rating: 4.1,
  balance: 480,
  rank: 'Bronze',
  totalPoints: 780,
  completedEvents: 5,
  avatar: '/images/photo_13.jpg',
  status: 'active',
  joinedDate: '2025-12-20',
},
{
  id: '14',
  fullName: 'Александра Фёдорова',
  username: 'aleksandra.fedorova',
  email: 'aleksandra@example.com',
  age: 26,
  country: 'Россия',
  city: 'Иркутск',
  rating: 4.9,
  balance: 2300,
  rank: 'Platinum',
  totalPoints: 5800,
  completedEvents: 42,
  avatar: '/images/photo_14.jpg',
  status: 'active',
  joinedDate: '2024-06-12',
},
{
  id: '15',
  fullName: 'Владимир Егоров',
  username: 'vladimir.egorov',
  email: 'vladimir@example.com',
  age: 37,
  country: 'Россия',
  city: 'Усолье-Сибирское',
  rating: 3.9,
  balance: 410,
  rank: 'Bronze',
  totalPoints: 680,
  completedEvents: 4,
  avatar: '/images/photo_15.jpg',
  status: 'blocked',
  joinedDate: '2026-01-05',
},
];

// ----- ДОСТИЖЕНИЯ (локализованы) -----
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Первые шаги',
    description: 'Завершите первое событие',
    icon: 'trophy',
    points: 50,
    unlockedDate: '2025-02-10',
  },
  {
    id: '2',
    title: 'Байкальский активист',
    description: 'Примите участие в 10 событиях на Байкале',
    icon: 'users',
    points: 150,
    unlockedDate: '2025-05-20',
  },
  {
    id: '3',
    title: 'Марафонец',
    description: 'Завершите 5 спортивных событий',
    icon: 'medal',
    points: 200,
    unlockedDate: '2025-09-15',
  },
  {
    id: '4',
    title: 'IT-энтузиаст',
    description: 'Посетите 3 технологических события',
    icon: 'cpu',
    points: 120,
  },
  {
    id: '5',
    title: 'Филантроп',
    description: 'Участвуйте в 5 благотворительных мероприятиях',
    icon: 'heart',
    points: 250,
  },
  {
    id: '6',
    title: 'Восходящая звезда',
    description: 'Достигните золотого ранга',
    icon: 'star',
    points: 300,
    unlockedDate: '2025-11-03',
  },
];

// ----- ДРУЗЬЯ (русские имена) -----
export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Алексей Орлов',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop',
    status: 'online',
    mutualFriends: 8,
  },
  {
    id: '2',
    name: 'Юлия Ким',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    status: 'online',
    mutualFriends: 12,
  },
  {
    id: '3',
    name: 'Сергей Морозов',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    status: 'offline',
    mutualFriends: 5,
  },
  {
    id: '4',
    name: 'Татьяна Григорьева',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    status: 'online',
    mutualFriends: 15,
  },
];

// ----- СООБЩЕНИЯ (локализованы) -----
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Анна Кузнецова',
    content: 'Привет! Ты планируешь участвовать в субботнике на Байкале на следующей неделе?',
    timestamp: '2026-04-03T10:30:00',
    read: false,
  },
  {
    id: '2',
    senderId: '3',
    senderName: 'Михаил Иванов',
    content: 'Было здорово познакомиться на ИТ-форуме! Давай как-нибудь обсудим совместные проекты.',
    timestamp: '2026-04-02T15:45:00',
    read: true,
  },
  {
    id: '3',
    senderId: '4',
    senderName: 'Елена Петрова',
    content: 'Спасибо за рекомендацию фестиваля! Очень понравилось.',
    timestamp: '2026-04-01T09:20:00',
    read: true,
  },
];

// ----- ВСПОМОГАТЕЛЬНЫЕ ДАННЫЕ (страны, регионы, города, категории) -----
export const countries = [
  'Россия',
  'Беларусь',
  'Казахстан',
  'Украина',
  'Узбекистан',
  'Армения',
  'Грузия',
  'Азербайджан',
  'Кыргызстан',
  'Таджикистан',
];

export const regions = [
  'Иркутская область',
  'Московская область',
  'Ленинградская область',
  'Краснодарский край',
  'Свердловская область',
  'Республика Татарстан',
  'Новосибирская область',
  'Красноярский край',
  'Приморский край',
];

export const cities = [
  'Иркутск',
  'Ангарск',
  'Шелехов',
  'Листвянка',
  'Большое Голоустное',
  'Слюдянка',
  'Байкальск',
  'Усолье-Сибирское',
  'Черемхово',
  'Тулун',
];

export const categories = [
  'Экология',
  'Технологии',
  'Спорт',
  'Искусство',
  'Музыка',
  'Бизнес',
  'Еда',
  'Благотворительность',
];