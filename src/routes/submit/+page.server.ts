import type { Actions } from "./$types";
import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { createClient } from "@sanity/client";
import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_API_VERSION,
} from "$env/static/public";

import { SANITY_API_WRITE_TOKEN } from "$env/static/private";

const schema = z.object({
  url: z.string().url(),
  excerpt: z.string().min(10),
});

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const url = formData.get("url");
    const excerpt = formData.get("excerpt");

    const { data, error } = schema.safeParse({
      url,
      excerpt,
    });
    console.log("data", data);
    console.log("error", error);
    if (error) {
      const errorMessages = error.errors.map((err) => {
        if (err.path[0] === "url") {
          return "Please enter a valid URL";
        }
        if (err.path[0] === "excerpt") {
          return "Excerpt must be at least 10 characters";
        }
        return err.message;
      });
      return fail(400, { error: errorMessages.join(", ") });
    }

    // save to sanity
    const client = createClient({
      projectId: PUBLIC_SANITY_PROJECT_ID,
      dataset: PUBLIC_SANITY_DATASET,
      apiVersion: PUBLIC_SANITY_API_VERSION,
      useCdn: false,
      token: SANITY_API_WRITE_TOKEN,
    });

    const result = await client.create({
      _type: "userSubmit",
      url,
      excerpt,
    });
    console.log("result", result);

    return {
      success: true,
    };
  },
} satisfies Actions;
