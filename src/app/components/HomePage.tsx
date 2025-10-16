'use client';
import { useEffect, useState } from 'react';
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionP,
  MotionA,
  MotionSection
} from './ClientMotion';
import Image from 'next/image';

const technologies = [
  { name: 'JavaScript', icon: '💻' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'React', icon: '⚛️' },
  { name: 'React Native', icon: '📱' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Next.js', icon: '⏭️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '🔄' },
  { name: 'SQL', icon: '🗃️' },
  { name: 'AWS', icon: '☁️' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative container mx-auto px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <MotionDiv
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="md:w-1/2"
          >
            <MotionDiv variants={fadeInUp} className="inline-block">
              <span className="text-sm font-medium px-4 py-1 rounded-full bg-primary/10 text-primary mb-4 inline-flex items-center">
                👋 Olá, eu sou
              </span>
            </MotionDiv>
            <MotionH1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6">
              Marcos <span className="text-gradient">Menezes</span>
            </MotionH1>
            <MotionH2 variants={fadeInUp} className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8">
              Desenvolvedor <span className="text-gradient">Full Stack</span>
            </MotionH2>
            <MotionP variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Transformando ideias em experiências digitais incríveis com código limpo e soluções inteligentes.
              Especializado em desenvolvimento web e mobile de alto desempenho.
            </MotionP>
            <MotionDiv variants={fadeInUp} className="flex flex-wrap gap-4">
              <MotionA
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vamos Conversar
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </MotionA>
              <MotionA
                href="/projects"
                className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Projetos
              </MotionA>
            </MotionDiv>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative w-64 h-64 md:w-80 md:h-80 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 dark:from-primary/20 dark:to-secondary/20 rounded-[2.5rem] transform rotate-6 transition-all duration-300 group-hover:rotate-3 group-hover:scale-105"></div>
            <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl dark:shadow-gray-900/30 flex items-center justify-center p-1.5 transition-all duration-300 group-hover:shadow-2xl group-hover:dark:shadow-gray-900/50">
              <div className="absolute inset-0.5 rounded-[2rem] overflow-hidden">
                <Image
                  src="/myphoto.svg"
                  alt="Foto de perfil de Marcos Menezes"
                  width={300}  // Aumentei o tamanho para garantir que a imagem seja visível
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Erro ao carregar a imagem:', e);
                    // Tenta carregar uma imagem alternativa
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/developer-emoji.svg'; // Usando outra imagem da pasta public
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem]"></div>
            </div>
          </MotionDiv>
        </div>
      </header>

      {/* About Section */}
      <MotionSection
        id="about"
        className="py-20 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass p-8 md:p-12 rounded-3xl">
              <div className="inline-block mb-6">
                <span className="text-sm font-medium px-4 py-1 rounded-full bg-primary/10 text-primary">
                  Sobre Mim
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Conheça um pouco da minha <span className="text-gradient">jornada</span></h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
                <p>
                  Sou um desenvolvedor Full Stack apaixonado por criar soluções digitais que fazem a diferença.
                  Com experiência em desenvolvimento web e mobile, busco sempre entregar produtos de alta qualidade
                  que proporcionem ótimas experiências aos usuários.
                </p>
                <p>
                  Minha jornada na programação começou há alguns anos, e desde então venho me especializando
                  em tecnologias modernas como React, Node.js e React Native. Acredito no poder da tecnologia
                  para transformar ideias em realidade e estou sempre em busca de novos desafios e aprendizados.
                </p>
                <p>
                  Quando não estou codando, você pode me encontrar explorando novas tecnologias, contribuindo
                  para projetos open source ou compartilhando conhecimento com a comunidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Technologies Section */}
      <MotionSection
        id="technologies"
        className="py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium px-4 py-1 rounded-full bg-primary/10 text-primary">
                Habilidades
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Tecnologias que <span className="text-gradient">domino</span></h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Ferramentas e tecnologias que utilizo para transformar ideias em realidade.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <MotionDiv
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center card-hover"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center text-3xl">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-semibold">{tech.name}</h3>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Contact Section */}
      <MotionSection
        id="contact"
        className="py-20 relative"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -skew-y-3 transform origin-top-left"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium px-4 py-1 rounded-full bg-primary/10 text-primary">
                Contato
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Vamos trabalhar <span className="text-gradient">juntos</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
              Estou sempre aberto a discutir novos projetos, oportunidades de trabalho ou simplesmente bater um papo sobre tecnologia.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <MotionA
                whileHover={{ y: -5 }}
                href="https://linkedin.com/in/devmarcos24"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">LinkedIn</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">/devmarcos24</p>
              </MotionA>

              <MotionA
                whileHover={{ y: -5 }}
                href="https://github.com/devmarcos24"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl flex items-center justify-center text-xl">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">GitHub</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">@devmarcos24</p>
              </MotionA>

              <MotionA
                whileHover={{ y: -5 }}
                href="mailto:dev.marcos1995@gmail.com"
                className="glass p-6 rounded-2xl text-center transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl flex items-center justify-center text-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">dev.marcos1995@gmail.com</p>
              </MotionA>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <footer className="py-12 text-center">
        <div className="container mx-auto px-6">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-4">Vamos criar algo incrível juntos!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades de fazer parte de suas visões.
              </p>
              <MotionA
                href="whatsapp://send?phone=5579998856196"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Fale comigo no whatsapp
              </MotionA>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-center space-x-6 mb-6">
                <a href="https://linkedin.com/in/devmarcos24" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://github.com/devmarcos24" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Marcos Menezes. Todos os direitos reservados.
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Feito com ❤️ usando Next.js, Tailwind CSS e Framer Motion
              </p>
            </div>
          </MotionDiv>
        </div>
      </footer>
    </div>
  );
}
