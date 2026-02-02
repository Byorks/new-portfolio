import { contactFormSchema } from "../schemas/contactForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ContactForm = () => {
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(contactFormSchema), // integração zod
    });

    const onSend = (data) => {
        console.log("Envia dados:" + data);
    }

    return (  
        <div className="w-full">
            <form onSubmit={handleSubmit(onSend)} className="space-y-6">
                <div className="group">
                    <label className="block text-xs font-bold tracking-wider mb-1 ml-1">Nome</label>
                    <input {...register("name")}
                    className={`w-full px-4 py-3 rounded border-2 border-zinc-50 outline-none transition-all ${errors.name ? 'border-red-400 focus:border-red-500' : 'border-zinc-200 focus:border-primary'}`}  placeholder="Ex: Eduardo Audi"/>
                </div>  

                {errors.name && <span className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</span>}
            </form>
        </div> 
    );
}

export default ContactForm;