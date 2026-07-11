// State management for Apex AI Productivity Tool
const STORAGE_KEY = 'apex_ai_state';

const defaultState = {
  tasks: [
    {
      id: 'task-1',
      title: 'Draft technical specifications for project integration',
      urgency: 8,
      impact: 9,
      quadrant: 1,
      status: 'todo',
      subtasks: [
        { id: 'sub-1-1', title: 'Review documentation', completed: true },
        { id: 'sub-1-2', title: 'Define schema formats', completed: false },
        { id: 'sub-1-3', title: 'Draft API contracts', completed: false }
      ],
      notes: 'Ensure you follow RESTful design best practices.',
      focusBlocksRequired: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-2',
      title: 'Design user onboarding flow and wireframes',
      urgency: 4,
      impact: 9,
      quadrant: 2,
      status: 'todo',
      subtasks: [
        { id: 'sub-2-1', title: 'Sketch wireframes', completed: false },
        { id: 'sub-2-2', title: 'Get feedback from product team', completed: false }
      ],
      notes: 'Focus on reducing signup friction.',
      focusBlocksRequired: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-3',
      title: 'Respond to urgent feedback on marketing design',
      urgency: 9,
      impact: 3,
      quadrant: 3,
      status: 'todo',
      subtasks: [],
      notes: 'Sent via design channel.',
      focusBlocksRequired: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: 'task-4',
      title: 'Organize desktop and digital archives',
      urgency: 2,
      impact: 2,
      quadrant: 4,
      status: 'done',
      subtasks: [],
      notes: 'Cleanup archive folders.',
      focusBlocksRequired: 1,
      createdAt: new Date().toISOString()
    }
  ],
  habits: [
    {
      id: 'habit-1',
      title: 'Deep Work Session',
      logs: [], // YYYY-MM-DD
      streak: 0,
      multiplier: 1.0
    },
    {
      id: 'habit-2',
      title: 'Physical Exercise',
      logs: [],
      streak: 0,
      multiplier: 1.0
    },
    {
      id: 'habit-3',
      title: 'Review Goals',
      logs: [],
      streak: 0,
      multiplier: 1.0
    }
  ],
  focusSessions: {
    duration: 25, // minutes
    timeLeft: 25 * 60, // seconds
    status: 'idle', // 'idle' | 'running' | 'paused'
    type: 'focus', // 'focus' | 'break'
    completedCount: 0,
    activeTaskId: null
  },
  scribble: {
    rawText: '',
    summary: '',
    actionItems: []
  },
  settings: {
    apiKey: '',
    userName: 'Explorer',
    userPersona: 'professional' // 'professional' | 'developer' | 'creator' | 'student'
  }
};

