document.addEventListener('DOMContentLoaded', () => {
  // Profile image upload and preview
  const profileImageInput = document.getElementById('profile-image');
  const previewImage = document.getElementById('preview-image');

  if (profileImageInput) {
      profileImageInput.addEventListener('change', function (event) {
          const reader = new FileReader();
          const target = event.target;

          reader.onload = function () {
              previewImage.src = reader.result || '';
          };

          if (target.files && target.files.length > 0) {
              reader.readAsDataURL(target.files[0]);
          }
      });
  }

  // Generate resume on form submission
  const resumeForm = document.getElementById('resumeform');
  if (resumeForm) {
      resumeForm.addEventListener('submit', async function (event) {
          event.preventDefault();

          // Collect form data
          const resumeData = {
              firstName: document.getElementById('firstName').value || '',
              lastName: document.getElementById('lastName').value || '',
              designation: document.getElementById('designation').value || '',
              aboutme: document.getElementById('aboutme').value || '',
              education: document.getElementById('education').value || '',
              skills: document.getElementById('skills').value.split('\n').filter(skill => skill.trim() !== ''),
              certificates: document.getElementById('certificates').value.split('\n').filter(exp => exp.trim() !== ''),
              experience: document.getElementById('experience').value.split('\n').filter(exp => exp.trim() !== ''),
              careerObjective: document.getElementById('career-objective').value || '',
              profileImage: previewImage.src || '',
              whatsapp: document.getElementById('whatsapp').value || '',
              linkedin: document.getElementById('linkedin').value || '',
              portfolio: document.getElementById('portfolio').value || '',
              gitHub: document.getElementById('gitHub').value || '',
              email: document.getElementById('email').value || '',
              languages: {
                  urdu: document.getElementById('language-urdu').value || '0%',
                  english: document.getElementById('language-english').value || '0%'
              },
              professionalSkills: {
                  communicationSkills: document.querySelector('input[name="communicationSkills"]').value || '0%',
                  problemSolving: document.querySelector('input[name="problemSolving"]').value || '0%',
                  teamWork: document.querySelector('input[name="teamWork"]').value || '0%',
                  timeManagement: document.querySelector('input[name="timeManagement"]').value || '0%'
              }
          };

          // Convert skills and certificates into HTML list items
          const skillsList = resumeData.skills.map(skill => `<li>${skill}</li>`).join('');
          const certificatesList = resumeData.certificates.map(cert => `<li>${cert}</li>`).join('');
          const educationList = `<li>${resumeData.education}</li>`;

          // Create language section
          const languagesSection = `
              <h3>Languages</h3>
            <li> Urdu: <span class="language-ratio">${resumeData.languages.urdu}</span></li>
           <li> English: <span class="language-ratio">${resumeData.languages.english}</span></li>`;

          // Create professional skills section
          const professionalSkillsSection = `
              <h3>Professional Skills</h3>
              ${generateSkillBar('Communication Skills', resumeData.professionalSkills.communicationSkills)}
              ${generateSkillBar('Problem Solving', resumeData.professionalSkills.problemSolving)}
              ${generateSkillBar('Team Work', resumeData.professionalSkills.teamWork)}
              ${generateSkillBar('Time Management', resumeData.professionalSkills.timeManagement)}`;

          // Function to generate individual skill bar HTML
          function generateSkillBar(skillName, skillValue) {
              return `
                  <div class="skill">
                      <span>${skillName}</span>
                      <div class="skill-bar">
                          <div class="skill-per" style="width: ${skillValue};">
                              ${skillValue}
                          </div>
                      </div>
                  </div>`;
          }

        // Function to generate contact buttons with only icons displayed initially
function generateContactButtons() {
  return `
      <div class="contact-buttons">
          <a href="https://wa.me/${resumeData.whatsapp}" class="contact-button whatsapp" target="_blank">
              <i class="fab fa-whatsapp"></i><span>WhatsApp</span>
          </a>
          <a href="${resumeData.linkedin}" class="contact-button linkedin" target="_blank">
              <i class="fab fa-linkedin"></i><span>LinkedIn</span>
          </a>
          <a href="${resumeData.portfolio}" class="contact-button portfolio" target="_blank">
              <i class="fa fa-globe"></i><span>Portfolio</span>
          </a>
          <a href="mailto:${resumeData.email}" class="contact-button email">
              <i class="fa fa-envelope"></i><span>Email</span>
          </a>
          <a href="${resumeData.gitHub}" class="contact-button github" target="_blank">
              <i class="fab fa-github"></i><span>GitHub</span>
          </a>
          <a href="${resumeData.location}" class="contact-button location" target="_blank">
              <i class="fa fa-map-marker-alt"></i><span>Location</span>
          </a>
      </div>`;
}

          // Create the resume layout with left and right columns
          const resumeContent = `
              <div class="resume-container">
                  <div class="left-column">
                      <img src="${resumeData.profileImage}" alt="profile-image" style="width: 140px; height: 150px; border-radius: 50%; border: 2px solid rgb(25, 118, 240); margin-bottom: 20px; margin-top: 20px; margin-left:10px;">
                      <h3>Education</h3>
                      <ul>${educationList}</ul>
                      ${languagesSection}
                      <h3>Skills</h3>
                      <ul>${skillsList}</ul>
                      <h3>Certificates</h3>
                      <ul>${certificatesList}</ul>
                  </div>
                  <div class="right-column">
                      <h1>${resumeData.firstName} ${resumeData.lastName}</h1>
                      <h2>${resumeData.designation}</h2>
                      ${generateContactButtons()}
                      <hr>
                      <h3>About Me</h3>
                      <p>${resumeData.aboutme}</p>
                      <hr>
                      <h3>Career Objective</h3>
                      <p>${resumeData.careerObjective}</p>
                      <hr>
                      <h3>Experience</h3>
                      <p>${resumeData.careerObjective}</p>
                      ${professionalSkillsSection}
                  </div>
              </div>`;

          // Display the generated resume
          const resumeOutput = document.getElementById('resumeOutput');
          if (resumeOutput) {
              resumeOutput.innerHTML = resumeContent;

              // Show the download button after resume generation
              const downloadButton = document.getElementById('downloadButton');
              if (downloadButton) {
                  downloadButton.style.display = 'block';

                  // Add functionality to download the resume as PDF using html2pdf.js
                  downloadButton.addEventListener('click', () => {
                      const element = document.getElementById('resumeOutput');
                      html2pdf().from(element).save();
                  });
                  // Add shareable links section after generating the resume
// Define the URLs for each social media link
var shareLinks = {
    whatsapp: "https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20content:%20YOUR_LINK_HERE",
    email: "mailto:?subject=Check%20this%20out!&body=I%20found%20this%20interesting:%20YOUR_LINK_HERE",
    linkedin: "https://www.linkedin.com/shareArticle?mini=true&url=YOUR_LINK_HERE",
    github: "YOUR_GITHUB_PROFILE_LINK" // Update this link with your GitHub profile or content URL
};
// Get the container element for the social media icons
var socialMediaContainer = document.querySelector('.social_media');
// Check if the container exists
if (socialMediaContainer) {
    // Select all anchor elements within the container
    var socialMediaLinks = socialMediaContainer.querySelectorAll('a');
    // Loop through each anchor element and set the appropriate href attribute
    socialMediaLinks.forEach(function (link) {
        var icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-whatsapp')) {
                link.href = shareLinks.whatsapp;
            }
            else if (icon.classList.contains('fa-envelope')) {
                link.href = shareLinks.email;
            }
            else if (icon.classList.contains('fa-linkedin')) {
                link.href = shareLinks.linkedin;
            }
            else if (icon.classList.contains('fa-github')) {
                link.href = shareLinks.github;
            }
            // Open the link in a new tab
            link.target = "_blank";
        }
    });
}
else {
    console.error("Social media container element not found!");
}


// Append shareable links to the resumeOutput
if (resumeOutput) {
resumeOutput.innerHTML += shareableLinksHTML;
}
              }
          }
      });
  }
});
