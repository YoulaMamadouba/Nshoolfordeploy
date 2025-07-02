'use client';
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { PencilIcon, TrashIcon, BeakerIcon, MagnifyingGlassIcon, ChevronDownIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface Domain {
  id: number;
  name: string;
  tenant: string;
  type: string;
  status: string;
  ssl: string;
  createdAt: string;
}

interface DomainListProps {
  domains?: Domain[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, duration: 0.5 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 15, delay: i * 0.1 },
  }),
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, backgroundColor: '#f57c00', color: 'white' },
  tap: { scale: 0.9 },
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const badgeVariants: Variants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 15, duration: 0.3 },
  },
};

const optionVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 15, delay: i * 0.05 },
  }),
};

const ITEMS_PER_PAGE = 10;

const filterOptions = {
  status: [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'Actif', label: 'Actif' },
    { value: 'Inactif', label: 'Inactif' },
  ],
  type: [
    { value: 'all', label: 'Tous les types' },
    { value: 'Principal', label: 'Principal' },
    { value: 'Secondaire', label: 'Secondaire' },
  ],
  ssl: [
    { value: 'all', label: 'Tous les SSL' },
    { value: 'Valide', label: 'Valide' },
    { value: 'Expiré', label: 'Expiré' },
    { value: 'En attente', label: 'En attente' },
  ],
  date: [
    { value: 'all', label: 'Toutes les dates' },
    { value: 'last7days', label: 'Derniers 7 jours' },
    { value: 'last30days', label: 'Derniers 30 jours' },
    { value: 'last90days', label: 'Derniers 90 jours' },
  ],
};

