
interface Iprops {
  src: string;
  alt: string;
  parentStyle: string;
}
function Image({ src, alt, parentStyle }: Iprops) {
  return (
    <>
      
        <img className= {`${parentStyle} `} src={src} alt={alt} />
      
    </>
  );
}

export default Image;
