import { useEffect, useMemo, useState } from "react";

const RAW_PROBLEMS = [
  // Arrays
  ["Largest Element in an Array","Arrays","Easy","Python","Must Know"],
  ["Second Largest Element","Arrays","Easy","Python","Must Know"],
  ["Remove Duplicates from Sorted Array","Arrays","Easy","C++","Important"],
  ["Two Sum","Arrays","Easy","Python","Must Know"],
  ["Majority Element","Arrays","Easy","Java","Must Know"],
  ["Kadane's Algorithm","Arrays","Medium","Python","Must Know"],
  ["Best Time to Buy and Sell Stock","Arrays","Easy","Python","Must Know"],
  ["Product of Array Except Self","Arrays","Medium","Python","Important"],
  ["Rotate Array","Arrays","Medium","Java","Important"],
  ["Merge Intervals","Arrays","Medium","Python","Must Know"],
  ["Set Matrix Zeroes","Arrays","Medium","Java","Important"],

  // Hashing
  ["Frequency of Elements","Hashing","Easy","Python","Must Know"],
  ["Longest Consecutive Sequence","Hashing","Medium","Python","Must Know"],
  ["Subarray Sum Equals K","Hashing","Medium","Java","Important"],
  ["Group Anagrams","Hashing","Medium","Python","Important"],

  // Strings
  ["Reverse a String","Strings","Easy","Python","Practice"],
  ["Valid Anagram","Strings","Easy","Python","Must Know"],
  ["Longest Common Prefix","Strings","Easy","Java","Important"],
  ["Valid Palindrome","Strings","Easy","Python","Must Know"],
  ["Longest Palindromic Substring","Strings","Medium","Java","Important"],

  // Two pointers / sliding window
  ["Two Sum II","Two Pointers","Medium","Python","Must Know"],
  ["3Sum","Two Pointers","Medium","Python","Must Know"],
  ["Container With Most Water","Two Pointers","Medium","Java","Important"],
  ["Move Zeroes","Two Pointers","Easy","Python","Practice"],
  ["Maximum Sum Subarray of Size K","Sliding Window","Easy","Python","Important"],
  ["Longest Substring Without Repeating Characters","Sliding Window","Medium","Python","Must Know"],
  ["Minimum Window Substring","Sliding Window","Hard","Java","Advanced"],

  // Binary Search
  ["Binary Search","Binary Search","Easy","Python","Must Know"],
  ["First and Last Position","Binary Search","Medium","Python","Must Know"],
  ["Search in Rotated Sorted Array","Binary Search","Medium","Java","Must Know"],
  ["Find Minimum in Rotated Sorted Array","Binary Search","Medium","C++","Important"],
  ["Koko Eating Bananas","Binary Search","Medium","Python","Important"],

  // Recursion / backtracking
  ["Factorial Using Recursion","Recursion","Easy","Python","Practice"],
  ["Generate Subsequences","Recursion","Medium","Python","Important"],
  ["Generate Parentheses","Recursion","Medium","Java","Important"],
  ["N-Queens","Backtracking","Hard","C++","Advanced"],
  ["Subsets","Backtracking","Medium","Python","Must Know"],
  ["Permutations","Backtracking","Medium","Java","Must Know"],
  ["Combination Sum","Backtracking","Medium","Python","Important"],
  ["Sudoku Solver","Backtracking","Hard","C++","Advanced"],

  // Linked list
  ["Reverse a Linked List","Linked List","Easy","Python","Must Know"],
  ["Detect Cycle in Linked List","Linked List","Easy","Python","Must Know"],
  ["Merge Two Sorted Lists","Linked List","Easy","Java","Must Know"],
  ["Remove Nth Node from End","Linked List","Medium","Python","Important"],
  ["LRU Cache","Linked List","Medium","Java","Advanced"],

  // Stack / queue
  ["Valid Parentheses","Stack & Queue","Easy","Python","Must Know"],
  ["Next Greater Element","Stack & Queue","Medium","C++","Must Know"],
  ["Min Stack","Stack & Queue","Medium","Java","Important"],
  ["Implement Queue Using Stacks","Stack & Queue","Easy","Python","Practice"],

  // Trees / BST
  ["Maximum Depth of Binary Tree","Trees","Easy","Python","Must Know"],
  ["Inorder Traversal","Trees","Easy","Python","Must Know"],
  ["Preorder Traversal","Trees","Easy","Python","Must Know"],
  ["Postorder Traversal","Trees","Easy","Java","Practice"],
  ["Level Order Traversal","Trees","Medium","Python","Must Know"],
  ["Diameter of Binary Tree","Trees","Medium","Java","Important"],
  ["Lowest Common Ancestor","Trees","Medium","C++","Important"],
  ["Search in Binary Search Tree","BST","Easy","Python","Practice"],
  ["Validate Binary Search Tree","BST","Medium","Java","Must Know"],
  ["Kth Smallest Element in BST","BST","Medium","C++","Important"],

  // Heaps
  ["Kth Largest Element","Heaps","Medium","C++","Must Know"],
  ["Top K Frequent Elements","Heaps","Medium","Python","Important"],
  ["Merge K Sorted Lists","Heaps","Hard","Java","Advanced"],
  ["Find Median from Data Stream","Heaps","Hard","Python","Advanced"],

  // Graphs
  ["BFS Traversal","Graphs","Easy","Python","Must Know"],
  ["DFS Traversal","Graphs","Easy","Python","Must Know"],
  ["Number of Islands","Graphs","Medium","Java","Must Know"],
  ["Dijkstra's Algorithm","Graphs","Medium","C++","Must Know"],
  ["Course Schedule","Graphs","Medium","Python","Important"],
  ["Minimum Spanning Tree","Graphs","Medium","C++","Important"],
  ["Topological Sort","Graphs","Medium","Python","Important"],

  // Greedy
  ["Activity Selection","Greedy","Medium","C++","Important"],
  ["Fractional Knapsack","Greedy","Medium","Python","Must Know"],
  ["Jump Game","Greedy","Medium","Python","Important"],

  // Bit manipulation
  ["Single Number","Bit Manipulation","Easy","Python","Must Know"],
  ["Power of Two","Bit Manipulation","Easy","Python","Practice"],
  ["Counting Bits","Bit Manipulation","Easy","Java","Important"],
  ["Reverse Bits","Bit Manipulation","Easy","C++","Important"],

  // Dynamic programming
  ["Climbing Stairs","Dynamic Programming","Easy","Python","Must Know"],
  ["House Robber","Dynamic Programming","Medium","Python","Important"],
  ["0/1 Knapsack","Dynamic Programming","Medium","Python","Must Know"],
  ["Longest Common Subsequence","Dynamic Programming","Medium","Java","Must Know"],
  ["Coin Change","Dynamic Programming","Medium","Python","Important"],
  ["Edit Distance","Dynamic Programming","Hard","Java","Advanced"],
  ["Longest Increasing Subsequence","Dynamic Programming","Medium","Python","Important"],

  // Tries
  ["Implement Trie","Tries","Medium","C++","Important"],
  ["Word Search II","Tries","Hard","Python","Advanced"],
  ["Maximum XOR of Two Numbers","Tries","Hard","C++","Advanced"],
];

const PROBLEMS = RAW_PROBLEMS.map(
  ([title, topic, difficulty, language, priority], index) => ({
    id: `base-${index}`,
    title,
    topic,
    difficulty,
    language,
    priority,
    custom: false,
  })
);

