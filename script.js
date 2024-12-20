document.getElementById("dataForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const errorContainer = document.getElementById("errors");
  errorContainer.innerHTML = "";
  errorContainer.style.display = "none";

  const name = document.getElementById("name").value.trim();
  const group = document.getElementById("group").value.trim();
  const idCard = document.getElementById("idCard").value.trim();
  const birthdate = document.getElementById("birthdate").value.trim();
  const email = document.getElementById("email").value.trim();

  const nameRegex = /^([А-ЯІЇЄҐа-яіїєґ]|[A-Za-z])+\s([А-ЯІЇЄҐA-Z])\.$/; // Прізвище І.
  const groupRegex = /^[А-ЯІЇЄҐа-яіїєґA-Za-z]{2}-\d{2}$/; // ТТ-ЧЧ
  const idCardRegex = /^[А-ЯІЇЄҐA-Za-z]{2}\s№\d{6}$/; // ТТ №ЧЧЧЧЧЧ
  const birthdateRegex = /^\d{2}\.\d{2}\.\d{4}$/; // ДД.ММ.РРРР
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // example@mail.com

  let valid = true;
  const fields = [
    {
      regex: nameRegex,
      value: name,
      field: "name",
      error: "Неправильний формат ПІБ. Приклад: Прізвище І.",
    },
    {
      regex: groupRegex,
      value: group,
      field: "group",
      error: "Неправильний формат групи. Приклад: ТТ-ЧЧ",
    },
    {
      regex: idCardRegex,
      value: idCard,
      field: "idCard",
      error: "Неправильний формат ID-card. Приклад: ТТ №ЧЧЧЧЧЧ",
    },
    {
      regex: birthdateRegex,
      value: birthdate,
      field: "birthdate",
      error: "Неправильний формат дати народження. Приклад: 20.10.2010",
    },
    {
      regex: emailRegex,
      value: email,
      field: "email",
      error: "Неправильний формат email. Приклад: example@mail.com",
    },
  ];

  let errorMessages = [];

  fields.forEach(({ regex, value, field, error }) => {
    const input = document.getElementById(field);
    if (!regex.test(value)) {
      input.style.borderColor = "red";
      valid = false;
      errorMessages.push(error);
    } else {
      input.style.borderColor = "#ccc";
    }
  });

  if (valid) {
    document.getElementById("outputData").innerText = `ПІБ: ${name}
Група: ${group}
ID-card: ${idCard}
Дата народж.: ${birthdate}
E-mail: ${email}`;
    document.getElementById("output").style.display = "block";
  } else {
    document.getElementById("output").style.display = "none";

    errorContainer.innerHTML = "";

    errorMessages.forEach((msg) => {
      const errorItem = document.createElement("p");
      errorItem.textContent = msg;
      errorItem.style.color = "red";
      errorContainer.appendChild(errorItem);
    });
    errorContainer.style.display = "block";
  }
});

const VARIANT_NUMBER = 8;
const table = document.getElementById("interactiveTable");
const rows = 6;
const cols = 6;
let count = 1;

for (let i = 0; i < rows; i++) {
  const row = document.createElement("tr");
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("td");
    cell.textContent = count;
    cell.dataset.number = count;
    row.appendChild(cell);
    count++;
  }
  table.appendChild(row);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let selectedColor = "#FF0000";
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("change", (event) => {
  selectedColor = event.target.value;
});

table.addEventListener("mouseover", (event) => {
  const cell = event.target;
  if (cell.tagName === "TD" && +cell.dataset.number === VARIANT_NUMBER) {
    cell.style.backgroundColor = getRandomColor();
  }
});

table.addEventListener("click", (event) => {
  const cell = event.target;
  if (cell.tagName === "TD" && +cell.dataset.number === VARIANT_NUMBER) {
    cell.style.backgroundColor = selectedColor;
  }
});

table.addEventListener("dblclick", (event) => {
  const cell = event.target;
  if (cell.tagName === "TD") {
    let colIndex = cell.cellIndex; // Індекс стовпця, на якому був подвійний клік

    // Проходимо по всіх рядках
    for (let i = 0; i < rows; i++) {
      let currentColIndex = colIndex; // Початковий стовпець
      while (currentColIndex < cols) {
        // Змінюємо колір комірки
        table.rows[i].cells[currentColIndex].style.backgroundColor = selectedColor;

        // Переміщення на наступний стовпець через один
        currentColIndex += 2;
      }
    }
  }
});
