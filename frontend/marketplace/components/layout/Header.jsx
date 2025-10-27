export default function Header() {
  return (
    <header className="navbar bg-base-100 flex justify-evenly shadow-sm">
      <div className="flex items-center">
        <img
          src="/pulgalogo.png"
          alt="Logo"
          className="h-25 w-auto ml-2" // margen a la izquierda
        />
        <a className="btn btn-ghost text-xl">Pulga Vibe</a>
      </div>
      <div className="navbar-end flex gap-4">
        <a className="btn">Button</a>
        <a className="btn">Button</a>
        <a className="btn">Button</a>
        <a className="btn">Button</a>
        <a className="btn">Button</a>
      </div>
    </header>
  );
}
