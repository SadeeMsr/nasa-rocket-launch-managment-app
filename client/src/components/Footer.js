import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return <ArwesFooter animate>
    <Centered>
      <Paragraph style={{ fontSize: 14, marginTop: "10px ", textAlign: "center" }}>
        This is a personal project. Just to show case my skills. <a href="https://sadeemsr.github.io/Portfolio_Rohan/">My Portfolio</a>
      </Paragraph>
    </Centered>
  </ArwesFooter>
};

export default Footer;
