import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">Aramís</div>
      <nav className="flex space-x-4">
        <Link href="/">Inicio</Link>
        <Link href="/planes">Planes</Link>
        <Link href="/plan_personalizado">Personalizado</Link>
        <Link href="/casos_exito">Casos</Link>
        <Link href="/acerca_de">Acerca</Link>
      </nav>
    </header>
  );
}
