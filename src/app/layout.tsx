import { ChatProvider } from "@/context/ChatContext";

import "./globals.css";
import Sidebar from "@/components/sidebar/SideBar";
import { LocaleProvider } from "@/context/LocaleContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 flex min-h-screen">
        <LocaleProvider>
          <ChatProvider>
            <Sidebar />
            <main className="flex-1 ml-64 min-h-screen">
              <div className="max-w-5xl mx-auto h-full px-8">
                {children}
              </div>
            </main>
          </ChatProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}