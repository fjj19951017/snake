import { Direction } from '../type/direction';

/**
 * 生成一个范围内的随机数
 * @param {Number} minnum 最小值
 * @param {Number} maxnum 最大值
 * @returns {Number} 随机数
 */
export function randNum(minnum: number, maxnum: number): number {
  return Math.floor(minnum + Math.random() * (maxnum + 1 - minnum));
}

/**
 * 随机生成一个方向
 * @returns {Direction} 方向
 */
export function getRandDirection(): Direction {
  const directionList: Direction[] = ['up', 'right', 'down', 'left'];
  return directionList[randNum(0, 3)];
}