import { FunctionComponent, Suspense, useEffect, useState } from "react";
import { MenuDataItem, PageContainer, ProLayout, ProSettings } from "@ant-design/pro-layout";
import { Link } from "umi";


interface LayoutCompProps {
  route: any;
}
 
const LayoutComp: FunctionComponent<LayoutCompProps> = (props) => {
  const { route: { routes } } = props;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    title: '前端资源网',
  });
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  // 菜单 loop
  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
    const menusData = menus.filter(item => !item?.meta?.hidden);
    return menusData?.map(({ icon, routes, ...item }) => ({
      ...item,
      name: item?.meta?.title ?? item.path,
      // icon: icon && IconMap[icon as string],
      children: routes && loopMenuItem(routes),
    }));
  };

  useEffect(() => {
    setMenuData(loopMenuItem(routes));
  }, []);

  return (
    <ProLayout
      contentStyle={{height: 'calc(100vh - 48px)'}}
      menuDataRender={() => menuData}
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