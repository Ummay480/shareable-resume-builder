// Define an interface for the resume data
interface ResumeData {
  firstName: string;
  lastName: string;
  designation: string;
  aboutme: string;
  education: string;
  skills: string[];
  certificates: string[];
  experience: string[];
  careerObjective: string;
  profileImage: string;
  whatsapp: string;
  linkedin: string;
  portfolio: string;
  gitHub: string;
  email: string;
  location: string;
  languages: {
      urdu: string;
      english: string;
  };
  professionalSkills: {
      communicationSkills: string;
      problemSolving: string;
      teamWork: string;
      timeManagement: string;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  // Profile image upload and preview
  const profileImageInput = document.getElementById('profile-image') as HTMLInputElement | null;
  const previewImage = document.getElementById('preview-image') as HTMLImageElement | null;

  if (profileImageInput && previewImage) {
      profileImageInput.addEventListener('change', function (event: Event) {
          const reader = new FileReader();
          const target = event.target as HTMLInputElement;

          reader.onload = function () {
              if (reader.result && previewImage) {
                  previewImage.src = reader.result.toString();
              }
          };

          if (target.files && target.files.length > 0) {
              reader.readAsDataURL(target.files[0]);
          }
      });
  }

  // Generate resume on form submission
  const resumeForm = document.getElementById('resumeform') as HTMLFormElement | null;
  if (resumeForm) {
      resumeForm.addEventListener('submit', async function (event: Event) {
          event.preventDefault();

          // Collect form data
          const resumeData: ResumeData = {
              firstName: (document.getElementById('firstName') as HTMLInputElement).value || '',
              lastName: (document.getElementById('lastName') as HTMLInputElement).value || '',
              designation: (document.getElementById('designation') as HTMLInputElement).value || '',
              aboutme: (document.getElementById('aboutme') as HTMLInputElement).value || '',
              education: (document.getElementById('education') as HTMLInputElement).value || '',
              skills: (document.getElementById('skills') as HTMLInputElement).value.split('\n').filter(skill => skill.trim() !== ''),
              certificates: (document.getElementById('certificates') as HTMLInputElement).value.split('\n').filter(cert => cert.trim() !== ''),
              experience: (document.getElementById('experience') as HTMLInputElement).value.split('\n').filter(exp => exp.trim() !== ''),
              careerObjective: (document.getElementById('career-objective') as HTMLInputElement).value || '',
              profileImage: previewImage?.src || '',
              whatsapp: (document.getElementById('whatsapp') as HTMLInputElement).value || '',
              linkedin: (document.getElementById('linkedin') as HTMLInputElement).value || '',
              portfolio: (document.getElementById('portfolio') as HTMLInputElement).value || '',
              gitHub: (document.getElementById('gitHub') as HTMLInputElement).value || '',
              email: (document.getElementById('email') as HTMLInputElement).value || '',
              location: (document.getElementById('location') as HTMLInputElement).value || '',
              languages: {
                  urdu: (document.getElementById('language-urdu') as HTMLInputElement).value || '0%',
                  english: (document.getElementById('language-english') as HTMLInputElement).value || '0%',
              },
              professionalSkills: {
                  communicationSkills: (document.querySelector('input[name="communicationSkills"]') as HTMLInputElement).value || '0%',
                  problemSolving: (document.querySelector('input[name="problemSolving"]') as HTMLInputElement).value || '0%',
                  teamWork: (document.querySelector('input[name="teamWork"]') as HTMLInputElement).value || '0%',
                  timeManagement: (document.querySelector('input[name="timeManagement"]') as HTMLInputElement).value || '0%',
              }
          };

          // Function to generate individual skill bar HTML
          function generateSkillBar(skillName: string, skillValue: string): string {
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

          // Generate contact buttons
          function generateContactButtons(): string {
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
                      <ul><li>${resumeData.education}</li></ul>
                      <h3>Languages</h3>
                      <ul>
                          <li>Urdu: <span class="language-ratio">${resumeData.languages.urdu}</span></li>
                          <li>English: <span class="language-ratio">${resumeData.languages.english}</span></li>
                      </ul>
                      <h3>Skills</h3>
                      <ul>${resumeData.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                      <h3>Certificates</h3>
                      <ul>${resumeData.certificates.map(cert => `<li>${cert}</li>`).join('')}</ul>
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
                      <p>${resumeData.experience.join('</p><p>')}</p>
                      ${generateSkillBar('Communication Skills', resumeData.professionalSkills.communicationSkills)}
                      ${generateSkillBar('Problem Solving', resumeData.professionalSkills.problemSolving)}
                      ${generateSkillBar('Team Work', resumeData.professionalSkills.teamWork)}
                      ${generateSkillBar('Time Management', resumeData.professionalSkills.timeManagement)}
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
              }
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

          }
      });
  }
});