const TOPIC_META = {
  Arrays: ["▦", "Master traversal, sorting and powerful array patterns."],
  Hashing: ["#", "Frequency maps, lookups and fast counting."],
  Strings: ["Aa", "Manipulation, matching, frequency and palindrome patterns."],
  "Two Pointers": ["↔", "Reduce repeated work with moving pointers."],
  "Sliding Window": ["□", "Process continuous ranges efficiently."],
  "Binary Search": ["⌕", "Search sorted spaces and monotonic answers."],
  Recursion: ["↻", "Break complex problems into smaller subproblems."],
  "Linked List": ["⛓", "Pointers, reversal and linked structure patterns."],
  "Stack & Queue": ["▤", "Master LIFO, FIFO and monotonic structures."],
  Trees: ["⌂", "Traversal, depth, recursion and tree patterns."],
  BST: ["◇", "Ordered searching and validation."],
  Heaps: ["△", "Priority queues, top-K and scheduling."],
  Graphs: ["◎", "BFS, DFS, shortest paths and connectivity."],
  Greedy: ["⚡", "Make efficient local choices when they apply."],
  Backtracking: ["↩", "Explore choices and prune invalid paths."],
  "Bit Manipulation": ["01", "Use binary operations effectively."],
  "Dynamic Programming": ["DP", "Memoization, tabulation and optimization."],
  Tries: ["T", "Prefix trees and fast string queries."],
};

