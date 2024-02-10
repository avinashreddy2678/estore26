interface ContainerProps{
    children:React.ReactNode;
}
const Container :React.FC<ContainerProps> = ({children}) => {
  return (<div className="lg:mx-auto max-w-7xl mx-3">
        {
            children
        }
  </div>)
};
export default Container;
