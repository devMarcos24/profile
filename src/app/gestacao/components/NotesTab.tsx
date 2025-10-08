import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiX, FiCheck } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Note = {
  id: string;
  date: Date;
  content: string;
  symptoms: string[];
  mood: 'happy' | 'sad' | 'tired' | 'anxious' | 'excited' | 'normal';
};

type NotesTabProps = {
  currentWeek: number;
  onSaveNotes: (notes: Record<number, string>) => void;
};

const MOOD_EMOJIS = {
  happy: '😊',
  sad: '😢',
  tired: '😴',
  anxious: '😰',
  excited: '🤩',
  normal: '😐'
};

const MOOD_OPTIONS = [
  { value: 'happy', label: 'Feliz', emoji: '😊' },
  { value: 'excited', label: 'Animada', emoji: '🤩' },
  { value: 'normal', label: 'Normal', emoji: '😐' },
  { value: 'tired', label: 'Cansada', emoji: '😴' },
  { value: 'anxious', label: 'Ansiosa', emoji: '😰' },
  { value: 'sad', label: 'Triste', emoji: '😢' },
];

const COMMON_SYMPTOMS = [
  'Náusea', 'Fadiga', 'Azia', 'Dores nas costas', 'Inchaço',
  'Dores de cabeça', 'Mudanças de humor', 'Desejos alimentares',
  'Aversões alimentares', 'Prisão de ventre', 'Vontade frequente de urinar',
  'Sensibilidade nos seios', 'Tonturas', 'Azia', 'Inchaço nas pernas',
  'Falta de ar', 'Azia', 'Cãibras nas pernas', 'Sintomas de Braxton Hicks'
];

