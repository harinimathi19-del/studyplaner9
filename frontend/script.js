let assignments = [
    {
        id: 1,
        subject: "Web Technology",
        title: "HTML Forms",
        description: "Create and design HTML forms.",
        deadline: "2026-09-30",
        priority: "Medium",
        status: "Completed"
    },

    {
        id: 2,
        subject: "JavaScript",
        title: "DOM Manipulation",
        description: "Practice JavaScript DOM concepts.",
        deadline: "2026-10-03",
        priority: "High",
        status: "In Progress"
    },

    {
        id: 3,
        subject: "PHP",
        title: "Form Validation",
        description: "Implement PHP form validation.",
        deadline: "2026-10-05",
        priority: "High",
        status: "Pending"
    }
];

let currentFilter = "All";


const assignmentList =
    document.getElementById("assignmentList");

const deadlineList =
    document.getElementById("deadlineList");

const subjectGrid =
    document.getElementById("subjectGrid");

const modal =
    document.getElementById("modal");

const toast =
    document.getElementById("toast");


/* DISPLAY ASSIGNMENTS */

function displayAssignments() {

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    let filtered = assignments.filter(item => {

        const matchesSearch =
            item.title.toLowerCase().includes(search) ||
            item.subject.toLowerCase().includes(search);

        const matchesFilter =
            currentFilter === "All" ||
            item.status === currentFilter;

        return matchesSearch && matchesFilter;
    });


    assignmentList.innerHTML = "";


    if (filtered.length === 0) {

        assignmentList.innerHTML = `
            <div style="padding:30px;text-align:center;color:#999;">
                No assignments found.
            </div>
        `;

        return;
    }


    filtered.forEach(item => {

        let statusClass = "pending";

        if (item.status === "Completed") {
            statusClass = "completed";
        }

        if (item.status === "In Progress") {
            statusClass = "progress";
        }


        assignmentList.innerHTML += `

            <div class="assignment">

                <div class="assignment-info">

                    <div class="assignment-icon">
                        <i class="fa-solid fa-book-open"></i>
                    </div>

                    <div>

                        <h3>${item.title}</h3>

                        <p>
                            ${item.subject}
                        </p>

                    </div>

                </div>


                <div class="assignment-meta">

                    <span class="status ${statusClass}">
                        ${item.status}
                    </span>

                    <small>
                        ${formatDate(item.deadline)}
                    </small>

                </div>

            </div>
        `;
    });
}


/* DATE */

function formatDate(date) {

    const d = new Date(date);

    return d.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* STATISTICS */

function updateStatistics() {

    const total = assignments.length;

    const pending =
        assignments.filter(
            x => x.status === "Pending"
        ).length;

    const progress =
        assignments.filter(
            x => x.status === "In Progress"
        ).length;

    const completed =
        assignments.filter(
            x => x.status === "Completed"
        ).length;


    document.getElementById("totalCount").textContent =
        total;

    document.getElementById("pendingCount").textContent =
        pending;

    document.getElementById("progressCount").textContent =
        progress;

    document.getElementById("completedCount").textContent =
        completed;


    document.getElementById("pendingText").textContent =
        pending;

    document.getElementById("progressText").textContent =
        progress;

    document.getElementById("completedText").textContent =
        completed;


    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    document.getElementById("productivity").textContent =
        percentage + "%";
}


/* DEADLINES */

function displayDeadlines() {

    deadlineList.innerHTML = "";

    assignments
        .filter(x => x.status !== "Completed")
        .sort(
            (a, b) =>
                new Date(a.deadline) -
                new Date(b.deadline)
        )
        .slice(0, 3)
        .forEach(item => {

            deadlineList.innerHTML += `

                <div class="deadline">

                    <strong>
                        ${item.title}
                    </strong>

                    <p>
                        ${item.subject}
                        •
                        ${formatDate(item.deadline)}
                    </p>

                </div>

            `;
        });
}


/* SUBJECTS */

function displaySubjects() {

    const subjects = {};

    assignments.forEach(item => {

        if (!subjects[item.subject]) {

            subjects[item.subject] = {
                total: 0,
                completed: 0
            };

        }

        subjects[item.subject].total++;

        if (item.status === "Completed") {
            subjects[item.subject].completed++;
        }

    });


    subjectGrid.innerHTML = "";


    Object.keys(subjects).forEach(subject => {

        const data = subjects[subject];

        const percentage =
            Math.round(
                (data.completed / data.total) * 100
            );


        subjectGrid.innerHTML += `

            <div class="subject-card">

                <h3>
                    ${subject}
                </h3>

                <p>
                    ${data.total} Assignment(s)
                    • ${percentage}% Completed
                </p>

                <div class="subject-progress">

                    <div
                        style="width:${percentage}%">
                    </div>

                </div>

            </div>
        `;
    });
}


/* ADD ASSIGNMENT */

document
    .getElementById("assignmentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const newAssignment = {

            id: Date.now(),

            subject:
                document.getElementById("subject").value,

            title:
                document.getElementById("title").value,

            description:
                document.getElementById("description").value,

            deadline:
                document.getElementById("deadline").value,

            priority:
                document.getElementById("priority").value,

            status:
                document.getElementById("status").value
        };


        assignments.unshift(newAssignment);


        this.reset();

        modal.classList.remove("show");


        showToast();

        refreshDashboard();
    });


/* MODAL */

document
    .getElementById("openModal")
    .addEventListener("click", () => {

        modal.classList.add("show");

    });


document
    .getElementById("closeModal")
    .addEventListener("click", closeModal);


document
    .getElementById("cancelModal")
    .addEventListener("click", closeModal);


function closeModal() {

    modal.classList.remove("show");

}


/* SEARCH */

document
    .getElementById("searchInput")
    .addEventListener("input", displayAssignments);


/* FILTER */

document
    .querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            displayAssignments();

        });

    });


/* TOAST */

function showToast() {

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);
}


/* REFRESH */

function refreshDashboard() {

    displayAssignments();

    updateStatistics();

    displayDeadlines();

    displaySubjects();
}


/* INITIAL LOAD */

refreshDashboard();