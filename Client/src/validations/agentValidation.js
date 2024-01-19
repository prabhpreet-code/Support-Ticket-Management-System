import * as z from 'zod';

export const agentValidation = z.object({
    name: z.string().min(3,{
        message:"Name should be at least 3 characters long."
    }).max(30,{
        message:"Name should not exceed 30 characters."
    }).nonempty({
        message:"Name is required."
    }),
    email: z.string().email({
        message:"Invalid email format."
    }).nonempty({
        message:"Email is nonempty."
    }),
    phone: z.string()
      .length(10,{
        message:"Phone number must be exactly 10 digits long."
      })
      .nonempty({
        message:"Phone number cannot be empty."
      })
      ,
    description: z.string().max(50,{
        message:"Description should not exceed 50 characters."
    }).nonempty({
        message:"Description cannot be empty."
    })
  });

