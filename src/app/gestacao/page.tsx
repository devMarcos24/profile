'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  FiCalendar,
  FiHome,
  FiUser,
  FiSettings,
  FiLogOut,
  FiPlus,
  FiMinus,
  FiInfo,
  FiClock,
  FiBell,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { GestacaoService } from './services/gestacao/gestacaoService';

// Types
type WeekDay = {
  date: Date;
  day: number;
  weekDay: string;
  isToday: boolean;
};

type Appointment = {
  id: string;
  title: string;
  date: Date;
  location: string;
  notes?: string;
};

const PregnancyTracker = () => {
  // Hooks
  const { user, logout } = useAuth();
  const router = useRouter();

  // State
  const [currentWeek, setCurrentWeek] = useState(1);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<string>('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    title: '',
    date: new Date(),
    location: '',
    notes: ''
  });

  const gestacaoService = GestacaoService();

  // Calculate due date when pregnancy start date changes
  useEffect(() => {
    (async () => {
      const response = await gestacaoService.get()
      if (response) {
        const calculatedDueDate = new Date(response.startDate);
        calculatedDueDate.setDate(calculatedDueDate.getDate() + (40 * 7));
        setDueDate(calculatedDueDate);


        // Calculate current week
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - new Date(response.startDate).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        setCurrentWeek(weeks);
      }
    })()
  }, []);

  // Generate week days for the calendar
  const generateWeekDays = (): WeekDay[] => {
    const days: WeekDay[] = [];
    const today = new Date();
    type WeekDayName = 'Dom' | 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb';
    const weekDayNames: WeekDayName[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + (i - today.getDay()));

      days.push({
        date,
        day: date.getDate(),
        weekDay: weekDayNames[date.getDay()] as WeekDayName,
        isToday: date.toDateString() === today.toDateString()
      });
    }

    return days;
  };

  const weekDays = generateWeekDays();

  // Format date to Brazilian format
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Get baby size based on current week
  const getBabySize = (week: number): string => {
    const sizes = [
      'Pequeno como um grão de arroz',
      'Tamanho de uma ervilha',
      'Tamanho de um mirtilo',
      'Tamanho de um morango',
      'Tamanho de um limão',
      'Tamanho de um pêssego',
      'Tamanho de uma maçã',
      'Tamanho de uma manga',
      'Tamanho de uma berinjela',
      'Tamanho de um abacate',
      'Tamanho de um quiabo',
      'Tamanho de uma laranja',
      'Tamanho de uma banana',
      'Tamanho de um abacaxi',
      'Tamanho de um abobrinha',
      'Tamanho de um abóbora',
      'Tamanho de um melão',
      'Tamanho de um melancia',
      'Tamanho de um mamão',
      'Tamanho de um melão amarelo',
      'Tamanho de uma jaca',
      'Tamanho de um abóbora moranga',
      'Tamanho de um melão cantalupo',
      'Tamanho de um melão honeydew',
      'Tamanho de um abóbora gigante',
      'Tamanho de um abóbora japonesa',
      'Tamanho de um melão galia',
      'Tamanho de um melão pele de sapo',
      'Tamanho de um melão amarelo',
      'Tamanho de um melão laranja',
      'Tamanho de um melão verde',
      'Tamanho de um melão branco',
      'Tamanho de um melão vermelho',
      'Tamanho de um melão roxo',
      'Tamanho de um melão rosa',
      'Tamanho de um melão azul',
      'Tamanho de um melão dourado',
      'Tamanho de um melão prateado',
      'Tamanho de um melão bronzeado',
      'Pronto para nascer!'
    ];

    return sizes[Math.min(week - 1, 39)] || sizes[39] || '';
  };

  // Get pregnancy tip based on current week
  const getPregnancyTip = (week: number): string => {
    const tips = [
      'Comece a tomar ácido fólico se ainda não começou.',
      'Mantenha-se hidratada e descanse bastante.',
      'Evite alimentos crus e mal passados.',
      'Pratique exercícios leves regularmente.',
      'Agende sua primeira consulta pré-natal.',
      'Converse com seu médico sobre vitaminas pré-natais.',
      'Comece a pensar em nomes para o bebê!',
      'Tire fotos da sua barriga para acompanhar o crescimento.',
      'Comece a planejar o enxoval do bebê.',
      'Pesquise sobre aulas de preparação para o parto.'
    ];

    return tips[week % tips.length] || 'Sem dicas para esta semana';
  };

  // Handle saving pregnancy start date
  const savePregnancyStartDate = async () => {
    if (tempStartDate) {
      setIsLoadingSave(true);
      const newDate = new Date(tempStartDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - newDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(diffDays / 7);
      setCurrentWeek(weeks);
      setDueDate(newDate);
      setShowDatePicker(false);
      await gestacaoService.post(newDate.toISOString());
      setIsLoadingSave(false);
    }
  };

  // Handle adding a new appointment
  const addAppointment = () => {
    const appointment: Appointment = {
      ...newAppointment,
      id: Date.now().toString()
    };

    setAppointments([...appointments, appointment]);
    setShowAddAppointment(false);
    setNewAppointment({
      title: '',
      date: new Date(),
      location: '',
      notes: ''
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center transition-colors duration-200">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="mr-4 text-pink-600 dark:text-pink-400"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <h1 className="text-xl font-bold text-pink-600 dark:text-pink-400">Acompanhamento</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-pink-600 dark:text-pink-400"
              aria-label="Notificações"
            >
              <FiBell size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-pink-200 dark:bg-pink-900 flex items-center justify-center text-pink-600 dark:text-pink-300 font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar */}
          <div className={`fixed inset-y-0 left-0 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 ease-in-out z-50 lg:relative lg:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-lg`}>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">Gestação+</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acompanhe sua jornada</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <button
                onClick={() => setActiveTab('home')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'home' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <FiHome className="w-5 h-5" />
                <span>Início</span>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'calendar' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <FiCalendar className="w-5 h-5" />
                <span>Calendário</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'appointments' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <FiClock className="w-5 h-5" />
                <span>Consultas</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <FiUser className="w-5 h-5" />
                <span>Perfil</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <FiSettings className="w-5 h-5" />
                <span>Configurações</span>
              </button>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white/50 dark:bg-gray-900/50">
            {/* Week Counter */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 transition-colors duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Sua Jornada</h2>
                  <p className="text-gray-600 dark:text-gray-300">Acompanhe o desenvolvimento do seu bebê</p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Semana</p>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setCurrentWeek(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
                        aria-label="Diminuir semana"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="text-3xl font-bold text-pink-600 dark:text-pink-400 w-12 text-center">
                        {currentWeek}
                      </span>
                      <button
                        onClick={() => setCurrentWeek(prev => Math.min(40, prev + 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
                        aria-label="Aumentar semana"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="h-12 w-px bg-gray-200 dark:bg-gray-700"></div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trimestre</p>
                    <p className="text-xl font-semibold text-pink-600 dark:text-pink-400">
                      {currentWeek <= 13 ? '1º' : currentWeek <= 26 ? '2º' : '3º'} Trimestre
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-pink-400 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentWeek / 40) * 100}%` }}
                ></div>
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>1ª semana</span>
                <span>40ª semana</span>
              </div>

              {dueDate && (
                <div className="mt-4 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-800/50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <FiInfo className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-pink-800 dark:text-pink-200">
                        Data provável do parto
                      </h3>
                      <div className="mt-1 text-sm text-pink-700 dark:text-pink-300">
                        <p>
                          {formatDate(dueDate)} -{' '}
                          {Math.round(
                            (dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                          )}{' '}
                          dias restantes
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Baby Development */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Tamanho do bebê
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seu bebê está do tamanho de um(a) <span className="font-medium text-pink-600 dark:text-pink-400">
                    {getBabySize(currentWeek).toLowerCase()}
                  </span>
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Dica da Semana
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {getPregnancyTip(currentWeek)}
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Calendário
                </h3>
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="px-3 py-1 text-sm text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded-lg transition-colors"
                >
                  Alterar data
                </button>
              </div>

              {showDatePicker && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={tempStartDate}
                      onChange={(e) => setTempStartDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white"
                    />
                    <button
                      onClick={savePregnancyStartDate}
                      className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      {isLoadingSave ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div
                    key={day.date.toISOString()}
                    className={`p-2 h-16 flex flex-col items-center justify-center rounded-lg ${day.isToday
                      ? 'bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 font-medium'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span className="text-sm">{day.day}</span>
                    {appointments.some(
                      (appt) =>
                        appt.date.getDate() === day.date.getDate() &&
                        appt.date.getMonth() === day.date.getMonth()
                    ) && (
                        <span className="w-2 h-2 mt-1 rounded-full bg-pink-500"></span>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Próximas Consultas
                </h3>
                <button
                  onClick={() => setShowAddAppointment(true)}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded-lg transition-colors"
                >
                  <FiPlus size={16} />
                  <span>Nova consulta</span>
                </button>
              </div>

              {appointments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  Nenhuma consulta agendada
                </p>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            {appt.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(appt.date)} • {appt.location}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                          <FiInfo size={18} />
                        </button>
                      </div>
                      {appt.notes && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          {appt.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Appointment Modal */}
        {showAddAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Nova Consulta
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={newAppointment.title}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Ultrassom morfológico"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data e Hora
                  </label>
                  <input
                    type="datetime-local"
                    value={newAppointment.date.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      setNewAppointment({
                        ...newAppointment,
                        date: new Date(e.target.value)
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Local
                  </label>
                  <input
                    type="text"
                    value={newAppointment.location}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Clínica X, Sala 123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Observações (opcional)
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, notes: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Alguma observação importante?"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    onClick={() => setShowAddAppointment(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addAppointment}
                    disabled={!newAppointment.title || !newAppointment.location}
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Salvar Consulta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default PregnancyTracker;
