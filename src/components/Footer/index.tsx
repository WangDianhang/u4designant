import { DefaultFooter } from "@ant-design/pro-layout";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} SuplayMart`}
    />
  );
};

export default Footer;
