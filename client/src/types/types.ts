export const statuses = ['blocked', 'new', 'in progress', 'returned', 'done'] as const;
export const taskTypes = ['feature', 'problem', 'support', 'bug', 'improvement'] as const;
export type ITaskStatus = typeof statuses[number];
export type ITaskType = typeof taskTypes[number];
