import { FunctionComponent, Suspense, useState } from "react";
import { MenuDataItem, PageContainer, ProLayout, ProSettings } from "@ant-design/pro-layout";
import { Link } from "umi";


interface LayoutCompProps {
  routes: any;
}
 
const LayoutComp: FunctionComponent<LayoutCompProps> = (props) => {
  const { routes } = props;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    title: '前端资源网',
  });
  // 菜单 loop
  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus?.map(({ icon, routes, ...item }) => ({
      ...item,
      name: item.path,
      // icon: icon && IconMap[icon as string],
      children: routes && loopMenuItem(routes),
    }));
  return (
    <ProLayout
      contentStyle={{height: 'calc(100vh - 48px)'}}
      menuDataRender={() => loopMenuItem(routes)}
      headerHeight={0}
      menuItemRender={(item, dom: any) => (
        <Link to={item.path ?? '/'}>
          {dom}
        </Link>
      )}
      {...settings}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <PageContainer>{props.children}</PageContainer>
      </Suspense>
    </ProLayout>
  );
}
 
export default LayoutComp;