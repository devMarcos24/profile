import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Marcos Menezes</h1>
            <h2 className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400 mb-4">Desenvolvedor Full Stack</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Desenvolvedor apaixonado por criar soluções inovadoras e eficientes com as melhores tecnologias do mercado.
            </p>
          </div>
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <div className="w-full h-full bg-blue-200 dark:bg-blue-900 flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-12 bg-white dark:bg-gray-800 shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Sobre Mim</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Olá! Sou um desenvolvedor Full Stack com experiência em desenvolvimento web e mobile. 
              Tenho paixão por criar aplicações escaláveis e de alto desempenho que proporcionam 
              ótimas experiências ao usuário.
            </p>
            <p>
              Minha jornada na programação começou há alguns anos e desde então tenho me dedicado 
              a aprender e me aprimorar constantemente nas tecnologias mais modernas do mercado.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Tecnologias</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <span className="text-4xl mb-2 block">{tech.icon}</span>
                <h3 className="text-xl font-semibold">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Vamos Conversar</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Estou sempre aberto a novas oportunidades e parcerias. 
            Entre em contato ou me siga nas redes sociais!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://linkedin.com/in/devmarcos24"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/devmarcos24"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a
              href="mailto:dev.marcos1995@gmail.com"
              className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center gap-2"
            >
              📧 Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Marcos Menezes. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Feito com ❤️ usando Next.js e Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
