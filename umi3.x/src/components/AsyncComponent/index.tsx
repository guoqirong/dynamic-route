import { dynamic } from "umi";

const AsyncComponent = (path: string) => {
  const doesComponentExist = (modulePath: string) => {
    try {
      return import(`@/pages${modulePath}`);
    } catch (e) {
      return <>404</>; // 组件不存在
    }
  }

  return dynamic({
    loader: () => doesComponentExist(path),
    loading: () => {
      return <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        加载中...
      </div>;
    },
  });
}
 
export default AsyncComponent;