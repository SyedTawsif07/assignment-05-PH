let allIssues = [];


function toggleStyle(id) {
    const allBtn = document.getElementById('all-btn');
    const openBtn = document.getElementById('open-btn');
    const closedBtn = document.getElementById('closed-btn');

    allBtn.classList.remove('btn-primary', 'text-white');
    openBtn.classList.remove('btn-primary', 'text-white');
    closedBtn.classList.remove('btn-primary', 'text-white');

    const selected = document.getElementById(id);
    selected.classList.add('btn-primary', 'text-white');
}

const loadIssues = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayLesson(allIssues);
        });
}

const loadModalDetail = (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalDetail(data.data));
}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

const displayModalDetail = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
                    <div class="">
                        <div class="text-start p-6 space-y-6 rounded-xl shadow bg-base-200">
                            <h3 class="font-semibold text-xl">${details.title}</h3>
                            <p class="text-[14px] text-gray-500"><span>Opened</span> • Opened by Fahim Ahmed •
                                22/02/2026</p>

                            <div class="space-x-3">
                                ${details.labels.map(detail => `<span class="${detail === "bug" ? "bg-red-200 text-red-500" : "bg-[#FDE68A] text-[#D97706]"} 
                            text-[12px] py-1 px-3 rounded-[15px] font-medium border"> ${detail.toUpperCase()}</span>`).join('')}
                            </div>

                            <div class="flex justify-between items-center bg-base-300 py-2 px-4 rounded-xl">
                                <div class="space-y-1">
                                    <p class="text-gray-500">Assigne:</p>
                                    <p class="font-semibold">Tawsif Sir</p>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-gray-500">Priority:</p>
                                    <p
                                        class="border bg-red-500 text-white text-[12px] rounded-[15px] px-2 py-1 text-center">
                                        High</p>
                                </div>
                            </div>
                        </div>
                    </div>

    `;

    document.getElementById('details_modal').showModal();
}

const filterIssues = (status) => {
    if (status === 'all') {
        displayLesson(allIssues)
        return
    }
    const filtered = allIssues.filter(issue => issue.status === status);
    displayLesson(filtered);
}

const totalIssues = () => {
    const totalIssue = document.getElementById('total-issue');
    const cardContainer = document.getElementById('card-container');
    totalIssue.innerText = cardContainer.children.length
}


// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }


const displayLesson = (cards) => {
    // 1. call the container & empt
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    // 2. go through every card
    cards.forEach(card => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
                <div onclick="loadModalDetail(${card.id})" class="text-start p-6 space-y-6 rounded-xl shadow bg-base-200">
                    <div class="flex justify-between">
                        <img src="${card.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="">
                       <p class="${card.priority === 'high' ? 'bg-[#FEECEC] text-[#EF4444]' :
                card.priority === 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]' :
                    card.priority === 'low' ? 'bg-[#EEEFF2] text-[#9CA3AF]' :
                        'bg-gray-200 text-gray-500'} text-[12px] rounded-[15px] px-2 py-1">${card.priority.toUpperCase()}</p>
                    </div>

                    <h3 class="font-semibold text-xl">${card.title}</h3>
                    <p class="text-gray-500">${card.description}</p>

                    <div class="space-x-3">
                        ${card.labels.map(label => `<span class="${label === "bug" ? "bg-red-200 text-red-500" : "bg-[#FDE68A] text-[#D97706]"} 
                            text-[12px] py-1 px-3 rounded-[15px] font-medium border"> ${label.toUpperCase()}</span>`).join('')}
                    </div>

                    <div class="space-y-4">
                        <p class="text-gray-500 text-[12px]">${card.author}</p>
                        <p class="text-gray-500 text-[12px]">${card.updatedAt}</p>
                    </div>
                </div > `;
        cardContainer.append(newDiv);
    });
    totalIssues();
}


loadIssues();