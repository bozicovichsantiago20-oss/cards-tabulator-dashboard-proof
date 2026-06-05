const players = [
  ["Michael Jordan", "1986 Fleer Rookie", "PSA 10", 245000, "Vault"],
  ["LeBron James", "2003 Topps Chrome", "BGS 9.5", 38000, "Listed"],
  ["Stephen Curry", "2009 Topps Rookie", "PSA 10", 12500, "Vault"],
  ["Kobe Bryant", "1996 Topps Chrome", "PSA 9", 9800, "Watch"],
  ["Victor Wembanyama", "2023 Prizm Silver", "PSA 10", 4200, "Review"],
  ["Luka Doncic", "2018 Prizm Silver", "PSA 10", 7600, "Vault"],
  ["Caitlin Clark", "2024 Draft Night", "Raw", 850, "Listed"],
  ["Shaquille O'Neal", "1992 Stadium Club", "PSA 9", 640, "Sold"],
  ["Giannis Antetokounmpo", "2013 Prizm", "PSA 10", 6800, "Vault"],
  ["Nikola Jokic", "2015 Prizm", "PSA 10", 5200, "Watch"],
  ["Kevin Durant", "2007 Topps Chrome", "BGS 9.5", 4900, "Listed"],
  ["Anthony Edwards", "2020 Prizm Silver", "PSA 10", 3100, "Review"],
  ["Jayson Tatum", "2017 Optic Holo", "PSA 10", 2100, "Vault"],
  ["A'ja Wilson", "2018 Rookie", "PSA 9", 740, "Listed"],
  ["Tim Duncan", "1997 Finest Refractor", "PSA 9", 1900, "Watch"],
  ["Allen Iverson", "1996 Chrome Refractor", "PSA 9", 2600, "Vault"],
  ["Dirk Nowitzki", "1998 Topps Chrome", "PSA 10", 1800, "Sold"],
  ["Shai Gilgeous-Alexander", "2018 Prizm", "PSA 10", 2400, "Review"],
  ["Ja Morant", "2019 Prizm Silver", "PSA 10", 1450, "Listed"],
  ["Dwyane Wade", "2003 Topps Chrome", "PSA 9", 1350, "Vault"],
  ["Magic Johnson", "1980 Topps", "PSA 8", 7200, "Watch"],
  ["Larry Bird", "1980 Topps", "PSA 8", 6900, "Vault"],
  ["Kareem Abdul-Jabbar", "1969 Topps", "PSA 7", 16000, "Listed"],
  ["Bill Russell", "1957 Topps", "PSA 6", 22000, "Vault"],
  ["Hakeem Olajuwon", "1986 Fleer", "PSA 9", 2300, "Sold"],
  ["Charles Barkley", "1986 Fleer", "PSA 9", 1700, "Watch"],
  ["Scottie Pippen", "1988 Fleer", "PSA 10", 3600, "Listed"],
  ["Trae Young", "2018 Prizm Silver", "PSA 10", 950, "Review"],
  ["Paolo Banchero", "2022 Prizm Silver", "PSA 10", 1200, "Vault"],
  ["Diana Taurasi", "2004 Rookie", "PSA 9", 880, "Watch"],
  ["Sue Bird", "2002 Rookie", "PSA 9", 760, "Listed"],
  ["Breanna Stewart", "2016 Rookie", "PSA 10", 690, "Sold"],
  ["Jalen Brunson", "2018 Prizm", "PSA 10", 720, "Vault"],
  ["Devin Booker", "2015 Prizm", "PSA 10", 1700, "Listed"],
  ["Zion Williamson", "2019 Prizm Silver", "PSA 10", 980, "Review"],
  ["Chet Holmgren", "2022 Prizm", "PSA 10", 1100, "Watch"],
  ["Jaylen Brown", "2016 Prizm Silver", "PSA 10", 1150, "Vault"],
  ["Klay Thompson", "2012 Prizm", "PSA 10", 1450, "Listed"],
  ["Damian Lillard", "2012 Prizm", "PSA 10", 1600, "Sold"],
  ["Joel Embiid", "2014 Prizm", "BGS 9.5", 1950, "Review"],
];

const cards = players.map(([player, card, grade, value, status], index) => ({
  id: index + 1,
  initials: player
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2),
  player,
  title: card,
  grade,
  value,
  status,
  date: new Date(2025, index % 12, 2 + ((index * 3) % 25)).toISOString(),
}));

function currency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function statusClass(status) {
  return `status-${status.toLowerCase()}`;
}

function updateMetrics(rows) {
  const total = rows.length;
  const value = rows.reduce((sum, row) => sum + row.value, 0);
  const graded = rows.filter((row) => row.grade !== "Raw").length;

  document.getElementById("totalCards").textContent = total;
  document.getElementById("totalValue").textContent = currency(value);
  document.getElementById("gradedCards").textContent = graded;
}

const table = new Tabulator("#cardsTable", {
  data: cards,
  layout: "fitColumns",
  responsiveLayout: "collapse",
  pagination: true,
  paginationSize: 20,
  paginationCounter: "rows",
  initialSort: [{ column: "value", dir: "desc" }],
  columns: [
    {
      title: "Image",
      field: "initials",
      width: 88,
      hozAlign: "center",
      formatter: (cell) => `<span class="card-avatar">${cell.getValue()}</span>`,
      headerSort: false,
    },
    {
      title: "Title",
      field: "player",
      minWidth: 240,
      formatter: (cell) => {
        const row = cell.getRow().getData();
        return `<span class="card-title"><strong>${row.player}</strong><span>${row.title}</span></span>`;
      },
    },
    {
      title: "Grade",
      field: "grade",
      width: 132,
      formatter: (cell) => {
        const grade = cell.getValue();
        const rawClass = grade === "Raw" ? " grade-raw" : "";
        return `<span class="grade-badge${rawClass}">${grade}</span>`;
      },
    },
    {
      title: "Value",
      field: "value",
      width: 132,
      hozAlign: "right",
      sorter: "number",
      formatter: (cell) => `<strong>${currency(cell.getValue())}</strong>`,
    },
    {
      title: "Date",
      field: "date",
      width: 132,
      sorter: "date",
      formatter: (cell) =>
        new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(cell.getValue())),
    },
    {
      title: "Status",
      field: "status",
      width: 132,
      formatter: (cell) => {
        const status = cell.getValue();
        return `<span class="status-tag ${statusClass(status)}">${status}</span>`;
      },
    },
  ],
});

const searchInput = document.getElementById("playerSearch");
const clearButton = document.getElementById("clearSearch");
const exportButton = document.getElementById("exportCsv");

function refreshVisibleMetrics() {
  updateMetrics(table.getData("active"));
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    table.setFilter("player", "like", query);
  } else {
    table.clearFilter();
  }
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  table.clearFilter();
  searchInput.focus();
});

exportButton.addEventListener("click", () => {
  table.download("csv", "cards-inventory.csv");
});

table.on("dataFiltered", (_filters, rows) => {
  updateMetrics(rows.map((row) => row.getData()));
});

table.on("dataLoaded", refreshVisibleMetrics);
table.on("tableBuilt", refreshVisibleMetrics);

updateMetrics(cards);
