import { createClient } from "@sanity/client";
import { apiVersion, projectId, dataset, studioUrl } from "$lib/sanity/api";

console.log("apiVersion==>", apiVersion);
console.log("projectId==>", projectId);
console.log("dataset==>", dataset);
console.log("studioUrl==>", studioUrl);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
});
