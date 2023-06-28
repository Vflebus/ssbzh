import './globals.scss'

export const metadata = {
  title: 'Checkpoint Data',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
