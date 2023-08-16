function replaceFileName(path) {
  return String(path).split("/")[0];
}

function slugify(str) {
  return encodeURIComponent(replaceFileName(str).trim().replace(/\s+/g, "-"));
}

export default require
  .context("../pages", true, /^\.\/.*\.vue$/)
  .keys()
  .map((page) => page.slice(2).replace(".vue", ""))
  .filter((page) => !page.includes("form-example"))
  .map((page) => ({
    file: page,
    title: page + ".vue",
    path: slugify(page),
  }));
