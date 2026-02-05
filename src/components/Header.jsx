const Header = () => {
   return (
    <header className="bg-background/50 border border-border px-6 sm:px-12 py-4 m-4 sm:m-7 rounded-sm">
        <nav>
            <ul className="flex flex-wrap gap-12"> 
                {/* wrap temporário, arrumar o mobile */}
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
// TODO -> Colocar animação com stagger nos li