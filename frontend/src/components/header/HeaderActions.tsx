import { IconButton } from "../buttons/IconButton";
import { BellIcon } from "../icons/BellIcon";
import { SettingsIcon } from "../icons/SettingsIcon";
import { ProfileButton } from "./ProfileButton";

type HeaderActionsProps = {
  userName: string;
  notificationCount?: number;
};

export function HeaderActions({ userName, notificationCount = 0 }: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <IconButton label="Notifications" icon={BellIcon} count={notificationCount} />
      <IconButton label="Settings" icon={SettingsIcon} />
      <ProfileButton name={userName} />
    </div>
  );
}
