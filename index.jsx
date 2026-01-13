import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, BookOpen, Send, Layout, FileText, CheckCircle, RefreshCw, 
  Copy, ChevronLeft, Info, Sparkles, Trophy, BarChart3, Heart, 
  MessageSquare, School, Map, Globe, Lightbulb, Check, Zap, 
  Loader2, AlertCircle, Camera, Coffee, HelpCircle, History, 
  Search, ListChecks, PenTool
} from 'lucide-react';

// 寫作架構資料庫：包含 11 種不同類型的寫作模板
const WRITING_TEMPLATES = {
  chart: {
    title: "圖表分析",
    subtitle: "Chart Analysis",
    theme: "emerald",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    btn: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
    accent: "bg-emerald-600",
    icon: <BarChart3 size={28} />,
    hasExample: true,
    exampleData: {
      type: "chart",
      title: "How High School Students Spend Their Time After School",
      items: [
        { label: "Cram School / Studying", value: 45, color: "bg-emerald-500" },
        { label: "Social Media / Gaming", value: 30, color: "bg-blue-500" },
        { label: "Sports / Clubs", value: 15, color: "bg-amber-500" },
        { label: "Sleeping / Others", value: 10, color: "bg-slate-400" }
      ]
    },
    steps: [
      { id: "hook", label: "Hook (開頭引言)", patterns: ["In recent years...", "Nowadays...", "It is a common sight to see..."], words: ["crucial", "essential", "phenomenon"], tip: "吸引讀者注意該數據主題。" },
      { id: "intro", label: "Introduce Chart (簡介圖表)", patterns: ["The chart illustrates...", "The graph shows...", "According to the data..."], words: ["illustrates", "depicts", "distribution"], tip: "使用引導句型簡介圖表內容。" },
      { id: "trend", label: "Overall Trend (整體趨勢)", patterns: ["Overall, it is clear that...", "What stands out is...", "A striking feature is..."], words: ["dominant", "noteworthy", "striking"], tip: "找出比例最大與最小的項目。" },
      { id: "details", label: "Key Details (重點數據)", patterns: ["...accounts for X%", "compared with", "takes up the share of..."], words: ["approximately", "followed by", "significant"], tip: "比較不同數據之間的差距。" },
      { id: "implication", label: "Comment/Implication (啟示)", patterns: ["This suggests that...", "The data indicates that...", "As a result, ..."], words: ["implies", "consequently", "indication"], tip: "總結數據反映出的意義。" }
    ]
  },
  letter: {
    title: "私人書信",
    subtitle: "Personal Letter",
    theme: "rose",
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-200",
    btn: "bg-rose-600 hover:bg-rose-700 shadow-rose-200",
    accent: "bg-rose-600",
    icon: <Heart size={28} />,
    hasExample: true,
    exampleData: {
      type: "text",
      title: "Mission: Repairing a Friendship",
      context: "你與好友 Jamie 最近因為誤會而疏遠。請寫信向他道歉，表達你的真實感受，並回憶過去的美好時光。"
    },
    steps: [
      { id: "greeting", label: "Greeting (親暱問候)", patterns: ["Dearest [Name],", "Hey [Name],", "My dear [Name],"], words: ["Dearest", "My friend", "Warmly"], tip: "使用溫馨的稱呼開啟對話。" },
      { id: "purpose", label: "Opening (開頭與來意)", patterns: ["I've been thinking a lot about...", "I'm writing to clear the air.", "I felt bad about..."], words: ["reflecting", "heavy heart", "honesty"], tip: "坦誠地開啟道歉的話題。" },
      { id: "details", label: "Feelings & Apology (感受與道歉)", patterns: ["I sincerely apologize for...", "I cherish our friendship.", "I didn't mean to..."], words: ["sincerely", "regret", "cherish"], tip: "真誠地道歉並解釋你的心情。" },
      { id: "expectation", label: "Expectation (未來的期許)", patterns: ["I hope we can...", "Let's grab a coffee.", "I miss our talks."], words: ["reconnect", "forgive", "move forward"], tip: "提出具體的修補建議。" },
      { id: "closing", label: "Closing (暖心結尾)", patterns: ["Best,", "Love,", "Yours always,"], words: ["Truly yours", "Best wishes", "Always"], tip: "選擇溫暖的結尾語。" }
    ]
  },
  opinion: {
    title: "意見表達",
    subtitle: "Opinion Writing",
    theme: "indigo",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    btn: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200",
    accent: "bg-indigo-600",
    icon: <MessageSquare size={28} />,
    hasTopics: true,
    topics: [
      { id: "ai", category: "國際趨勢", title: "AI in Classroom", desc: "應否允許在學習中使用 AI 工具（如 ChatGPT）？", pro: "個人化學習夥伴、提升研究效率", con: "學術誠信隱憂、削弱獨立思考" },
      { id: "ban", category: "校園議題", title: "Smartphone Ban", desc: "學校應否在校園內全面禁止使用手機？", pro: "減少干擾、增加實體社交", con: "緊急聯絡需求、數位學習限制" },
      { id: "conv", category: "台灣社會", title: "Conv-Store Culture", desc: "台灣超商的高密度便利性是否利大於弊？", pro: "多功能服務、隨處可得的支援", con: "勞動過勞、過度包裝環保問題" }
    ],
    steps: [
      { id: "hook", label: "Hook (主題引導)", patterns: ["...has sparkled heated debates.", "...is a hot topic lately.", "Nowadays, people worry about..."], words: ["controversial", "phenomenon", "debate"], tip: "描述議題的重要性與現狀。" },
      { id: "thesis", label: "Topic Sentence (立場聲明)", patterns: ["From my perspective,", "I firmly believe that...", "In my view..."], words: ["standpoint", "convinced", "firmly"], tip: "清楚表達你的核心立場。" },
      { id: "reason1", label: "First Reason (理由一)", patterns: ["Firstly,", "To begin with,", "The primary reason is..."], words: ["primary", "essential", "advantage"], tip: "給出第一個支持你立場的理由。" },
      { id: "reason2", label: "Second Reason (理由二)", patterns: ["Furthermore,", "In addition,", "Secondly,"], words: ["moreover", "equally important", "likewise"], tip: "補充另一個支持點。" },
      { id: "concession", label: "Concession (讓步反駁)", patterns: ["Admittedly, ...", "While some argue that...", "On the other hand..."], words: ["nevertheless", "outweigh", "contrary"], tip: "先承認對方的觀點，隨即進行反駁。" },
      { id: "conclusion", label: "Conclusion (總結)", patterns: ["In conclusion,", "To sum up,", "In a nutshell,"], words: ["ultimately", "final thought", "essential"], tip: "重申立場並給予最終建議。" }
    ]
  },
  narrative: {
    title: "敘事寫作",
    subtitle: "Narrative Writing",
    theme: "amber",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    btn: "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
    accent: "bg-amber-600",
    icon: <Camera size={28} />,
    hasExample: true,
    exampleData: {
      type: "text",
      title: "Mission: An Unexpected Lesson",
      context: "描述一次你原本很期待參加的活動，最後卻發生了意外狀況，讓你學到重要一課的經歷。"
    },
    steps: [
      { id: "setting", label: "Setting (背景設定)", patterns: ["It was a sunny morning when...", "I had been looking forward to...", "The day started normally..."], words: ["excited", "anticipation", "destination"], tip: "交代時間、地點與當時的心情。" },
      { id: "conflict", label: "Conflict (事件發生)", patterns: ["Unexpectedly, ...", "However, things took a turn when...", "Suddenly, I realized..."], words: ["suddenly", "shocked", "turning point"], tip: "描述意外發生的那一刻。" },
      { id: "climax", label: "Climax (高潮情節)", patterns: ["I found myself in a tough spot.", "At that moment, I realized...", "The situation got worse..."], words: ["desperate", "struggle", "panic"], tip: "描述事件中最緊張或最重要的轉折。" },
      { id: "resolution", label: "Resolution (問題解決)", patterns: ["Eventually, I decided to...", "With the help of...", "After trying many times..."], words: ["relief", "resolved", "solution"], tip: "描述問題是如何解決或故事如何落幕。" },
      { id: "theme", label: "Lesson (啟示總結)", patterns: ["Looking back, I learned that...", "This experience taught me...", "I realized the importance of..."], words: ["valuable", "transformed", "insight"], tip: "這次經歷帶給你的成長或啟示。" }
    ]
  },
  person: {
    title: "人物描述",
    subtitle: "Descriptive: Person",
    theme: "cyan",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    btn: "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200",
    accent: "bg-cyan-600",
    icon: <Search size={28} />,
    steps: [
      { id: "intro", label: "Introduction (人物簡介)", patterns: ["I'd like to talk about...", "The person I admire most is...", "Meeting him/her was..."], words: ["influence", "extraordinary", "connection"], tip: "介紹這個人的身份與你們的關係。" },
      { id: "appearance", label: "Appearance (外型特徵)", patterns: ["He/She has a ... look.", "What strikes me first is...", "His/Her eyes are full of..."], words: ["energetic", "distinguished", "feature"], tip: "描述視覺上的第一印象。" },
      { id: "personality", label: "Personality (內在個性)", patterns: ["He/She is known for...", "Beyond appearance, he/she is...", "One thing I love about..."], words: ["compassionate", "humorous", "diligent"], tip: "列舉 2-3 個突出的性格優點。" },
      { id: "example", label: "Specific Example (具體事例)", patterns: ["I remember a time when...", "This shows how kind he/she is...", "Whenever someone needs help..."], words: ["dedication", "inspired", "act of kindness"], tip: "用一件具體的小事來證明其特質。" },
      { id: "impact", label: "Impact (對你的影響)", patterns: ["He/She has taught me...", "Because of him/her, I...", "He/She is a true..."], words: ["role model", "gratitude", "inspired"], tip: "總結他/她對你的重要影響。" }
    ]
  },
  place: {
    title: "地點描述",
    subtitle: "Descriptive: Place",
    theme: "lime",
    color: "text-lime-600",
    bg: "bg-lime-50",
    border: "border-lime-200",
    btn: "bg-lime-600 hover:bg-lime-700 shadow-lime-200",
    accent: "bg-lime-600",
    icon: <Map size={28} />,
    steps: [
      { id: "intro", label: "Location (地點背景)", patterns: ["Located in the heart of...", "There is a hidden gem called...", "The most peaceful place is..."], words: ["destination", "situated", "scenic"], tip: "說明地點在哪裡，以及為何特別。" },
      { id: "senses", label: "Sensory Details (感官描述)", patterns: ["I can hear the sound of...", "The air is filled with the scent of...", "What catches the eye is..."], words: ["breathtaking", "vibrant", "fragrance"], tip: "運用五感（視聽嗅味觸）來豐富描述。" },
      { id: "activity", label: "Activity (當地活動)", patterns: ["Visitors can enjoy...", "One thing you must do here is...", "It's a perfect place for..."], words: ["exploration", "unwind", "attraction"], tip: "人們在那裡通常會做什麼活動？" },
      { id: "atmosphere", label: "Atmosphere (氛圍描述)", patterns: ["The place has a ... vibe.", "It feels like stepping into...", "The energy here is..."], words: ["peaceful", "bustling", "serene"], tip: "描述這個地點帶給人的心理感受。" },
      { id: "conclusion", label: "Conclusion (總結心得)", patterns: ["It is more than just a place...", "I highly recommend visiting...", "I'll never forget the time in..."], words: ["unforgettable", "worthwhile", "memories"], tip: "總結它為何是一個值得珍藏的地點。" }
    ]
  },
  problem: {
    title: "解決問題",
    subtitle: "Problem & Solution",
    theme: "orange",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    btn: "bg-orange-600 hover:bg-orange-700 shadow-orange-200",
    accent: "bg-orange-600",
    icon: <HelpCircle size={28} />,
    steps: [
      { id: "problem", label: "The Problem (現狀問題)", patterns: ["One major issue we face is...", "Recently, ... has become a serious problem.", "It is concerning that..."], words: ["concerning", "challenge", "crisis"], tip: "清楚描述目前遇到的具體困難。" },
      { id: "causes", label: "The Causes (背後起因)", patterns: ["The main reason behind this is...", "This problem arises from...", "A key factor is..."], words: ["root cause", "contributing", "origin"], tip: "分析導致這個問題發生的主因。" },
      { id: "solution1", label: "Solution 1 (對策一)", patterns: ["To address this, we could...", "The first step is to...", "Government should..."], words: ["implementation", "effective", "measure"], tip: "提出第一個可行的解決方案。" },
      { id: "solution2", label: "Solution 2 (對策二)", patterns: ["In addition, ...", "Another potential solution is...", "Individuals can also..."], words: ["furthermore", "alternative", "collaboration"], tip: "提出另一個補充或互補的建議。" },
      { id: "outlook", label: "Outlook (未來展望)", patterns: ["By doing so, we can...", "I believe that with these efforts...", "The future will be..."], words: ["sustainable", "promising", "positive"], tip: "描述解決問題後的理想願景。" }
    ]
  },
  compare: {
    title: "對比比較",
    subtitle: "Compare & Contrast",
    theme: "purple",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    btn: "bg-purple-600 hover:bg-purple-700 shadow-purple-200",
    accent: "bg-purple-600",
    icon: <ListChecks size={28} />,
    steps: [
      { id: "intro", label: "Subjects (對象簡介)", patterns: ["While A and B share similarities, they differ in...", "Comparing A and B reveals...", "Choosing between A and B is..."], words: ["comparison", "distinct", "evaluation"], tip: "介紹你要進行比較的兩個主要對象。" },
      { id: "similarity", label: "Similarities (共同點)", patterns: ["Both A and B are...", "Similarly, both of them...", "A and B have X in common."], words: ["likewise", "in common", "identical"], tip: "描述兩者之間相似或共通的地方。" },
      { id: "difference", label: "Differences (相異點)", patterns: ["On the contrary, ...", "Unlike A, B tends to...", "A is X, whereas B is Y."], words: ["whereas", "contrast", "divergent"], tip: "聚焦描述兩者之間最顯著的區別。" },
      { id: "preference", label: "Preference (個人偏好)", patterns: ["As for me, I prefer A because...", "If I had to choose, I would...", "A suits me better..."], words: ["choice", "preference", "favor"], tip: "說明你個人比較偏好哪一個，以及理由。" },
      { id: "summary", label: "Final Thought (結語總結)", patterns: ["In short, both have their pros and cons.", "Choosing between them depends on...", "Ultimately, ..."], words: ["perspective", "ultimate", "balanced"], tip: "總結這次對比的核心心得。" }
    ]
  },
  process: {
    title: "流程步驟",
    subtitle: "Process Writing",
    theme: "yellow",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    btn: "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200",
    accent: "bg-yellow-600",
    icon: <PenTool size={28} />,
    steps: [
      { id: "intro", label: "Objective (目標準備)", patterns: ["To make a perfect ..., you need...", "The process of ... is quite simple.", "Before you start, gather..."], words: ["essential", "preparation", "requirement"], tip: "說明最終目標是什麼，以及需要哪些準備。" },
      { id: "step1", label: "Step 1 (第一步)", patterns: ["First, you should...", "To begin with, ...", "The initial step is to..."], words: ["initially", "commence", "primary"], tip: "描述流程中最開始的動作。" },
      { id: "step2", label: "Next Steps (後續流程)", patterns: ["After that, ...", "The next step is to...", "Subsequently, ..."], words: ["subsequently", "followed by", "intermediate"], tip: "描述中間關鍵的操作環節。" },
      { id: "caution", label: "Cautions (注意事項)", patterns: ["Be careful not to...", "It is important to remember that...", "Make sure you..."], words: ["precautions", "watchful", "critical"], tip: "提醒容易出錯、受傷或需要精確的地方。" },
      { id: "result", label: "Result (成果展示)", patterns: ["Finally, you will have a...", "Now you can enjoy your...", "The end result is..."], words: ["accomplishment", "satisfying", "output"], tip: "描述最後完成的理想狀態。" }
    ]
  },
  summary: {
    title: "心得摘要",
    subtitle: "Summary Writing",
    theme: "slate",
    color: "text-slate-600",
    bg: "bg-slate-50",
    border: "border-slate-200",
    btn: "bg-slate-600 hover:bg-slate-700 shadow-slate-200",
    accent: "bg-slate-600",
    icon: <History size={28} />,
    steps: [
      { id: "overview", label: "Overview (內容概觀)", patterns: ["The story/article tells us about...", "I recently read a book titled...", "The main theme is..."], words: ["summary", "content", "narrative"], tip: "用簡短的話交代文章、書或影片的核心主題。" },
      { id: "main_points", label: "Main Points (重點摘錄)", patterns: ["The author emphasizes that...", "The core message is...", "Several key points include..."], words: ["highlight", "central theme", "argument"], tip: "提取作者最想傳達的 2-3 個核心觀念。" },
      { id: "favorite", label: "Favorite Part (最愛部分)", patterns: ["What impressed me most was...", "The most touching part is when...", "I really liked..."], words: ["impact", "impressive", "vivid"], tip: "描述最讓你難忘或有共鳴的情節。" },
      { id: "reflection", label: "Reflection (個人省思)", patterns: ["I started to realize that...", "This made me think about...", "My takeaway is..."], words: ["realization", "insight", "contemplate"], tip: "這段內容對你個人生活或思考的啟發。" },
      { id: "recommend", label: "Recommendation (推薦語)", patterns: ["I would recommend this to...", "It is definitely a must-read.", "Anyone interested in ... should..."], words: ["highly suggested", "worthwhile", "inspiring"], tip: "你會向誰推薦這份內容？為什麼？" }
    ]
  },
  diary: {
    title: "生活日記",
    subtitle: "Diary Entry",
    theme: "violet",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    btn: "bg-violet-600 hover:bg-violet-700 shadow-violet-200",
    accent: "bg-violet-600",
    icon: <Coffee size={28} />,
    steps: [
      { id: "date", label: "Date & Mood (日期心情)", patterns: ["March 15, Sunny.", "Today was a ... day.", "I woke up feeling..."], words: ["exhausted", "delighted", "productive"], tip: "寫下日期與這一天整體的「心情色調」。" },
      { id: "event", label: "Major Event (今日大事)", patterns: ["Something interesting happened today.", "I spent most of my time...", "The highlight of today was..."], words: ["unforgettable", "ordinary", "meaningful"], tip: "描述今天發生最值得被記下的一件事。" },
      { id: "feeling", label: "Emotions (內心情感)", patterns: ["I felt a bit ... when...", "I'm still thinking about...", "I was surprised by..."], words: ["overwhelmed", "grateful", "confusion"], tip: "深入描寫這件事帶給你的真實心理感受。" },
      { id: "gratitude", label: "Small Gratitude (小確幸)", patterns: ["I'm grateful for...", "One good thing today was...", "I enjoyed..."], words: ["blessing", "appreciation", "comfort"], tip: "寫下一件讓你感到感激或開心的小事。" },
      { id: "tomorrow", label: "Hope (明日期許)", patterns: ["Tomorrow, I hope I can...", "Looking forward to another...", "I will try my best to..."], words: ["anticipate", "fresh start", "aspiration"], tip: "給明天的自己一句正向的鼓勵。" }
    ]
  }
};

