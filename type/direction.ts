// 方向
export type Direction = 'up' | 'right' | 'down' | 'left';
// 垂直方向
export const isVertical = (val: Direction): Boolean => val === 'up' || val === 'down';
// 水平方向
export const isHorizontal = (val: Direction): Boolean => val === 'left' || val === 'right';