import {z} from "zod";

export const loginSchema = z.object({
    /*identifier*/email: z.string(),
    password: z.string()
});