/*jshint esversion: 8 */
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { buildDoctorHTML } from './../src/backend.js';
import { buildDoctorPractices } from './../src/backend.js';
import { DoctorService } from './../src/backend.js';


$(document).ready(function() {
  $("#button").click(function() {

    let doctorNameInput = $("#doctorNameInput").val();
    let ailment = $("#ailmentInput").val();
    $("#doctorFirstNameInput").val("");
    $("#doctorLastNameInput").val("");
    $("#ailmentInput").val("");

    (async () => {
      let doctorCall = new DoctorService();
      const response = await doctorCall.getDoctor(ailment, doctorNameInput);
      displayInfo(response);
    })();

    function displayInfo(response) {
      let doctors = response.data;
      if (response.meta.total === 0){
        $("#doctorList").append("I'm sorry about that. We are unable to find a doctor willing to treat this ailment.");
      }
      if (ailment === ""){
        $("#doctorList").append("I'm sorry about that. We are unable to find a doctor willing to treat this ailment.");
      }
      doctors.forEach(function(doctor) {
        let html = buildDoctorHTML(doctor);
        $("#doctorList").append(html);
        let phtml = buildDoctorPractices(doctor);
        $("#doctorList").append(phtml);
      });
    }
  });

});
