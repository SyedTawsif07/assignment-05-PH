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
        .then(data => displayLesson(data.data));
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
    // 1. call the container & empty
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";

    // 2. go through every card
    cards.forEach(card => {
        console.log(card);
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
                <div class="text-start p-6 space-y-6 rounded-xl shadow bg-base-200">
                    <div class="flex justify-between">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="font-bold">${card.priority}</p>
                    </div>

                    <h3 class="font-semibold text-xl">${card.title}</h3>
                    <p class="text-gray-500">${card.description}</p>

                    <div class="space-x-3">
                        ${card.labels.map(label => `<span class="${label === "bug" ? "bg-red-200 text-red-500" : "bg-[#FDE68A] text-[#D97706]"} 
                            text-[12px] py-1 px-3 rounded-[15px] font-medium border"}"> ${label}</span>`).join('')}

                    </div>

                    <div class="space-y-4">
                        <p class="text-gray-500 text-[12px]">${card.author}</p>
                        <p class="text-gray-500 text-[12px]">${card.updatedAt}</p>
                    </div>
                </div > `;

        cardContainer.append(newDiv);
    });
}

loadIssues();