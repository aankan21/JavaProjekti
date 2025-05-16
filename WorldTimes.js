// Time zone data
const timeZoneData = {
    "Europe/Helsinki": "Finland",
    "America/New_York": "New York",
    "Europe/London": "London",
    "Asia/Tokyo": "Tokyo",
    "Australia/Sydney": "Sydney",
    "Asia/Dubai": "Dubai",
    "America/Sao_Paulo": "São Paulo",
    "Africa/Johannesburg": "Johannesburg"
};

// Converts time from one time zone to another
function convertTime() {
    const timeInput = document.getElementById("timeInput").value;
    const fromZone = document.getElementById("fromTimeZone").value;
    const toZone = document.getElementById("toTimeZone").value;
    const result = document.getElementById("result");

    if (!timeInput) {
        result.innerHTML = "<span style='color: red;'>⚠️ Please enter a time.</span>";
        return;
    }

    const [hours, minutes] = timeInput.split(":").map(Number);
    const now = new Date();
    now.setHours(hours);
    now.setMinutes(minutes);

    const fromTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: fromZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);

    const toTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: toZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(now);

    result.innerHTML = `
        <strong>${fromTime}</strong> in <strong>${formatZone(fromZone)}</strong><br>
        ➡️ <strong>${toTime}</strong> in <strong>${formatZone(toZone)}</strong>
    `;
}

// Populate dropdowns for time zones
function populateTimeZones() {
    const fromDropdown = document.getElementById("fromTimeZone");
    const toDropdown = document.getElementById("toTimeZone");

    for (const zone in timeZoneData) {
        const name = timeZoneData[zone];

        const option1 = document.createElement("option");
        option1.value = zone;
        option1.text = `${name} (${zone})`;
        fromDropdown.add(option1);

        const option2 = document.createElement("option");
        option2.value = zone;
        option2.text = `${name} (${zone})`;
        toDropdown.add(option2);
    }

    // Set defaults
    fromDropdown.value = "Europe/Helsinki";
    toDropdown.value = "America/New_York";

    generateTimeZoneTable();
}

// Generate live time table
function generateTimeZoneTable() {
    const tableBody = document.getElementById("timeZoneTableBody");
    tableBody.innerHTML = '';

    for (const zone in timeZoneData) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = timeZoneData[zone];
        row.appendChild(nameCell);

        const zoneCell = document.createElement("td");
        zoneCell.textContent = zone;
        row.appendChild(zoneCell);

        const timeCell = document.createElement("td");
        const timeNow = new Intl.DateTimeFormat("en-GB", {
            timeZone: zone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(new Date());
        timeCell.textContent = timeNow;
        row.appendChild(timeCell);

        tableBody.appendChild(row);
    }
}

// Return readable name
function formatZone(zone) {
    return timeZoneData[zone] || zone;
}

// Auto-refresh live time table
setInterval(generateTimeZoneTable, 30000);
window.onload = populateTimeZones;
