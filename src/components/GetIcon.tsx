type props = {
  src: string;
  alt: string;
};
const GetIcon = ({ src, alt }: props) => {
  return <img src={`https://sub.id/images/${src}`} alt={alt} />;
};

export default GetIcon;
