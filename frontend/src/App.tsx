import { SideNav } from "./components/navigation/SideNav";
import { DashboardScreen } from "./screens/dashboard/DashboardScreen";

export function App() {
  return (
    <div className="flex h-screen gap-8 p-4">
      <SideNav activeHref="#/dashboard" />
      <main className="flex-1 overflow-y-auto py-8 pr-6">
        <DashboardScreen />
      </main>
    </div>
  );
}
