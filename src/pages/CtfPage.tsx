import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import CtfMenu from "../components/CtfMenu";
import { CtfBody } from "../components/CtfBody";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LevelServiceInstance from "../services/ctf.service";

export const CtfPage = ({
  menuHandler,
  menu,
}: {
  menu: boolean;
  menuHandler: () => void;
}) => {
  const [levelDetails, setLevelDetails] = useState("");
  const { ctfLevel, ctfName } = useParams();
  useEffect(() => {
    const levelGetterHandler = async () => {
      try {
        if (ctfLevel && ctfName) {
          const response = await LevelServiceInstance.getLevel(
            ctfName,
            ctfLevel
          );
          setLevelDetails(response.data);
        }
      } catch (error) {
        console.log("Error has been occured in levelGetterHandler", error);
      }
    };
    levelGetterHandler();
  }, []);
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
      <NavBar menu={menu} menuHandler={menuHandler} />
      <div className="px-3">
        <CtfMenu menuHandler={menuHandler} menu={menu} />
        <CtfBody levelDetails={levelDetails} />
        <Footer />
      </div>
    </motion.section>
  );
};
