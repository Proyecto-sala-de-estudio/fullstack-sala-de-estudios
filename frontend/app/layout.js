import "./globals.css";

export const metadata = {
  title: "Gestión de Cursos - Sala de Estudios",
  description: "Administra e inscribe materias académicas directamente en el catálogo de la Sala de Estudios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
