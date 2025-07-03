export interface GlobalUser {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Support' | 'Commercial';
  avatar?: string;
  lastLogin: string;
  status: 'active' | 'inactive' | 'suspended';
  permissions: string[];
  tenantAccess: string[];
}

export const mockUsers: GlobalUser[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'j.dupont@nschool.com',
    role: 'Super Admin',
    avatar: '/images/shawn.jpeg',
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Il y a 2h
    status: 'active',
    permissions: [
      'Gestion complète des tenants',
      'Configuration système',
      'Gestion des utilisateurs',
      'Accès aux métriques avancées',
      'Modification des permissions',
      'Suppression de données'
    ],
    tenantAccess: ['École A', 'École B', 'École C', 'École D', 'École E']
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'm.martin@nschool.com',
    role: 'Support',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Il y a 1j
    status: 'active',
    permissions: [
      'Voir tous les tenants',
      'Modifier les tenants',
      'Assistance client',
      'Accès aux logs',
      'Gestion des tickets'
    ],
    tenantAccess: ['École A', 'École B', 'École C']
  },
  {
    id: 3,
    name: 'Pierre Durand',
    email: 'p.durand@nschool.com',
    role: 'Commercial',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // Il y a 3h
    status: 'active',
    permissions: [
      'Gestion des abonnements',
      'Création de codes promo',
      'Accès aux métriques',
      'Gestion des paiements',
      'Rapports commerciaux'
    ],
    tenantAccess: ['École A', 'École B', 'École C', 'École D']
  },
  {
    id: 4,
    name: 'Sophie Bernard',
    email: 's.bernard@nschool.com',
    role: 'Support',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // Il y a 12h
    status: 'inactive',
    permissions: [
      'Voir tous les tenants',
      'Modifier les tenants',
      'Assistance client'
    ],
    tenantAccess: ['École A', 'École B']
  },
  {
    id: 5,
    name: 'Lucas Moreau',
    email: 'l.moreau@nschool.com',
    role: 'Commercial',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // Il y a 6h
    status: 'suspended',
    permissions: [
      'Gestion des abonnements',
      'Accès aux métriques'
    ],
    tenantAccess: ['École A']
  },
  {
    id: 6,
    name: 'Emma Roux',
    email: 'e.roux@nschool.com',
    role: 'Support',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Il y a 1h
    status: 'active',
    permissions: [
      'Voir tous les tenants',
      'Modifier les tenants',
      'Assistance client',
      'Accès aux logs'
    ],
    tenantAccess: ['École A', 'École B', 'École C', 'École D']
  },
  {
    id: 7,
    name: 'Thomas Leroy',
    email: 't.leroy@nschool.com',
    role: 'Super Admin',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // Il y a 30min
    status: 'active',
    permissions: [
      'Gestion complète des tenants',
      'Configuration système',
      'Gestion des utilisateurs',
      'Accès aux métriques avancées',
      'Modification des permissions'
    ],
    tenantAccess: ['École A', 'École B', 'École C', 'École D', 'École E', 'École F']
  },
  {
    id: 8,
    name: 'Julie Petit',
    email: 'j.petit@nschool.com',
    role: 'Commercial',
    avatar: undefined,
    lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // Il y a 4h
    status: 'active',
    permissions: [
      'Gestion des abonnements',
      'Création de codes promo',
      'Accès aux métriques',
      'Gestion des paiements'
    ],
    tenantAccess: ['École A', 'École B', 'École C']
  }
]; 
