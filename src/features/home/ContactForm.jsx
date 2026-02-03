import { contactFormSchema } from "../schemas/contactForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Watch } from "react-hook-form";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { message: "" }, // integração zod
  });

  const messageContent = watch("message");

  const onSubmit = async (data) => {
    console.log("Envia dados:" + data);
    // Simulando envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Ticket enviado:", data);
    alert("Mensagem enviada com sucesso!");
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded  border-border border-[0.5px] shadow-2xl bg-surface space-y-6"
      >
        {/* Campo nome */}
        <div className="">
          <label className="block text-xs font-bold tracking-wider mb-1 ml-1">
            Nome
          </label>
          <input
            {...register("name")}
            className={`w-full px-4 py-3 rounded border border-zinc-50 outline-none transition-all ${errors.name ? "border-red-400 focus:border-red-500" : "border-zinc-200 focus:border-primary"}`}
            placeholder="Ex: Eduardo Audi"
          />
        </div>

        {errors.name && (
          <span className="text-red-500 text-xs mt-1 ml-1">
            {errors.name.message}
          </span>
        )}

        {/* Campo email */}
        <div>
          <label className="block text-xs font-bold tracking-wider mb-1 ml-1">
            Nome
          </label>
          <input
            {...register("email")}
            className={`w-full px-4 py-3 rounded border border-zinc-50 outline-none transition-all ${errors.name ? "border-red-400 focus:border-red-500" : "border-zinc-200 focus:border-primary"}`}
            placeholder="Ex: seu@email.com"
          />
        </div>

        {/* Campo mensagem */}

        <div className="flex flex-col gap-1.5">
          <label className="block text-xs font-bold tracking-wider mb-1 ml-1">
            Mensagem
          </label>

          <textarea
            {...register("message")}
            rows="5"
            placeholder="Conte sobre a ideia ou projeto que deseja realizar..."
            className={`w-full px-4 py-3 rounded border border-zinc-50 transition-all outline-none resize-none 
                ${
                  errors.message
                    ? "border-red-400 focus-ring-2 focus:ring-red-100"
                    : "border-neutral-200 focus:border-primary focus:ring-4 focus:ring-indigo-50"
                }`}
          />

          <div className="flex justify-between items-start mt-1 px-1">
            {errors.message ? (
              <span className="text-red-500 text-xs font-medium">
                {errors.message.message}
              </span>
            ) : (
              <p>Evite compartilhar senhas ou dados sensíveis.</p>
            )}

            {/* Contador de caracteres */}
            <span
              className={`text-[10px] uppercase tracking-widest ${messageContent.length > 650 ? "text-red-500" : "text-neutral-50"}`}
            >
              {messageContent.length} / 700{" "}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-background hover:bg-secondary border-border py-2 font-bold border text-primary hover:text-neutral-100 transition-all transform active:scale-[.98] flex justify-center items-center"
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Enviar"
          )}
        </button>
      </form>
    </div>
  );
};

// TO-DO
// Feedback positivo em caso de mensagem enviada com sucesso
export default ContactForm;
