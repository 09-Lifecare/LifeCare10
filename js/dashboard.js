// Dashboard initialization
document.addEventListener('DOMContentLoaded', function() {
    const user = redirectIfNotAuthenticated();
    
    // Load user data
    loadUserData(user);
    
    // Setup sidebar navigation
    setupSidebarNavigation();
    
    // Setup dashboard cards
    setupDashboardCards();
    
    // Setup form submissions
    setupFormSubmissions();
    
    // Load saved data
    loadSavedData();
});

// Load user data into header
function loadUserData(user) {
    const userGreeting = document.getElementById('userGreeting');
    const userRole = document.getElementById('userRole');
    
    if (userGreeting) {
        userGreeting.textContent = `Hi, ${user.nickname || user.name}`;
    }
    if (userRole) {
        userRole.textContent = user.role;
    }
    
    // Set profile data
    if (document.getElementById('profileNickname')) {
        document.getElementById('profileNickname').value = user.nickname || '';
        document.getElementById('profileEmail').value = user.email || '';
    }
}

// Setup sidebar navigation
function setupSidebarNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all items
            navItems.forEach(ni => ni.classList.remove('active'));
            // Add active to clicked item
            item.classList.add('active');
            
            // Show corresponding section
            const section = item.getAttribute('data-section');
            showSection(section);
        });
    });
}

// Show section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Setup dashboard cards
function setupDashboardCards() {
    const cards = document.querySelectorAll('.dashboard-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.getAttribute('data-card');
            
            // Map cards to sections
            const sectionMap = {
                'academic': 'academic',
                'health': 'health',
                'mental': 'mental',
                'daily': 'daily',
                'support': 'support',
                'budget': 'daily'
            };
            
            if (sectionMap[cardType]) {
                const navItem = document.querySelector(`[data-section="${sectionMap[cardType]}"]`);
                if (navItem) {
                    navItem.click();
                }
            }
        });
    });
}

