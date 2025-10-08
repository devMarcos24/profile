import { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiPlus, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Appointment } from '../types';

type CalendarTabProps = {
  appointments: Appointment[];
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
};

export function CalendarTab({ appointments, onAddAppointment }: CalendarTabProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    title: '',
    date: new Date(),
    location: '',
    notes: ''
  });

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>);
    }
    
    // Add the days of the month
    for (let day = 1; day <= days; day++) {
      const date = new Date(year, month, day);
      const isToday = isCurrentMonth && day === today.getDate();
      const hasAppointments = appointments.some(
        app => app.date.getDate() === day && 
               app.date.getMonth() === month && 
               app.date.getFullYear() === year
      );
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={`h-24 p-1 border border-gray-100 ${isToday ? 'bg-blue-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
              {day}
            </span>
            {hasAppointments && (
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            )}
          </div>
          
          {appointments
            .filter(app => {
              const appDate = new Date(app.date);
              return (
                appDate.getDate() === day && 
                appDate.getMonth() === month && 
                appDate.getFullYear() === year
              );
            })
            .slice(0, 2) // Show max 2 appointments per day in the calendar
            .map((app, index) => (
              <div 
                key={`app-${index}`}
                className="mt-1 p-1 text-xs bg-indigo-50 text-indigo-800 rounded truncate"
                title={`${app.title} - ${app.location}`}
              >
                {app.title}
              </div>
            ))}
          
          {appointments.filter(app => {
            const appDate = new Date(app.date);
            return (
              appDate.getDate() === day && 
              appDate.getMonth() === month && 
              appDate.getFullYear() === year
            );
          }).length > 2 && (
            <div className="text-xs text-gray-500 mt-1">
              +{appointments.filter(app => {
                const appDate = new Date(app.date);
                return (
                  appDate.getDate() === day && 
                  appDate.getMonth() === month && 
                  appDate.getFullYear() === year
                );
              }).length - 2} mais
            </div>
          )}
        </div>
      );
    }
    
    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAppointment(prev => ({
      ...prev,
      date: new Date(e.target.value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.title && newAppointment.date) {
      onAddAppointment(newAppointment);
      setNewAppointment({
        title: '',
        date: new Date(),
        location: '',
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  // Filter appointments for the current month
  const currentMonthAppointments = appointments.filter(app => {
    const appDate = new Date(app.date);
    return (
      appDate.getMonth() === currentMonth.getMonth() && 
      appDate.getFullYear() === currentMonth.getFullYear()
    );
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="-ml-1 mr-1.5 h-4 w-4" />
            Novo Compromisso
          </button>
        </div>
      </div>

      {/* Add Appointment Form */}
      {showAddForm && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Adicionar Compromisso
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={newAppointment.title}
                    onChange={handleInputChange}
                    required
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Data e Hora *
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="date"
                    id="date"
                    value={newAppointment.date.toISOString().slice(0, 16)}
                    onChange={handleDateChange}
                    required
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Local
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={newAppointment.location}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Notas
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar Compromisso
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map(day => (
            <div key={day} className="bg-gray-100 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {renderCalendar()}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Próximos Compromissos
        </h3>
        
        {currentMonthAppointments.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {currentMonthAppointments.map((appointment, index) => (
                <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-md">
                        <FiCalendar className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-indigo-600">
                          {appointment.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.date.toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        {appointment.location && (
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <FiMapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {appointment.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Detalhes
                      </button>
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{appointment.notes}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-12 bg-white shadow sm:rounded-lg">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum compromisso agendado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece adicionando um novo compromisso.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                Novo Compromisso
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
