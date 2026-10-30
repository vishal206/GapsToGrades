import { HeaderActions } from "./components/header/HeaderActions";
import { SideNav } from "./components/navigation/SideNav";
import { DashboardScreen } from "./screens/dashboard/DashboardScreen";

export function App() {
  return (
    <div className="flex h-screen gap-8 p-4">
      <SideNav activeHref="#/dashboard" />
      <main className="relative flex-1 overflow-y-auto py-8 pr-6">
        {/* Out of flow so each screen's h1 stays top-aligned with the wordmark; buttons are 40px to match the title line height. */}
        <header className="absolute top-8 right-6">
          <HeaderActions userName="Parent User" notificationCount={3} />
        </header>
        <DashboardScreen />
      </main>
    </div>
  );
}
