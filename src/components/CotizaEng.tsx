import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import { useEffect } from "react";
//import TransparentButton from "./ui/Buttons/TransparentButton";

// Definir el esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Ingresa un correo válido")
    .required("El email es obligatorio"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "El teléfono debe ser numérico y de 10 dígitos")
    .required("El teléfono es obligatorio"),
  message: Yup.string().required("El mensaje es obligatorio"),
});

export const Cotiza = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: Record<string, unknown> | undefined) => {
    const servicesId = "default_service";
    const templateId = "template_085ihoa";
    try {
      await emailjs.send(servicesId, templateId, data);
    } catch (error) {
      console.log("error");
    }
    toast.success(
      "¡Gracias por contarnos sobre tu proyecto! Nos pondremos en contacto contigo muy pronto!",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    reset();
  };

  useEffect(() => {
    emailjs.init("ZImBVJpi19LozqG4Y");
  }, []);

  return (
    <section id="cotiza" className="relative min-h-screen bg-gray-800">
      <img
        src="/4.svg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <ToastContainer />
      <div className="absolute top-10 right-10 text-white text-xl cursor-pointer flex items-center z-50">
        <button
          onClick={onClose}
          className="flex items-center text-white hover:text-gray-300"
        >
          <span className="mr-2 cursor-pointer">Close</span>
          <img
            src="/close.png"
            alt="Close"
            className="w-6 h-6 cursor-pointer"
          />
        </button>
      </div>
      <div className="px-16 flex flex-col lg:flex-row items-start justify-between h-full py-24 relative z-10">
        <div className="w-full text-white px-4 lg:px-0 mt-8 lg:mt-0 text-left space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light">
            We want to get to know you,
            <br /> tell us about your project!
          </h1>
        </div>
        <div className="w-full lg:w-3/4 px-4 lg:px-8 mt-96 lg:mt-96">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-sm md:text-base lg:text-2xl cotiza-form"
          >
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nombre completo"
                {...register("name")}
                className="cotiza-input"
              />
              <p className="text-red-500 mt-1">{errors.name?.message}</p>
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="cotiza-input"
              />
              <p className="text-red-500 mt-1">{errors.email?.message}</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Teléfono"
                {...register("phone")}
                className="cotiza-input"
              />
              <p className="text-red-500 mt-1">{errors.phone?.message}</p>
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Cuéntanos sobre tu proyecto"
                {...register("message")}
                className="cotiza-input"
              />
              <p className="text-red-500 mt-1">{errors.message?.message}</p>
            </div>
            <div className="flex justify-end">
              {/* <TransparentButton title="COTIZA TU PROYECTO" /> */}
            </div>
          </form>
        </div>
      </div>
      <div className="w-full text-left text-white px-4 lg:px-16 absolute bottom-20 mb-8">
        <p className="text-xs md:text-sm lg:text-xl lg:w-1/2">
          We are here to help you! Contact us today, meet our team, and discover
          if we are the ideal choice for your projects and goals. Make the right
          choice from the start!
          <br />
          Make the right choice from the start!
        </p>
      </div>
    </section>
  );
};
