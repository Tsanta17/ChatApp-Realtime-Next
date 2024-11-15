// app/layout.tsx
export const metadata = {
  title: "Real-time Chat App",
  description: "A real-time chat app with rooms and realms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
