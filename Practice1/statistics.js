import { sortUsers } from "./JS-User-methods/sort-users.js";

//const tableBody = document.querySelector(".data-table tbody");
//const tableHeader = document.querySelectorAll(".data-table thead th");

let currentSortField = null;
let currentSortDirection = "asc";
// export function renderStatistics(usersList) {
//   tableBody.innerHTML = "";

//   const rows = usersList.map((user) => {
//     const tr = document.createElement("tr");

//     const tdName = document.createElement("td");
//     tdName.textContent = user.full_name || "-";

//     const tdSubject = document.createElement("td");
//     tdSubject.textContent = user.course || "-";

//     const tdAge = document.createElement("td");
//     tdAge.textContent = user.age || "-";

//     const tdGender = document.createElement("td");
//     tdGender.textContent = user.gender
//       ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
//       : "-";

//     const tdCountry = document.createElement("td");
//     tdCountry.textContent = user.country || "-";

//     tr.append(tdName, tdSubject, tdAge, tdGender, tdCountry);

//     return tr;
//   });

//   tableBody.append(...rows);
// }

let wdrTable = null;

let chartGender = null;
let chartSubject = null;
let chartCountry = null;
let chartAge = null;

export function initStaticticsTable(users) {
  if (chartGender) chartGender.destroy();
  if (chartSubject) chartSubject.destroy();
  if (chartCountry) chartCountry.destroy();
  if (chartAge) chartAge.destroy();

  const colors = [
    "#f65e49",
    "#f5d13b",
    "#333333",
    "#ff8a75",
    "#e6c12c",
    "#888888",
    "#a6392a",
    "#ffe066",
    "#555555",
    "#f8aca1",
    "#cccccc",
    "#d94d3a",
  ];

  const canvasGender = document.querySelector("#statistics-canvas-gender");
  const canvasSubject = document.querySelector("#statistics-canvas-subject");
  const canvasCountry = document.querySelector("#statistics-canvas-country");
  const canvasAge = document.querySelector("#statistics-canvas-age");

  const maleNumeber = users.filter((u) => u.gender === "male").length;
  const femaleNumber = users.filter((u) => u.gender === "female").length;
  chartGender = new Chart(canvasGender, {
    type: "pie",
    data: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "Statisctics by gender",
          data: [maleNumeber, femaleNumber],
          backgroundColor: ["#ADD2E4", "#F678A7"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "GENDER",
        },
      },
    },
  });

  const countries = _.countBy(users, "country");

  chartCountry = new Chart(canvasCountry, {
    type: "pie",
    data: {
      labels: Object.keys(countries),
      datasets: [
        {
          label: "Statisctics by country",
          data: Object.values(countries),
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "COUNTRY",
        },
      },
    },
  });

  const subjects = _.countBy(users, "course");

  chartSubject = new Chart(canvasSubject, {
    type: "pie",
    data: {
      labels: Object.keys(subjects),
      datasets: [
        {
          label: "Statisctics by subject",
          data: Object.values(subjects),
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "SUBJECTS",
        },
      },
    },
  });

  const ageGroups = { "18-30": 0, "31-45": 0, "46-60": 0, "61+": 0 };

  users.forEach((user) => {
    if (user.age >= 18 && user.age <= 30) ageGroups["18-30"]++;
    else if (user.age >= 31 && user.age <= 45) ageGroups["31-45"]++;
    else if (user.age >= 46 && user.age <= 60) ageGroups["46-60"]++;
    else if (user.age >= 61) ageGroups["61+"]++;
  });

  chartAge = new Chart(canvasAge, {
    type: "pie",
    data: {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: "Statisctics by age",
          data: Object.values(ageGroups),
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "AGE",
        },
      },
    },
  });

  const wdrData = users.map((user) => {
    return {
      Name: user.full_name,
      Speciality: user.course,
      Age: user.age,
      Gender: user.gender,
      Country: user.country,
    };
  });

  const reportConfig = {
    dataSource: {
      data: wdrData,
    },
    slice: {
      rows: [{ uniqueName: "Country" }],
      measures: [
        {
          uniqueName: "Name",
          aggregation: "count",
          caption: "Number of Teachers",
        },
      ],
    },
    options: {
      grid: {
        type: "compact",
        title: "Teachers Report",
      },
    },
  };

  if (wdrTable) {
    wdrTable.setReport(reportConfig);
  } else {
    wdrTable = new WebDataRocks({
      container: "#wdr-component",
      toolbar: true,
      report: reportConfig,
    });
  }
}
