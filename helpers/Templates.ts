const templates: {template: string, templateName: string}[] = []

const resumeTemplate = '<span class="page" style="display: grid; grid-template-columns: 150mm 60mm; padding-top: 20mm; height: 297mm; box-sizing: border-box; overflow: hidden">'
  + '<span class="column" style="height: fit-content">'
  + '<p style="margin-left:20mm;"><span style="font-weight: bold; font-size: 34pt;">Your Name<br/></span><span style="font-size: 9pt;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span></p>'
  + '<p style="margin-left:20mm; padding-top: 7.5mm"><span style="color:#2079c7; font-size:10.5pt">EXPERIENCE</span></p>'
  + '<p style="margin-left:20mm; padding-top: 0.75mm"><span style="font-weight: bold;">Company</span><span>, Location — Job Title</span><br/><span style="font-size:7.5pt">MONTH 20XX - PRESENT<br/></span>'
  + '<span style="font-size: 10.5pt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</span></p>'
  + '<p style="margin-left:20mm; padding-top: 3.75mm"><span style="font-weight: bold;">Company</span><span>, Location — Job Title</span><br/><span style="font-size:7.5pt">MONTH 20XX - MONTH 20XX<br/></span>'
  + '<span style="font-size: 10.5pt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</span></p>'
  + '<p style="margin-left:20mm; padding-top: 3.75mm"><span style="font-weight: bold;">Company</span><span>, Location — Job Title</span><br/><span style="font-size:7.5pt">MONTH 20XX - MONTH 20XX<br/></span>'
  + '<span style="font-size: 10.5pt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</span></p>'
  + '<p style="margin-left:20mm; padding-top: 3.75mm"><span style="color:#2079c7; font-size:10.5pt">EDUCATION</span></p>'
  + '<p style="margin-left:20mm; padding-top: 0.75mm"><span style="font-weight: bold;">School Name</span><span>, Location — Degree</span><br/><span style="font-size:7.5pt">MONTH 20XX - PRESENT<br/></span>'
  + '<span style="font-size: 10.5pt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</span></p>'
  + '<p style="margin-left:20mm; padding-top: 0.75mm"><span style="font-weight: bold;">School Name</span><span>, Location — Degree</span><br/><span style="font-size:7.5pt">MONTH 20XX - PRESENT<br/></span>'
  + '<span style="font-size: 10.5pt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam.</span></p>'
  + '<p style="margin-left:20mm; padding-top: 3.75mm"><span style="color:#2079c7; font-size:10.5pt">PROJECTS</span></p>'
  + '<p style="margin-left:20mm; padding-top: 0.75mm"><span style="font-weight: bold;">Project Name</span><span> — Detail<br/></span>'
  + '<span style="font-size: 10.5pt">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span></p>'
  + '</span>'
  + '<span style="margin-left: 7.5mm; height: fit-content" class="column">'
  + '<p><span style="font-size: 9pt">123 Your Street <br/> Your City, ST 12345 <br/></span><span style="font-size: 9pt; font-weight: bold;">(123) 456-7890 <br/>no_reply@example.com</span></p>'
  + '<p style="padding-top: 7.5mm; margin-right: 7.5mm"><span style="color:#2079c7; font-size:10.5pt">SKILLS</span></p>'
  + '<p style="padding-top: 3.75mm; margin-right: 7.5mm"><span style="font-size:10.5pt">Lorem ipsum dolor sit amet.<br/>Consectetuer adipiscing elit.<br/>Sed diam nonummy nibh euismod tincidunt.<br/>L​​​‌​aoreet dolore magna aliquam erat volutpat.</span></p>'
  + '<p style="padding-top: 7.5mm; margin-right: 7.5mm"><span style="color:#2079c7; font-size:10.5pt">AWARDS</span></p>'
  + '<p style="padding-top: 3.75mm; margin-right: 7.5mm"><span style="font-size:10.5pt; font-weight: bold;">Lorem ipsum dolor sit</span> amet<br/><span style="font-size:10.5pt;">Consectetuer adipiscing elit, Sed diam nonummy</span></p>'
  + '<p style="padding-top: 3.75mm; margin-right: 7.5mm"><span style="font-size:10.5pt; font-weight: bold;">Nibh euismod tincidunt </span>ut <br/><span style="font-size:10.5pt;">laoreet dolore magna aliquam </span></p>'
  + '<p style="padding-top: 3.75mm; margin-right: 7.5mm"><span style="font-size:10.5pt; font-weight: bold;">Lorem ipsum dolor sit </span>amet<br/><span style="font-size:10.5pt;">Consectetuer adipiscing elit, Sed diam nonummy</span></p>'
  + '<p style="padding-top: 3.75mm; margin-right: 7.5mm"><span style="font-size:10.5pt; font-weight: bold;">Nibh euismod tincidunt </span>ut<br/><span style="font-size:10.5pt;">laoreet dolore magna aliquam erat volutpat.</span></p>'
  + '<p style="padding-top: 7.5mm; margin-right: 7.5mm"><span style="color:#2079c7; font-size:10.5pt">LANGUAGES</span></p>'
  + '</span>'
  + '</span>';


const blank = '<span class="page" style="display: grid; grid-template-columns: 210mm; padding-top: 5.25mm; height: 297mm; box-sizing: border-box; overflow: hidden">'
  + '<span class="column" style="height: fit-content">'
  + '<p style="margin-left:20mm;"><span>New Document</span></p>'
  + '</span>'
  + '</span>'; 

templates.push({template: blank, templateName: "Blank"})
templates.push({template: resumeTemplate, templateName: "Resume"})

templates.push({template: resumeTemplate, templateName: "letter"})
templates.push({template: resumeTemplate, templateName: "letter"})

export default templates