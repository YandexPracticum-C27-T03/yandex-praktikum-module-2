import { View, Panel, PanelHeader, SplitLayout, SplitCol } from '@vkontakte/vkui';

export const AuthLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <SplitLayout header={<PanelHeader separator={false} />}>
      <SplitCol autoSpaced>
        <View activePanel="main">
          <Panel id="main">
            <PanelHeader>{title}</PanelHeader>
            <div className="Form">{children}</div>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
