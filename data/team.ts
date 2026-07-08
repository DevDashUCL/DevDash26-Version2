export interface TeamMember {
  name: string;
  role: string;
  email?: string;
  phone?: string;
  public: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Shehani Mukadange',
    role: 'Event Lead / Marketing Communicator',
    email: 'shehanikav@gmail.com',
    phone: '742885971',
    public: true,
  },
  {
    name: 'Mahdi Hannan',
    role: 'Program Coordinator / Secretary',
    email: 'hannanmahdi009@gmail.com',
    phone: '773927351',
    public: true,
  },
  {
    name: 'Vinuki Gunesekara',
    role: 'Judging & Evaluation Coordinator / Budget Manager',
    public: false,
  },
  {
    name: 'Vinuli Ranasinghe',
    role: 'Logistics & Communication Lead',
    public: false,
  },
  {
    name: 'Mirco Fernando',
    role: 'Technical Coordinator',
    public: false,
  },
  {
    name: 'Moksha Sandavirage',
    role: 'Technical Coordinator',
    public: false,
  },
  {
    name: 'Ovin Perera',
    role: 'Design Coordinator',
    public: false,
  },
  {
    name: 'Eeshal Ali',
    role: 'Design Coordinator',
    public: false,
  },
];
