export interface TeamMember {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  github?: string;
  image?: string;
  public: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Shehani Mukadange',
    role: 'Event Lead',
    email: 'shehanikav@gmail.com',
    phone: '742885971',
    github: '@shehanikav',
    image: '',
    public: true,
  },
  {
    name: 'Mahdi Hannan',
    role: 'Program Coordinator',
    email: 'hannanmahdi009@gmail.com',
    phone: '773927351',
    github: '@hannanmahdi',
    image: '',
    public: true,
  },
  {
    name: 'Vinuki Gunesekara',
    role: 'Coordinator',
    email: '',
    phone: '',
    github: '',
    image: '',
    public: false,
  },
  {
    name: 'Vinuli Ranasinghe',
    role: 'Lead',
    email: '',
    phone: '',
    github: '',
    image: '',
    public: false,
  },
  {
    name: 'Mirco Fernando',
    role: 'Technical Coordinator',
    email: '',
    phone: '',
    github: '',
    image: '',
    public: false,
  },
  {
    name: 'Moksha Sandavirage',
    role: 'Technical Coordinator',
    email: '',
    phone: '',
    github: '',
    image: '',
    public: false,
  },
  {
    name: 'Ovin Perera',
    role: 'Design Coordinator',
    email: '',
    phone: '',
    github: '',
    image: '',
    public: false,
  },
  {
    name: 'Eeshal Ali',
    role: 'Design Coordinator',
    email: '',
    phone: '',
    github: '',
    image: '',
    public: false,
  },
];
