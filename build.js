const fs = require('fs');
const path = require('path');

const SECTIONS_DIR = path.join(__dirname, 'sections');
const OUTPUT_FILE = path.join(__dirname, 'index.html');

console.log('Building portfolio from modular section files...');

// Read section files
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
const resumeHtml = readSection('resume.html');
const statsHtml = readSection('stats.html');
const servicesHtml = readSection('services.html');
const portfolioHtml = readSection('portfolio.html');
const contactHtml = readSection('contact.html');
const footerHtml = readSection('footer.html');

const template = `<!-- Getting started -->
<!-- All copyrights reserved -->
<!-- Michael James - Full Stack Software Engineer -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Michael James | Full Stack Software Engineer</title>
    <meta name="description" content="Michael James – Full Stack Software Engineer specializing in Python, Angular, TypeScript, PHP/Laravel, MySQL, PostgreSQL, and AWS Cloud. Available for freelance and remote work.">
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