// Setup form submissions
function setupFormSubmissions() {
    // Task form
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const task = {
                title: document.getElementById('taskTitle').value,
                dueDate: document.getElementById('taskDueDate').value,
                priority: document.getElementById('taskPriority').value,
                id: Date.now()
            };
            
            // Save to localStorage
            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            taskForm.reset();
            closeModal('taskModal');
            loadSavedData();
            updateStats();
            alert('Task added successfully!');
        });
    }

    // Water form
    const waterForm = document.getElementById('waterForm');
    if (waterForm) {
        waterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const water = {
                amount: document.getElementById('waterAmount').value,
                time: document.getElementById('waterTime').value,
                id: Date.now()
            };
            
            let waters = JSON.parse(localStorage.getItem('water') || '[]');
            waters.push(water);
            localStorage.setItem('water', JSON.stringify(waters));
            
            waterForm.reset();
            closeModal('waterModal');
            loadSavedData();
            updateStats();
            alert('Water intake logged!');
        });
    }

    // Sleep form
    const sleepForm = document.getElementById('sleepForm');
    if (sleepForm) {
        sleepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sleep = {
                hours: document.getElementById('sleepHours').value,
                date: document.getElementById('sleepDate').value,
                id: Date.now()
            };
            
            let sleeps = JSON.parse(localStorage.getItem('sleep') || '[]');
            sleeps.push(sleep);
            localStorage.setItem('sleep', JSON.stringify(sleeps));
            
            sleepForm.reset();
            closeModal('sleepModal');
            loadSavedData();
            updateStats();
            alert('Sleep logged!');
        });
    }

    // Medication form
    const medicationForm = document.getElementById('medicationForm');
    if (medicationForm) {
        medicationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const medication = {
                name: document.getElementById('medicationName').value,
                dose: document.getElementById('medicationDose').value,
                time: document.getElementById('medicationTime').value,
                id: Date.now()
            };
            
            let medications = JSON.parse(localStorage.getItem('medications') || '[]');
            medications.push(medication);
            localStorage.setItem('medications', JSON.stringify(medications));
            
            medicationForm.reset();
            closeModal('medicationModal');
            loadSavedData();
            alert('Medication reminder added!');
        });
    }

    // Meal form
    const mealForm = document.getElementById('mealForm');
    if (mealForm) {
        mealForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const meal = {
                name: document.getElementById('mealName').value,
                calories: document.getElementById('mealCalories').value,
                time: document.getElementById('mealTime').value,
                id: Date.now()
            };
            
            let meals = JSON.parse(localStorage.getItem('meals') || '[]');
            meals.push(meal);
            localStorage.setItem('meals', JSON.stringify(meals));
            
            mealForm.reset();
            closeModal('mealModal');
            loadSavedData();
            alert('Meal logged!');
        });
    }

    // Activity form
    const activityForm = document.getElementById('activityForm');
    if (activityForm) {
        activityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const activity = {
                type: document.getElementById('activityType').value,
                duration: document.getElementById('activityDuration').value,
                date: document.getElementById('activityDate').value,
                id: Date.now()
            };
            
            let activities = JSON.parse(localStorage.getItem('activities') || '[]');
            activities.push(activity);
            localStorage.setItem('activities', JSON.stringify(activities));
            
            activityForm.reset();
            closeModal('activityModal');
            loadSavedData();
            alert('Activity logged!');
        });
    }

    // Mood form
    const moodForm = document.getElementById('moodForm');
    if (moodForm) {
        moodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const mood = {
                feeling: document.getElementById('moodFeeling').value,
                notes: document.getElementById('moodNotes').value,
                date: new Date().toLocaleString(),
                id: Date.now()
            };
            
            let moods = JSON.parse(localStorage.getItem('moods') || '[]');
            moods.push(mood);
            localStorage.setItem('moods', JSON.stringify(moods));
            
            moodForm.reset();
            closeModal('moodModal');
            loadSavedData();
            alert('Mood logged!');
        });
    }

    // Stress form
    const stressForm = document.getElementById('stressForm');
    if (stressForm) {
        stressForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const stress = {
                level: document.getElementById('stressLevel').value,
                reason: document.getElementById('stressReason').value,
                date: new Date().toLocaleString(),
                id: Date.now()
            };
            
            let stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
            stresses.push(stress);
            localStorage.setItem('stresses', JSON.stringify(stresses));
            
            stressForm.reset();
            closeModal('stressModal');
            loadSavedData();
            alert('Stress level recorded!');
        });
    }

    // Journal form
    const journalForm = document.getElementById('journalForm');
    if (journalForm) {
        journalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const journal = {
                text: document.getElementById('journalText').value,
                date: new Date().toLocaleString(),
                id: Date.now()
            };
            
            let journals = JSON.parse(localStorage.getItem('journals') || '[]');
            journals.push(journal);
            localStorage.setItem('journals', JSON.stringify(journals));
            
            journalForm.reset();
            closeModal('journalModal');
            loadSavedData();
            alert('Journal entry saved!');
        });
    }

    // Habit form
    const habitForm = document.getElementById('habitForm');
    if (habitForm) {
        habitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const habit = {
                name: document.getElementById('habitName').value,
                frequency: document.getElementById('habitFrequency').value,
                streak: 0,
                id: Date.now()
            };
            
            let habits = JSON.parse(localStorage.getItem('habits') || '[]');
            habits.push(habit);
            localStorage.setItem('habits', JSON.stringify(habits));
            
            habitForm.reset();
            closeModal('habitModal');
            loadSavedData();
            updateStats();
            alert('Habit added!');
        });
    }

    // Budget form
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const expense = {
                category: document.getElementById('expenseCategory').value,
                amount: document.getElementById('expenseAmount').value,
                date: document.getElementById('expenseDate').value,
                id: Date.now()
            };
            
            let expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            
            budgetForm.reset();
            closeModal('budgetModal');
            loadSavedData();
            updateStats();
            alert('Expense logged!');
        });
    }

    // Notes form
    const notesForm = document.getElementById('notesForm');
    if (notesForm) {
        notesForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const note = {
                title: document.getElementById('noteTitle').value,
                content: document.getElementById('noteContent').value,
                date: new Date().toLocaleString(),
                id: Date.now()
            };
            
            let notes = JSON.parse(localStorage.getItem('notes') || '[]');
            notes.push(note);
            localStorage.setItem('notes', JSON.stringify(notes));
            
            notesForm.reset();
            closeModal('notesModal');
            loadSavedData();
            alert('Note saved!');
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const contact = {
                name: document.getElementById('contactName').value,
                relation: document.getElementById('contactRelation').value,
                phone: document.getElementById('contactPhone').value,
                id: Date.now()
            };
            
            let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            
            contactForm.reset();
            closeModal('contactModal');
            loadSavedData();
            alert('Contact saved!');
        });
    }

    // Peer form
    const peerForm = document.getElementById('peerForm');
    if (peerForm) {
        peerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Peer search initiated! Recommended peers based on your interests will be shown here.');
            closeModal('peerModal');
        });
    }

    // Stress level slider
    const stressLevel = document.getElementById('stressLevel');
    if (stressLevel) {
        stressLevel.addEventListener('input', (e) => {
            document.getElementById('stressValue').textContent = e.target.value;
        });
    }
}