const mockDomains: Domain[] = [
  { id: 1, name: 'lycee-vhugo.nschool.fr', tenant: 'Lycée V.Hugo', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-01' },
  { id: 2, name: 'www.lycee-vhugo.edu', tenant: 'Lycée V.Hugo', type: 'Secondaire', status: 'Actif', ssl: 'Valide', createdAt: '2025-05-15' },
  { id: 3, name: 'college-pasteur.nschool.fr', tenant: 'Collège Pasteur', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-05-20' },
  { id: 4, name: 'www.college-pasteur.edu', tenant: 'Collège Pasteur', type: 'Secondaire', status: 'Inactif', ssl: 'Expiré', createdAt: '2025-04-10' },
  { id: 5, name: 'ecole-lamartine.nschool.fr', tenant: 'École Lamartine', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-25' },
  { id: 6, name: 'sub.ecole-lamartine.fr', tenant: 'École Lamartine', type: 'Secondaire', status: 'Actif', ssl: 'En attente', createdAt: '2025-06-20' },
  { id: 7, name: 'lycee-jeannedarc.nschool.fr', tenant: 'Lycée Jeanne d’Arc', type: 'Principal', status: 'Inactif', ssl: 'Expiré', createdAt: '2025-03-15' },
  { id: 8, name: 'www.jeannedarc.edu', tenant: 'Lycée Jeanne d’Arc', type: 'Secondaire', status: 'Actif', ssl: 'Valide', createdAt: '2025-04-01' },
  { id: 9, name: 'college-voltaire.nschool.fr', tenant: 'Collège Voltaire', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-10' },
  { id: 10, name: 'sub.voltaire.fr', tenant: 'Collège Voltaire', type: 'Secondaire', status: 'Inactif', ssl: 'Expiré', createdAt: '2025-05-05' },
  { id: 11, name: 'ecole-moliere.nschool.fr', tenant: 'École Molière', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-15' },
  { id: 12, name: 'www.moliere.edu', tenant: 'École Molière', type: 'Secondaire', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-01' },
  { id: 13, name: 'lycee-rabelais.nschool.fr', tenant: 'Lycée Rabelais', type: 'Principal', status: 'Inactif', ssl: 'Expiré', createdAt: '2025-02-20' },
  { id: 14, name: 'sub.rabelais.fr', tenant: 'Lycée Rabelais', type: 'Secondaire', status: 'Actif', ssl: 'Valide', createdAt: '2025-05-25' },
  { id: 15, name: 'college-hugo.nschool.fr', tenant: 'Collège Hugo', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-05' },
  { id: 16, name: 'www.college-hugo.edu', tenant: 'Collège Hugo', type: 'Secondaire', status: 'Actif', ssl: 'En attente', createdAt: '2025-05-30' },
  { id: 17, name: 'ecole-balzac.nschool.fr', tenant: 'École Balzac', type: 'Principal', status: 'Inactif', ssl: 'Expiré', createdAt: '2025-03-01' },
  { id: 18, name: 'sub.balzac.fr', tenant: 'École Balzac', type: 'Secondaire', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-20' },
  { id: 19, name: 'lycee-lafontaine.nschool.fr', tenant: 'Lycée La Fontaine', type: 'Principal', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-12' },
  { id: 20, name: 'www.lafontaine.edu', tenant: 'Lycée La Fontaine', type: 'Secondaire', status: 'Actif', ssl: 'Valide', createdAt: '2025-06-18' },
];

const DomainList: React.FC<DomainListProps> = ({ domains = mockDomains }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    ssl: 'all',
    date: 'all',
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState({ status: false, type: false, ssl: false, date: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDomains, setCurrentDomains] = useState<Domain[]>(mockDomains);

  // Initialisation au chargement pour garantir l'affichage des 20 domaines
  useEffect(() => {
    setSearchTerm('');
    setFilters({ status: 'all', type: 'all', ssl: 'all', date: 'all' });
    setCurrentDomains(mockDomains);
    console.log('Initialisation :', { searchTerm, filters, currentDomains: mockDomains });
  }, []);

  // Mise à jour si la prop domains change
  useEffect(() => {
    if (domains && domains.length > 0 && domains !== mockDomains) {
      console.log('Props domains:', domains);
      setCurrentDomains(domains);
    }
  }, [domains]);

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
    setIsDropdownOpen((prev) => ({ ...prev, [filterName]: false }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'all', type: 'all', ssl: 'all', date: 'all' });
    setCurrentPage(1);
    setCurrentDomains(mockDomains);
    console.log('Filtres réinitialisés :', { searchTerm: '', filters, currentDomains: mockDomains });
  };

  const handleDownloadCSV = () => {
    const headers = ['ID', 'Domaine', 'Tenant', 'Type', 'Statut', 'SSL', 'Date de création'];
    const rows = filteredDomains.map((domain) => [
      domain.id,
      domain.name,
      domain.tenant,
      domain.type,
      domain.status,
      domain.ssl,
      new Date(domain.createdAt).toLocaleDateString('fr-FR'),
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'domains.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDelete = (id: number) => {
    setCurrentDomains(currentDomains.filter((domain) => domain.id !== id));
    console.log('Domaine supprimé ID :', id);
  };

  const handleTest = (id: number) => {
    console.log(`Test du domaine ID : ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Modification du domaine ID : ${id}`);
  };

  const filteredDomains = currentDomains.filter((domain) => {
    const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase()) || domain.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || domain.status === filters.status;
    const matchesType = filters.type === 'all' || domain.type === filters.type;
    const matchesSsl = filters.ssl === 'all' || domain.ssl === filters.ssl;
    const matchesDate = filters.date === 'all' || (() => {
      const createdDate = new Date(domain.createdAt);
      const today = new Date('2025-07-01'); // Date fixe pour cohérence
      if (filters.date === 'last7days') {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        return createdDate >= sevenDaysAgo && createdDate <= today;
      } else if (filters.date === 'last30days') {
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return createdDate >= thirtyDaysAgo && createdDate <= today;
      } else if (filters.date === 'last90days') {
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(today.getDate() - 90);
        return createdDate >= ninetyDaysAgo && createdDate <= today;
      }
      return true;
    })();
    return matchesSearch && matchesStatus && matchesType && matchesSsl && matchesDate;
  });

  console.log('Domaines filtrés :', filteredDomains.length, filteredDomains); // Débogage : Vérifier les domaines filtrés
  const totalPages = Math.max(1, Math.ceil(filteredDomains.length / ITEMS_PER_PAGE));
  console.log('Total pages :', totalPages); // Débogage : Vérifier le nombre de pages
  const paginatedDomains = filteredDomains.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  console.log('Domaines paginés :', paginatedDomains.length, paginatedDomains); // Débogage : Vérifier les domaines paginés

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      case 'Inactif': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  const getSslColor = (ssl: string) => {
    switch (ssl) {
      case 'Valide': return { bg: 'bg-green-100 bg-opacity-80', text: 'text-green-800' };
      case 'Expiré': return { bg: 'bg-red-100 bg-opacity-80', text: 'text-red-800' };
      case 'En attente': return { bg: 'bg-yellow-100 bg-opacity-80', text: 'text-yellow-800' };
      default: return { bg: 'bg-gray-100 bg-opacity-80', text: 'text-gray-800' };
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="relative bg-gradient-to-br from-white/90 to-gray-50/80 rounded-2xl p-4 shadow-sm border border-[#f57c00]/30 backdrop-blur-sm overflow-visible"
    >
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        className="text-lg font-bold text-[#2b4a6a] text-center mb-4 tracking-tight"
        style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
      >
        Liste des Domaines
      </motion.h3>
      <div className="relative mb-4">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[#f57c00]/50 to-transparent" />
      </div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
        className="flex flex-col sm:flex-row gap-4 mb-6 items-center"
      >
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par domaine ou tenant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 focus:border-[#f57c00] transition-all duration-300"
          />
        </div>
        {(['status', 'type', 'ssl', 'date'] as const).map((filterName) => (
          <div className="relative" key={filterName}>
            <motion.button
              className="w-full text-sm text-[#2b4a6a] bg-gradient-to-r from-white/70 to-[#f57c00]/10 border border-[#f57c00]/50 rounded-lg p-2.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#f57c00]/50 transition-all appearance-none cursor-pointer flex justify-between items-center"
              onClick={() => setIsDropdownOpen((prev) => ({ ...prev, [filterName]: !prev[filterName] }))}
            >
              <span>{filterOptions[filterName].find((opt) => opt.value === filters[filterName])?.label}</span>
              <motion.div
                animate={{ scale: isDropdownOpen[filterName] ? 0.8 : 1, rotate: isDropdownOpen[filterName] ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-[#f57c00]" />
              </motion.div>
            </motion.button>
            {isDropdownOpen[filterName] && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-full left-0 w-full mt-2 bg-gradient-to-br from-white to-[#f5f7fa] border border-[#f57c00]/30 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                {filterOptions[filterName].map((option, index) => (
                  <motion.div
                    key={option.value}
                    variants={optionVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    className={`px-4 py-2.5 text-sm text-[#2b4a6a] hover:bg-[#f57c00]/10 cursor-pointer transition-all duration-300 font-medium ${
                      filters[filterName] === option.value ? 'bg-[#f57c00]/20 text-[#f57c00]' : ''
                    } border-b border-[#f57c00]/10 last:border-b-0 flex items-center gap-2`}
                    onClick={() => handleFilterChange(filterName, option.value)}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#f57c00]/50" />
                    {option.label}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleResetFilters}
            className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 hover:bg-[#f57c00] hover:text-white transition-all duration-300"
            title="Réinitialiser les filtres"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleDownloadCSV}
            className="p-2 bg-[#f57c00]/10 text-[#f57c00] rounded-full border border-[#f57c00]/50 hover:bg-[#f57c00] hover:text-white transition-all duration-300"
            title="Télécharger la liste (CSV)"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gradient-to-r from-white/90 to-gray-50/80 border-b border-[#f57c00]/30">
            <tr className="text-left text-[#2b4a6a] font-bold">
              <th className="py-3 px-4">Domaine</th>
              <th className="py-3 px-4">Tenant</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Statut</th>
              <th className="py-3 px-4">SSL</th>
              <th className="py-3 px-4">Date de création</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDomains.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500 text-sm">
                  Aucun domaine trouvé
                </td>
              </tr>
            ) : (
              paginatedDomains.map((domain, index) => (
                <motion.tr
                  key={`domain-row-${domain.id}`}
                  className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-white/30 hover:to-[#f57c00]/10 transition-all duration-300"
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={rowVariants}
                >
                  <td className="py-3 px-4 text-gray-700">{domain.name}</td>
                  <td className="py-3 px-4 text-gray-700 font-medium">{domain.tenant}</td>
                  <td className="py-3 px-4 text-gray-600">{domain.type}</td>
                  <td className="py-3 px-4">
                    <motion.span
                      variants={badgeVariants}
                      whileHover="hover"
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(domain.status).bg} ${getStatusColor(domain.status).text}`}
                    >
                      {domain.status}
                    </motion.span>
                  </td>
                  <td className="py-3 px-4">
                    <motion.span
                      variants={badgeVariants}
                      whileHover="hover"
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSslColor(domain.ssl).bg} ${getSslColor(domain.ssl).text}`}
                    >
                      {domain.ssl}
                    </motion.span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{new Date(domain.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3 px-4 flex justify-end gap-2">
                    <motion.button
                      variants={iconVariants}
                      whileHover="hover"
                      onClick={() => handleEdit(domain.id)}
                      className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                      title="Modifier"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </motion.button>
                    {domain.type === 'Secondaire' && (
                      <motion.button
                        variants={iconVariants}
                        whileHover="hover"
                        onClick={() => handleDelete(domain.id)}
                        className="text-red-600 p-1 rounded-full hover:bg-red-600/10 transition-all duration-300"
                        title="Supprimer"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                    )}
                    <motion.button
                      variants={iconVariants}
                      whileHover="hover"
                      onClick={() => handleTest(domain.id)}
                      className="text-[#2b4a6a] p-1 rounded-full hover:bg-[#2b4a6a]/10 transition-all duration-300"
                      title="Tester"
                    >
                      <BeakerIcon className="h-5 w-5" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 150, damping: 12 }}
        className="flex justify-center gap-2 mt-6"
      >
        <motion.button
          variants={buttonVariants}
          whileHover={currentPage === 1 ? {} : 'hover'}
          whileTap={currentPage === 1 ? {} : 'tap'}
          onClick={() => {
            const newPage = Math.max(currentPage - 1, 1);
            setCurrentPage(newPage);
            console.log('Page sélectionnée :', newPage);
          }}
          disabled={currentPage === 1}
          className={`pagination-button p-2 rounded-full border border-[#f57c00]/50 ${
            currentPage === 1
              ? 'bg-[#f57c00]/10 text-[#f57c00]/50 opacity-50 cursor-not-allowed'
              : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
          } transition-all duration-300`}
        >
          ←
        </motion.button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <motion.button
            key={page}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              setCurrentPage(page);
              console.log('Page sélectionnée :', page);
            }}
            className={`pagination-button px-4 py-2 rounded-full text-sm font-medium border border-[#f57c00]/50 ${
              currentPage === page
                ? 'bg-[#f57c00] text-white'
                : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
            } transition-all duration-300`}
          >
            {page}
          </motion.button>
        ))}
        <motion.button
          variants={buttonVariants}
          whileHover={currentPage === totalPages ? {} : 'hover'}
          whileTap={currentPage === totalPages ? {} : 'tap'}
          onClick={() => {
            const newPage = Math.min(currentPage + 1, totalPages);
            setCurrentPage(newPage);
            console.log('Page sélectionnée :', newPage);
          }}
          disabled={currentPage === totalPages}
          className={`pagination-button p-2 rounded-full border border-[#f57c00]/50 ${
            currentPage === totalPages
              ? 'bg-[#f57c00]/10 text-[#f57c00]/50 opacity-50 cursor-not-allowed'
              : 'bg-[#f57c00]/10 text-[#f57c00] hover:bg-[#f57c00] hover:text-white'
          } transition-all duration-300`}
        >
          →
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DomainList;