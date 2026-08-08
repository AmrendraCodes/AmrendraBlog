import { z } from 'zod';

export const tagSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
});

export type TagInput = z.infer<typeof tagSchema>;