// Load saved data from localStorage
function loadSavedData() {
    // Load tasks
    const taskList = document.getElementById('taskList');
    if (taskList) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        taskList.innerHTML = tasks.length ? tasks.map(task => `
            <div class="log-item">
                <div class="log-content">
                    <div class="log-label">${task.title}</div>
                    <div class="log-value">Due: ${task.dueDate} | Priority: <strong>${task.priority}</strong></div>
                </div>
                <div class="log-delete" onclick="deleteItem('tasks', ${task.id})">Delete</div>
            </div>
        `).join('') : '<div class="empty-state"><p>No tasks yet. Add one to get started!</p></div>';
    }

    // Load health logs
    const healthLogs = document.getElementById('healthLogs');
    if (healthLogs) {
        const waters = JSON.parse(localStorage.getItem('water') || '[]');
        const sleeps = JSON.parse(localStorage.getItem('sleep') || '[]');
        const activities = JSON.parse(localStorage.getItem('activities') || '[]');
        
        const allLogs = [
            ...waters.map(w => ({ type: 'Water', label: `${w.amount}ml at ${w.time}`, id: w.id, category: 'water' })),
            ...sleeps.map(s => ({ type: 'Sleep', label: `${s.hours} hours on ${s.date}`, id: s.id, category: 'sleep' })),
            ...activities.map(a => ({ type: 'Activity', label: `${a.type} for ${a.duration}min on ${a.date}`, id: a.id, category: 'activities' }))
        ];

        healthLogs.innerHTML = allLogs.length ? allLogs.map(log => `
            <div class="log-item">
                <div class="log-content">
                    <div class="log-label">${log.type}</div>
                    <div class="log-value">${log.label}</div>
                </div>
                <div class="log-delete" onclick="deleteItem('${log.category}', ${log.id})">Delete</div>
            </div>
        `).join('') : '<div class="empty-state"><p>No health logs yet. Start tracking!</p></div>';
    }

    // Load mental health logs
    const mentalLogs = document.getElementById('mentalLogs');
    if (mentalLogs) {
        const moods = JSON.parse(localStorage.getItem('moods') || '[]');
        const stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
        const journals = JSON.parse(localStorage.getItem('journals') || '[]');
        
        const allLogs = [
            ...moods.map(m => ({ type: 'Mood', label: `Feeling ${m.feeling}: ${m.notes || 'No notes'}`, id: m.id, category: 'moods' })),
            ...stresses.map(s => ({ type: 'Stress', label: `Level ${s.level}/10: ${s.reason || 'No reason provided'}`, id: s.id, category: 'stresses' })),
            ...journals.map(j => ({ type: 'Journal', label: j.text.substring(0, 50) + '...', id: j.id, category: 'journals' }))
        ];

        mentalLogs.innerHTML = allLogs.length ? allLogs.map(log => `
            <div class="log-item">
                <div class="log-content">
                    <div class="log-label">${log.type}</div>
                    <div class="log-value">${log.label}</div>
                </div>
                <div class="log-delete" onclick="deleteItem('${log.category}', ${log.id})">Delete</div>
            </div>
        `).join('') : '<div class="empty-state"><p>No mental health logs yet. Start journaling!</p></div>';
    }

    // Load daily life logs
    const dailyLogs = document.getElementById('dailyLogs');
    if (dailyLogs) {
        const habits = JSON.parse(localStorage.getItem('habits') || '[]');
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        
        const allLogs = [
            ...habits.map(h => ({ type: 'Habit', label: `${h.name} (${h.frequency})`, id: h.id, category: 'habits' })),
            ...notes.map(n => ({ type: 'Note', label: n.title, id: n.id, category: 'notes' })),
            ...contacts.map(c => ({ type: 'Contact', label: `${c.name} (${c.relation}) - ${c.phone}`, id: c.id, category: 'contacts' }))
        ];

        dailyLogs.innerHTML = allLogs.length ? allLogs.map(log => `
            <div class="log-item">
                <div class="log-content">
                    <div class="log-label">${log.type}</div>
                    <div class="log-value">${log.label}</div>
                </div>
                <div class="log-delete" onclick="deleteItem('${log.category}', ${log.id})">Delete</div>
            </div>
        `).join('') : '<div class="empty-state"><p>No items yet. Add habits, notes, or contacts!</p></div>';
    }

    updateStats();
}

