const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'sections');
const DIST_DIR = path.join(__dirname, 'dist');
const OUTPUT_FILE = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

console.log('Building bundled static portfolio into dist/index.html...');

const readSection = (filename) => {
    const filePath = path.join(SECTIONS_DIR, filename);
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: Section file ${filename} not found at ${filePath}`);
        return '';
    }
    return fs.readFileSync(filePath, 'utf8').trim();
};

const headerHtml = readSection('header.html');
const navbarHtml = readSection('navbar.html');
const aboutHtml = readSection('about.html');
let resumeHtml = readSection('resume.html');
const experienceHtml = readSection('experience.html');
const skillsHtml = readSection('skills.html');
const educationHtml = readSection('education.html');
const statsHtml = readSection('stats.html');
const servicesHtml = readSection('services.html');
const portfolioHtml = readSection('portfolio.html');
const contactHtml = readSection('contact.html');
const footerHtml = readSection('footer.html');

resumeHtml = resumeHtml
    .replace('<div class="resume-tab-pane" id="tab-experience" style="display: block;" data-include="sections/experience.html"></div>', '<div class="resume-tab-pane" id="tab-experience" style="display: block;">' + experienceHtml + '</div>')
    .replace('<div class="resume-tab-pane" id="tab-skills" style="display: none;" data-include="sections/skills.html"></div>', '<div class="resume-tab-pane" id="tab-skills" style="display: none;">' + skillsHtml + '</div>')
    .replace('<div class="resume-tab-pane" id="tab-education" style="display: none;" data-include="sections/education.html"></div>', '<div class="resume-tab-pane" id="tab-education" style="display: none;">' + educationHtml + '</div>');

const template = `<!-- Getting started -->
<!-- All copyrights reserved -->
<!-- Michael James - Full Stack Software Engineer -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Michael James | Full Stack Software Engineer</title>
    <meta name="description" content="Michael James – Full Stack Software Engineer at Britam. Specializing in Python, Angular, React, TypeScript, PHP/Laravel, PostgreSQL, and AWS Cloud. Open for remote engineering contracts.">
    <meta name="keywords" content="Michael James, Software Developer, Full Stack Engineer, Britam, Python, Laravel, Angular, React, TypeScript, Kenya, Remote Developer, Daraja API">
    <meta name="author" content="Michael James">

    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://michaeljames.netlify.app">
    <meta property="og:title" content="Michael James | Full Stack Software Engineer">
    <meta property="og:description" content="Full Stack Software Engineer at Britam. Specializing in Python, Angular, React, TypeScript, PHP/Laravel, PostgreSQL, and AWS Cloud.">
    <meta property="og:image" content="assets/imgs/avatar.png">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@cappellaMJ">
    <meta name="twitter:creator" content="@cappellaMJ">
    <meta name="twitter:title" content="Michael James | Full Stack Software Engineer">
    <meta name="twitter:description" content="Full Stack Software Engineer at Britam. Specializing in Python, Angular, React, TypeScript, PHP/Laravel, PostgreSQL, and AWS Cloud.">
    <meta name="twitter:image" content="assets/imgs/avatar.png">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="assets/imgs/avatar.png">
    <link rel="apple-touch-icon" href="assets/imgs/avatar.png">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- font icons -->
    <link rel="stylesheet" href="assets/vendors/themify-icons/css/themify-icons.css">
    <!-- Bootstrap + Michael James main styles -->
    <link rel="stylesheet" href="assets/css/michaeljames.css">
    <!-- Redesigned Resume, Experience & Skills styles -->
    <link rel="stylesheet" href="assets/css/resume.css">
    <!-- Redesigned Sections (Hero, About, Metrics, Services, Contact, Footer) -->
    <link rel="stylesheet" href="assets/css/sections-redesign.css">
</head>

<body data-spy="scroll" data-target=".navbar" data-offset="40" id="home">

<!-- ==================== HEADER SECTION ==================== -->
${headerHtml}

<!-- ==================== NAVBAR SECTION ==================== -->
${navbarHtml}

<!-- ==================== ABOUT SECTION ==================== -->
${aboutHtml}

<!-- ==================== RESUME SECTION (EXPERIENCE, SKILLS, EDUCATION) ==================== -->
${resumeHtml}

<!-- ==================== STATS SECTION ==================== -->
${statsHtml}

<!-- ==================== SERVICES SECTION ==================== -->
${servicesHtml}

<!-- ==================== PORTFOLIO SECTION ==================== -->
${portfolioHtml}

<!-- ==================== CONTACT SECTION ==================== -->
${contactHtml}

<!-- ==================== FOOTER SECTION ==================== -->
${footerHtml}

<!-- core -->
<script src="assets/vendors/jquery/jquery-3.4.1.js"></script>
<script src="assets/vendors/bootstrap/bootstrap.bundle.js"></script>

<!-- bootstrap affix -->
<script src="assets/vendors/bootstrap/bootstrap.affix.js"></script>

<!-- Google maps -->
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtme10pzgKSPeJVJrG1O3tjR6lk98o4w8&callback=initMap"></script>

<!-- Michael James main js -->
<script src="assets/js/michaeljames.js"></script>

<!-- Start of Tawk.to Script -->
<script type="text/javascript">
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function(){
var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
s1.async = true;
s1.src = 'https://embed.tawk.to/66056133a0c6737bd125f1db/1hq2g7d2p';
s1.charset = 'UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1, s0);
})();
</script>
<!-- End of Tawk.to Script -->

</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, template, 'utf8');
console.log(`Successfully compiled portfolio into ${OUTPUT_FILE} (${fs.statSync(OUTPUT_FILE).size} bytes)`);

