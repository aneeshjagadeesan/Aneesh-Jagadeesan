// Fills the page from data.js. You normally don't need to edit this file.
(function () {
  const P = PROFILE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = P.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  document.title = `${P.name} — Portfolio`;
  $("logo").textContent = initials;
  $("name").textContent = P.name;
  $("role").textContent = P.role + (P.location ? `  ·  ${P.location}` : "");
  $("intro").textContent = P.intro;
  $("about-text").textContent = P.about;
  $("footer-name").textContent = P.name;
  $("year").textContent = new Date().getFullYear();

  $("avatar").innerHTML = P.photo
    ? `<img src="${esc(P.photo)}" alt="${esc(P.name)}">`
    : esc(initials);

  $("skills").innerHTML = P.skills.map((s) => `<li>${esc(s)}</li>`).join("");

  $("project-grid").innerHTML = P.projects.map((p) => `
    <article class="card reveal">
      <div class="card-top">
        <span class="card-icon">&#9671;</span>
        ${p.link ? `<a class="card-link" href="${esc(p.link)}" target="_blank" rel="noopener">View &#8599;</a>` : ""}
      </div>
      <h4>${esc(p.title)}</h4>
      <p>${esc(p.description)}</p>
      <div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
    </article>`).join("");

  if (!P.experience || !P.experience.length) {
    $("experience").remove();
    $("nav-exp").remove();
  } else {
    $("timeline").innerHTML = P.experience.map((e) => `
      <li class="reveal">
        <span class="when">${esc(e.when)}</span>
        <h4>${esc(e.title)} <span class="place">@ ${esc(e.place)}</span></h4>
        <p>${esc(e.details)}</p>
      </li>`).join("");
  }

  const c = P.contact || {};
  const links = [
    c.email && [`mailto:${c.email}`, "Email me", true],
    c.github && [c.github, "GitHub"],
    c.linkedin && [c.linkedin, "LinkedIn"],
    c.twitter && [c.twitter, "Twitter / X"],
    c.resume && [c.resume, "Résumé"],
  ].filter(Boolean);
  $("contact-links").innerHTML = links.map(([href, label, primary]) =>
    `<a class="btn${primary ? " primary" : ""}" href="${esc(href)}" target="_blank" rel="noopener">${label}</a>`
  ).join("");

  // Fade sections in as you scroll
  document.querySelectorAll(".section, .hero").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