export function NotesTab({ currentWeek, onSaveNotes }: NotesTabProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, 'id'>>({
    date: new Date(),
    content: '',
    symptoms: [],
    mood: 'normal'
  });
  const [symptomInput, setSymptomInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('pregnancyNotes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        date: new Date(note.date)
      }));
      setNotes(parsedNotes);
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('pregnancyNotes', JSON.stringify(notes));
      
      // Create a weekly notes summary for the parent component
      const weeklyNotes: Record<number, string> = {};
      notes.forEach(note => {
        const week = Math.ceil((note.date.getTime() - new Date().getTime() + (40 * 7 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000));
        if (week > 0 && week <= 40) {
          weeklyNotes[week] = (weeklyNotes[week] || '') + note.content + '\n';
        }
      });
      onSaveNotes(weeklyNotes);
    }
  }, [notes, onSaveNotes]);

  const handleAddNote = () => {
    if (newNote.content.trim()) {
      const noteToAdd = {
        ...newNote,
        id: Date.now().toString(),
        date: new Date(selectedDate || new Date().toISOString().split('T')[0])
      };
      
      setNotes([noteToAdd, ...notes]);
      setNewNote({
        date: new Date(),
        content: '',
        symptoms: [],
        mood: 'normal'
      });
      setSymptomInput('');
      setShowForm(false);
    }
  };

  const handleUpdateNote = () => {
    if (editingNote && editingNote.content.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { 
              ...editingNote, 
              date: new Date(selectedDate || editingNote.date.toISOString().split('T')[0])
            } 
          : note
      ));
      setEditingNote(null);
      setShowForm(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta anotação?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({
      date: note.date,
      content: note.content,
      symptoms: [...note.symptoms],
      mood: note.mood
    });
    setSelectedDate(note.date.toISOString().split('T')[0]);
    setShowForm(true);
  };

  const handleAddSymptom = () => {
    if (symptomInput.trim() && !newNote.symptoms.includes(symptomInput)) {
      setNewNote({
        ...newNote,
        symptoms: [...newNote.symptoms, symptomInput]
      });
      setSymptomInput('');
    }
  };

  const handleRemoveSymptom = (symptom: string) => {
    setNewNote({
      ...newNote,
      symptoms: newNote.symptoms.filter(s => s !== symptom)
    });
  };

  const handleSymptomKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && symptomInput.trim()) {
      e.preventDefault();
      handleAddSymptom();
    }
  };

  const handleSelectCommonSymptom = (symptom: string) => {
    if (!newNote.symptoms.includes(symptom)) {
      setNewNote({
        ...newNote,
        symptoms: [...newNote.symptoms, symptom]
      });
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.symptoms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMood = !selectedMood || note.mood === selectedMood;
    const matchesDate = !selectedDate || 
                       note.date.toISOString().split('T')[0] === selectedDate;
    
    return matchesSearch && matchesMood && matchesDate;
  });

  const getWeekFromDate = (date: Date): number => {
    // This is a simplified calculation - in a real app, you'd want to base this on the pregnancy start date
    const today = new Date();
    const diffTime = Math.abs(date.getTime() - today.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return Math.min(Math.max(1, currentWeek - diffWeeks), 40);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Buscar
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar em anotações e sintomas..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="mood-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Humor
            </label>
            <select
              id="mood-filter"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Todos</option>
              {MOOD_OPTIONS.map(mood => (
                <option key={mood.value} value={mood.value}>
                  {mood.emoji} {mood.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <input
              type="date"
              id="date-filter"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Minhas Anotações
          </h3>
          <button
            type="button"
            onClick={() => {
              setNewNote({
                date: new Date(),
                content: '',
                symptoms: [],
                mood: 'normal'
              });
              setSelectedDate('');
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="-ml-1 mr-2 h-4 w-4" />
            Nova Anotação
          </button>
        </div>
      </div>

      {/* Note Form */}
      {showForm && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {editingNote ? 'Editar Anotação' : 'Nova Anotação'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingNote(null);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="note-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  id="note-date"
                  value={selectedDate || format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="note-content" className="block text-sm font-medium text-gray-700 mb-1">
                  Como você está se sentindo hoje? *
                </label>
                <textarea
                  id="note-content"
                  rows={4}
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Descreva como está se sentindo, suas experiências, pensamentos..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Humor
                </label>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {MOOD_OPTIONS.map(mood => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setNewNote({...newNote, mood: mood.value as any})}
                      className={`flex flex-col items-center p-2 rounded-lg border ${
                        newNote.mood === mood.value 
                          ? 'border-indigo-500 bg-indigo-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-xs mt-1">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="symptom-input" className="block text-sm font-medium text-gray-700 mb-1">
                  Sintomas
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="symptom-input"
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    onKeyPress={handleSymptomKeyPress}
                    placeholder="Adicione um sintoma"
                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddSymptom}
                    disabled={!symptomInput.trim()}
                    className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium rounded-r-md hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
                  >
                    Adicionar
                  </button>
                </div>
                
                {COMMON_SYMPTOMS.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Sintomas comuns:</p>
                    <div className="flex flex-wrap gap-1">
                      {COMMON_SYMPTOMS
                        .filter(symptom => 
                          !newNote.symptoms.includes(symptom) && 
                          (!symptomInput || symptom.toLowerCase().includes(symptomInput.toLowerCase()))
                        )
                        .slice(0, 5)
                        .map(symptom => (
                          <button
                            key={symptom}
                            type="button"
                            onClick={() => handleSelectCommonSymptom(symptom)}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                          >
                            {symptom}
                            <FiPlus className="ml-1 h-3 w-3" />
                          </button>
                        ))}
                    </div>
                  </div>
                )}
                
                {newNote.symptoms.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {newNote.symptoms.map(symptom => (
                      <span 
                        key={symptom}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {symptom}
                        <button
                          type="button"
                          onClick={() => handleRemoveSymptom(symptom)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none"
                        >
                          <span className="sr-only">Remover sintoma</span>
                          <FiX className="h-2.5 w-2.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingNote(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={editingNote ? handleUpdateNote : handleAddNote}
                  disabled={!newNote.content.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {editingNote ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg divide-y divide-gray-200">
          {filteredNotes.map(note => (
            <div key={note.id} className="px-4 py-5 sm:p-6">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {MOOD_EMOJIS[note.mood] || '📝'}
                  </span>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {format(note.date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Semana {getWeekFromDate(note.date)} da gravidez
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditNote(note)}
                    className="text-gray-400 hover:text-indigo-600"
                    title="Editar"
                  >
                    <FiEdit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-600"
                    title="Excluir"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 pl-10">
                <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
                
                {note.symptoms.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-medium text-gray-900 mb-1">Sintomas:</h5>
                    <div className="flex flex-wrap gap-1">
                      {note.symptoms.map((symptom, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex items-center text-xs text-gray-500">
                  <FiClock className="mr-1 h-3.5 w-3.5" />
                  {format(note.date, "'Criado em' HH:mm", { locale: ptBR })}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white shadow sm:rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma anotação encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedMood || selectedDate 
              ? 'Tente ajustar sua busca ou filtros.'
              : 'Comece adicionando uma nova anotação.'}
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => {
                setNewNote({
                  date: new Date(),
                  content: '',
                  symptoms: [],
                  mood: 'normal'
                });
                setSelectedDate('');
                setShowForm(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiPlus className="-ml-1 mr-2 h-4 w-4" />
              Nova Anotação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
