document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.expandable');
    const links = document.querySelectorAll('.section-link');

    sections.forEach(section => {
        section.querySelector('h2').addEventListener('click', () => {
            section.classList.toggle('active');
        });
    });

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            targetSection.scrollIntoView({behavior: 'smooth'});
        });
    });

    document.getElementById('download-pdf').addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        const sections = document.querySelectorAll('.expandable');
        let yOffset = 10;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(0, 0, 0);
        pdf.text("Claude Shannon - Père de la théorie de l'information", 10, yOffset);
        yOffset += 10;

        sections.forEach(section => {
            const title = section.querySelector('h2').textContent;
            const content = section.querySelector('.content').textContent;

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(12); // Réduit la taille de la police pour les titres de section
            pdf.setTextColor(0, 0, 0);
            pdf.text(title, 10, yOffset);
            yOffset += 8;

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10); // Réduit la taille de la police pour le contenu
            pdf.setTextColor(0, 0, 0);
            const splitContent = pdf.splitTextToSize(content, 180);
            pdf.text(splitContent, 10, yOffset);
            yOffset += splitContent.length * 4 + 8; // Réduit l'espacement entre les paragraphes
        });

        pdf.save('claude-shannon.pdf');
    });
});