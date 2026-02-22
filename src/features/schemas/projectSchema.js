import { optional, z } from "zod";

const imageWithAltSchema = z.object({
    url: z.url("URL inválida"),
    alt: z.string(),
})

const projectDescriptionSchema = z.object({
    card_description: z.string().max(170, "Limite de 170 caracteres excedido").min(20, "A descrição do card deve ter pelo menos 10 caracteres"),
    resume: z.string.min(10, "O resumo deve ter pelo menos 10 caracteres"),
    objective: z.string().optional().or(z.literal("")),
    challenges: z.string().optional().or(z.literal("")),
    results: z.string().optional().or(z.literal("")),

})

export const projectSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, "Título muito curto"),
    description: projectDescriptionSchema,
    cover: imageWithAltSchema,
    images: z.array(imageWithAltSchema).default([]),
    github: z.url().or(z.literal("")),
    link: z.url().or(z.literal("")),
    tags: z.array(z.string()).nonempty("Adicione pelo menos uma tag"),
})