'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Github, Linkedin, PersonStandingIcon } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Botão Voltar */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-12 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para o início
        </Link>

        {/* Conteúdo Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary">
                Em Breve
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meus <span className="text-gradient">Projetos</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Estou preparando uma seleção especial dos meus melhores trabalhos para te impressionar!
              Enquanto isso, você pode conferir meus projetos diretamente no GitHub ou saber mais sobre
              minha experiência profissional no LinkedIn.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
              <Link
                href="/login"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-foreground text-background rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
              >
                <PersonStandingIcon className="w-5 h-5" />
                Tela de Login (Gestão de Gestantes)
              </Link>
              <Link
                href="https://github.com/devmarcos24"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-foreground text-background rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
              >
                <Github className="w-5 h-5" />
                Ver no GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/devmarcos24"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                Ver no LinkedIn
              </Link>
            </div>
          </motion.div>

          {/* Ilustração ou ícone decorativo */}
          <motion.div
            className="mt-20 opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-8xl">🚧</div>
            <p className="mt-4 text-muted-foreground">Página em construção</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
