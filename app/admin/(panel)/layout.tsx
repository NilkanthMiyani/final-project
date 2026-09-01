import { AdminHeader } from '@/components/admin/admin-header';
import { SideNav } from '@/components/side-nav';
import { adminDocsConfig } from '@/config/admin-docs';

export const dynamic = 'force-dynamic';

/**
 * Same docs shell as the public site — sticky header, sticky section nav,
 * dashed grid frame — so editing content looks like the place it will appear.
 */
export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div data-wrapper="" className="border-grid flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col">
          <div className="container-wrapper">
            <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
              <aside className="border-grid fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
                <div className="no-scrollbar h-full overflow-auto py-6 pr-4 lg:py-8">
                  <SideNav config={adminDocsConfig} />
                </div>
              </aside>
              <div className="flex flex-1 flex-col py-6 pr-4 lg:py-8">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