const TOPICS = Object.keys(TOPIC_META);
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const PRIORITIES = ["Must Know", "Important", "Practice", "Advanced"];
const LANGUAGES = ["Python", "Java", "C++", "JavaScript"];

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f6f7fb;color:#172033}
button,input,select{font:inherit}button{cursor:pointer}
.cr-app{min-height:100vh;display:flex;background:#f6f7fb}
.cr-side{position:fixed;inset:0 auto 0 0;width:245px;background:#0b1322;color:#fff;padding:24px 15px;display:flex;flex-direction:column;z-index:5}
.cr-logo{font-size:22px;font-weight:900;margin:5px 10px 30px;letter-spacing:-.5px}.cr-logo span{color:#7278ff}
.cr-nav{display:flex;flex-direction:column;gap:5px}.cr-nav button{border:0;background:transparent;color:#99a6bc;text-align:left;padding:12px 14px;border-radius:10px;font-size:14px}.cr-nav button:hover,.cr-nav button.active{background:#232f47;color:#fff}
.cr-side-foot{margin-top:auto;color:#738199;font-size:11px;line-height:1.6;padding:10px}.cr-side-foot b{display:block;color:#e3e8f0}
.cr-main{margin-left:245px;width:calc(100% - 245px)}
.cr-header{height:74px;background:#fff;border-bottom:1px solid #e8ebf0;padding:0 31px;display:flex;align-items:center;justify-content:space-between}
.cr-header-title b{font-size:18px}.cr-header-title span{display:block;font-size:11px;color:#8b95a6;margin-top:3px}
.cr-user{display:flex;align-items:center;gap:9px;font-size:12px}.cr-avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#6366f1;color:#fff;font-weight:900}
.cr-content{padding:30px;max-width:1500px;margin:auto}
.cr-hero{background:linear-gradient(120deg,#111827,#39477a);color:#fff;border-radius:20px;padding:38px;display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:18px;box-shadow:0 18px 42px rgba(15,23,42,.12)}
.cr-eyebrow{font-size:10px;font-weight:900;letter-spacing:1.5px;color:#6366f1}.cr-hero .cr-eyebrow{color:#b5baff}.cr-hero h1{font-size:33px;margin:9px 0}.cr-hero p{font-size:13px;color:#d0d7e3;max-width:680px}
.cr-primary{border:0;border-radius:9px;padding:12px 17px;background:#6366f1;color:#fff;font-weight:800}.cr-primary:hover{background:#5558e8}
.cr-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:13px;margin-bottom:18px}.cr-stat{background:#fff;border:1px solid #e6eaf0;border-radius:14px;padding:18px}.cr-stat-icon{width:34px;height:34px;border-radius:9px;background:#eef2ff;color:#6366f1;display:grid;place-items:center;margin-bottom:10px}.cr-stat span{display:block;color:#8993a4;font-size:11px}.cr-stat b{display:block;font-size:26px;margin-top:3px}
.cr-grid2{display:grid;grid-template-columns:1.2fr 1fr;gap:17px;margin-bottom:18px}.cr-card{background:#fff;border:1px solid #e6eaf0;border-radius:14px;padding:22px;box-shadow:0 4px 16px rgba(30,41,59,.035)}.cr-card h2{font-size:18px;margin:7px 0 15px}.cr-muted{font-size:12px;color:#8993a4}
.cr-progress{height:10px;border-radius:30px;background:#edf0f5;overflow:hidden;margin:16px 0 9px}.cr-progress>div{height:100%;background:linear-gradient(90deg,#6366f1,#8b5cf6);border-radius:30px;transition:.35s}
.cr-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:18px}.cr-head h1{font-size:30px;margin:7px 0}.cr-head p{font-size:13px;color:#8993a4}
.cr-link{border:0;background:transparent;color:#6366f1;font-weight:800;font-size:12px}
.cr-list{display:flex;flex-direction:column;gap:8px}.cr-row{display:flex;align-items:center;justify-content:space-between;border:1px solid #edf0f4;border-radius:10px;padding:12px}.cr-row-main{display:flex;flex-direction:column;gap:3px}.cr-row-main b{font-size:13px}.cr-row-main span{font-size:10px;color:#8993a4}
.cr-tag{display:inline-block;padding:5px 8px;border-radius:18px;font-size:9px;font-weight:900;white-space:nowrap}.cr-easy{background:#dcfce7;color:#15803d}.cr-medium{background:#fef3c7;color:#a16207}.cr-hard{background:#fee2e2;color:#dc2626}.cr-lang{background:#eef2ff;color:#4f46e5}.cr-must{background:#ede9fe;color:#7c3aed}.cr-important{background:#e0f2fe;color:#0369a1}.cr-practice{background:#f1f5f9;color:#64748b}.cr-advanced{background:#fee2e2;color:#b91c1c}
.cr-filterbar{display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr 1fr;gap:8px;margin-bottom:10px}.cr-filter{width:100%;padding:11px;border:1px solid #dfe4ec;border-radius:9px;background:#fff;outline:none}.cr-filter:focus{border-color:#6366f1}
.cr-count{font-size:11px;color:#8993a4;margin-bottom:10px}.cr-problem{background:#fff;border:1px solid #e6eaf0;border-radius:12px;padding:13px;display:flex;align-items:center;gap:11px;transition:.18s}.cr-problem:hover{border-color:#cdd1ff;transform:translateY(-1px)}.cr-problem.done{background:#fbfffc}.cr-check{width:29px;height:29px;border-radius:50%;border:2px solid #d6dce5;background:#fff;color:#fff;display:grid;place-items:center;flex:none}.cr-check.progress{background:#f59e0b;border-color:#f59e0b}.cr-check.solved{background:#22c55e;border-color:#22c55e}.cr-problem-info{flex:1;min-width:0}.cr-problem-info h3{font-size:13px;margin-bottom:3px}.cr-problem-info p{font-size:10px;color:#8b95a6;margin-bottom:7px}.cr-tags{display:flex;gap:5px;flex-wrap:wrap}.cr-star{border:0;background:transparent;color:#c8ced8;font-size:19px}.cr-star.on{color:#f59e0b}
.cr-topic-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.cr-topic{background:#fff;border:1px solid #e6eaf0;border-radius:14px;padding:18px;cursor:pointer;transition:.18s}.cr-topic:hover{transform:translateY(-3px);border-color:#cdd1ff;box-shadow:0 10px 25px rgba(30,41,59,.07)}.cr-topic-icon{width:39px;height:39px;border-radius:10px;background:#eef2ff;color:#6366f1;display:grid;place-items:center;font-weight:900;margin-bottom:12px}.cr-topic h3{font-size:14px}.cr-topic p{font-size:11px;line-height:1.5;color:#8993a4;margin:6px 0}
.cr-stage{margin-bottom:23px}.cr-stage-title{display:flex;gap:11px;align-items:flex-start;margin-bottom:10px}.cr-stage-num{width:35px;height:35px;border-radius:10px;background:#111827;color:#fff;display:grid;place-items:center;font-size:10px;font-weight:900}.cr-stage-title h2{font-size:18px}.cr-stage-title p{font-size:11px;color:#8993a4;margin-top:3px}.cr-stage-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.cr-stage-topic{background:#fff;border:1px solid #e6eaf0;border-radius:12px;padding:16px;cursor:pointer}.cr-stage-topic:hover{border-color:#cdd1ff}
.cr-progress-big{background:linear-gradient(135deg,#111827,#39477a);color:#fff;border-radius:16px;padding:38px;text-align:center;max-width:510px;margin-bottom:18px}.cr-circle{width:150px;height:150px;border-radius:50%;background:#6366f1;box-shadow:inset 0 0 0 11px #303b63;display:grid;place-items:center;margin:0 auto 17px}.cr-circle b{font-size:34px}.cr-progress-grid{display:grid;grid-template-columns:1fr 1fr;gap:17px}.cr-metric{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid #edf0f4;font-size:12px}
.cr-profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:17px}.cr-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}.cr-field label{font-size:11px;font-weight:800;color:#657084}.cr-field input,.cr-field select{padding:11px;border:1px solid #dfe4ec;border-radius:9px;background:#fff;outline:none}.cr-field input:focus,.cr-field select:focus{border-color:#6366f1}
.cr-form{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:8px}.cr-form button{grid-column:span 1}
.cr-empty{text-align:center;padding:55px;background:#fff;border:1px solid #e6eaf0;border-radius:14px}.cr-empty p{font-size:12px;color:#8993a4;margin-top:6px}
.cr-setup{min-height:100vh;background:linear-gradient(135deg,#0d1526,#303e6b);display:grid;place-items:center;padding:20px}.cr-setup-card{width:min(560px,100%);background:#fff;border-radius:22px;padding:34px;box-shadow:0 30px 75px rgba(0,0,0,.22)}.cr-setup-logo{font-size:23px;font-weight:900;margin-bottom:23px}.cr-setup-logo span{color:#6366f1}.cr-setup-card h1{font-size:29px;margin-bottom:7px}.cr-setup-card>p{font-size:13px;color:#8993a4;margin-bottom:22px}.cr-setup-form{display:grid;gap:13px}.cr-setup-form label{font-size:11px;font-weight:800;color:#657084}.cr-setup-form input,.cr-setup-form select{display:block;width:100%;margin-top:6px;padding:12px;border:1px solid #dfe4ec;border-radius:9px}
@media(max-width:1050px){.cr-stats{grid-template-columns:repeat(2,1fr)}.cr-topic-grid{grid-template-columns:repeat(3,1fr)}.cr-filterbar{grid-template-columns:1fr 1fr}.cr-grid2,.cr-progress-grid,.cr-profile-grid{grid-template-columns:1fr}.cr-form{grid-template-columns:1fr 1fr}}
@media(max-width:700px){.cr-app{display:block}.cr-side{position:static;width:100%;height:auto}.cr-nav{flex-direction:row;overflow:auto}.cr-nav button{white-space:nowrap}.cr-side-foot{display:none}.cr-main{margin:0;width:100%}.cr-header{padding:0 18px}.cr-content{padding:18px}.cr-hero{flex-direction:column;align-items:flex-start}.cr-stats,.cr-topic-grid,.cr-stage-grid,.cr-profile-grid,.cr-progress-grid,.cr-form,.cr-filterbar{grid-template-columns:1fr}.cr-head{align-items:flex-start;gap:12px}.cr-problem{flex-wrap:wrap}.cr-tags{width:100%;padding-left:40px}}
`;

const POLISH = `
html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased}
::selection{background:#c7d2fe;color:#111827}
::-webkit-scrollbar{width:10px;height:10px}::-webkit-scrollbar-thumb{background:#cbd2e0;border-radius:10px;border:2px solid #f6f7fb}::-webkit-scrollbar-thumb:hover{background:#a9b3c7}
:focus-visible{outline:2px solid #6366f1;outline-offset:2px}
@keyframes crIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes crPop{0%{transform:scale(.7)}60%{transform:scale(1.18)}100%{transform:scale(1)}}
@keyframes crCard{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:none}}
.cr-content>*{animation:crIn .5s cubic-bezier(.22,1,.36,1) both}
.cr-content>*:nth-child(2){animation-delay:.05s}.cr-content>*:nth-child(3){animation-delay:.1s}.cr-content>*:nth-child(4){animation-delay:.15s}.cr-content>*:nth-child(5){animation-delay:.2s}
.cr-header{position:sticky;top:0;z-index:4;background:rgba(255,255,255,.82);backdrop-filter:saturate(180%) blur(12px)}
.cr-avatar{box-shadow:0 4px 12px rgba(99,102,241,.35);transition:transform .25s}.cr-avatar:hover{transform:scale(1.08) rotate(-4deg)}
.cr-nav button{position:relative;transition:background .2s,color .2s,transform .2s,padding .2s}
.cr-nav button:hover{transform:translateX(3px)}
.cr-nav button.active{background:linear-gradient(90deg,#2b3a5e,#1f2a44);box-shadow:inset 3px 0 0 #7278ff}
.cr-hero{position:relative;overflow:hidden}
.cr-hero::after{content:"";position:absolute;right:-70px;top:-90px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(129,140,248,.35),transparent 70%);pointer-events:none}
.cr-hero>*{position:relative;z-index:1}
.cr-primary{transition:transform .18s,box-shadow .2s,background .2s;box-shadow:0 6px 16px rgba(99,102,241,.3)}
.cr-primary:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(99,102,241,.4)}
.cr-primary:active{transform:translateY(0) scale(.97)}
.cr-link{transition:opacity .2s,transform .2s}.cr-link:hover{opacity:.7;transform:translateX(2px)}
.cr-stat,.cr-card,.cr-row,.cr-stage-topic,.cr-topic{transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .25s,border-color .2s,background .2s}
.cr-stat:hover,.cr-card:hover{transform:translateY(-3px);box-shadow:0 14px 30px rgba(30,41,59,.08)}
.cr-stat-icon{transition:transform .3s,background .2s,color .2s}.cr-stat:hover .cr-stat-icon{transform:scale(1.12) rotate(-6deg);background:#6366f1;color:#fff}
.cr-row:hover,.cr-stage-topic:hover{transform:translateX(3px);border-color:#cdd1ff;background:#fafaff}
.cr-topic:hover .cr-topic-icon{background:#6366f1;color:#fff;transform:scale(1.08)}.cr-topic-icon{transition:all .25s}
.cr-progress>div{transition:width .9s cubic-bezier(.22,1,.36,1);position:relative}
.cr-progress>div::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateX(-100%);animation:crShine 2.6s ease-in-out infinite}
@keyframes crShine{to{transform:translateX(100%)}}
.cr-problem{transition:transform .22s cubic-bezier(.22,1,.36,1),box-shadow .22s,border-color .2s,background .3s}
.cr-problem:hover{box-shadow:0 8px 22px rgba(30,41,59,.07)}
.cr-check{transition:background .25s,border-color .25s,transform .2s;cursor:pointer}.cr-check:hover{border-color:#6366f1;transform:scale(1.1)}
.cr-check.solved,.cr-check.progress{animation:crPop .35s ease}
.cr-star{transition:transform .2s,color .2s}.cr-star:hover{transform:scale(1.25) rotate(12deg);color:#f59e0b}.cr-star.on{animation:crPop .35s ease}
.cr-tag{transition:transform .15s}.cr-tag:hover{transform:translateY(-1px)}
.cr-filter,.cr-field input,.cr-field select,.cr-setup-form input,.cr-setup-form select{transition:border-color .2s,box-shadow .2s;outline:none}
.cr-filter:focus,.cr-field input:focus,.cr-field select:focus,.cr-setup-form input:focus,.cr-setup-form select:focus{border-color:#6366f1;box-shadow:0 0 0 4px rgba(99,102,241,.14)}
.cr-circle{transition:transform .4s cubic-bezier(.22,1,.36,1)}.cr-progress-big:hover .cr-circle{transform:scale(1.05)}
.cr-empty{animation:crIn .4s both}
.cr-setup{background:radial-gradient(circle at 20% 15%,#3b4a85,transparent 45%),linear-gradient(135deg,#0d1526,#303e6b)}
.cr-setup-card{animation:crCard .6s cubic-bezier(.22,1,.36,1) both}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

const THEME = `
:root,:root[data-theme=dark]{color-scheme:dark;--bg:#070b14;--bg2:#0c1220;--surf:#0f1626;--surf2:#151d33;--bd:#213056;--tx:#e8ecf8;--mu:#8391b3;--c1:#00f0ff;--c2:#b26bff;--c3:#ff3df2;--c4:#39ff88;--c5:#ffd84a;--c6:#ff7a3d;--gA:55%}
:root[data-theme=light]{color-scheme:light;--bg:#f2f4ff;--bg2:#e9edff;--surf:#ffffff;--surf2:#eef1ff;--bd:#d9def5;--tx:#141a33;--mu:#5b6688;--c1:#0891b2;--c2:#7c3aed;--c3:#db2777;--c4:#059669;--c5:#d97706;--c6:#ea580c;--gA:22%}
:root body{color:var(--tx);background:radial-gradient(900px 500px at 88% -10%,color-mix(in srgb,var(--c2) 16%,transparent),transparent),radial-gradient(700px 450px at 0 100%,color-mix(in srgb,var(--c1) 12%,transparent),transparent),var(--bg);background-attachment:fixed;transition:background .4s,color .4s}
:root .cr-app{background:transparent}
:root ::-webkit-scrollbar-thumb{background:var(--bd);border-color:var(--bg)}
:root .cr-side{background:linear-gradient(180deg,#060a15,#0b1124);border-right:1px solid #1c2645}
:root .cr-logo span,:root .cr-setup-logo span{color:#22e6ff;text-shadow:0 0 14px #22e6ff}
:root .cr-nav button:hover{color:#fff;background:#151f3b}
:root .cr-nav button.active{color:#22e6ff;background:linear-gradient(90deg,rgba(34,230,255,.14),transparent);box-shadow:inset 3px 0 0 #22e6ff}
:root .cr-header{background:color-mix(in srgb,var(--surf) 78%,transparent);border-color:var(--bd);color:var(--tx)}
:root .cr-header-title span,:root .cr-muted,:root .cr-count,:root .cr-stat span,:root .cr-head p,:root .cr-row-main span,:root .cr-problem-info p,:root .cr-topic p,:root .cr-stage-title p,:root .cr-card p,:root .cr-empty p,:root .cr-setup-card>p,:root .cr-field label,:root .cr-setup-form label,:root .cr-metric span{color:var(--mu)}
:root .cr-theme{width:40px;height:40px;border-radius:12px;border:1px solid var(--bd);background:var(--surf2);font-size:18px;display:grid;place-items:center;transition:transform .25s,box-shadow .25s,border-color .25s}
:root .cr-theme:hover{transform:rotate(18deg) scale(1.08);border-color:var(--c1);box-shadow:0 0 18px color-mix(in srgb,var(--c1) var(--gA),transparent)}
:root .cr-avatar{background:linear-gradient(135deg,var(--c2),var(--c3));box-shadow:0 0 16px color-mix(in srgb,var(--c3) var(--gA),transparent)}
:root .cr-hero{background:linear-gradient(120deg,#0a0f22,#2a1b5c 60%,#0d3a4d);border:1px solid color-mix(in srgb,var(--c2) 45%,transparent);box-shadow:0 0 40px color-mix(in srgb,var(--c2) var(--gA),transparent)}
:root .cr-hero::after{background:radial-gradient(circle,color-mix(in srgb,var(--c1) 45%,transparent),transparent 70%)}
:root .cr-hero h1{text-shadow:0 0 22px rgba(178,107,255,.6)}:root .cr-eyebrow,:root .cr-hero .cr-eyebrow{color:#22e6ff}
:root .cr-primary{background:linear-gradient(135deg,var(--c2),var(--c3));color:#fff;box-shadow:0 0 20px color-mix(in srgb,var(--c3) var(--gA),transparent)}
:root .cr-primary:hover{background:linear-gradient(135deg,var(--c3),var(--c2))}
:root .cr-link{color:var(--c1)}
:root .cr-card,:root .cr-stat,:root .cr-problem,:root .cr-topic,:root .cr-stage-topic,:root .cr-empty,:root .cr-row{background:var(--surf);border-color:var(--bd);color:var(--tx)}
:root .cr-stat:nth-child(4n+1),:root .cr-topic:nth-child(6n+1),:root .cr-stage-topic:nth-child(6n+1){--n:var(--c1)}
:root .cr-stat:nth-child(4n+2),:root .cr-topic:nth-child(6n+2),:root .cr-stage-topic:nth-child(6n+2){--n:var(--c4)}
:root .cr-stat:nth-child(4n+3),:root .cr-topic:nth-child(6n+3),:root .cr-stage-topic:nth-child(6n+3){--n:var(--c5)}
:root .cr-stat:nth-child(4n+4),:root .cr-topic:nth-child(6n+4),:root .cr-stage-topic:nth-child(6n+4){--n:var(--c3)}
:root .cr-topic:nth-child(6n+5),:root .cr-stage-topic:nth-child(6n+5){--n:var(--c2)}
:root .cr-topic:nth-child(6n+6),:root .cr-stage-topic:nth-child(6n+6){--n:var(--c6)}
:root .cr-stat b{color:var(--n,var(--tx));text-shadow:0 0 16px color-mix(in srgb,var(--n,transparent) var(--gA),transparent)}
:root .cr-stat-icon,:root .cr-topic-icon{background:color-mix(in srgb,var(--n,var(--c2)) 15%,transparent);color:var(--n,var(--c2));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--n,var(--c2)) 45%,transparent)}
:root .cr-stat:hover .cr-stat-icon,:root .cr-topic:hover .cr-topic-icon{background:var(--n);color:#050810;box-shadow:0 0 18px color-mix(in srgb,var(--n) var(--gA),transparent)}
:root .cr-stat:hover,:root .cr-topic:hover,:root .cr-stage-topic:hover{border-color:var(--n);background:var(--surf);box-shadow:0 0 26px color-mix(in srgb,var(--n) calc(var(--gA) - 25%),transparent)}
:root .cr-card:hover{border-color:color-mix(in srgb,var(--c2) 55%,var(--bd))}
:root .cr-row:hover{background:var(--surf2);border-color:var(--c2)}
:root .cr-stage-num{background:linear-gradient(135deg,var(--c2),var(--c1));color:#050810;box-shadow:0 0 16px color-mix(in srgb,var(--c1) var(--gA),transparent)}
:root .cr-problem{border-left:3px solid var(--n,var(--bd))}
:root .cr-problem:has(.cr-easy){--n:var(--c4)}:root .cr-problem:has(.cr-medium){--n:var(--c5)}:root .cr-problem:has(.cr-hard){--n:var(--c3)}
:root .cr-problem:hover{border-color:var(--n);box-shadow:0 0 24px color-mix(in srgb,var(--n) calc(var(--gA) - 30%),transparent)}
:root .cr-problem.done{background:color-mix(in srgb,var(--c4) 7%,var(--surf))}
:root .cr-tag{color:var(--t,var(--mu));background:color-mix(in srgb,var(--t,var(--mu)) 14%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--t,var(--mu)) 45%,transparent)}
:root .cr-easy{--t:var(--c4)}:root .cr-medium{--t:var(--c5)}:root .cr-hard{--t:var(--c3)}:root .cr-lang{--t:var(--c1)}:root .cr-must{--t:var(--c2)}:root .cr-important{--t:var(--c1)}:root .cr-practice{--t:var(--mu)}:root .cr-advanced{--t:var(--c6)}
:root .cr-check{background:var(--surf2);border-color:var(--bd)}
:root .cr-check.solved{background:var(--c4);border-color:var(--c4);box-shadow:0 0 16px color-mix(in srgb,var(--c4) var(--gA),transparent)}
:root .cr-check.progress{background:var(--c5);border-color:var(--c5);box-shadow:0 0 16px color-mix(in srgb,var(--c5) var(--gA),transparent)}
:root .cr-star{color:var(--bd)}:root .cr-star.on{color:var(--c5);text-shadow:0 0 14px var(--c5)}
:root .cr-progress{background:var(--surf2)}
:root .cr-progress>div{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3));box-shadow:0 0 14px color-mix(in srgb,var(--c2) var(--gA),transparent)}
:root .cr-progress-big{background:linear-gradient(135deg,#0a0f22,#2a1b5c);border:1px solid color-mix(in srgb,var(--c2) 45%,transparent)}
:root .cr-circle{background:linear-gradient(135deg,var(--c2),var(--c1));box-shadow:inset 0 0 0 11px #0d1430,0 0 44px color-mix(in srgb,var(--c1) var(--gA),transparent)}
:root .cr-metric{border-color:var(--bd)}
:root .cr-filter,:root .cr-field input,:root .cr-field select,:root .cr-setup-form input,:root .cr-setup-form select{background:var(--surf2);color:var(--tx);border-color:var(--bd)}
:root .cr-filter:focus,:root .cr-field input:focus,:root .cr-field select:focus,:root .cr-setup-form input:focus,:root .cr-setup-form select:focus{border-color:var(--c1);box-shadow:0 0 0 4px color-mix(in srgb,var(--c1) 18%,transparent),0 0 18px color-mix(in srgb,var(--c1) 30%,transparent)}
:root .cr-setup{background:radial-gradient(circle at 15% 10%,#3a1d7a,transparent 45%),radial-gradient(circle at 85% 90%,#0b4f63,transparent 45%),#070b14}
:root .cr-setup-card{background:var(--surf);color:var(--tx);border:1px solid var(--bd);box-shadow:0 0 60px color-mix(in srgb,var(--c2) var(--gA),transparent)}
`;

const EXTRA = `
button{transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s,background .25s,color .25s,border-color .25s,opacity .2s;-webkit-tap-highlight-color:transparent}
button:active{transform:scale(.94)}
.cr-primary{position:relative;overflow:hidden;isolation:isolate}
.cr-primary::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.45) 50%,transparent 70%);transform:translateX(-120%);transition:transform .7s ease}
.cr-primary:hover::before{transform:translateX(120%)}
.cr-brand{display:flex;align-items:center;gap:11px;color:inherit;user-select:none}
.cr-brand-mark{display:grid;place-items:center;border-radius:28%;flex:none;background:linear-gradient(135deg,#b26bff,#22e6ff);box-shadow:0 0 22px rgba(178,107,255,.55),inset 0 0 0 1px rgba(255,255,255,.25);transition:transform .6s cubic-bezier(.34,1.56,.64,1),box-shadow .4s}
.cr-brand-mark svg{width:100%;height:100%}
.cr-brand:hover .cr-brand-mark{transform:rotate(-8deg) scale(1.1);box-shadow:0 0 34px rgba(34,230,255,.7),inset 0 0 0 1px rgba(255,255,255,.35)}
.cr-brand-text{font-size:22px;font-weight:900;letter-spacing:-.7px}
.cr-brand-text span{background:linear-gradient(90deg,#22e6ff,#b26bff,#ff3df2,#22e6ff);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:crFlow 7s linear infinite}
@keyframes crFlow{to{background-position:250% 0}}
.cr-side-brand{margin:5px 10px 30px;color:#fff}.cr-setup-card .cr-brand{margin-bottom:24px}
.cr-actions{display:flex;gap:6px;align-items:center}
.cr-icon-btn{height:32px;min-width:32px;border-radius:9px;border:1px solid var(--bd);background:var(--surf2);color:var(--mu);display:grid;place-items:center;font-size:12px;font-weight:800}
:root .cr-icon-btn:hover{color:var(--c1);border-color:var(--c1);transform:translateY(-2px);box-shadow:0 0 16px color-mix(in srgb,var(--c1) var(--gA),transparent)}
:root .cr-icon-btn.del:hover,:root .cr-icon-btn.sure{color:#fff;background:var(--c3);border-color:var(--c3);padding:0 10px;box-shadow:0 0 16px color-mix(in srgb,var(--c3) var(--gA),transparent)}
.cr-msg{padding:10px 13px;border-radius:10px;font-size:12px;font-weight:700;margin:6px 0 12px;animation:crIn .3s both}
.cr-msg.err{color:var(--c3);background:color-mix(in srgb,var(--c3) 12%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c3) 45%,transparent)}
.cr-msg.ok{color:var(--c4);background:color-mix(in srgb,var(--c4) 12%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c4) 45%,transparent)}
.cr-ghost{padding:12px 16px;border-radius:9px;border:1px solid var(--bd);background:var(--surf2);color:var(--tx);font-weight:800;margin-left:8px}
:root .cr-ghost:hover{border-color:var(--c1);color:var(--c1);transform:translateY(-2px)}
.cr-footer{margin-top:40px;padding:26px 30px;border-top:1px solid var(--bd);display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;color:var(--mu);font-size:12px}
.cr-footer nav{display:flex;gap:16px;flex-wrap:wrap}.cr-footer nav button,.cr-footer a{background:none;border:0;color:var(--mu);font-size:12px;font-weight:700;text-decoration:none}
.cr-footer nav button:hover,.cr-footer a:hover{color:var(--c1)}.cr-footer .cr-brand-text{font-size:16px}
`;
const APP_CSS = CSS + POLISH + THEME + EXTRA;

function safeRead(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Logo({ size = 40, text = true }) {
  return (
    <div className="cr-brand">
      <div className="cr-brand-mark" style={{ width: size, height: size }}>
        <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <path d="M12 34C12 25 28 26 28 18C28 13 23 11 20 7" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          <path d="M12 34C12 25 28 26 28 18C28 13 23 11 20 7" stroke="#0b1124" strokeOpacity=".55" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 3.2" />
          <path d="M8 11 4.5 14.5 8 18M32 22l3.5 3.5L32 29" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
        </svg>
      </div>
      {text && <span className="cr-brand-text">Code<span>Road</span></span>}
    </div>
  );
}

function Tag({ value, kind = "priority" }) {
  let cls = "cr-tag ";
  if (kind === "difficulty") cls += `cr-${value.toLowerCase()}`;
  else if (kind === "language") cls += "cr-lang";
  else if (value === "Must Know") cls += "cr-must";
  else if (value === "Important") cls += "cr-important";
  else if (value === "Practice") cls += "cr-practice";
  else cls += "cr-advanced";
  return <span className={cls}>{value}</span>;
}

function Bar({ value }) {
  return (
    <div className="cr-progress">
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

function Setup({ onSave }) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("Python");
  const [goal, setGoal] = useState(3);
  const [msg, setMsg] = useState(null);

  function submit(e) {
    e.preventDefault();
    if (!name.trim()) return setMsg({ type: "err", text: "Please enter your name." });
    if (Number(goal) < 1 || Number(goal) > 50) return setMsg({ type: "err", text: "Choose a daily goal between 1 and 50." });
    onSave({ name: name.trim(), language, dailyGoal: Number(goal) });
  }

  return (
    <div className="cr-setup">
      <div className="cr-setup-card">
        <Logo size={44} />
        <h1>Your coding journey starts here.</h1>
        <p>Set up your workspace and start tracking your DSA journey.</p>
        <form className="cr-setup-form" onSubmit={submit}>
          <label>YOUR NAME<input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>PREFERRED LANGUAGE
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {LANGUAGES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>DAILY PROBLEM GOAL
            <input type="number" min="1" max="50" value={goal} onChange={(e) => setGoal(e.target.value)} />
          </label>
          {msg && <div className={"cr-msg " + msg.type} role="alert">{msg.text}</div>}
          <button className="cr-primary" type="submit">Create My CodeRoad →</button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage }) {
  const items = [
    ["home", "🏠", "Home"],
    ["roadmap", "🗺️", "Roadmap"],
    ["problems", "💻", "Problem Bank"],
    ["topics", "🧩", "Topics"],
    ["progress", "📊", "Progress"],
    ["profile", "👤", "Profile"],
  ];

  return (
    <aside className="cr-side">
      <div className="cr-side-brand"><Logo size={38} /></div>
      <nav className="cr-nav">
        {items.map(([id, icon, label]) => (
          <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}>
            {icon} {label}
          </button>
        ))}
      </nav>
      <div className="cr-side-foot">
        <b>Code. Practice. Grow.</b>
        A personal workspace for your DSA journey.
      </div>
    </aside>
  );
}

function Header({ profile, theme, toggle }) {
  return (
    <header className="cr-header">
      <div className="cr-header-title">
        <b>CodeRoad</b>
        <span>DSA practice, organized for you.</span>
      </div>
      <div className="cr-user">
        <button className="cr-theme" onClick={toggle} aria-label="Toggle light or dark mode" title="Toggle theme">{theme === "dark" ? "☀️" : "🌙"}</button>
        <span>{profile.name}</span>
        <div className="cr-avatar">{profile.name.charAt(0).toUpperCase()}</div>
      </div>
    </header>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="cr-footer">
      <Logo size={28} />
      <nav>
        {[["home", "Home"], ["roadmap", "Roadmap"], ["problems", "Problems"], ["progress", "Progress"]].map(([id, label]) => (
          <button key={id} onClick={() => setPage(id)}>{label}</button>
        ))}
        <a href="https://github.com/rimmibinu" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
      <span>© 2026 CodeRoad · Built with React &amp; Vite by Rimmi</span>
    </footer>
  );
}

function Home({ allProblems, statuses, profile, topicProgress, setPage, favorites }) {
  const solved = allProblems.filter((p) => statuses[p.id] === "Solved").length;
  const inProgress = allProblems.filter((p) => statuses[p.id] === "In Progress").length;
  const completion = Math.round((solved / allProblems.length) * 100);
  const recommended = allProblems.filter(
    (p) => p.priority === "Must Know" && statuses[p.id] !== "Solved"
  ).slice(0, 5);

  return (
    <>
      <section className="cr-hero">
        <div>
          <div className="cr-eyebrow">YOUR CODING JOURNEY</div>
          <h1>Keep moving forward, {profile.name}. 🔥</h1>
          <p>Learn the fundamentals, solve problems, and build a consistent DSA habit.</p>
        </div>
        <button className="cr-primary" onClick={() => setPage("problems")}>Continue Practice →</button>
      </section>

      <div className="cr-stats">
        <div className="cr-stat"><div className="cr-stat-icon">◎</div><span>Problem Bank</span><b>{allProblems.length}</b></div>
        <div className="cr-stat"><div className="cr-stat-icon">✓</div><span>Solved</span><b>{solved}</b></div>
        <div className="cr-stat"><div className="cr-stat-icon">◷</div><span>In Progress</span><b>{inProgress}</b></div>
        <div className="cr-stat"><div className="cr-stat-icon">★</div><span>Favorites</span><b>{favorites.size}</b></div>
      </div>

      <div className="cr-grid2">
        <section className="cr-card">
          <div className="cr-eyebrow">OVERALL PROGRESS</div>
          <h2>{completion}% complete</h2>
          <Bar value={completion} />
          <p className="cr-muted">{solved} of {allProblems.length} problems solved</p>
        </section>

        <section className="cr-card">
          <div className="cr-eyebrow">PERSONAL GOAL</div>
          <h2>{profile.dailyGoal} problems / day</h2>
          <Bar value={Math.min(100, (solved % profile.dailyGoal) / profile.dailyGoal * 100)} />
          <p className="cr-muted">Preferred language: {profile.language}</p>
        </section>
      </div>

      <section className="cr-card" style={{ marginBottom: 18 }}>
        <div className="cr-section-head">
          <div><div className="cr-eyebrow">START HERE</div><h2>Recommended Core Problems</h2></div>
          <button className="cr-link" onClick={() => setPage("problems")}>View problem bank →</button>
        </div>

        <div className="cr-list">
          {recommended.map((p) => (
            <div className="cr-row" key={p.id}>
              <div className="cr-row-main"><b>{p.title}</b><span>{p.topic} · {p.language}</span></div>
              <Tag value={p.difficulty} kind="difficulty" />
            </div>
          ))}
        </div>
      </section>

      <section className="cr-card">
        <div className="cr-section-head">
          <div><div className="cr-eyebrow">TOPIC SNAPSHOT</div><h2>Your Roadmap</h2></div>
          <button className="cr-link" onClick={() => setPage("topics")}>Explore topics →</button>
        </div>

        <div className="cr-topic-grid">
          {topicProgress.slice(0, 8).map((t) => (
            <div className="cr-topic" key={t.name} onClick={() => setPage("topics")}>
              <div className="cr-topic-icon">{t.icon}</div>
              <h3>{t.name}</h3>
              <Bar value={t.percent} />
              <div className="cr-topic-meta"><span>{t.done}/{t.total} solved</span><b>{t.percent}%</b></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Roadmap({ topicProgress, setTopic, setPage }) {
  const stages = [
    ["01","Foundations","Build the essentials.",["Arrays","Hashing","Strings"]],
    ["02","Core Patterns","Learn reusable problem-solving techniques.",["Two Pointers","Sliding Window","Binary Search","Recursion"]],
    ["03","Data Structures","Master the structures used everywhere.",["Linked List","Stack & Queue","Trees","BST","Heaps"]],
    ["04","Advanced Problem Solving","Strengthen graph and optimization thinking.",["Graphs","Greedy","Backtracking","Bit Manipulation"]],
    ["05","Optimization","Tackle deeper optimization problems.",["Dynamic Programming","Tries"]],
  ];

  return (
    <>
      <div className="cr-head"><div><div className="cr-eyebrow">LEARNING PATH</div><h1>DSA Roadmap</h1><p>Move from fundamentals to advanced problem solving.</p></div></div>

      {stages.map(([num, title, desc, stageTopics]) => (
        <section className="cr-stage" key={num}>
          <div className="cr-stage-title"><div className="cr-stage-num">{num}</div><div><h2>{title}</h2><p>{desc}</p></div></div>
          <div className="cr-stage-grid">
            {stageTopics.map((name) => {
              const t = topicProgress.find((x) => x.name === name);
              return (
                <div className="cr-stage-topic" key={name} onClick={() => { setTopic(name); setPage("problems"); }}>
                  <b>{name}</b>
                  <span className="cr-muted">{t?.done || 0}/{t?.total || 0} solved</span>
                  <Bar value={t?.percent || 0} />
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}

const emptyForm = (language) => ({ title: "", topic: "Arrays", difficulty: "Easy", language, priority: "Practice" });
const FORM_FIELDS = [["topic", TOPICS], ["difficulty", DIFFICULTIES], ["language", LANGUAGES], ["priority", PRIORITIES]];
const FILTER_FIELDS = [["topic", TOPICS], ["difficulty", DIFFICULTIES], ["priority", PRIORITIES], ["language", LANGUAGES]];

function Problems({ allProblems, statuses, setStatuses, favorites, setFavorites, filters, setFilters, setCustomProblems, defaultLanguage }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm(defaultLanguage));
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return allProblems.filter((p) => (
      (p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q)) &&
      FILTER_FIELDS.every(([key]) => filters[key] === "All" || p[key] === filters[key])
    ));
  }, [allProblems, filters]);

  const filtersActive = filters.search || FILTER_FIELDS.some(([key]) => filters[key] !== "All");
  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function closeForm() {
    setShowForm(false); setEditingId(null); setError(""); setForm(emptyForm(defaultLanguage));
  }

  function submit(e) {
    e.preventDefault();
    const title = form.title.trim();
    if (title.length < 3) return setError("Title must be at least 3 characters.");
    if (title.length > 80) return setError("Title must be under 80 characters.");
    if (allProblems.some((p) => p.id !== editingId && p.title.toLowerCase() === title.toLowerCase()))
      return setError("This problem is already in your bank.");

    if (editingId) setCustomProblems((cur) => cur.map((p) => (p.id === editingId ? { ...p, ...form, title } : p)));
    else setCustomProblems((cur) => [...cur, { ...form, title, id: `custom-${Date.now()}`, custom: true }]);
    closeForm();
  }

  function startEdit(p) {
    setForm({ title: p.title, topic: p.topic, difficulty: p.difficulty, language: p.language, priority: p.priority });
    setEditingId(p.id); setError(""); setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function remove(id) {
    setCustomProblems((cur) => cur.filter((p) => p.id !== id));
    setStatuses((cur) => { const next = { ...cur }; delete next[id]; return next; });
    setFavorites((cur) => { const next = new Set(cur); next.delete(id); return next; });
    setConfirmId(null);
  }

  function cycleStatus(id) {
    setStatuses((cur) => {
      const next = { ...cur };
      const s = next[id] || "Not Started";
      if (s === "Not Started") next[id] = "In Progress";
      else if (s === "In Progress") next[id] = "Solved";
      else delete next[id];
      return next;
    });
  }

  function toggleFavorite(id) {
    setFavorites((cur) => {
      const next = new Set(cur);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <>
      <div className="cr-head">
        <div><div className="cr-eyebrow">PERSONAL PROBLEM BANK</div><h1>DSA Problems</h1><p>Add, edit, filter and track your practice journey.</p></div>
        <button className="cr-primary" onClick={() => (showForm ? closeForm() : setShowForm(true))}>{showForm ? "Close" : "+ Add Problem"}</button>
      </div>

      {showForm && (
        <form className="cr-card" style={{ marginBottom: 16 }} onSubmit={submit} noValidate>
          <div className="cr-eyebrow">{editingId ? "EDIT PROBLEM" : "NEW PROBLEM"}</div>
          <h2>{editingId ? "Update your problem" : "Add a problem you found elsewhere"}</h2>
          <div className="cr-form">
            <input className="cr-filter" placeholder="Problem title" aria-label="Problem title" value={form.title} onChange={setField("title")} />
            {FORM_FIELDS.map(([key, options]) => (
              <select key={key} className="cr-filter" aria-label={key} value={form[key]} onChange={setField(key)}>
                {options.map((x) => <option key={x}>{x}</option>)}
              </select>
            ))}
          </div>
          {error && <div className="cr-msg err" role="alert">{error}</div>}
          <button className="cr-primary" style={{ marginTop: 12 }}>{editingId ? "Save Changes" : "Add Problem"}</button>
          {editingId && <button type="button" className="cr-ghost" onClick={closeForm}>Cancel</button>}
        </form>
      )}

      <div className="cr-filterbar">
        <input className="cr-filter" placeholder="🔍 Search problems..." aria-label="Search problems" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        {FILTER_FIELDS.map(([key, options]) => (
          <select key={key} className="cr-filter" aria-label={`Filter by ${key}`} value={filters[key]} onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}>
            <option>All</option>{options.map((x) => <option key={x}>{x}</option>)}
          </select>
        ))}
      </div>

      <div className="cr-count">
        Showing {filtered.length} of {allProblems.length} problems
        {filtersActive && <button className="cr-link" style={{ marginLeft: 10 }} onClick={() => setFilters({ search: "", topic: "All", difficulty: "All", priority: "All", language: "All" })}>Clear filters</button>}
      </div>

      <div className="cr-problems">
        {filtered.map((p) => {
          const status = statuses[p.id] || "Not Started";
          const favorite = favorites.has(p.id);
          return (
            <div className={status === "Solved" ? "cr-problem done" : "cr-problem"} key={p.id}>
              <button className={status === "Solved" ? "cr-check solved" : status === "In Progress" ? "cr-check progress" : "cr-check"} onClick={() => cycleStatus(p.id)} aria-label="Change status">
                {status === "Solved" ? "✓" : status === "In Progress" ? "•" : ""}
              </button>
              <div className="cr-problem-info">
                <h3>{p.title}</h3>
                <p>{p.topic}</p>
                <div className="cr-tags">
                  <Tag value={p.difficulty} kind="difficulty" />
                  <Tag value={p.language} kind="language" />
                  <Tag value={p.priority} />
                  <span className={`cr-tag ${status === "Solved" ? "cr-must" : status === "In Progress" ? "cr-important" : "cr-practice"}`}>{status}</span>
                  {p.custom && <span className="cr-tag cr-medium">Custom</span>}
                </div>
              </div>
              {p.custom && (
                <div className="cr-actions">
                  <button className="cr-icon-btn" onClick={() => startEdit(p)} aria-label="Edit problem" title="Edit">✎</button>
                  <button className={confirmId === p.id ? "cr-icon-btn del sure" : "cr-icon-btn del"} onClick={() => (confirmId === p.id ? remove(p.id) : setConfirmId(p.id))} onBlur={() => setConfirmId(null)} aria-label="Delete problem" title="Delete">{confirmId === p.id ? "Sure?" : "🗑"}</button>
                </div>
              )}
              <button className={favorite ? "cr-star on" : "cr-star"} onClick={() => toggleFavorite(p.id)} aria-label="Toggle favourite">{favorite ? "★" : "☆"}</button>
            </div>
          );
        })}
        {filtered.length === 0 && <div className="cr-empty"><h2>No problems found</h2><p>Try another search or filter.</p></div>}
      </div>
    </>
  );
}

function Topics({ topicProgress, setTopic, setPage }) {
  return (
    <>
      <div className="cr-head"><div><div className="cr-eyebrow">KNOWLEDGE MAP</div><h1>DSA Topics</h1><p>Choose a skill area and continue where you left off.</p></div></div>

      <div className="cr-topic-grid">
        {topicProgress.map((t) => (
          <div className="cr-topic" key={t.name} onClick={() => { setTopic(t.name); setPage("problems"); }}>
            <div className="cr-topic-icon">{t.icon}</div>
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <Bar value={t.percent} />
            <div className="cr-topic-meta"><span>{t.done}/{t.total} solved</span><b>{t.percent}%</b></div>
          </div>
        ))}
      </div>
    </>
  );
}

function Progress({ allProblems, statuses, topicProgress }) {
  const solved = allProblems.filter((p) => statuses[p.id] === "Solved").length;
  const completion = Math.round((solved / allProblems.length) * 100);

  return (
    <>
      <div className="cr-head"><div><div className="cr-eyebrow">YOUR ANALYTICS</div><h1>Progress</h1><p>See exactly how your practice is developing.</p></div></div>

      <section className="cr-progress-big">
        <div className="cr-circle"><b>{completion}%</b></div>
        <h2>Overall Completion</h2>
        <p>{solved} of {allProblems.length} problems solved</p>
      </section>

      <div className="cr-progress-grid">
        <section className="cr-card">
          <div className="cr-eyebrow">DIFFICULTY</div>
          <h2>Problem Breakdown</h2>

          {DIFFICULTIES.map((level) => {
            const total = allProblems.filter((p) => p.difficulty === level).length;
            const done = allProblems.filter((p) => p.difficulty === level && statuses[p.id] === "Solved").length;
            return <div className="cr-metric" key={level}><span>{level}</span><b>{done} / {total}</b></div>;
          })}
        </section>

        <section className="cr-card">
          <div className="cr-eyebrow">TOPICS</div>
          <h2>Current Progress</h2>

          {topicProgress.slice().sort((a, b) => b.percent - a.percent).slice(0, 8).map((t) => (
            <div className="cr-metric" key={t.name}><span>{t.name}</span><b>{t.percent}%</b></div>
          ))}
        </section>
      </div>
    </>
  );
}

function Profile({ profile, setProfile }) {
  const [name, setName] = useState(profile.name);
  const [language, setLanguage] = useState(profile.language);
  const [goal, setGoal] = useState(profile.dailyGoal);
  const [msg, setMsg] = useState(null);

  function save(e) {
    e.preventDefault();
    if (!name.trim()) return setMsg({ type: "err", text: "Please enter your name." });
    if (Number(goal) < 1 || Number(goal) > 50) return setMsg({ type: "err", text: "Daily goal must be between 1 and 50." });

    setProfile({ name: name.trim(), language, dailyGoal: Number(goal) });
    setMsg({ type: "ok", text: "Profile updated successfully." });
  }

  return (
    <div className="cr-profile-grid">
      <section className="cr-card">
        <div className="cr-eyebrow">PERSONALIZATION</div>
        <h2>Your Profile</h2>

        <form onSubmit={save}>
          <div className="cr-field"><label>Name</label><input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="cr-field"><label>Preferred Language</label><select value={language} onChange={(e) => setLanguage(e.target.value)}>{LANGUAGES.map((x) => <option key={x}>{x}</option>)}</select></div>
          <div className="cr-field"><label>Daily Problem Goal</label><input type="number" min="1" max="50" value={goal} onChange={(e) => setGoal(e.target.value)} /></div>
          {msg && <div className={"cr-msg " + msg.type} role="alert">{msg.text}</div>}
          <button className="cr-primary">Save Profile</button>
        </form>
      </section>

      <section className="cr-card">
        <div className="cr-eyebrow">CODEROAD</div>
        <h2>Your personal DSA workspace</h2>
        <p className="cr-muted">Track problems, save favourites, explore topics and monitor your progress from one place.</p>
        <br />
        <p className="cr-muted">Your profile, statuses, favourites and custom problems are saved in your browser.</p>
      </section>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(() => safeRead("coderoad-profile-final", null));
  const [page, setPage] = useState("home");

  const [customProblems, setCustomProblems] = useState(() =>
    safeRead("coderoad-custom-final", [])
  );

  const [theme, setTheme] = useState(() => safeRead("coderoad-theme", "dark"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("coderoad-theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const [statuses, setStatuses] = useState(() =>
    safeRead("coderoad-status-final", {})
  );

  const [favoriteArray, setFavoriteArray] = useState(() =>
    safeRead("coderoad-favorites-final", [])
  );

  const [favorites, setFavorites] = useState(new Set(favoriteArray));

  const [filters, setFilters] = useState({
    search: "",
    topic: "All",
    difficulty: "All",
    priority: "All",
    language: "All",
  });

  const allProblems = useMemo(
    () => [...PROBLEMS, ...customProblems],
    [customProblems]
  );

  const topicProgress = TOPICS.map((name) => {
    const list = allProblems.filter((p) => p.topic === name);
    const done = list.filter((p) => statuses[p.id] === "Solved").length;
    const [icon, description] = TOPIC_META[name];

    return {
      name,
      icon,
      description,
      total: list.length,
      done,
      percent: list.length ? Math.round((done / list.length) * 100) : 0,
    };
  });

  useEffect(() => {
    if (profile) localStorage.setItem("coderoad-profile-final", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("coderoad-custom-final", JSON.stringify(customProblems));
  }, [customProblems]);

  useEffect(() => {
    localStorage.setItem("coderoad-status-final", JSON.stringify(statuses));
  }, [statuses]);

  useEffect(() => {
    const array = [...favorites];
    setFavoriteArray(array);
    localStorage.setItem("coderoad-favorites-final", JSON.stringify(array));
  }, [favorites]);

  if (!profile) {
    return (
      <>
        <style>{APP_CSS}</style>
        <Setup onSave={setProfile} />
      </>
    );
  }

  return (
    <>
      <style>{APP_CSS}</style>

      <div className="cr-app">
        <Sidebar page={page} setPage={setPage} />

        <div className="cr-main">
          <Header profile={profile} theme={theme} toggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

          <main className="cr-content" key={page}>
            {page === "home" && (
              <Home
                allProblems={allProblems}
                statuses={statuses}
                profile={profile}
                topicProgress={topicProgress}
                setPage={setPage}
                favorites={favorites}
              />
            )}

            {page === "roadmap" && (
              <Roadmap
                topicProgress={topicProgress}
                setTopic={(value) => setFilters((f) => ({ ...f, topic: value }))}
                setPage={setPage}
              />
            )}

            {page === "problems" && (
              <Problems allProblems={allProblems} statuses={statuses} setStatuses={setStatuses} favorites={favorites} setFavorites={setFavorites} filters={filters} setFilters={setFilters} setCustomProblems={setCustomProblems} defaultLanguage={profile.language} />
            )}

            {page === "topics" && (
              <Topics
                topicProgress={topicProgress}
                setTopic={(value) => setFilters((f) => ({ ...f, topic: value }))}
                setPage={setPage}
              />
            )}

            {page === "progress" && (
              <Progress
                allProblems={allProblems}
                statuses={statuses}
                topicProgress={topicProgress}
              />
            )}

            {page === "profile" && (
              <Profile
                profile={profile}
                setProfile={setProfile}
              />
            )}
          </main>

          <Footer setPage={setPage} />
        </div>
      </div>
    </>
  );
}