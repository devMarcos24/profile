'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type PregnancyFormProps = {
  initialData?: {
    startDate: Date;
    dueDate: Date;
    notes?: string | null;
  };
  onSuccess?: () => void;
};

export function PregnancyForm({ initialData, onSuccess }: PregnancyFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(
    initialData?.startDate ? new Date(initialData.startDate) : undefined
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    initialData?.dueDate ? new Date(initialData.dueDate) : undefined
  );
  const [notes, setNotes] = useState(initialData?.notes || '');

  // Calculate due date when start date changes (40 weeks after last period)
  useEffect(() => {
    if (startDate && !initialData?.dueDate) {
      const calculatedDueDate = new Date(startDate);
      calculatedDueDate.setDate(calculatedDueDate.getDate() + 280); // 40 weeks = 280 days
      setDueDate(calculatedDueDate);
    }
  }, [startDate, initialData?.dueDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !dueDate) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todas as datas obrigatórias.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch('/api/pregnancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          dueDate,
          notes: notes || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Falha ao salvar as informações');
      }

      toast({
        title: 'Sucesso',
        description: 'Informações de gravidez salvas com sucesso!',
      });

      if (onSuccess) {
        onSuccess();
      }

      // Refresh the page to show updated data
      router.refresh();
    } catch (error) {
      console.error('Error saving pregnancy info:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao salvar as informações. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Informações da Gravidez</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Data da Última Menstruação (DUM)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  locale={ptBR}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Data Provável do Parto (DPP)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !dueDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, 'PPP', { locale: ptBR })
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  locale={ptBR}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observações (opcional)</Label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Alguma observação importante?"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
          />
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
        >
          {isLoading ? 'Salvando...' : 'Salvar Informações'}
        </button>
      </form>
    </div>
  );
}
