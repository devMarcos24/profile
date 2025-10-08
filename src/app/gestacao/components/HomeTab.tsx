import { FiInfo, FiCalendar, FiHeart, FiClock, FiEdit2 } from 'react-icons/fi';
import { BabySize, Milestone, PregnancyTip } from '../types';

type HomeTabProps = {
  currentWeek: number;
  dueDate: Date | null;
  babySize: BabySize;
  milestone: Milestone | undefined;
  tips: PregnancyTip[];
  onEditDueDate: () => void;
};

export function HomeTab({ 
  currentWeek, 
  dueDate, 
  babySize, 
  milestone, 
  tips, 
  onEditDueDate 
}: HomeTabProps) {
  const daysUntilDue = dueDate 
    ? Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const pregnancyProgress = Math.min(Math.ceil((currentWeek / 40) * 100), 100);

  return (
    <div className="space-y-6">
      {/* Week and Due Date Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Semana {currentWeek} de 40
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {dueDate && (
                  <span>
                    Data prevista: {dueDate.toLocaleDateString('pt-BR')} 
                    ({daysUntilDue !== null ? `${daysUntilDue} dias restantes` : 'Data inválida'})
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={onEditDueDate}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiEdit2 className="mr-1.5 h-3.5 w-3.5" />
              Editar
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Início</span>
              <span>{pregnancyProgress}%</span>
              <span>Nascimento</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full" 
                style={{ width: `${pregnancyProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {40 - currentWeek} semanas restantes
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Baby Size Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <FiInfo className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  Tamanho do Bebê
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {babySize.size}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              {babySize.description}
            </p>
          </div>
        </div>

        {/* Next Milestone Card */}
        {milestone && (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <span className="text-xl">{milestone.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    Próximo Marco
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {milestone.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Semana {milestone.week}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                {milestone.description}
              </p>
            </div>
          </div>
        )}

        {/* Next Appointment Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <FiCalendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  Próxima Consulta
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {dueDate ? 
                    `Pré-natal em ${Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 7))} semanas` : 
                    'Nenhuma consulta agendada'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlus className="-ml-1 mr-1.5 h-4 w-4" />
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Reminders */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Dicas e Lembretes
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Informações importantes para esta semana
          </p>
        </div>
        <div className="bg-white px-4 py-5 sm:p-6">
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="relative pl-4">
                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-indigo-200"></div>
                <p className="text-sm text-gray-800">
                  {tip.important && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                      Importante
                    </span>
                  )}
                  {tip.tip}
                </p>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Lembretes para hoje</h4>
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiInfo className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Lembre-se de beber bastante água e fazer suas refeições nos horários corretos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