class StateManager {
  constructor() {
    this.state = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Deep merge or structure check to prevent crashes if schema changes
        const merged = { ...defaultState, ...parsed };
        merged.tasks = merged.tasks || [];
        merged.habits = merged.habits || [];
        merged.focusSessions = { ...defaultState.focusSessions, ...merged.focusSessions };
        merged.scribble = { ...defaultState.scribble, ...merged.scribble };
        merged.settings = { ...defaultState.settings, ...merged.settings };
        return merged;
      }
    } catch (e) {
      console.error('Failed to load state, reverting to defaults:', e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // --- TASK ACTIONS ---
  addTask(title, urgency = 5, impact = 5, notes = '') {
    const quadrant = this.calculateQuadrant(urgency, impact);
    const newTask = {
      id: 'task-' + Date.now(),
      title,
      urgency,
      impact,
      quadrant,
      status: 'todo',
      subtasks: [],
      notes,
      focusBlocksRequired: Math.ceil((urgency * 0.4) + (impact * 0.6)),
      createdAt: new Date().toISOString()
    };
    this.state.tasks.push(newTask);
    this.save();
    return newTask;
  }

  updateTask(taskId, updates) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      Object.assign(task, updates);
      if ('urgency' in updates || 'impact' in updates) {
        task.quadrant = this.calculateQuadrant(task.urgency, task.impact);
      }
      this.save();
    }
  }

  deleteTask(taskId) {
    this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
    if (this.state.focusSessions.activeTaskId === taskId) {
      this.state.focusSessions.activeTaskId = null;
    }
    this.save();
  }

  calculateQuadrant(urgency, impact) {
    if (urgency >= 5 && impact >= 5) return 1;
    if (urgency < 5 && impact >= 5) return 2;
    if (urgency >= 5 && impact < 5) return 3;
    return 4;
  }

  // --- SUBTASK ACTIONS ---
  addSubtask(taskId, title) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      const subtask = {
        id: 'sub-' + Date.now(),
        title,
        completed: false
      };
      task.subtasks.push(subtask);
      this.save();
      return subtask;
    }
  }

  toggleSubtask(taskId, subtaskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      const subtask = task.subtasks.find(s => s.id === subtaskId);
      if (subtask) {
        subtask.completed = !subtask.completed;
        this.save();
      }
    }
  }

  deleteSubtask(taskId, subtaskId) {
    const task = this.state.tasks.find(t => t.id === taskId);
    if (task) {
      task.subtasks = task.subtasks.filter(s => s.id !== subtaskId);
      this.save();
    }
  }

  // --- HABIT ACTIONS ---
  addHabit(title) {
    const newHabit = {
      id: 'habit-' + Date.now(),
      title,
      logs: [],
      streak: 0,
      multiplier: 1.0
    };
    this.state.habits.push(newHabit);
    this.save();
    return newHabit;
  }

  toggleHabitDate(habitId, dateStr) {
    const habit = this.state.habits.find(h => h.id === habitId);
    if (habit) {
      const index = habit.logs.indexOf(dateStr);
      if (index === -1) {
        habit.logs.push(dateStr);
      } else {
        habit.logs.splice(index, 1);
      }
      this.calculateStreak(habit);
      this.save();
    }
  }

  deleteHabit(habitId) {
    this.state.habits = this.state.habits.filter(h => h.id !== habitId);
    this.save();
  }

  calculateStreak(habit) {
    if (habit.logs.length === 0) {
      habit.streak = 0;
      habit.multiplier = 1.0;
      return;
    }

    const sortedLogs = [...habit.logs].sort((a, b) => new Date(b) - new Date(a));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const formatDate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    const todayStr = formatDate(today);
    const yesterdayStr = formatDate(yesterday);

    // If the most recent log is not today or yesterday, streak is broken
    if (sortedLogs[0] !== todayStr && sortedLogs[0] !== yesterdayStr) {
      habit.streak = 0;
      habit.multiplier = 1.0;
      return;
    }

    let streak = 1;
    let lastDate = new Date(sortedLogs[0]);

    for (let i = 1; i < sortedLogs.length; i++) {
      const currentDate = new Date(sortedLogs[i]);
      const diffTime = Math.abs(lastDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
        lastDate = currentDate;
      } else if (diffDays > 1) {
        break; // Streak broken in the history chain
      }
    }

    habit.streak = streak;
    // Streak multiplier gamification (max 3x)
    habit.multiplier = Math.min(3.0, 1.0 + (streak * 0.1)).toFixed(1);
  }

  // --- TIMER ACTIONS ---
  updateTimer(timeLeft, status) {
    this.state.focusSessions.timeLeft = timeLeft;
    this.state.focusSessions.status = status;
    this.save();
  }

  setTimerDuration(duration, type = 'focus') {
    this.state.focusSessions.duration = duration;
    this.state.focusSessions.timeLeft = duration * 60;
    this.state.focusSessions.type = type;
    this.state.focusSessions.status = 'idle';
    this.save();
  }

  incrementCompletedFocus() {
    this.state.focusSessions.completedCount++;
    this.save();
  }

  // --- SCRIBBLE ACTIONS ---
  updateScribble(text, summary = '', actionItems = []) {
    this.state.scribble.rawText = text;
    this.state.scribble.summary = summary;
    this.state.scribble.actionItems = actionItems;
    this.save();
  }

  // --- SETTINGS ACTIONS ---
  saveSettings(apiKey, userName, userPersona) {
    this.state.settings.apiKey = apiKey;
    this.state.settings.userName = userName;
    this.state.settings.userPersona = userPersona;
    this.save();
  }
}

export const store = new StateManager();
window.storeInstance = store; // Make accessible globally for troubleshooting/testing
