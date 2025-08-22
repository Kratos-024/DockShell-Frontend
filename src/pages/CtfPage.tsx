import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import CtfMenu from "../components/CtfMenu";

export const CtfPage = ({
  menuHandler,
  menu,
}: {
  menu: boolean;
  menuHandler: () => void;
}) => {
  return (
    <motion.section
      initial={{ marginLeft: 0 }}
      animate={{
        marginLeft: menu ? "280px" : "0px",
        width: menu ? "calc(100% - 280px)" : "100%",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-screen  relative z-10"
      style={{
        paddingLeft: "0",
        paddingRight: "0",
      }}
    >
      <NavBar />
      <div className="px-3">
        <CtfMenu menuHandler={menuHandler} menu={menu} />
        <Footer />
      </div>
    </motion.section>
  );
};
