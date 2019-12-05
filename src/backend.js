export function concatDoctor(firstName, lastName){
  return "first_name=" + firstName + "&last_name=" + lastName;
}

export class DoctorService {
  async getDoctor(ailment, doctor) {
    try {
      let response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?name=${doctor}&query=${ailment}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.API_KEY}`)
      let jsonifiedResponse = await response.json()
      return jsonifiedResponse
    } catch(error) {
      console.error("There was an error." + error.message)
    }
  }
}


export function buildDoctorHTML(doctor){
  let html = `
  <div class="doctor">
  ${doctor.profile.first_name} ${doctor.profile.last_name}
  </div>
  `;

  return html;
}

export function buildDoctorPractices(doctor){
  let websiteFallback = "<em>No website</em>";
  let firstPractice = doctor.practices[0];
  let phtml = `
  <div class="practice">
  ${firstPractice.visit_address.street}<br>
  ${firstPractice.visit_address.city},
  ${firstPractice.visit_address.state}<br>
  ${firstPractice.visit_address.zip}<br>
  ${firstPractice.phones[0].number}<br>
  ${firstPractice.website || websiteFallback}<br>
  Accepting new patients: ${firstPractice.accepts_new_patients}
  </div>
  <hr>
  `;
  return phtml;
}
