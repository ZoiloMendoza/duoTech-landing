//import "/Users/alisonrangel/Desktop/RA/proyectos /duoTech-landing/src/index.css"; // Asegúrate de importar el archivo de estilos
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Contacto = () => {
  const { t } = useTranslation("global");
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = [t("contact.words.1"), t("contact.words.2"), t("contact.words.3"), t("contact.words.4")];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="contacto" className="container py-24 sm:py-32">
      <div className="flex flex-col items-center justify-center mt-6">
        <p className="text-lg"> {t("contact.title") }</p>
        <h2 className="text-5xl md:text-6xl font-bold my-3">
          <span>{words[currentIndex]}</span>
        </h2>
        <div className="flex items-center mt-4">
          <p className="text-lg mr-4">{t("contact.subContent_1") }</p>
          <span className="text-lg px-6 py-2 border border-black rounded-full dark:border-white">
          {t("contact.subContent_2") }
          </span>
        </div>
      </div>
    </section>
  );
};

// styles.css
