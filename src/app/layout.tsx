export const metadata = {
  title: "BaoBank",
  description: "A food distribution platform, for the people, by the people.",
};
import "@/styles/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
