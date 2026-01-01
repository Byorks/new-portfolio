const Header = () => {
   return (
    <header className="bg-background/50 border border-border px-12 py-7 m-6 rounded-sm">
        <nav>
            <ul className="flex gap-12">
                <li>
                    <a href="#">Página inicial</a>
                </li>
                <li>
                    <a href="#">Projetos</a>
                </li>
                <li>
                    <a href="#">Contato</a>
                </li>
                <li>
                    <a href="">Sobre mim</a>
                </li>
            </ul>
        </nav>
    </header>
   ) 
}

export default Header;