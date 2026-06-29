import './globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'RocketShip · AI Client Engine',
  description: 'Premium AI-powered lead engine for modern sales teams.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg text-ink-1 antialiased">
        {children}
        <Toaster theme="dark" position="top-right" toastOptions={{ style: { background: '#13121E', border: '1px solid rgba(255,255,255,0.1)', color: '#F4F4F7' } }} />
      </body>
    </html>
  );
}
