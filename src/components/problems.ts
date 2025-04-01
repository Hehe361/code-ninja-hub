export default interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
  popularity: number;
  successRate: number;
  attemptCount: number;
  isNew: boolean;
  createdAt: Date;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  testCases: { input: string; expectedOutput: string }[];
  visualization?: {
    type: 'array' | 'graph' | 'tree' | 'basic';
    algorithm: string;
    steps: VisualizationStep[];
  };
}

export interface VisualizationStep {
  description: string;
  code: string;
  visualization: {
    type: 'array' | 'graph' | 'tree' | 'basic';
    data?: any[];
    nodes?: any[];
    edges?: any[];
    pointers?: any[];
    value?: string;
  };
}

export const problems: Problem[] = [
  {
    id: 'problem-1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    topics: ['Array', 'Hash Table'],
    popularity: 950,
    successRate: 45,
    attemptCount: 5000,
    isNew: true,
    createdAt: new Date(),
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9'
    ],
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' }
    ],
    visualization: {
      type: 'array',
      algorithm: 'Hash Table Approach',
      steps: [
        { 
          description: "Initialize an empty hash map", 
          code: "let map = new Map();", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [] }
        },
        { 
          description: "Iterate through the array", 
          code: "for (let i = 0; i < nums.length; i++) {\n  const complement = target - nums[i];\n  if (map.has(complement)) {\n    return [map.get(complement), i];\n  }\n  map.set(nums[i], i);\n}", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 0, label: "i"}] }
        },
        { 
          description: "Calculate complement: target - nums[i]", 
          code: "const complement = target - nums[i]; // 9 - 2 = 7", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 0, label: "i"}] }
        },
        { 
          description: "Check if complement exists in map", 
          code: "if (map.has(complement)) { // map doesn't have 7 yet", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 0, label: "i"}] }
        },
        { 
          description: "Add current number to map", 
          code: "map.set(nums[i], i); // map = { 2: 0 }", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 0, label: "i"}] }
        },
        { 
          description: "Move to next element", 
          code: "i++; // i = 1", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 1, label: "i"}] }
        },
        { 
          description: "Calculate complement for next element", 
          code: "const complement = target - nums[i]; // 9 - 7 = 2", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 1, label: "i"}] }
        },
        { 
          description: "Check if complement exists in map", 
          code: "if (map.has(complement)) { // map has 2!", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 1, label: "i"}] }
        },
        { 
          description: "Found solution! Return indices", 
          code: "return [map.get(complement), i]; // [0, 1]", 
          visualization: { type: "array", data: [2, 7, 11, 15], pointers: [{index: 0, label: "0", highlight: true}, {index: 1, label: "1", highlight: true}] }
        }
      ]
    }
  },
  {
    id: 'problem-2',
    title: 'Merge Intervals',
    description: 'Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.',
    difficulty: 'medium',
    topics: ['Array', 'Sorting'],
    popularity: 890,
    successRate: 50,
    attemptCount: 4200,
    isNew: false,
    createdAt: new Date(),
    examples: [
      {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: 'Intervals [1,3] and [2,6] overlap and are merged into [1,6].'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start <= end <= 10^4'
    ],
    testCases: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]' },
      { input: 'intervals = [[1,4],[4,5]]', expectedOutput: '[[1,5]]' }
    ],
    visualization: {
      type: 'array',
      algorithm: 'Sorting and Merging',
      steps: [
        { 
          description: "Sort intervals by start time", 
          code: "intervals.sort((a, b) => a[0] - b[0]);", 
          visualization: { type: "array", data: [[1,3], [2,6], [8,10], [15,18]], pointers: [] }
        },
        { 
          description: "Initialize result array with first interval", 
          code: "const result = [intervals[0]];", 
          visualization: { type: "array", data: [[1,3]], pointers: [{index: 0, label: "result[0]"}] }
        },
        { 
          description: "Iterate through remaining intervals", 
          code: "for (let i = 1; i < intervals.length; i++) {", 
          visualization: { type: "array", data: [[1,3], [2,6], [8,10], [15,18]], pointers: [{index: 1, label: "i"}] }
        },
        { 
          description: "Check if current interval overlaps with last result", 
          code: "const lastEnd = result[result.length - 1][1];\nconst currentStart = intervals[i][0];", 
          visualization: { type: "array", data: [[1,3], [2,6], [8,10], [15,18]], pointers: [{index: 0, label: "last"}, {index: 1, label: "current"}] }
        },
        { 
          description: "Overlap detected (3 >= 2)", 
          code: "if (lastEnd >= currentStart) {", 
          visualization: { type: "array", data: [[1,3], [2,6], [8,10], [15,18]], pointers: [{index: 0, label: "last"}, {index: 1, label: "current"}] }
        },
        { 
          description: "Merge intervals by updating end time", 
          code: "result[result.length - 1][1] = Math.max(lastEnd, intervals[i][1]);", 
          visualization: { type: "array", data: [[1,6]], pointers: [{index: 0, label: "merged", highlight: true}] }
        },
        { 
          description: "Move to next interval", 
          code: "i++; // i = 2", 
          visualization: { type: "array", data: [[1,6], [8,10], [15,18]], pointers: [{index: 1, label: "i"}] }
        },
        { 
          description: "No overlap with [8,10], add to result", 
          code: "else { result.push(intervals[i]); }", 
          visualization: { type: "array", data: [[1,6], [8,10]], pointers: [{index: 1, label: "added", highlight: true}] }
        },
        { 
          description: "Final result after processing all intervals", 
          code: "return result;", 
          visualization: { type: "array", data: [[1,6], [8,10], [15,18]], pointers: [] }
        }
      ]
    }
  },
  {
    id: 'problem-3',
    title: 'LRU Cache',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    difficulty: 'medium',
    topics: ['Hash Table', 'Linked List', 'Design'],
    popularity: 920,
    successRate: 35,
    attemptCount: 3800,
    isNew: false,
    createdAt: new Date(),
    examples: [
      {
        input: 'LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.put(2, 2); lRUCache.get(1); lRUCache.put(3, 3); lRUCache.get(2); lRUCache.put(4, 4); lRUCache.get(1); lRUCache.get(3); lRUCache.get(4);',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'LRUCache is created with capacity = 2. Various operations are performed in sequence.'
      }
    ],
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5'],
    testCases: [
      { input: 'capacity=2, operations=[put(1,1),put(2,2),get(1),put(3,3),get(2),put(4,4),get(1),get(3),get(4)]', expectedOutput: '[null,null,1,null,-1,null,-1,3,4]' }
    ],
    visualization: {
      type: 'graph',
      algorithm: 'Doubly Linked List with Hash Map',
      steps: [
        { 
          description: "Initialize LRU Cache with capacity 2", 
          code: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n    this.head = new Node(0, 0);\n    this.tail = new Node(0, 0);\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n  ...", 
          visualization: { 
            type: "graph", 
            nodes: [
              {id: 'head', highlight: true}, 
              {id: 'tail', highlight: true}
            ], 
            edges: [{source: 'head', target: 'tail'}] 
          }
        },
        { 
          description: "Put(1, 1) - Add to empty cache", 
          code: "put(key, value) {\n  if(this.cache.has(key)) {\n    this.remove(this.cache.get(key));\n  }\n  const newNode = new Node(key, value);\n  this.add(newNode);\n  this.cache.set(key, newNode);\n  ...", 
          visualization: { 
            type: "graph", 
            nodes: [
              {id: 'head'}, 
              {id: '1', highlight: true}, 
              {id: 'tail'}
            ], 
            edges: [
              {source: 'head', target: '1'}, 
              {source: '1', target: 'tail'}
            ] 
          }
        },
        { 
          description: "Put(2, 2) - Add second item", 
          code: "put(key, value) { ... }", 
          visualization: { 
            type: "graph", 
            nodes: [
              {id: 'head'}, 
              {id: '1'}, 
              {id: '2', highlight: true}, 
              {id: 'tail'}
            ], 
            edges: [
              {source: 'head', target: '2'}, 
              {source: '2', target: '1'}, 
              {source: '1', target: 'tail'}
            ] 
          }
        },
        { 
          description: "Get(1) - Access existing item", 
          code: "get(key) {\n  if(!this.cache.has(key)) return -1;\n  const node = this.cache.get(key);\n  this.remove(node);\n  this.add(node);\n  return node.value;\n}", 
          visualization: { 
            type: "graph", 
            nodes: [
              {id: 'head'}, 
              {id: '2'}, 
              {id: '1', highlight: true}, 
              {id: 'tail'}
            ], 
            edges: [
              {source: 'head', target: '1'}, 
              {source: '1', target: '2'}, 
              {source: '2', target: 'tail'}
            ] 
          }
        },
        { 
          description: "Put(3, 3) - Evict least recently used", 
          code: "put(key, value) {\n  ...\n  if(this.cache.size > this.capacity) {\n    const lru = this.tail.prev;\n    this.remove(lru);\n    this.cache.delete(lru.key);\n  }\n}", 
          visualization: { 
            type: "graph", 
            nodes: [
              {id: 'head'}, 
              {id: '3', highlight: true}, 
              {id: '1'}, 
              {id: 'tail'}
            ], 
            edges: [
              {source: 'head', target: '3'}, 
              {source: '3', target: '1'}, 
              {source: '1', target: 'tail'}
            ] 
          }
        }
      ]
    }
  }
];
