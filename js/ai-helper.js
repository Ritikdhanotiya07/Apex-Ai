// AI Helper for Apex AI Productivity Tool
// Integrates with Gemini 1.5 Flash API or falls back to a high-fidelity local simulator

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export class AIHelper {
  static hasKey() {
    const state = window.storeInstance ? window.storeInstance.state : null;
    return !!(state && state.settings && state.settings.apiKey);
  }

  static getApiKey() {
    const state = window.storeInstance ? window.storeInstance.state : null;
    return state ? state.settings.apiKey : '';
  }

  static getPersona() {
    const state = window.storeInstance ? window.storeInstance.state : null;
    return state ? state.settings.userPersona : 'professional';
  }

  static getUserName() {
    const state = window.storeInstance ? window.storeInstance.state : null;
    return state ? state.settings.userName : 'Explorer';
  }

  // Common request dispatcher
  static async requestGemini(prompt, systemInstruction = '') {
    const key = this.getApiKey();
    if (!key) throw new Error('API Key missing');

    const url = `${GEMINI_API_URL}?key=${key}`;
    const requestData = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json'
      }
    };

    if (systemInstruction) {
      requestData.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API Error:', errorText);
      throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    try {
      const rawText = data.candidates[0].content.parts[0].text;
      return JSON.parse(rawText.trim());
    } catch (e) {
      console.error('Failed to parse Gemini response as JSON:', data, e);
      throw new Error('AI returned an invalid JSON schema. Try again.');
    }
  }

  // 1. Analyze Brain Dump Tasks
  static async analyzeBrainDump(text) {
    if (this.hasKey()) {
      const systemInstruction = `You are a high-performance productivity coach. Parse the user's messy list of tasks. 
      Analyze each task's impact (1 to 10) and urgency (1 to 10) based on context, deadlines, or importance. 
      Generate 2-3 specific action items (subtasks) for each. Output a JSON object with this structure:
      {
        "tasks": [
          {
            "title": "Cleaned up task title",
            "urgency": 8,
            "impact": 7,
            "notes": "Contextual advice or coaching insight",
            "subtasks": ["Subtask 1", "Subtask 2"]
          }
        ]
      }`;
      try {
        return await this.requestGemini(`Please analyze these tasks:\n${text}`, systemInstruction);
      } catch (e) {
        console.warn('API call failed, running local simulator:', e);
      }
    }

    // Local simulation fallback
    return this.simulateBrainDump(text);
  }

  // 2. Break down single task
  static async breakDownTask(taskTitle) {
    if (this.hasKey()) {
      const systemInstruction = `You are an expert project manager. Break down this task into 4-6 sequential, practical subtasks. 
      Recommend how many 25-minute focus blocks (Pomodoro sessions) it needs. Output a JSON object with this structure:
      {
        "subtasks": ["step 1", "step 2", "step 3"],
        "focusBlocks": 3,
        "tips": "Important advice for completing this task efficiently"
      }`;
      try {
        return await this.requestGemini(`Break down: "${taskTitle}"`, systemInstruction);
      } catch (e) {
        console.warn('API call failed, running local simulator:', e);
      }
    }

    return this.simulateTaskBreakdown(taskTitle);
  }

  // 3. Extract Scribble Notes
  static async extractNotes(noteText) {
    if (this.hasKey()) {
      const systemInstruction = `You are a business analyst. Summarize these notes/thoughts in a concise paragraph.
      Then, extract a list of concrete, actionable tasks that can be added to a to-do list. Output a JSON object with this structure:
      {
        "summary": "1-2 sentence executive summary of the notes.",
        "actionItems": ["Concrete task 1", "Concrete task 2"]
      }`;
      try {
        return await this.requestGemini(`Analyze notes:\n${noteText}`, systemInstruction);
      } catch (e) {
        console.warn('API call failed, running local simulator:', e);
      }
    }

    return this.simulateNotesExtraction(noteText);
  }

  // 4. Generate Coach Insights
  static async getCoachInsights(tasks, habits, completedFocusCount) {
    if (this.hasKey()) {
      const systemInstruction = `You are an AI Peak Performance Coach. Analyze the user's progress:
      - Active Tasks count: ${tasks.filter(t => t.status !== 'done').length}
      - Completed Tasks count: ${tasks.filter(t => t.status === 'done').length}
      - Habits tracked: ${JSON.stringify(habits.map(h => ({ name: h.title, streak: h.streak, logsCount: h.logs.length })))}
      - Completed Focus Blocks today: ${completedFocusCount}
      
      Generate exactly two high-value, highly personalized coaching insights to boost their productivity.
      Keep them brief (2 sentences each). Output a JSON object with this structure:
      {
        "insights": [
          {
            "title": "Title of insight 1",
            "body": "Detailed insight body with actionable advice.",
            "type": "purple" 
          },
          {
            "title": "Title of insight 2",
            "body": "Detailed insight body with actionable advice.",
            "type": "cyan"
          }
        ]
      }`;
      try {
        return await this.requestGemini('Generate my coach insights for today.', systemInstruction);
      } catch (e) {
        console.warn('API call failed, running local simulator:', e);
      }
    }

    return this.simulateCoachInsights(tasks, habits, completedFocusCount);
  }

  // ==========================================
  // LOCAL SIMULATORS (RULE-BASED NLP PATTERNS)
  // ==========================================

  static simulateBrainDump(text) {
    // Split by lines or punctuation
    const lines = text.split(/[\n;•\-\+]+/g)
      .map(l => l.trim())
      .filter(l => l.length > 3);

    const tasks = lines.map(line => {
      let urgency = 4;
      let impact = 4;
      let notes = 'Locally analyzed. Define key goals to start.';
      const title = line.replace(/^(todo|task|buy|do|need to)\s+/i, '');

      // Quick keyword assessment
      const lower = title.toLowerCase();

      // Urgency triggers
      if (lower.includes('today') || lower.includes('now') || lower.includes('asap') || lower.includes('deadline') || lower.includes('due') || lower.includes('urgent') || lower.includes('tomorrow') || lower.includes('tonight') || lower.includes('by 5')) {
        urgency = 8;
      } else if (lower.includes('meeting') || lower.includes('call') || lower.includes('review') || lower.includes('feedback')) {
        urgency = 6;
      }

      // Impact triggers
      if (lower.includes('proposal') || lower.includes('contract') || lower.includes('pitch') || lower.includes('revenue') || lower.includes('client') || lower.includes('invoice')) {
        impact = 9;
        notes = 'High business impact. Direct client deliverable.';
      } else if (lower.includes('code') || lower.includes('develop') || lower.includes('design') || lower.includes('wireframe') || lower.includes('spec') || lower.includes('architecture')) {
        impact = 8;
        notes = 'Advances core development milestones.';
      } else if (lower.includes('study') || lower.includes('exam') || lower.includes('learn') || lower.includes('research')) {
        impact = 7;
        notes = 'Builds long-term capability and knowledge.';
      } else if (lower.includes('clean') || lower.includes('organize') || lower.includes('sort') || lower.includes('desktop') || lower.includes('laundry')) {
        impact = 2;
        urgency = Math.max(urgency - 2, 2);
        notes = 'Administrative/maintenance task. Fit this into downtime.';
      }

      // Add default subtasks based on keywords
      const subtasks = [];
      if (lower.includes('code') || lower.includes('develop') || lower.includes('app')) {
        subtasks.push('Initialize file structures', 'Write core business logic', 'Run verification tests');
      } else if (lower.includes('design') || lower.includes('wireframe') || lower.includes('ui')) {
        subtasks.push('Gather design inspiration', 'Sketch layout layouts', 'Export assets for feedback');
      } else if (lower.includes('proposal') || lower.includes('contract') || lower.includes('spec') || lower.includes('write')) {
        subtasks.push('Outline structural points', 'Draft main sections', 'Proofread & polish spelling');
      } else {
        subtasks.push('Research requirements', 'Outline core steps', 'Execute initial review');
      }

      return { title, urgency, impact, notes, subtasks };
    });

    return { tasks };
  }

  static simulateTaskBreakdown(title) {
    const lower = title.toLowerCase();
    let subtasks = [];
    let focusBlocks = 2;
    let tips = 'Block off distractions. Put your phone in another room.';

    if (lower.includes('code') || lower.includes('develop') || lower.includes('build') || lower.includes('implement')) {
      subtasks = [
        'Setup local environment & verify dependencies',
        'Build core model classes and data schema',
        'Implement primary interface and endpoints',
        'Write basic tests for core scenarios',
        'Refactor for code cleanliness and performance'
      ];
      focusBlocks = 4;
      tips = 'Focus on making the core flow work first, then optimize the aesthetics and edge cases.';
    } else if (lower.includes('design') || lower.includes('wireframe') || lower.includes('ui') || lower.includes('landing')) {
      subtasks = [
        'Research premium styles and typography palettes',
        'Create rough paper sketches of layout variations',
        'Build high-fidelity vector layouts in workspace',
        'Verify color contrast ratios and alignments',
        'Export final production assets'
      ];
      focusBlocks = 3;
      tips = 'Limit your reference options to 3 designs. Spending too much time looking at references slows down creation.';
    } else if (lower.includes('proposal') || lower.includes('write') || lower.includes('draft') || lower.includes('email')) {
      subtasks = [
        'Create bullet points of main arguments or items',
        'Write introduction and value propositions',
        'Draft detailed content blocks and costings/deliverables',
        'Review flow and trim redundant wording',
        'Verify formatting, attachments, and call-to-action details'
      ];
      focusBlocks = 2;
      tips = 'Write the draft without editing as you go. Complete the draft first, then do a dedicated editing pass.';
    } else {
      subtasks = [
        'Clarify precise deliverables and timelines',
        'Collect resources and files needed to start',
        'Draft the initial version or outline',
        'Request feedback or perform self-review',
        'Apply corrections and complete final hand-off'
      ];
      focusBlocks = 2;
      tips = 'Tackle the hardest or most ambiguous steps first to clear mental blocks early.';
    }

    return { subtasks, focusBlocks, tips };
  }

  static simulateNotesExtraction(text) {
    if (!text.trim()) {
      return { summary: 'Scribble is currently blank.', actionItems: [] };
    }

    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 5);
    const summary = sentences.slice(0, Math.min(2, sentences.length)).join('. ') + '.';

    // Look for lines that look like tasks
    const lines = text.split('\n').map(l => l.trim());
    const actionItems = [];

    lines.forEach(line => {
      const lower = line.toLowerCase();
      // Match cues like "todo", "need to", "must", "action", dashes, bullet points
      if (/^(todo|task|action|need to|must|should|buy|call)\s/i.test(line) ||
          /^[\-\*\+•]\s/.test(line) ||
          lower.includes('todo:') ||
          lower.includes('action item:')) {
        const cleaned = line.replace(/^([-\*\+•\s]*|todo:|task:|action:|action item:)/i, '').trim();
        if (cleaned.length > 5) {
          actionItems.push(cleaned);
        }
      }
    });

    // If no action items were matches, extract a couple of verbal sentences containing verbs
    if (actionItems.length === 0) {
      sentences.forEach(s => {
        const lower = s.toLowerCase();
        if (lower.includes('need to') || lower.includes('will') || lower.includes('should') || lower.includes('must') || lower.includes('please')) {
          actionItems.push(s.replace(/^(please|we need to|i will|you should|must)\s+/i, ''));
        }
      });
    }

    // Default fallback if we still have nothing
    if (actionItems.length === 0 && sentences.length > 0) {
      actionItems.push('Extract tasks from notes manually', 'Outline action items matching: ' + sentences[0].substring(0, 30) + '...');
    }

    return {
      summary,
      actionItems: actionItems.slice(0, 5) // Cap at 5 action items
    };
  }

  static simulateCoachInsights(tasks, habits, completedFocusCount) {
    const activeTasks = tasks.filter(t => t.status !== 'done');
    const doneTasks = tasks.filter(t => t.status === 'done');
    const q1Tasks = activeTasks.filter(t => t.quadrant === 1);
    const q2Tasks = activeTasks.filter(t => t.quadrant === 2);

    const insights = [];

    // Insight 1: Focus distribution
    if (q1Tasks.length > 2) {
      insights.push({
        title: 'High Congestion in Q1',
        body: `You have ${q1Tasks.length} urgent and high-impact tasks. Delegate smaller items and schedule deep focus blocks to conquer the largest one first.`,
        type: 'purple'
      });
    } else if (q2Tasks.length > 0) {
      insights.push({
        title: 'Nurture Q2 Tasks',
        body: `You have ${q2Tasks.length} tasks in "Schedule" (High Impact, Low Urgency). Working on these before they become urgent reduces stress by 80%.`,
        type: 'purple'
      });
    } else {
      insights.push({
        title: 'Matrix Cleared',
        body: 'Your high-impact tasks are organized! Take a moment to list upcoming milestones or work on personal growth skills.',
        type: 'purple'
      });
    }

    // Insight 2: Habits or Focus
    if (completedFocusCount >= 3) {
      insights.push({
        title: 'Flow State Master',
        body: `Sensational job! You've logged ${completedFocusCount} Focus Blocks today. Make sure to take physical stretch breaks between sessions.`,
        type: 'cyan'
      });
    } else {
      const bestHabit = habits.reduce((best, cur) => (cur.streak > (best ? best.streak : -1)) ? cur : best, null);
      if (bestHabit && bestHabit.streak > 0) {
        insights.push({
          title: `Streak Alert: ${bestHabit.title}`,
          body: `Your "${bestHabit.title}" streak is at ${bestHabit.streak} days. Maintain this streak to solidfy your mental cognitive defaults.`,
          type: 'cyan'
        });
      } else {
        insights.push({
          title: 'Unleash Pomodoros',
          body: 'Aim for just one 25-minute Pomodoro focus block to build your starting momentum. Small steps build habits.',
          type: 'cyan'
        });
      }
    }

    return { insights };
  }
}
export default AIHelper;
