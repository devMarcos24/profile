import { BabySize, PregnancyTip, Milestone } from './types';

export const calculatePregnancyWeek = (startDate: Date): number => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  return Math.min(Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7)), 40);
};

export const calculateDueDate = (startDate: Date): Date => {
  const dueDate = new Date(startDate);
  dueDate.setDate(dueDate.getDate() + (40 * 7));
  return dueDate;
};

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

export const generateWeekDays = (): { date: Date; day: number; weekDay: string; isToday: boolean }[] => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + i);
    const dayOfWeek = date.getDay();
    
    days.push({
      date,
      day: date.getDate(),
      weekDay: WEEK_DAYS[dayOfWeek] || 'Dom', // Fallback to 'Dom' just in case
      isToday: date.toDateString() === today.toDateString()
    });
  }
  
  return days;
};

export const BABY_SIZES: BabySize[] = [
  { week: 1, size: 'Tamanho de uma semente de papoula', description: 'O óvulo fertilizado é minúsculo, mas já contém todo o código genético do seu bebê.' },
  { week: 5, size: 'Tamanho de uma semente de maçã', description: 'O coração do bebê começa a bater esta semana!' },
  { week: 8, size: 'Tamanho de uma framboesa', description: 'Todos os órgãos principais começaram a se desenvolver.' },
  { week: 16, size: 'Tamanho de um abacate', description: 'O bebê começa a ouvir sons do mundo exterior.' },
  { week: 20, size: 'Tamanho de uma banana', description: 'Metade do caminho! O bebê pode chutar e virar.' },
  { week: 24, size: 'Tamanho de uma espiga de milho', description: 'Os pulmões estão se desenvolvendo rapidamente.' },
  { week: 28, size: 'Tamanho de uma berinjela', description: 'O bebê pode abrir os olhos e piscar.' },
  { week: 32, size: 'Tamanho de um repolho', description: 'O bebê está ganhando peso rapidamente.' },
  { week: 36, size: 'Tamanho de um melão', description: 'O bebê está praticando a respiração.' },
  { week: 40, size: 'Tamanho de uma abóbora', description: 'Pronto para o mundo! O bebê está totalmente desenvolvido.' }
];

export const PREGNANCY_TIPS: PregnancyTip[] = [
  { week: 1, tip: 'Comece a tomar ácido fólico se ainda não começou.', important: true },
  { week: 4, tip: 'Agende sua primeira consulta pré-natal.', important: true },
  { week: 8, tip: 'Converse com seu médico sobre vitaminas pré-natais.', important: true },
  { week: 12, tip: 'Pratique exercícios leves regularmente.', important: false },
  { week: 16, tip: 'Comece a pensar em nomes para o bebê!', important: false },
  { week: 20, tip: 'Faça o ultromorfológico para verificar a anatomia do bebê.', important: true },
  { week: 24, tip: 'Comece a planejar o quarto do bebê.', important: false },
  { week: 28, tip: 'Faça o teste de tolerância à glicose.', important: true },
  { week: 32, tip: 'Prepare a mala da maternidade.', important: true },
  { week: 36, tip: 'Converse com seu médico sobre o plano de parto.', important: true },
  { week: 40, tip: 'Descanse e espere pelos primeiros sinais de trabalho de parto.', important: true }
];

export const MILESTONES: Milestone[] = [
  { week: 4, title: 'Teste Positivo', description: 'Confirmação da gravidez', icon: '🎯' },
  { week: 8, title: 'Primeiro Ultrassom', description: 'Ouvir o coração do bebê', icon: '💓' },
  { week: 12, title: 'Fim do Primeiro Trimestre', description: 'Risco de aborto diminui', icon: '✅' },
  { week: 20, title: 'Ultrassom Morfológico', description: 'Verificação da anatomia do bebê', icon: '👶' },
  { week: 24, title: 'Viabilidade', description: 'Bebê pode sobreviver fora do útero com ajuda médica', icon: '🏥' },
  { week: 28, title: 'Terceiro Trimestre', description: 'Contagem regressiva começa', icon: '⏱️' },
  { week: 37, title: 'A Termo', description: 'Bebê está pronto para nascer a qualquer momento', icon: '👶' }
];

export const getCurrentMilestone = (week: number): Milestone | undefined => {
  return MILESTONES
    .filter(milestone => week >= milestone.week)
    .sort((a, b) => b.week - a.week)[0];
};

export const getCurrentBabySize = (week: number): BabySize => {
  return (
    BABY_SIZES
      .filter(size => week >= size.week)
      .sort((a, b) => b.week - a.week)[0] || 
    BABY_SIZES[0]!
  );
};

export const getCurrentTips = (week: number): PregnancyTip[] => {
  return PREGNANCY_TIPS
    .filter(tip => tip.week <= week)
    .sort((a, b) => b.week - a.week)
    .slice(0, 3); // Show only the 3 most recent tips
};
