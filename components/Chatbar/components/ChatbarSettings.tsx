import { IconFileExport, IconSettings, IconDoorOff } from '@tabler/icons-react';
import { useContext, useState, useEffect } from 'react';

import { useTranslation } from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';
import { useMsal, useIsAuthenticated } from "@azure/msal-react";



export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  // const [name, setName] = useState<string>('');

  // const activeAccount = instance.getActiveAccount();
  // useEffect(() => {
  //     if (activeAccount && activeAccount.name) {
  //         setName(activeAccount.name.split(' ')[0]);
  //     } else {
  //         setName('');
  //     }
  // }, [activeAccount]);

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  const handleLogout = (logoutType: any) => {

    if (logoutType === "popup") {
        instance.logoutPopup().catch((e) => { console.error(`logoutPopup failed: ${e}`) });
    } else if (logoutType === "redirect") {
        instance.logoutRedirect().catch((e) => { console.error(`logoutRedirect failed: ${e}`) });
    }
}

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}

      {isAuthenticated ? (
        <SidebarButton
          text={t('Log Out')}
          icon={<IconDoorOff size={18} />}
          onClick={() => handleLogout("redirect")}
        />
      ) : null}
      
      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />
    </div>
  );
};
