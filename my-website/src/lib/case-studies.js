import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Path to the content/case-studies directory
const caseStudiesDirectory = path.join(process.cwd(), "content", "case-studies");

/**
 * Reads all markdown files from content/case-studies/ and returns parsed case study objects.
 * Results are sorted by publishedAt (newest first).
 */
export function getAllCaseStudies() {
  const fileNames = fs
    .readdirSync(caseStudiesDirectory)
    .filter((file) => file.endsWith(".md"));

  const caseStudies = fileNames.map((fileName) => {
    const filePath = path.join(caseStudiesDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      title: data.title,
      slug: data.slug,
      description: data.description,
      client: data.client || "Personal Project",
      role: data.role,
      stack: data.stack || [],
      duration: data.duration,
      coverImage: data.coverImage,
      liveUrl: data.liveUrl || "",
      githubUrl: data.githubUrl || "",
      metricHighlight: data.metricHighlight,
      publishedAt: data.publishedAt,
      content: content.trim(),
    };
  });

  // Sort by publishedAt — newest first
  caseStudies.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return caseStudies;
}

/**
 * Returns a single case study by its slug, or undefined if not found.
 */
export function getCaseStudyBySlug(slug) {
  const caseStudies = getAllCaseStudies();
  return caseStudies.find((cs) => cs.slug === slug);
}

/**
 * Returns an array of all unique tech stack items across all case studies.
 * Sorted alphabetically.
 * @returns {string[]}
 */
export function getAllCaseStudyTechStacks() {
  const caseStudies = getAllCaseStudies();
  return [...new Set(caseStudies.flatMap((cs) => cs.stack || []))].sort();
}
