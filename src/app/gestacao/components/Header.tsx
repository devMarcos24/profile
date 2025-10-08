import { FiMenu, FiX, FiHome, FiCalendar, FiBook, FiPlus, FiLogOut } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

type Tab = 'home' | 'calendar' | 'notes';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  showMobileMenu: boolean;
  onToggleMobileMenu: () => void;
}

export function Header({ activeTab, onTabChange, showMobileMenu, onToggleMobileMenu }: HeaderProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">Acompanhamento de Gestação</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'home' 
                  ? 'text-indigo-700 bg-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <FiHome className="inline mr-2" />
              Início
            </button>
            <button
              onClick={() => onTabChange('calendar')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'calendar' 
                  ? 'text-indigo-700 bg-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <FiCalendar className="inline mr-2" />
              Calendário
            </button>
            <button
              onClick={() => onTabChange('notes')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'notes' 
                  ? 'text-indigo-700 bg-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <FiBook className="inline mr-2" />
              Anotações
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50"
            >
              <FiLogOut className="inline mr-2" />
              Sair
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={onToggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu</span>
              {showMobileMenu ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                onTabChange('home');
                onToggleMobileMenu();
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === 'home' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <FiHome className="inline mr-2" />
              Início
            </button>
            <button
              onClick={() => {
                onTabChange('calendar');
                onToggleMobileMenu();
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === 'calendar' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <FiCalendar className="inline mr-2" />
              Calendário
            </button>
            <button
              onClick={() => {
                onTabChange('notes');
                onToggleMobileMenu();
              }}
              className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                activeTab === 'notes' 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
              }`}
            >
              <FiBook className="inline mr-2" />
              Anotações
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50"
            >
              <FiLogOut className="inline mr-2" />
              Sair
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
