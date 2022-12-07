import S from './container.module.scss';
function Container(props: any) {
  return <div className={S.container}>{props.children}</div>;
}

export default Container;