const App = () => {
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // AI 反饋狀態管理
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);
  const [aiError, setAiError] = useState(null);

  const currentTheme = selectedMode ? WRITING_TEMPLATES[selectedMode] : null;

  // 輸入變更處理
  const handleInputChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (aiFeedback) setAiFeedback(null); // 當重新輸入時清除舊的 AI 反饋
  };

  // AI API 調用邏輯
  const getAIFeedback = async () => {
    const userInput = answers[currentTheme.steps[currentStep].id];
    if (!userInput || userInput.trim().length < 5) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiFeedback(null);

    const apiKey = ""; // 執行環境將自動提供 Key
    const systemPrompt = `你是一位專業的英文寫作老師。
    學生正在練習「${currentTheme.title}」寫作。目前的練習步驟是「${currentTheme.steps[currentStep].label}」。
    情境資訊：${selectedTopic ? selectedTopic.title : (currentTheme.exampleData?.title || "自由主題")}。
    
    請分析學生的句子並提供以下 JSON 格式回應：
    {
      "isGrammarCorrect": boolean,
      "corrected": "文法修正後的句子（若沒錯則重複原句）",
      "explanation": "針對文法或修辭改進空間的簡短中文解釋",
      "betterVersion": "一個符合此寫作步驟、更道地、且具備高品質架構的優化建議",
      "vocabularyTips": ["推薦使用的 2-3 個進階搭配詞或單字"]
    }
    請務必只回應合法的 JSON 字串。`;

    const userQuery = `學生輸入的句子： "${userInput}"`;

    let retries = 0;
    const maxRetries = 5;

    const callApi = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (!response.ok) throw new Error('API Request Failed');
        
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Empty AI response');
        
        setAiFeedback(JSON.parse(text));
      } catch (err) {
        if (retries < maxRetries) {
          retries++;
          const delay = Math.pow(2, retries) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          return callApi();
        }
        setAiError("AI 目前連線較慢，請檢查文法後繼續下一步。");
      } finally {
        setIsAiLoading(false);
      }
    };

    callApi();
  };

  // 套用 AI 優化建議
  const applyAiSuggestion = () => {
    if (aiFeedback?.betterVersion) {
      handleInputChange(currentTheme.steps[currentStep].id, aiFeedback.betterVersion);
      setAiFeedback(null);
    }
  };

  // 重置與切換模式
  const startMode = (mode) => {
    setSelectedMode(mode);
    setSelectedTopic(null);
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
    setAiFeedback(null);
  };

  // 渲染情境說明輔助組件
  const renderContextInfo = () => {
    if (currentTheme.hasTopics && selectedTopic) {
      return (
        <div className="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
           <p className="text-sm text-slate-700 leading-relaxed font-medium">{selectedTopic.desc}</p>
        </div>
      );
    }
    if (currentTheme.hasExample && currentTheme.exampleData) {
      const ex = currentTheme.exampleData;
      if (ex.type === 'chart') {
        return (
          <div className="space-y-4">
            <h5 className="font-bold text-slate-800 text-sm">{ex.title}</h5>
            <div className="space-y-3">
              {ex.items.map((item, idx) => (
                <div key={idx} className="space-y-1 text-[10px] font-bold">
                  <div className="flex justify-between"><span>{item.label}</span><span className={currentTheme.color}>{item.value}%</span></div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }
      return (
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
           <p className="text-sm italic text-slate-600 leading-relaxed">"{ex.context}"</p>
        </div>
      );
    }
    return (
       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p className="text-sm text-slate-400 italic">依照主題自由發揮，打造你的段落。</p>
       </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${selectedMode ? currentTheme.bg : 'bg-slate-50'} text-slate-900 font-sans p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 flex items-center justify-center gap-3 italic tracking-tighter uppercase">
            <Sparkles className={selectedMode ? currentTheme.color : "text-blue-600"} size={40} />
            Writing Workshop
          </h1>
          <p className="text-slate-400 mt-2 font-black uppercase tracking-[0.3em] text-[10px]">AI-Powered Scaffolding Practice</p>
        </header>

        {/* Home Screen - Grid Selection */}
        {!selectedMode ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {Object.entries(WRITING_TEMPLATES).map(([key, template]) => (
              <button 
                key={key} 
                onClick={() => startMode(key)} 
                className="group p-7 bg-white rounded-[2rem] shadow-lg border-2 border-transparent hover:border-blue-400 transition-all text-left transform hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`w-14 h-14 ${template.bg} ${template.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-inner shadow-white/50`}>
                  {template.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">{template.title}</h3>
                <p className="text-[10px] text-slate-400 font-black tracking-widest mb-3 uppercase">{template.subtitle}</p>
                <p className="text-xs text-slate-500 leading-relaxed">循序漸進練習五大架構，包含專屬 AI 導師即時優化。</p>
                <div className={`mt-6 flex items-center ${template.color} font-black text-xs uppercase tracking-widest`}>
                  Start Practice <ChevronRight size={14} className="ml-1" />
                </div>
              </button>
            ))}
          </div>
        ) : isFinished ? (
          /* Final Paragraph View */
          <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] p-10 md:p-14 border border-white animate-in zoom-in duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 ${currentTheme.bg} rounded-full -mr-32 -mt-32 opacity-50`}></div>
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <h2 className="text-4xl font-black flex items-center gap-4 text-slate-800">
                  <Trophy className="text-yellow-500" size={48} />
                  Mission Completed!
                </h2>
                <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">這是你親手打造的高品質連貫段落：</p>
              </div>
              <button onClick={() => startMode(null)} className="p-4 bg-slate-100 text-slate-500 rounded-3xl hover:bg-slate-200 transition-colors">
                <RefreshCw size={24} />
              </button>
            </div>
            
            <div className={`p-10 rounded-[2.5rem] border-4 ${currentTheme.border} ${currentTheme.bg} mb-10 min-h-[250px] leading-[2.2] text-2xl text-slate-700 font-serif italic shadow-inner`}>
              {currentTheme.steps.map(step => answers[step.id] || "").filter(t => t.trim() !== "").join(" ")}
            </div>

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
               <button 
                 onClick={() => {
                   const text = currentTheme.steps.map(s => answers[s.id] || "").filter(t => t).join(" ");
                   const el = document.createElement('textarea'); el.value = text; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
                   setCopied(true); setTimeout(() => setCopied(false), 2000);
                 }} 
                 className={`flex-[2] ${currentTheme.btn} text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95`}
               >
                 {copied ? <CheckCircle size={28} /> : <Copy size={28} />} {copied ? "段落已複製到剪貼簿" : "複製最終完整段落"}
               </button>
               <button onClick={() => setIsFinished(false)} className="flex-1 bg-white border-4 border-slate-100 text-slate-400 py-6 rounded-3xl font-black text-xl hover:bg-slate-50 transition-all">
                 返回微調
               </button>
            </div>
          </div>
        ) : currentTheme.hasTopics && !selectedTopic ? (
          /* Topic Selection (e.g., Opinion) */
          <div className="max-w-5xl mx-auto animate-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-4xl font-black text-slate-800 text-center mb-12 tracking-tight">請選擇一個練習議題 (Select Topic)：</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {currentTheme.topics.map(topic => (
                <button 
                  key={topic.id} 
                  onClick={() => setSelectedTopic(topic)} 
                  className="bg-white p-10 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-indigo-400 transition-all text-left group flex flex-col h-full transform hover:-translate-y-2"
                >
                  <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] mb-4 block opacity-60">{topic.category}</span>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">{topic.title}</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed flex-grow font-medium">{topic.desc}</p>
                  <div className="space-y-3 mt-auto">
                    <div className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                       <Check size={12}/> PRO: {topic.pro}
                    </div>
                    <div className="text-[10px] font-black bg-rose-50 text-rose-600 px-3 py-2 rounded-xl border border-rose-100 flex items-center gap-2">
                       <AlertCircle size={12}/> CON: {topic.con}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedMode(null)} className="mt-12 mx-auto flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors px-6 py-3 rounded-full hover:bg-slate-200/50">
               <ChevronLeft size={20} /> 返回模組選擇
            </button>
          </div>
        ) : (
          /* Main Writing Scaffold Interface */
          <div className="flex flex-col lg:flex-row gap-10 items-start animate-in slide-in-from-bottom-8 duration-700">
            
            {/* Left Sidebar: Resources & Reference */}
            <div className="w-full lg:w-[32%] space-y-6 lg:sticky lg:top-8">
              
              {/* Context Card */}
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-white">
                <div className="flex items-center gap-3 mb-6">
                   <div className={`${currentTheme.bg} ${currentTheme.color} p-2 rounded-xl`}>{currentTheme.icon}</div>
                   <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">任務情境與參考資料</h3>
                </div>
                <h4 className="text-xl font-black text-slate-700 mb-4 leading-tight">
                  {selectedTopic ? selectedTopic.title : (currentTheme.exampleData?.title || "自由寫作練習")}
                </h4>
                {renderContextInfo()}
              </div>

              {/* Phrase Bank Card */}
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/5 relative overflow-hidden group">
                 <div className={`absolute top-0 left-0 w-1 h-full ${currentTheme.accent}`}></div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                    <Lightbulb size={18}/> 推薦句型與搭配詞
                 </h3>
                 <div className="space-y-6">
                   <div>
                     <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-3">推薦句型 (Patterns)</span>
                     <div className="flex flex-wrap gap-2">
                        {currentTheme.steps[currentStep].patterns.map((p, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleInputChange(currentTheme.steps[currentStep].id, (answers[currentTheme.steps[currentStep].id] || "") + p.replace('...', ' '))}
                            className="text-[11px] bg-white/5 hover:bg-white/20 px-3 py-2 rounded-xl border border-white/10 transition-all font-mono italic text-blue-100"
                          >
                            {p}
                          </button>
                        ))}
                     </div>
                   </div>
                   <div className="pt-4 border-t border-white/10">
                     <span className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-3">關鍵單字 (Word Bank)</span>
                     <div className="flex flex-wrap gap-2">
                        {currentTheme.steps[currentStep].words.map((w, i) => (
                          <span key={i} className="text-[10px] font-black text-blue-300 uppercase bg-blue-500/10 px-3 py-1.5 rounded-lg">#{w}</span>
                        ))}
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Right Main Column: Interactive Input & AI */}
            <div className="flex-1 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white flex flex-col">
              
              {/* Step Header */}
              <div className={`${currentTheme.accent} p-8 text-white flex justify-between items-center shadow-lg relative z-10`}>
                <button onClick={() => selectedTopic ? setSelectedTopic(null) : setSelectedMode(null)} className="p-3 hover:bg-black/10 rounded-2xl transition-colors">
                  <ChevronLeft size={28} />
                </button>
                <div className="text-center">
                  <span className="text-[10px] font-black opacity-70 block uppercase tracking-[0.3em] mb-1">{currentTheme.subtitle}</span>
                  <span className="font-black text-2xl tracking-tight">{currentTheme.steps[currentStep].label}</span>
                </div>
                <div className="bg-white/20 px-5 py-2 rounded-full text-sm font-black tracking-tighter shadow-inner">
                  STEP {currentStep + 1} / {currentTheme.steps.length}
                </div>
              </div>

              <div className="p-8 md:p-12 flex-grow">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-10">
                  {currentTheme.steps.map((_, idx) => (
                    <div key={idx} className={`h-2 flex-1 rounded-full transition-all duration-700 ${idx <= currentStep ? currentTheme.accent : 'bg-slate-100'}`} />
                  ))}
                </div>

                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl font-black mb-6 text-slate-800 tracking-tight flex items-center gap-3">
                    <PenTool className={currentTheme.color} size={28}/>
                    請開始進行造句練習：
                  </h2>

                  <div className="relative mb-6">
                    <textarea 
                      autoFocus
                      className="w-full h-48 p-8 bg-slate-50 border-4 border-slate-50 rounded-[2.5rem] focus:bg-white focus:border-blue-500 focus:outline-none transition-all text-2xl font-serif leading-relaxed shadow-inner"
                      placeholder="根據左側推薦句型與提示，在此輸入你的英文句子..."
                      value={answers[currentTheme.steps[currentStep].id] || ""}
                      onChange={(e) => handleInputChange(currentTheme.steps[currentStep].id, e.target.value)}
                    />
                    
                    {/* Floating AI Button */}
                    <div className="absolute bottom-6 right-6">
                       <button 
                         onClick={getAIFeedback} 
                         disabled={isAiLoading || !answers[currentTheme.steps[currentStep].id]?.trim()} 
                         className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-2xl ${isAiLoading ? 'bg-slate-200 text-slate-400' : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-105 active:scale-95'}`}
                       >
                          {isAiLoading ? <Loader2 className="animate-spin" size={20}/> : <Zap size={20} className="group-hover:animate-pulse" />}
                          {isAiLoading ? "AI 導師思考中..." : "AI 智能修正建議"}
                       </button>
                    </div>
                  </div>

                  {/* AI Feedback Display Area */}
                  {aiFeedback && (
                    <div className="mb-8 animate-in slide-in-from-top-4 duration-500 bg-indigo-50 border-2 border-indigo-100 rounded-[2.5rem] p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><Sparkles size={20}/></div>
                         <span className="font-black text-indigo-800 text-sm uppercase tracking-widest">AI 導師 即時回饋 (Feedback)</span>
                      </div>
                      
                      {!aiFeedback.isGrammarCorrect && (
                        <div className="mb-6 p-5 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm animate-pulse">
                          <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase mb-2"><AlertCircle size={16}/> 文法修正建議</div>
                          <p className="text-slate-800 font-serif italic text-lg leading-relaxed">{aiFeedback.corrected}</p>
                        </div>
                      )}

                      <p className="text-slate-600 mb-6 font-medium leading-relaxed bg-white/50 p-4 rounded-xl">{aiFeedback.explanation}</p>
                      
                      <div className="p-8 bg-white rounded-[2rem] border-2 border-indigo-200 shadow-xl relative group">
                        <button 
                          onClick={applyAiSuggestion} 
                          className="absolute -top-4 -right-4 bg-indigo-600 text-white p-4 rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2 font-black text-sm"
                        >
                           <Check size={20}/> 採用更好的寫法
                        </button>
                        <span className="text-[10px] font-black text-indigo-300 block mb-2 uppercase tracking-widest italic">✨ 更道地、更進階的表達版本 (Better Version)</span>
                        <p className="text-xl md:text-2xl text-slate-800 font-serif font-black leading-relaxed">"{aiFeedback.betterVersion}"</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                           {aiFeedback.vocabularyTips.map((tip, i) => (
                             <span key={i} className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-200">#{tip}</span>
                           ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {aiError && <div className="mb-6 p-4 bg-amber-50 rounded-2xl text-amber-600 text-xs font-bold text-center border border-amber-100">{aiError}</div>}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-10">
                  <button 
                    disabled={currentStep === 0} 
                    onClick={() => { setCurrentStep(c => c - 1); setAiFeedback(null); }} 
                    className="px-10 py-5 text-slate-400 font-black uppercase tracking-widest hover:text-slate-600 transition-colors disabled:opacity-20"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => { 
                      if(currentStep < currentTheme.steps.length - 1) { 
                        setCurrentStep(c => c + 1); 
                        setAiFeedback(null); 
                      } else {
                        setIsFinished(true);
                      }
                    }} 
                    className={`${currentTheme.btn} text-white px-14 py-5 rounded-3xl font-black text-xl shadow-2xl flex items-center gap-3 active:scale-95`}
                  >
                    {currentStep === currentTheme.steps.length - 1 ? "查看最終草稿" : "下一步驟"} 
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              {/* Bottom Sticky Progress Preview */}
              <div className="bg-slate-900 p-10 text-white/90 shadow-inner">
                <div className="flex items-center gap-3 mb-4 opacity-40">
                  <div className={`w-3 h-3 rounded-full ${currentTheme.accent} animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]`}></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Paragraph Live Draft Progress</span>
                </div>
                <p className="text-xl font-serif italic opacity-80 leading-loose max-h-32 overflow-y-auto pr-4 custom-scrollbar">
                  {Object.values(answers).filter(v => v).join(" ") || "Your sentences will appear here as they are constructed..."}
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase pb-12 opacity-50">
          <p>© Mastery Writing Workshop • Powered by Scaffold Teaching Logic</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default App;
