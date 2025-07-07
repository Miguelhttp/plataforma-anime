export default function Footer() {
  return (
    <footer className="stick bottom-0 w-full bg-transparent text-gray-400 py-4 px-6 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Logo e redes sociais */}
        <div className="flex flex-col gap-6">
          <h2 className="text-white font-bold text-xl text-center md:text-left">
            Desenvolvida por{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              {" "}
              Miguel Braga
            </span>
          </h2>
        </div>

        {/* Direitos autorais */}
        <div className="text-xs text-gray-500 flex items-end justify-center md:justify-end">
          © {new Date().getFullYear()} Plataforma Anime. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
