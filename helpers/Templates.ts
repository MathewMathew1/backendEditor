const templates: {template: string, templateName: string}[] = []

const letterTemplate = '<span class="page" style="display: grid; grid-template-columns: 150mm 60mm; padding-top: 20px; height: 297mm; box-sizing: border-box; overflow: hidden">'
    +'<span class="column" style="height: fit-content">'
    +  '<p style="margin-left:20mm;"><span style="font-weight: bold;  font-size: 36px;">Your Name<br/></span><span style="font-size: 12px;">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 20px"><span style="color:#2079c7; font-size:14px">EXPERIENCE</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 2px"><span style="font-weight: bold;">Company</span><span>, Location — Job Title</span><br/><span style="font-size:10px">MONTH 20XX - PRESENT<br/></span>'  
    +  '<span style="font-size: 14px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 10px"><span style="font-weight: bold;">Company</span><span>, Location — Job Title</span><br/><span style="font-size:10px">MONTH 20XX - MONTH 20XX<br/></span>'  
    +  '<span style="font-size: 14px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 10px"><span style="font-weight: bold;">Company</span><span>, Location — Job Title</span><br/><span style="font-size:10px">MONTH 20XX - MONTH 20XX<br/></span>'  
    +  '<span style="font-size: 14px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 10px"><span style="color:#2079c7; font-size:14px">EDUCATION</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 2px"><span style="font-weight: bold;">School Name</span><span>, Location — Degree</span><br/><span style="font-size:10px">MONTH 20XX - PRESENT<br/></span>'  
    +  '<span style="font-size: 14px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore.</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 2px"><span style="font-weight: bold;">School Name</span><span>, Location — Degree</span><br/><span style="font-size:10px">MONTH 20XX - PRESENT<br/></span>'  
    +  '<span style="font-size: 14px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam.</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 10px"><span style="color:#2079c7; font-size:14px">PROJECTS</span></p>'
    +  '<p style="margin-left:20mm; padding-top: 2px"><span style="font-weight: bold;">Project Name</span><span> — Detail<br/></span>'  
    +  '<span style="font-size: 14px">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</span></p>'
    +'</span>'
    +'<span style="margin-left: 20px; height: fit-content" class="column">'
    +'<p><span style="font-size: 12px">123 Your Street <br/> Your City, ST 12345 <br/></span><span style="font-size: 12px; font-weight: bold;">(123) 456-7890 <br/>no_reply@example.com</span></p>'
    +'<p style="padding-top: 20px; margin-right: 20px"><span style="color:#2079c7; font-size:14px">SKILLS</span></p>'
    +'<p style="padding-top: 10px; margin-right: 20px"><span style="font-size:14px">Lorem ipsum dolor sit amet.<br/>Consectetuer adipiscing elit.<br/>Sed diam nonummy nibh euismod tincidunt.<br/>L​​​‌​aoreet dolore magna aliquam erat volutpat.</span></p>'
    +'<p style="padding-top: 20px; margin-right: 20px "><span style="color:#2079c7; font-size:14px">AWARDS</span></p>'
    +'<p style="padding-top: 10px; margin-right: 20px"><span style="font-size:14px; font-weight: bold;">Lorem ipsum dolor sit</span> amet<br/><span style="font-size:14px;">Consectetuer adipiscing elit, Sed diam nonummy</span></p>'
    +'<p style="padding-top: 10px; margin-right: 20px"><span style="font-size:14px; font-weight: bold;">Nibh euismod tincidunt </span>ut <br/><span style="font-size:14px;">laoreet dolore magna aliquam </span></p>'
    +'<p style="padding-top: 10px; margin-right: 20px"><span style="font-size:14px; font-weight: bold;">Lorem ipsum dolor sit </span>amet<br/><span style="font-size:14px;">Consectetuer adipiscing elit, Sed diam nonummy</span></p>'
    +'<p style="padding-top: 10px; margin-right: 20px"><span style="font-size:14px; font-weight: bold;">Nibh euismod tincidun </span>ut<br/><span style="font-size:14px;">laoreet dolore magna aliquam erat volutpat.</span></p>'
    +'<p style="padding-top: 20px; margin-right: 20px "><span style="color:#2079c7; font-size:14px">LANGUAGES</span></p>'
    +'</span>'
    +'</span>'


templates.push({template: letterTemplate, templateName: "letter"})
templates.push({template: letterTemplate, templateName: "letter"})
templates.push({template: letterTemplate, templateName: "letter"})
templates.push({template: letterTemplate, templateName: "letter"})

export default templates