import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refactor Sprint Blueprint',
  description: '72-Hour Revenue Engine Diagnostic',
  icons: {
    icon: '/refaclogo.png',
    shortcut: '/refaclogo.png',
    apple: '/refaclogo.png',
  },
};

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
