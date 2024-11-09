export function Footer() {
  return (
    <footer>
      <div className="mt-8 border-t py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Leonardo Oliveira. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
