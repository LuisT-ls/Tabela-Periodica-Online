export default function Footer() {
  return (
    <footer className="bg-dark dark:bg-dark-surface text-white dark:text-dark-text py-8 mt-auto border-t border-gray-200 dark:border-dark-border">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            Tabela Periódica Online
          </p>
          <p className="text-sm text-muted dark:text-dark-text-secondary">
            Explore os elementos químicos de forma interativa e educativa
          </p>
          <div className="mt-4 text-xs text-muted dark:text-dark-text-secondary">
            © 2024 - Desenvolvido com Next.js e React
          </div>
        </div>
      </div>
    </footer>
  );
}
