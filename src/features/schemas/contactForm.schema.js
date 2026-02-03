import { z } from "zod";

export const contactFormSchema = z.object({
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.email("Email inválido"),
    message: z.string()
    .min(10, "Conte-nos um pouco mais (mínimo 10 caracteres)")
    .max(700, "limite de 700 caracteres excedido"),
});