// Update dashboard statistics
function updateStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const waters = JSON.parse(localStorage.getItem('water') || '[]');
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const moods = JSON.parse(localStorage.getItem('moods') || '[]');
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');

    // Update card stats
    const cards = {
        'academic': `${tasks.length} Tasks`,
        'health': `${waters.length} Logs`,
        'mental': moods.length ? `${moods.length} entries` : 'No entries',
        'daily': `${notes.length} Items`,
        'budget': expenses.length ? `$${expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}` : '$0.00'
    };

    for (const [cardType, stat] of Object.entries(cards)) {
        const card = document.querySelector(`[data-card="${cardType}"]`);
        if (card) {
            const statEl = card.querySelector('.card-stat');
            if (statEl) {
                statEl.textContent = stat;
            }
        }
    }
}

// Delete item from localStorage
function deleteItem(category, id) {
    let items = JSON.parse(localStorage.getItem(category) || '[]');
    items = items.filter(item => item.id !== id);
    localStorage.setItem(category, JSON.stringify(items));
    loadSavedData();
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
    }
}

// Breathing exercise
function startBreathingExercise() {
    const container = document.getElementById('breathingContainer');
    const text = document.getElementById('breathingText');
    
    if (container) {
        container.style.display = 'block';
        
        let cycle = 0;
        const cycles = ['Inhale...', 'Hold...', 'Exhale...'];
        
        const interval = setInterval(() => {
            text.textContent = cycles[cycle % 3];
            cycle++;
            
            if (cycle >= 12) { // 4 complete cycles
                clearInterval(interval);
                container.style.display = 'none';
                alert('Great job! You completed a breathing exercise.');
            }
        }, 1500);
    }
}

// Get motivation
function getMotivation() {
    const motivations = [
        "You're doing amazing! Keep up the great work! 💪",
        "Remember to take breaks - you deserve it! 😌",
        "Every small step counts towards your goals! 🎯",
        "You've got this! Believe in yourself! ✨",
        "Take a deep breath - everything will be okay! 🌟",
        "Your health and happiness matter most! ❤️",
        "Progress, not perfection, is the goal! 🚀"
    ];
    
    const random = motivations[Math.floor(Math.random() * motivations.length)];
    alert(random);
}

// Get academic motivation
function getAcademicMotivation() {
    const motivations = [
        "You're on track with your academic goals! Keep pushing!",
        "Your dedication to learning is inspiring!",
        "Every assignment completed is progress towards success!",
        "You're building skills that will serve you well!",
        "Stay focused and you'll achieve great things!",
        "Your effort today shapes your future tomorrow!"
    ];
    
    const random = motivations[Math.floor(Math.random() * motivations.length)];
    alert(random);
}

// Get self-care recommendations
function getSelfCareRecommendations() {
    const stresses = JSON.parse(localStorage.getItem('stresses') || '[]');
    const lastStress = stresses.length ? stresses[stresses.length - 1] : null;
    
    const recommendations = [
        "Take a 10-minute walk to clear your mind",
        "Practice deep breathing exercises",
        "Spend time with friends or family",
        "Listen to your favorite music",
        "Journal about your thoughts and feelings",
        "Take a warm shower or bath",
        "Do some light stretching or yoga",
        "Drink water and have a healthy snack"
    ];
    
    if (lastStress && lastStress.level >= 7) {
        alert("High stress detected! Try: " + recommendations[Math.floor(Math.random() * recommendations.length)]);
    } else {
        alert("Self-care tip: " + recommendations[Math.floor(Math.random() * recommendations.length)]);
    }
}

// Get productivity insights
function getProductivityInsights() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const moods = JSON.parse(localStorage.getItem('moods') || '[]');
    
    let insights = "📊 Your Productivity Insights:\n\n";
    insights += `Total Tasks: ${tasks.length}\n`;
    insights += `Mood Entries: ${moods.length}\n\n`;
    
    if (tasks.length > 0) {
        const highPriority = tasks.filter(t => t.priority === 'High').length;
        const mediumPriority = tasks.filter(t => t.priority === 'Medium').length;
        const lowPriority = tasks.filter(t => t.priority === 'Low').length;
        
        insights += `High Priority: ${highPriority}\n`;
        insights += `Medium Priority: ${mediumPriority}\n`;
        insights += `Low Priority: ${lowPriority}\n`;
    }
    
    insights += "\n💡 Tip: You tend to be most productive when you have clear priorities!";
    
    alert(insights);
}

// Save profile
function saveProfile() {
    const nickname = document.getElementById('profileNickname').value;
    const email = document.getElementById('profileEmail').value;
    
    if (!nickname || !email) {
        alert('Please fill in all fields!');
        return;
    }
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.nickname = nickname;
    user.email = email;
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Update greeting
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting) {
        userGreeting.textContent = `Hi, ${nickname}`;
    }
    
    alert('Profile updated successfully!');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
